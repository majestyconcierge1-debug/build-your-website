import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();
  const { user, hasStaffAccess, loading } = useAuth();

  const navLinks = [
    { label: language === 'fr' ? 'Conciergerie' : 'Concierge Services', href: "/" },
    { label: language === 'fr' ? 'Propriétés' : 'Properties', href: "/properties" },
    { label: t.nav.propertyManagement, href: "/property-management" },
    { label: t.nav.decoration, href: "/decoration" },
    { label: language === 'fr' ? 'À Propos' : 'About Us', href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-3xl font-medium tracking-wide text-accent">
                Majesty
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase -mt-1">
                Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            {!loading && (
              hasStaffAccess ? (
                <Button asChild variant="luxury" size="sm" className="gap-2">
                  <Link to="/admin">
                    <LayoutDashboard className="w-4 h-4" />
                    {language === 'fr' ? 'Tableau de Bord' : 'Dashboard'}
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="luxury-outline" size="sm" className="gap-2">
                  <Link to="/auth">
                    <LogIn className="w-4 h-4" />
                    {language === 'fr' ? 'Connexion' : 'Login'}
                  </Link>
                </Button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <div className="flex justify-center pb-3">
                  <LanguageSwitcher />
                </div>
                {!loading && (
                  hasStaffAccess ? (
                    <Button
                      asChild
                      variant="luxury"
                      className="w-full gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/admin">
                        <LayoutDashboard className="w-4 h-4" />
                        {language === 'fr' ? 'Tableau de Bord' : 'Dashboard'}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="luxury-outline"
                      className="w-full gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/auth">
                        <LogIn className="w-4 h-4" />
                        {language === 'fr' ? 'Connexion' : 'Login'}
                      </Link>
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
