from flask import Flask, request, jsonify
from flask_cors import CORS
from rapidfuzz import process
import requests
import secrets
from openai import OpenAI

# Initialize OpenAI client
app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)

model_name = "llama-3.3-70b-instruct:free"


def get_model(model_name):
    return model_name

# Function to fetch data from URL


def fetch_data():
    url = "https://raw.githubusercontent.com/apiwatfresh/sugarcane-data/refs/heads/main/sugarcane_data.json"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException:
        return {}

# Function to generate chatbot response


def generate_response(user_input, sugarcane_info, chat_history):
    chat_history.append({"role": "user", "content": user_input})
    # ตรวจสอบข้อมูลใน dataset ก่อน
    matches = process.extract(user_input, sugarcane_info.keys(), limit=1)
    if matches and matches[0][1] > 75:
        response_text = sugarcane_info[matches[0][0]]
    else:
        response_text = response_model(get_model(model_name))


def response_model(model_name):
    if get_model(model_name) == "deepseek-r1-zero:free":
        # Fallback to OpenAI DeepSeek model
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key="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",
        )

        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1-zero:free",
            messages=[{"role": "user", "content": user_input}],
            extra_headers={"X-Title": "AI ChatCoE"}
        )

        return completion.choices[0].message.content

    elif get_model(model_name) == "llama-3.3-70b-instruct:free":
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key="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",
        )

        completion = client.chat.completions.create(
            extra_headers={
                # Optional. Site URL for rankings on openrouter.ai.
                "HTTP-Referer": "https://openrouter.ai/api/v1",
                # Optional. Site title for rankings on openrouter.ai.
                "X-Title": "AI ChatCoE",
            },
            extra_body={},
            model="meta-llama/llama-3.3-70b-instruct:free",
            messages=[
                {
                    "role": "user",
                    "content": user_input
                }
            ]
        )
        return completion.choices[0].message.content

# Route for standard responses


@app.route("/chatbot_full", methods=["GET"])
def chatbot_full():
    user_input = request.args.get("user_input")
    data_info = fetch_data()
    response = generate_response(user_input, data_info)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
