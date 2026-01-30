import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing the banner
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookieConsent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-card border-t border-border shadow-2xl animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <h3 className="font-display text-lg mb-2">
              {language === 'fr' ? "🍪 Gestion des Cookies" : "🍪 Cookie Management"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'fr' 
                ? "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies conformément au RGPD."
                : "We use cookies to enhance your experience. By continuing, you accept our use of cookies in accordance with GDPR."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="luxury-outline" size="sm" onClick={acceptEssential}>
              {language === 'fr' ? "Essentiels uniquement" : "Essential only"}
            </Button>
            <Button variant="luxury" size="sm" onClick={acceptAll}>
              {language === 'fr' ? "Tout accepter" : "Accept all"}
            </Button>
          </div>
          <button 
            onClick={acceptEssential}
            className="absolute top-4 right-4 md:static text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
