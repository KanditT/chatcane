from flask import Flask, request, jsonify, session
from flask_cors import CORS
from rapidfuzz import process
import requests
import secrets
from openai import OpenAI

app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)  # สำหรับจัดการ session

# -----------------------------
# กำหนดชื่อโมเดล
# -----------------------------
model_name = "gemma-3-12b-it:free"
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
            api_key="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",
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
            api_key="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",
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
            api_key="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",
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
    else:
        # ถ้ายังไม่มีโมเดลอื่น หรือโมเดลไม่ตรง
        return "ไม่พบโมเดลที่ระบุ หรือยังไม่ได้สนับสนุนโมเดลนี้"

# -----------------------------
# ฟังก์ชันหลักสำหรับประมวลผลคำถาม
# -----------------------------


def generate_response(user_input, data_info, chat_history):
    """
    1) เพิ่มข้อความ user เข้าไปใน chat_history
    2) ตรวจสอบข้อมูลใน data_info หากเจอ match > 75% ก็ใช้ข้อมูลนั้นเป็นคำตอบ
    3) ถ้าไม่เจอ match หรือ match น้อยไป ให้เรียกโมเดลด้วย response_model
    4) บันทึกคำตอบสุดท้ายของโมเดลเข้า chat_history ก่อน return
    """
    # 1) เก็บข้อความ user
    chat_history.append({"role": "user", "content": user_input})

    # 2) พยายามหา match ในข้อมูล data_info
    matches = process.extract(user_input, data_info.keys(), limit=1)
    if matches and matches[0][1] > 75:
        response_text = data_info[matches[0][0]]
    else:
        # 3) ถ้าไม่ match ให้ส่งไปที่โมเดลตามที่กำหนด
        selected_model = get_model(model_name)
        response_text = response_model(selected_model, chat_history)

    # 4) เก็บคำตอบของโมเดลในประวัติการสนทนา
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
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
