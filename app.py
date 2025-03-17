from flask import Flask, request, jsonify, session
from flask_cors import CORS
from rapidfuzz import process
import requests
import secrets
from openai import OpenAI

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)  # ใช้สำหรับ session management

# Default model
model_name = "llama-3.3-70b-instruct:free"


def get_model():
    """ดึงชื่อโมเดลที่ถูกตั้งค่า"""
    return model_name

# Function to fetch data


def fetch_data():
    # url = "https://raw.githubusercontent.com/apiwatfresh/sugarcane-data/refs/heads/main/sugarcane_data.json"
    # try:
    #     response = requests.get(url)
    #     response.raise_for_status()
    #     return response.json()
    # except requests.exceptions.RequestException:
    return {}

# Function to generate chatbot response with context history


def generate_response(user_input, sugarcane_info, chat_history):
    chat_history.append({"role": "user", "content": user_input})

    # ตรวจสอบข้อมูลใน dataset ก่อน
    matches = process.extract(user_input, sugarcane_info.keys(), limit=1)
    if matches and matches[0][1] > 75:
        response_text = sugarcane_info[matches[0][0]]
    else:
        response_text = query_model(get_model(), chat_history)

    chat_history.append({"role": "assistant", "content": response_text})
    return response_text


def query_model(model_name, chat_history):
    """ฟังก์ชันเลือกโมเดลที่ต้องการใช้"""
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key="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",
    )

    if model_name == "deepseek-r1-zero:free":
        model = "deepseek/deepseek-r1-zero:free"
    elif model_name == "llama-3.3-70b-instruct:free":
        model = "meta-llama/llama-3.3-70b-instruct:free"
    else:
        return "Model not supported"

    completion = client.chat.completions.create(
        model=model,
        messages=chat_history,  # ใช้ประวัติสนทนาเป็น context
        extra_headers={"X-Title": "AI ChatCoE"}
    )

    return completion.choices[0].message.content

# Route for chatbot


@app.route("/chatbot_full", methods=["GET"])
def chatbot_full():
    user_input = request.args.get("user_input")

    # ใช้ session เก็บประวัติการสนทนา
    if "chat_history" not in session:
        session["chat_history"] = []

    data_info = fetch_data()

    response = generate_response(
        user_input, data_info, session["chat_history"])

    # จำกัดขนาดของ chat history
    session["chat_history"] = session["chat_history"][-10:]

    return jsonify({"response": response, "model": get_model()})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
