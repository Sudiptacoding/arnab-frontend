"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChatWidget = ({
phoneNumber = "8801613140291",

adminName = "Retouch Lab 360",

welcomeMessage = `Hello! 👋 Welcome to Retouch Lab 360.

We provide professional photo retouching services for photographers, fashion brands, e-commerce businesses, and creative professionals.

✨ Our Services:
1. Skin Photo Retouch
2. Fashion Cloth Retouch
3. Fashion Jewelry Retouch
4. Newborn Photo Retouch
5. Body Shaping Retouch
6. Product Photo Retouch
7. Wedding Photo Retouch

📸 Please tell us which service you need and send your photo/sample if available.

We’ll review your requirements and get back to you shortly. 😊`,

placeholderText = "Type your message..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorMessage, setVisitorMessage] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Simulated typing effect when the widget opens
  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowWelcomeMessage(true);
      }, 1200); // 1.2 seconds typing delay
      return () => clearTimeout(timer);
    } else {
      setShowWelcomeMessage(false);
      setIsTyping(false);
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!visitorMessage.trim()) return;

    // Encode visitor message for WhatsApp URL
    const encodedMessage = encodeURIComponent(visitorMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Opens WhatsApp in a new tab with the pre-filled message
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setVisitorMessage(""); // Clear input field after sending
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window Interface */}
      {isOpen && (
        <div className="w-[325px] sm:w-[325px] h-[430px] bg-[#efeae2] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Chat Header */}
          <div className="bg-[#075e54] p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              {/* Profile Icon / Logo Initials */}
              <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg text-white select-none">
                {adminName.charAt(0)}
                {/* Active Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075e54]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">{adminName}</h4>
                <p className="text-xs text-emerald-200">Online</p>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition duration-200"
              aria-label="Close Chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-start bg-white text-gray-500 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 max-w-[80%] border border-gray-100">
                <span className="text-gray-400">typing</span>
                <span className="flex gap-1 items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}

            {/* Welcome Message Bubble */}
            {showWelcomeMessage && (
              <div className="self-start bg-white text-black text-sm px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative border border-gray-100">
                <p className="whitespace-pre-line leading-relaxed">{welcomeMessage}</p>
                <span className="text-[9px] text-gray-400 block text-right mt-1.5 select-none">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
            
          </div>

          {/* Chat Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#f0f2f5] border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={visitorMessage}
              onChange={(e) => setVisitorMessage(e.target.value)}
              placeholder={placeholderText}
              className="flex-1 py-2.5 px-4 bg-white rounded-full text-black text-sm focus:outline-none border border-gray-200"
            />
            <button
              type="submit"
              disabled={!visitorMessage.trim()}
              className="w-10 h-10 bg-[#075e54] hover:bg-[#128c7e] text-white rounded-full flex items-center justify-center transition duration-200 shrink-0 disabled:opacity-50"
              aria-label="Send message"
            >
              <svg className="w-5 h-5 transform rotate-90 translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <FaWhatsapp className="w-8 h-8 text-white animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppChatWidget;