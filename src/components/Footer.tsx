import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Facebook, Instagram, Youtube } from "lucide-react";

// TikTok icon (not in lucide-react)
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

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

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: TikTokIcon, href: "#", label: "TikTok" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-purple text-foreground py-20">
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
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {typeof social.icon === 'function' && social.label === 'TikTok' ? (
                    <TikTokIcon />
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
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
                  href="mailto:majestyconcierge1@gmail.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  majestyconcierge1@gmail.com
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
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
