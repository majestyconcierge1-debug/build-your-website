import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const WhatsAppButton = () => {
  const { language } = useLanguage();
  
  const whatsappNumber = '+33767781026';
  const message = language === 'fr' 
    ? 'Bonjour, je souhaite plus d\'informations sur vos services de conciergerie et immobilier.'
    : 'Hello, I would like more information about your concierge and real estate services.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {language === 'fr' ? 'Contactez-nous sur WhatsApp' : 'Contact us on WhatsApp'}
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

export default WhatsAppButton;
