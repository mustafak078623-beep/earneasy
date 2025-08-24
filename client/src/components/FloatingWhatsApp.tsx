import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = '+1234567890'; // Replace with actual support number
    const message = 'Hello! I need help with EarnEasy Pro.';
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-20 right-4 z-30">
      <button 
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 animate-float"
        data-testid="button-whatsapp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
