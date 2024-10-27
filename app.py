from flask import Flask, request, jsonify, Response, session
from sugarcane_data import sugarcane_info
from difflib import get_close_matches
from flask_cors import CORS
from rapidfuzz import process
import time, re, secrets, os
import spacy

# โหลดโมเดลภาษาอังกฤษของ spaCy สำหรับการวิเคราะห์คำสำคัญที่แม่นยำยิ่งขึ้น
nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)

# API route สำหรับรับข้อมูลจาก React
@app.route("/chatbot_full", methods=["GET"])
def chatbot_full():
    user_input = request.args.get("user_input")
    full_response = generate_response(user_input)
    return jsonify({"response": full_response})

@app.route("/chatbot_stream")
def chatbot_stream():
    user_input = request.args.get("user_input")
    full_response = generate_response(user_input)
    return Response(stream_response(full_response), content_type='text/event-stream')

# ฟังก์ชันสร้าง Chatbot พร้อมกับประวัติการสนทนา
def generate_response(prompt):
    # ตรวจสอบว่า session มีประวัติการสนทนาอยู่หรือไม่
    conversation_history = session.get('conversation_history', '')

    # รวมประวัติการสนทนากับคำถามใหม่
    full_prompt = conversation_history + '\n' + prompt

    # ตรวจสอบว่า prompt มีคำสำคัญอะไรบ้าง โดยใช้ spaCy และ RapidFuzz
    keywords = find_keywords(prompt, sugarcane_info.keys())

    if keywords:
        # ถ้าพบคำสำคัญที่ตรงกัน ให้ตอบข้อมูลที่เกี่ยวข้อง
        keyword_response = ", ".join([sugarcane_info[key] for key in keywords])
        response = f"{keyword_response}"
    else:
        # ค้นหาข้อมูลที่ใกล้เคียงที่สุดถ้าไม่พบคำสำคัญ โดยใช้ RapidFuzz
        response = find_closest_topic(prompt, sugarcane_info)
        if not response:
            response = "ขอโทษ ฉันไม่พบข้อมูลที่เกี่ยวข้องกับคำถามนี้ กรุณาลองถามคำถามใหม่"

    # อัปเดตประวัติการสนทนาใน session
    session['conversation_history'] = full_prompt + '\n' + response

    return response

# ฟังก์ชันส่งข้อมูลทีละตัวอักษรผ่าน SSE
def stream_response(response):
    typing_delay = 0.02  # กำหนดดีเลย์ระหว่างตัวอักษร
    for char in response:
        yield f"data: {char}\n\n"  # ส่งตัวอักษรไปยัง client ทีละตัว
        time.sleep(typing_delay)

# ฟังก์ชันค้นหาคำสำคัญ (Keyword) โดยใช้ spaCy สำหรับการแยกคำหลัก
def find_keywords(prompt, keyword_list):
    doc = nlp(prompt)  # ประมวลผล prompt ผ่าน spaCy
    found_keywords = []
    for token in doc:
        if token.lemma_.lower() in keyword_list:  # ใช้ lemma สำหรับการเปรียบเทียบที่แม่นยำขึ้น
            found_keywords.append(token.lemma_)
    return found_keywords

# ฟังก์ชันค้นหาคำที่ใกล้เคียงที่สุด โดยใช้ RapidFuzz
def find_closest_topic(prompt, info_dict):
    matches = process.extract(prompt, info_dict.keys(), limit=1, score_cutoff=60)
    if matches:
        return info_dict[matches[0][0]]
    return None

# Flask run
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
