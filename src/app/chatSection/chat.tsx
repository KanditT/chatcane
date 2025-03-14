'use client'; 
import React, { useRef, useState } from 'react';
import './chat.css';
export default function ChatComponent() {
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isGenerating, setIsGenerating] = useState(false); // สถานะบล็อคการถามซ้ำ
    const [typingInterval, setTypingInterval] = useState<NodeJS.Timeout | null>(null); // เก็บ reference ของ interval สำหรับหยุดการพิมพ์

    // Add CSS classes for user and bot messages
    const appendMessage = (message: string, isUser: boolean = false) => {
        if (messagesRef.current) {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message');
    
            // Align user messages to the right and bot messages to the left
            messageContainer.classList.add(isUser ? 'user-message-container' : 'bot-message-container');
    
            const messageElem = document.createElement('div');
            messageElem.innerHTML = message;
            messageElem.classList.add(isUser ? 'user-message' : 'bot-message');
    
            messageContainer.appendChild(messageElem);
            messagesRef.current.appendChild(messageContainer);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight; // Scroll to the latest message
        }
    };

    // ฟังก์ชันใหม่สำหรับแสดงผลทีละตัวอักษร
    const appendMessageCharByChar = (message: string, delay: number = 50) => {
        if (messagesRef.current) {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message', 'bot-message-container');
    
            const chatcaneNameElem = document.createElement('div');
            chatcaneNameElem.innerHTML = '<b style="color:green;">Chatcane:</b><br>';
            messageContainer.appendChild(chatcaneNameElem);
    
            const messageElem = document.createElement('div');
            messageElem.classList.add('bot-message');
            messageContainer.appendChild(messageElem);
            messagesRef.current.appendChild(messageContainer);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight; // Scroll to the latest message
    
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex < message.length) {
                    messageElem.innerHTML += message[currentIndex] === '\n' ? '<br>' : message[currentIndex];
                    currentIndex++;
                    if (messagesRef.current) {
                        messagesRef.current.scrollTop = messagesRef.current.scrollHeight; // Scroll as new chars appear
                    }
                } else {
                    clearInterval(interval);
                    setIsGenerating(false); // ปลดล็อคเมื่อ gen ข้อความเสร็จ
                }
            }, delay); // delay ระหว่างการแสดงตัวอักษรแต่ละตัว
            setTypingInterval(interval); // เก็บ reference สำหรับหยุดการสร้าง
        }
    };

    // ฟังก์ชันหยุดการสร้างข้อความ
    const stopGenerating = () => {
        if (typingInterval) {
            clearInterval(typingInterval); // หยุด interval
            setIsGenerating(false); // ปลดล็อคให้สามารถถามได้อีกครั้ง
            appendMessage('<b style=color:red>Chatbot หยุดการสร้างคำตอบแล้ว.</b><br>'); // แจ้งว่าหยุดแล้ว
        }
    };

    const sendMessage = async (event?: React.KeyboardEvent | React.MouseEvent) => {
        if (event && 'key' in event && event.key !== 'Enter') {
            return;
        }

        if (isGenerating) {
            appendMessage('<b style=color:red>กรุณารอให้ Chatbot สร้างคำตอบก่อน.</b><br>');
            return; // ถ้ากำลังสร้างอยู่ให้บล็อกการถามใหม่
        }
    
        const userInput = inputRef.current?.value;
        if (userInput && userInput.trim()) {
            // chatcaneNameElem.innerHTML = '<b style="color:green;">Chatcane:</b><br>';
            appendMessage(`<b><div >คุณ:</div></b>`, true);
            appendMessage(`<span style="background-color:#d1d5db;padding: 8px 12px; border-radius: 15px;"> ${userInput}</span>`, true);
            setIsGenerating(true); // ล็อคการถามใหม่
    
            if (inputRef.current) {
                inputRef.current.value = '';
            }
    
            try {
                const response = await fetch('http://localhost:5000/chatbot_full?user_input=' + encodeURIComponent(userInput), {
                    method: 'GET',
                });
    
                const data = await response.json();
                appendMessageCharByChar(`${data.response}`, 50); // ส่งข้อความทีละตัวอักษร
            } catch (error) {
                console.error('Error fetching response:', error);
                appendMessage('<b style=color:#4c0000>Error:</b><br>ไม่สามารถติดต่อกับ Chatbot ได้.');
                setIsGenerating(false); // ปลดล็อคถ้าเกิดข้อผิดพลาด
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !isGenerating) {
            sendMessage(event);
        }
    };

    return (
        <div className="w-[calc(90vw] sm:w-[calc(100%)] p-0 rounded-lg shadow-lg ">
            <div className="text-3xl mb-4">
                ChatCANE
            </div>
            <div className="h-[calc(60vh-1.5rem)] overflow-y-scroll p-4 rounded-lg border border-gray-600" ref={messagesRef}></div>
            <div className="flex items-center mt-4 relative">
                <input
                    type="text"
                    placeholder="พิมพ์ข้อความที่นี่..."
                    className="w-full py-2 px-4 pr-[calc(85px)]  bg-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-teal-400"
                    ref={inputRef}
                    onKeyPress={handleKeyPress}
                    disabled={isGenerating} // ปิดการพิมพ์เมื่อ gen ข้อความอยู่
                />
                <button
                    onClick={isGenerating ? stopGenerating : sendMessage}
                    className={`absolute right-1.5 ${isGenerating ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold py-1 px-2.5 rounded-md transition-all`}
                    id="enterButton"
                >
                    {isGenerating ? 'STOP' : 'ENTER'}
                </button>
            </div>
        </div>
    );
}
