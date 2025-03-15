"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import "./chat.css";

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatComponent() {
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputLocked, setInputLocked] = useState(false);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const typeBotResponse = (response: string) => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= response.length) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { text: response.slice(0, idx), isUser: false },
        ]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const sendMessage = async () => {
    const userInput = inputRef.current?.value.trim();
    if (!userInput || inputLocked) return;

    setMessages((prev) => [...prev, { text: userInput, isUser: true }]);
    setInputLocked(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const response = await fetch(
          `http://localhost:5000/chatbot_full?user_input=${encodeURIComponent(
              userInput
          )}`,
          { method: "GET" }
      );

      const data = await response.json();

      setMessages((prev) => [...prev, { text: "", isUser: false }]);
      typeBotResponse(data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "ไม่สามารถติดต่อกับ Chatbot ได้.", isUser: false },
      ]);
    } finally {
      setInputLocked(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !inputLocked) {
      sendMessage();
    }
  };

  return (
      <div className="w-full h-screen flex flex-col items-center justify-center pb-20">
        {messages.length === 0 && (
            <h1 className="text-2xl sm:text-xl font-semibold mb-8">
              มีอะไรให้ช่วยหรือไม่
            </h1>
        )}

        {messages.length > 0 && (
            <div
                ref={messagesRef}
                className="w-full xl:w-1/2 h-full overflow-y-auto p-4"
            >
              {messages.map((msg, idx) => (
                  <div
                      key={idx}
                      className={`my-6 flex ${
                          msg.isUser ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                        className={`px-4 py-2 rounded-full text-xm max-w-[70%] break-words ${
                            msg.isUser
                                ? "border text-gray-900 bg-gray-100"
                                : "text-gray-800"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
              ))}
            </div>
        )}

        <div className="w-full xl:w-1/2 relative flex items-center bg-white rounded-full px-4 py-2">
          <Input
              placeholder="จะทำอะไรให้ดี?"
              ref={inputRef}
              disabled={inputLocked}
              onKeyPress={handleKeyPress}
              className="rounded-xl"
          />
          <Button
              variant="default"
              onClick={sendMessage}
              disabled={inputLocked}
              className="ml-2 px-3 py-2 rounded-xl"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
  );
}