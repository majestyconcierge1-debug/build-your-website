import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WhatsAppButton = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const defaultMessage = language === 'fr'
    ? "Bonjour, je souhaite plus d'informations sur vos services de conciergerie et immobilier."
    : "Hello, I would like more information about your concierge and real estate services.";

  const handleSend = () => {
    const textToSend = message.trim() || defaultMessage;
    const whatsappUrl = `https://wa.me/15052212757?text=${encodeURIComponent(textToSend)}`;
    window.open(whatsappUrl, '_blank');
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border shadow-2xl animate-fade-in">
          {/* Header */}
          <div className="bg-[#25D366] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Majesty Concierge</p>
                <p className="text-white/80 text-xs">
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] min-h-[200px]">
            {/* Welcome Message */}
            <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm">
                {language === 'fr' 
                  ? "Bonjour ! 👋 Comment pouvons-nous vous aider aujourd'hui ? Posez-nous vos questions sur nos services de conciergerie et immobilier de luxe."
                  : "Hello! 👋 How can we help you today? Ask us about our luxury concierge and real estate services."}
              </p>
              <p className="text-gray-500 text-xs mt-2 text-right">
                {new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-card border-t border-border">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={language === 'fr' ? "Écrivez votre message..." : "Type your message..."}
                className="flex-1 bg-background text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
              />
              <Button
                onClick={handleSend}
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {language === 'fr' 
                ? "Vous serez redirigé vers WhatsApp"
                : "You will be redirected to WhatsApp"}
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default WhatsAppButton;
