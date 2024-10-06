'use client';
import React, { useRef } from 'react';

export default function ChatComponent() {
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const appendMessage = (message: string, isUser: boolean = false) => {
        if (messagesRef.current) {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message');
    
            if (!isUser) {
                const avatar = document.createElement('div');
                avatar.classList.add('user-avatar');
                messageContainer.appendChild(avatar); // Add avatar only for bot messages
            }
    
            const messageElem = document.createElement('div');
            messageElem.innerHTML = message;
            messageElem.classList.add(isUser ? 'user-message' : 'bot-message');
    
            messageContainer.appendChild(messageElem);
            messagesRef.current.appendChild(messageContainer);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight; // Scroll to the latest message
        }
    };

    const sendMessage = async (event?: React.KeyboardEvent | React.MouseEvent) => {
        if (event && 'key' in event && event.key !== 'Enter') {
            return;
        }
    
        const userInput = inputRef.current?.value;
        if (userInput && userInput.trim()) {
            appendMessage(`<b style=color:#00bfff>คุณ:</b><br>${userInput}`, true);
    
            if (inputRef.current) {
                inputRef.current.value = '';
            }
    
            try {
                const response = await fetch('/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_input: userInput }),
                });
    
                const data = await response.json();
                appendMessage(`Chatbot:<br>${data.response}`);
            } catch (error) {
                console.error('Error fetching response:', error);
                appendMessage('<b style=color:#4c0000>Error:</b><br>Could not contact the chatbot.');
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            sendMessage(event);
        }
    };

    return (
            <div className="w-[calc(90vw] sm:w-[calc(90vw-19.5rem)] p-6  rounded-lg shadow-lg ">
                <div className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-teal-400 font-bold" id="chat-cane-title">
                    ChatCANE
                </div>
                <div className="h-[calc(60vh-1.5rem)] overflow-y-scroll p-4 rounded-lg border border-gray-600" ref={messagesRef}></div>
                <div className="flex items-center mt-4 relative">
                    <input
                        type="text"
                        placeholder="พิมพ์ข้อความที่นี่..."
                        className="w-full py-2 px-4 pr-[calc(85px)]  bg-gray-300 text-gray-800 rounded-full focus:outline-none focus:ring focus:border-teal-400"
                        ref={inputRef}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        onClick={sendMessage}
                        className="absolute right-1.5 bg-blue-600 text-white font-bold py-1 px-2.5 rounded-full hover:bg-blue-500 transition-all"
                        id="enterButton"
                    >
                        ENTER
                    </button>
                </div>
            </div>
    );
}
