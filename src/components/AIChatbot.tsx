import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hi there! 🌟 I'm your Talent Trail Parent Assistant. I can answer any questions about our early learning programs, schedule, safety measures, and how to book a tour. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
    }
  }, [messages, isOpen]);

  // Alert parent on new message if closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      // 2. Call secure API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      
      // 3. Add bot response
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.text || "I am currently assisting another family. Please call us at 306-737-7002 or email emekaelemamba@me.com!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: "I experienced a minor connection lag. 🧸 However, we would love to chat! You can call us directly at 306-737-7002 or email emekaelemamba@me.com.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[350px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border-4 border-yellow-200 overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right animate-fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2B4C7E] to-[#4FA3D1] px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight font-display">Parent Assistant</h4>
                <p className="text-[11px] text-blue-100 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
                  Active Care Agent
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-100 p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#FFFCF5] space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#4FA3D1] text-white rounded-tr-none"
                      : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line font-medium">{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1.5 ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about hours, fees, enrollment, safety..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-full transition-all cursor-pointer ${
                inputText.trim()
                  ? "bg-[#4FA3D1] text-white hover:bg-blue-600 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 2. Chat Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#2B4C7E] to-[#4FA3D1] text-white rounded-full shadow-2xl hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 group"
        title="Open Parent Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        )}
        
        {/* Unread Indicator Notification Badge */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[10px] text-white font-bold items-center justify-center">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
