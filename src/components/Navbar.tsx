import { Menu, X, ChevronDown, LogIn, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const { t, language } = useLanguage();
  const { user, hasStaffAccess, loading } = useAuth();

  const propertyManagementCountries = [
    { label: "France", href: "/property-management/france" },
    { label: language === 'fr' ? "Italie" : "Italy", href: "/property-management/italy" },
    { label: language === 'fr' ? "Tunisie" : "Tunisia", href: "/property-management/tunisia" },
    { label: language === 'fr' ? "Émirats Arabes Unis" : "United Arab Emirates", href: "/property-management/uae" },
    { label: language === 'fr' ? "Algérie" : "Algeria", href: "/property-management/algeria" },
  ];

  const navLinks = [
    { label: language === 'fr' ? 'Conciergerie' : 'Concierge Services', href: "/" },
    { label: language === 'fr' ? 'Propriétés' : 'Properties', href: "/properties" },
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
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}

            {/* Property Management Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setPropertyDropdownOpen(true)}
              onMouseLeave={() => setPropertyDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide">
                {t.nav.propertyManagement}
                <ChevronDown className={`w-4 h-4 transition-transform ${propertyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {propertyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border shadow-xl animate-fade-in">
                  <Link
                    to="/property-management"
                    className="block px-4 py-3 text-sm text-muted-foreground hover:text-accent hover:bg-secondary/50 transition-colors border-b border-border"
                    onClick={() => setPropertyDropdownOpen(false)}
                  >
                    {language === 'fr' ? 'Tous les Services' : 'All Services'}
                  </Link>
                  {propertyManagementCountries.map((country) => (
                    <Link
                      key={country.href}
                      to={country.href}
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-accent hover:bg-secondary/50 transition-colors"
                      onClick={() => setPropertyDropdownOpen(false)}
                    >
                      {country.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
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
                <Link to="/admin">
                  <Button variant="luxury" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    {language === 'fr' ? 'Tableau de Bord' : 'Dashboard'}
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="luxury-outline" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    {language === 'fr' ? 'Connexion' : 'Login'}
                  </Button>
                </Link>
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
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Property Management with sub-items */}
              <div className="space-y-2">
                <Link
                  to="/property-management"
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors tracking-wide py-2 block"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.propertyManagement}
                </Link>
                <div className="pl-4 space-y-2 border-l border-border">
                  {propertyManagementCountries.map((country) => (
                    <Link
                      key={country.href}
                      to={country.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors block py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {country.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(2).map((link) => (
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
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="luxury" className="w-full gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        {language === 'fr' ? 'Tableau de Bord' : 'Dashboard'}
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="luxury-outline" className="w-full gap-2">
                        <LogIn className="w-4 h-4" />
                        {language === 'fr' ? 'Connexion' : 'Login'}
                      </Button>
                    </Link>
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
