import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { label: language === 'fr' ? 'Propriétés' : 'Properties', href: "/properties" },
    { label: t.nav.propertyManagement, href: "/property-management" },
    { label: t.nav.decoration, href: "/decoration" },
    { label: t.nav.concierge, href: "/concierge" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const services = language === 'fr' 
    ? ["Conciergerie Privée", "Voyages de Luxe", "Immobilier", "Gestion Locative", "Services Entreprise"]
    : ["Private Concierge", "Luxury Travel", "Real Estate", "Property Management", "Corporate Services"];

  return (
    <footer className="bg-midnight text-foreground py-20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-display text-3xl font-medium tracking-wide text-accent">
                Majesty
              </span>
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Concierge
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.footer.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">{t.footer.services}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {t.footer.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:contact@majestyconcierge.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  contact@majestyconcierge.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="tel:+33767781026"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  +33 7 67 78 10 26
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Majesty Concierge LLC. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              {language === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
