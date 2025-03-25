from flask import Flask, request, jsonify, session
from flask_cors import CORS
from rapidfuzz import process
import requests
import secrets
import os
from openai import OpenAI, AzureOpenAI
import dotenv

dotenv.load_dotenv()



app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)  # สำหรับจัดการ session

# -----------------------------
# กำหนดชื่อโมเดล
# -----------------------------
model_name = "deepseek-r1-zero:free"
my_site_url = "https://openrouter.ai/api/v1"
my_site_name = "AI ChatCoE"
# -----------------------------
# ฟังก์ชันเลือกโมเดล (กรณีต้องการเพิ่มโมเดลอื่นในอนาคต)
# -----------------------------


def get_model(model_name):
    """
    ฟังก์ชันสำหรับส่งคืนชื่อโมเดล
    """
    return model_name

# -----------------------------
# ฟังก์ชันดึงข้อมูลจาก URL
# -----------------------------


def fetch_data():
    # """
    # ฟังก์ชันดึงข้อมูลจาก URL (ตัวอย่างเป็น data.json)
    # """
    # url = "https://raw.githubusercontent.com/apiwatfresh/sugarcane-data/refs/heads/main/sugarcane_data.json"
    # try:
    #     response = requests.get(url)
    #     response.raise_for_status()
    #     return response.json()
    # except requests.exceptions.RequestException:
    return {}

# -----------------------------
# ฟังก์ชันเรียกโมเดลตามชื่อที่กำหนด
# -----------------------------


def response_model(selected_model_name, chat_history):
    """
    เรียกใช้งานโมเดลต่าง ๆ ผ่าน openrouter.ai โดยส่ง chat_history ไปยัง API
    """
    # ตรวจสอบว่าเป็นโมเดลไหน
    if selected_model_name == "deepseek-r1-zero:free":
        client = OpenAI(
            base_url=my_site_url,
            # ใส่ API Key ของคุณ
            api_key='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',
        )
        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1-zero:free",
            messages=chat_history,
            extra_headers={"X-Title": my_site_name}
        )
        return completion.choices[0].message.content

    elif selected_model_name == "llama-3.3-70b-instruct:free":
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            # ใส่ API Key ของคุณ
            api_key='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',
        )
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": my_site_url,  # optional
                "X-Title": my_site_name,  # optional
            },
            extra_body={},
            model="meta-llama/llama-3.3-70b-instruct:free",
            messages=chat_history
        )
        return completion.choices[0].message.content
    elif selected_model_name == "gemma-3-12b-it:free":
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("GEMMA_3_KEY"),
        )
        completion = client.chat.completions.create(
            extra_headers={
                # Optional. Site URL for rankings on openrouter.ai.
                "HTTP-Referer": my_site_url,
                # Optional. Site title for rankings on openrouter.ai.
                "X-Title": my_site_name,
            },
            extra_body={},
            model="google/gemma-3-12b-it:free",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What is in this image?"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
                            }
                        }
                    ]
                }
            ]
        )
        return completion.choices[0].message.content
    elif selected_model_name == "gpt-35-turbo":
        endpoint = os.getenv(
            "ENDPOINT_URL", "https://apiwa-m6rl3g3u-eastus2.openai.azure.com/")

        deployment = os.getenv("DEPLOYMENT_NAME", "gpt-35-turbo")
        subscription_key = os.getenv(
            "AZURE_OPENAI_API_KEY", "REPLACE_WITH_YOUR_KEY_VALUE_HERE")

        # Initialize Azure OpenAI Service client with key-based authentication
        client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=subscription_key,
            api_version="2024-05-01-preview",
        )

        # Prepare the chat prompt
        chat_prompt = [
            {
                "role": "user",
                "content": chat_history
            }
        ]

        # Include speech result if speech is enabled
        messages = chat_prompt

        # Generate the completion
        completion = client.chat.completions.create(
            model=deployment,
            messages=messages,
            max_tokens=800,
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
            stream=False
        )
        return completion.choices[0].message.content
    else:
        # ถ้ายังไม่มีโมเดลอื่น หรือโมเดลไม่ตรง
        return "ไม่พบโมเดลที่ระบุ หรือยังไม่ได้สนับสนุนโมเดลนี้"

# -----------------------------
# ฟังก์ชันหลักสำหรับประมวลผลคำถาม
# -----------------------------


def generate_response(user_input, data_info, chat_history):
    """
    1) เพิ่ม system message เพื่อกำหนด persona
    2) เพิ่มข้อความ user เข้าไปใน chat_history
    3) ตรวจสอบข้อมูลใน data_info หากเจอ match > 75% ก็ใช้ข้อมูลนั้นเป็นคำตอบ
    4) ถ้าไม่เจอ match หรือ match น้อยไป ให้เรียกโมเดลด้วย response_model
    5) บันทึกคำตอบสุดท้ายของโมเดลเข้า chat_history ก่อน return
    """

    # 1) ถ้ายังไม่มี system message ให้เพิ่ม
    if not any(msg["role"] == "system" for msg in chat_history):
        chat_history.insert(0, {
            "role": "system",
            "content": (
                "คุณคือครูคณิตศาสตร์ระดับผู้เชี่ยวชาญที่สามารถอธิบายเนื้อหาทุกระดับตั้งแต่พื้นฐานถึงขั้นสูง "
                "คุณสื่อสารอย่างชัดเจน ใช้ภาษาที่เข้าใจง่าย มีความอดทน ใจดี และมักยกตัวอย่างประกอบเพื่อให้ผู้เรียนเข้าใจได้ง่ายขึ้น "
                "หากคำถามไม่ชัดเจน คุณจะช่วยผู้เรียนตีความและชี้แนะอย่างเป็นขั้นตอน "
                "คุณสามารถตอบคำถามในหัวข้อเช่น พีชคณิต, เรขาคณิต, แคลคูลัส, สถิติ, ตรรกศาสตร์ ฯลฯ ได้อย่างถูกต้องและลึกซึ้ง "
                "เป้าหมายของคุณคือให้ผู้เรียนเข้าใจจริง ไม่ใช่แค่ท่องจำ"
            )
        })


    # 2) เพิ่มข้อความจาก user
    chat_history.append({"role": "user", "content": user_input})

    # 3) ตรวจสอบข้อมูล local ก่อนเรียก AI
    matches = process.extract(user_input, data_info.keys(), limit=1)
    if matches and matches[0][1] > 75:
        response_text = data_info[matches[0][0]]
    else:
        # 4) ถ้าไม่เจอหรือ match น้อย ส่งไปที่ AI
        selected_model = get_model(model_name)
        response_text = response_model(selected_model, chat_history)

    # 5) เก็บคำตอบของ AI ลงใน history
    chat_history.append({"role": "assistant", "content": response_text})

    return response_text


# -----------------------------
# Route หลักสำหรับ Chatbot
# -----------------------------


@app.route("/chatbot_full", methods=["GET"])
def chatbot_full():
    """
    รับพารามิเตอร์ user_input ผ่าน query param แล้วส่งข้อความไปประมวลผล
    """
    user_input = request.args.get("user_input", "")
    # ดึงข้อมูลจาก API ภายนอก
    data_info = fetch_data()

    # ใช้ session ใน Flask เพื่อเก็บ chat_history
    if "chat_history" not in session:
        session["chat_history"] = []

    # เรียกฟังก์ชันประมวลผล
    response = generate_response(
        user_input, data_info, session["chat_history"])

    # ตัดแชทเก่าทิ้งออก ถ้ามียาวเกินไป กัน memory เต็ม
    session["chat_history"] = session["chat_history"][-10:]

    return jsonify({"response": response})


# -----------------------------
# เริ่มรันเซิร์ฟเวอร์
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, threaded=True, debug=True)
