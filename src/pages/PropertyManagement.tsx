import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Key, 
  Sparkles, 
  Wrench, 
  Shield, 
  Headphones, 
  ChefHat, 
  PartyPopper,
  Clock,
  Eye,
  Bell,
  Users,
  Calculator,
  Mail,
  Zap,
  Waves,
  Hammer,
  Paintbrush
} from "lucide-react";

const PropertyManagement = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: Leaf,
      title: { en: "Gardening & Landscaping", fr: "Jardinage & Aménagement Paysager" },
      description: {
        en: "Professional landscaping and garden maintenance to keep your property's exterior immaculate year-round.",
        fr: "Aménagement paysager professionnel et entretien de jardins pour garder votre extérieur impeccable toute l'année."
      },
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80"
    },
    {
      icon: Key,
      title: { en: "Rental Management", fr: "Gestion Locative" },
      description: {
        en: "Complete rental management including tenant screening, lease management, and rent collection for optimal returns.",
        fr: "Gestion locative complète incluant sélection des locataires, gestion des baux et perception des loyers."
      },
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
    },
    {
      icon: Sparkles,
      title: { en: "Cleaning & Housekeeping", fr: "Nettoyage & Entretien Ménager" },
      description: {
        en: "Premium cleaning services with attention to every detail, ensuring your property is always guest-ready.",
        fr: "Services de nettoyage premium avec attention à chaque détail pour une propriété toujours prête."
      },
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80"
    },
    {
      icon: Wrench,
      title: { en: "Maintenance & Repairs", fr: "Maintenance & Réparations" },
      description: {
        en: "Proactive maintenance and rapid response repairs by trusted professionals to protect your investment.",
        fr: "Maintenance proactive et réparations rapides par des professionnels de confiance pour protéger votre investissement."
      },
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80"
    },
    {
      icon: Shield,
      title: { en: "Security Services", fr: "Services de Sécurité" },
      description: {
        en: "Comprehensive security solutions including surveillance, access control, and emergency response protocols.",
        fr: "Solutions de sécurité complètes incluant surveillance, contrôle d'accès et protocoles d'urgence."
      },
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80"
    },
    {
      icon: Headphones,
      title: { en: "Concierge Services", fr: "Services de Conciergerie" },
      description: {
        en: "Personalized concierge services for guests including reservations, transportation, and local recommendations.",
        fr: "Services de conciergerie personnalisés incluant réservations, transport et recommandations locales."
      },
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
    },
    {
      icon: ChefHat,
      title: { en: "Private Cooking", fr: "Chef Privé" },
      description: {
        en: "Access to private chefs for intimate dinners, events, or regular meal preparation in your property.",
        fr: "Accès à des chefs privés pour dîners intimes, événements ou préparation de repas réguliers."
      },
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
    },
    {
      icon: PartyPopper,
      title: { en: "Private Event Management", fr: "Gestion d'Événements Privés" },
      description: {
        en: "Full event planning and coordination for celebrations, corporate gatherings, and special occasions.",
        fr: "Planification et coordination complète d'événements pour célébrations et occasions spéciales."
      },
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80"
    },
    {
      icon: Clock,
      title: { en: "24/7 Assistance", fr: "Assistance 24/7" },
      description: {
        en: "Round-the-clock support for any emergency or request, ensuring peace of mind at all times.",
        fr: "Support 24h/24 pour toute urgence ou demande, garantissant une tranquillité d'esprit permanente."
      },
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80"
    },
    {
      icon: Eye,
      title: { en: "Weekly Inspections", fr: "Inspections Hebdomadaires" },
      description: {
        en: "Regular property inspections with detailed reports and photos to keep you informed of your asset's condition.",
        fr: "Inspections régulières avec rapports détaillés et photos pour vous tenir informé de l'état de votre bien."
      },
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
    },
    {
      icon: Bell,
      title: { en: "Alarm System Management", fr: "Gestion Systèmes d'Alarme" },
      description: {
        en: "Complete alarm system monitoring, maintenance, and rapid response coordination for maximum security.",
        fr: "Surveillance complète des systèmes d'alarme, maintenance et coordination de réponse rapide."
      },
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80"
    },
    {
      icon: Users,
      title: { en: "Staff & Tradesmen Management", fr: "Gestion du Personnel" },
      description: {
        en: "Hiring, training, and supervision of household staff and coordination with trusted contractors.",
        fr: "Recrutement, formation et supervision du personnel de maison et coordination avec les artisans."
      },
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80"
    },
    {
      icon: Calculator,
      title: { en: "Accountancy & Administration", fr: "Comptabilité & Administration" },
      description: {
        en: "Financial management including expense tracking, tax documentation, and transparent monthly reporting.",
        fr: "Gestion financière incluant suivi des dépenses, documentation fiscale et rapports mensuels transparents."
      },
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
    },
    {
      icon: Mail,
      title: { en: "Mailbox & Parcel Reception", fr: "Réception Courrier & Colis" },
      description: {
        en: "Secure mail and package handling, forwarding, and inventory management during your absence.",
        fr: "Gestion sécurisée du courrier et des colis, transfert et inventaire pendant votre absence."
      },
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&q=80"
    },
    {
      icon: Zap,
      title: { en: "Utilities & Installations", fr: "Utilitaires & Installations" },
      description: {
        en: "Management of all utility contracts, meter readings, and coordination with service providers.",
        fr: "Gestion de tous les contrats utilitaires, relevés de compteurs et coordination avec les prestataires."
      },
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
    },
    {
      icon: Waves,
      title: { en: "Pool & Exterior Upkeep", fr: "Piscine & Extérieurs" },
      description: {
        en: "Swimming pool maintenance, terrace care, and exterior space management for year-round enjoyment.",
        fr: "Entretien piscine, soin des terrasses et gestion des espaces extérieurs pour un plaisir toute l'année."
      },
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
    },
    {
      icon: Hammer,
      title: { en: "Repairs & Renovation", fr: "Réparations & Rénovation" },
      description: {
        en: "From minor repairs to major renovations, we coordinate all work to maintain your property's excellence.",
        fr: "Des petites réparations aux grandes rénovations, nous coordonnons tous les travaux."
      },
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80"
    },
    {
      icon: Paintbrush,
      title: { en: "Interior Decoration", fr: "Décoration Intérieure" },
      description: {
        en: "Expert interior design and decoration services to enhance your property's aesthetic and market value.",
        fr: "Services de design et décoration intérieure pour améliorer l'esthétique et la valeur de votre propriété."
      },
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
    },
  ];

  const countries = [
    { 
      name: { en: "France", fr: "France" }, 
      path: "/property-management/france",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"
    },
    { 
      name: { en: "Italy", fr: "Italie" }, 
      path: "/property-management/italy",
      image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=400&q=80"
    },
    { 
      name: { en: "Tunisia", fr: "Tunisie" }, 
      path: "/property-management/tunisia",
      image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=400&q=80"
    },
    { 
      name: { en: "United Arab Emirates", fr: "Émirats Arabes Unis" }, 
      path: "/property-management/uae",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"
    },
    { 
      name: { en: "Algeria", fr: "Algérie" }, 
      path: "/property-management/algeria",
      image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400&q=80"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? 'Gestion de Propriétés de Luxe | Majesty Concierge' : 'Luxury Property Management | Majesty Concierge'}</title>
        <meta name="description" content={language === 'fr' 
          ? 'Services complets de gestion immobilière de luxe. Maintenance, conciergerie, sécurité et plus pour votre propriété.'
          : 'Complete luxury property management services. Maintenance, concierge, security and more for your property.'} 
        />
      </Helmet>

      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
              alt="Luxury Property Management"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-purple/70" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-foreground">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              {language === 'fr' ? 'Services' : 'Services'}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              {language === 'fr' ? 'Gestion de Propriétés' : 'Property Management'}
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Solutions complètes de gestion pour vos actifs immobiliers de luxe à travers le monde.'
                : 'Complete management solutions for your luxury real estate assets worldwide.'}
            </p>
          </div>
        </section>

        {/* Country Links */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl mb-4">
                {language === 'fr' ? 'Nos Destinations' : 'Our Destinations'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'fr' 
                  ? 'Découvrez nos services de gestion dans chaque pays.'
                  : 'Discover our management services in each country.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {countries.map((country) => (
                <Link
                  key={country.path}
                  to={country.path}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="w-48 h-32 relative">
                    <img
                      src={country.image}
                      alt={country.name[language]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-purple/50 group-hover:bg-purple/70 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-foreground font-display text-lg">{country.name[language]}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Services Grid */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-4">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Nos Services' : 'Our Services'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-4">
                {language === 'fr' ? 'Services Complets' : 'Comprehensive Services'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Tous les services dont vous avez besoin pour gérer votre propriété de luxe en toute sérénité.'
                  : 'All the services you need to manage your luxury property with complete peace of mind.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 bg-accent/20 backdrop-blur-sm flex items-center justify-center rounded">
                        <service.icon className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg mb-2">{service.title[language]}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-purple text-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              {language === 'fr' ? 'Confiez-nous Votre Propriété' : 'Trust Us With Your Property'}
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto mb-8">
              {language === 'fr'
                ? 'Contactez-nous pour découvrir comment nous pouvons gérer votre bien avec excellence.'
                : 'Contact us to discover how we can manage your property with excellence.'}
            </p>
            <Link to="/contact">
              <Button variant="luxury" size="xl">
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagement;