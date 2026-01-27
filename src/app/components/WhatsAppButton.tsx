import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (in international format without + or -)
    const phoneNumber = '972501234567';
    // Default message that will appear in WhatsApp
    const message = 'שלום! אשמח לשמוע עוד על איך הפלטפורמה שלכם יכולה לעזור למשפחה שלנו להתחבר 💜';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 group">
      {/* Pulsing rings */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-50"></div>
      
      {/* Main button */}
      <button
        onClick={handleWhatsAppClick}
        className="relative bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-5 shadow-2xl transition-all hover:scale-110 active:scale-95"
        aria-label="שלחו לנו הודעה"
      >
        <MessageCircle className="w-8 h-8 fill-white" />
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-xs">1</span>
        </div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl">
        💬 נשמח לעזור לכם להתחבר
        <div className="absolute right-full top-1/2 -translate-y-1/2">
          <div className="border-8 border-transparent border-l-gray-900"></div>
        </div>
      </div>
    </div>
  );
}