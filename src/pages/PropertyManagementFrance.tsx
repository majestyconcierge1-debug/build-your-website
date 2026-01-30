import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import LuxuryCarousel from "@/components/LuxuryCarousel";
import { Building, Key, Wrench, FileText, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    title: { en: "French Riviera Excellence", fr: "Excellence de la Côte d'Azur" },
    subtitle: { en: "Premium property management", fr: "Gestion immobilière premium" },
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    title: { en: "Luxury Villas", fr: "Villas de Luxe" },
    subtitle: { en: "Nice, Cannes, Saint-Tropez", fr: "Nice, Cannes, Saint-Tropez" },
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    title: { en: "Mediterranean Living", fr: "Art de Vivre Méditerranéen" },
    subtitle: { en: "Exceptional properties", fr: "Propriétés d'exception" },
  },
];

const PropertyManagementFrance = () => {
  const { language } = useLanguage();

  const services = [
    { icon: Key, title: language === 'fr' ? "Gestion Locative" : "Rental Management", desc: language === 'fr' ? "Maximisez vos revenus locatifs avec notre expertise locale sur la Côte d'Azur." : "Maximize your rental income with our local expertise on the French Riviera." },
    { icon: Wrench, title: language === 'fr' ? "Maintenance" : "Property Maintenance", desc: language === 'fr' ? "Entretien régulier et interventions d'urgence 24/7 pour votre tranquillité." : "Regular maintenance and 24/7 emergency interventions for your peace of mind." },
    { icon: FileText, title: language === 'fr' ? "Reporting Propriétaire" : "Owner Reporting", desc: language === 'fr' ? "Rapports financiers transparents et détaillés chaque mois." : "Transparent and detailed financial reports every month." },
    { icon: Users, title: language === 'fr' ? "Gestion des Locataires" : "Tenant Management", desc: language === 'fr' ? "Sélection rigoureuse et accompagnement personnalisé de vos locataires." : "Rigorous selection and personalized support for your tenants." },
    { icon: Building, title: language === 'fr' ? "Conciergerie" : "Concierge Services", desc: language === 'fr' ? "Services premium pour vos locataires et invités de prestige." : "Premium services for your tenants and prestigious guests." },
    { icon: TrendingUp, title: language === 'fr' ? "Optimisation" : "Value Optimization", desc: language === 'fr' ? "Stratégies pour augmenter la valeur et le rendement de votre bien." : "Strategies to increase the value and return of your property." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? "Gestion Immobilière France - Côte d'Azur | Majesty Concierge" : "Property Management France - French Riviera | Majesty Concierge"}</title>
        <meta name="description" content={language === 'fr' ? "Gestion immobilière de luxe sur la Côte d'Azur. Nice, Cannes, Saint-Tropez. Services premium de gestion locative, maintenance et conciergerie." : "Luxury property management on the French Riviera. Nice, Cannes, Saint-Tropez. Premium rental management, maintenance and concierge services."} />
        <meta name="keywords" content="gestion immobilière France, property management French Riviera, gestion locative Côte d'Azur, luxury property Nice, villa management Cannes, Saint-Tropez property services" />
        <link rel="canonical" href="https://majestyconcierge.com/property-management/france" />
      </Helmet>
      
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative">
          <LuxuryCarousel slides={carouselSlides} language={language} height="h-[70vh]" interval={5000} />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                France
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {language === 'fr' ? "Gestion Immobilière en France" : "Property Management in France"}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? "Services de gestion immobilière de luxe adaptés à vos actifs sur la Côte d'Azur"
                  : "Luxury property management services tailored to your assets on the French Riviera"}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {language === 'fr' ? "Votre Partenaire de Confiance sur la Côte d'Azur" : "Your Trusted Partner on the French Riviera"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {language === 'fr' 
                  ? "Majesty Concierge est votre expert en gestion immobilière de prestige sur la Côte d'Azur. De Nice à Saint-Tropez, en passant par Cannes et Monaco, nous gérons vos propriétés avec discrétion, excellence et professionnalisme."
                  : "Majesty Concierge is your expert in prestigious property management on the French Riviera. From Nice to Saint-Tropez, through Cannes and Monaco, we manage your properties with discretion, excellence and professionalism."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === 'fr'
                  ? "Notre connaissance approfondie du marché local, combinée à des standards internationaux de qualité, garantit une valorisation optimale de vos actifs immobiliers."
                  : "Our in-depth knowledge of the local market, combined with international quality standards, ensures optimal enhancement of your real estate assets."}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">
              {language === 'fr' ? "Nos Services en France" : "Our Services in France"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="bg-card p-8 border border-border hover:border-accent/50 transition-colors">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {language === 'fr' ? "Zones Couvertes" : "Areas We Cover"}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["Nice", "Cannes", "Saint-Tropez", "Monaco", "Antibes", "Villefranche-sur-Mer", "Saint-Paul-de-Vence", "Fréjus"].map((city) => (
                  <span key={city} className="px-4 py-2 bg-card border border-border text-sm">
                    {city}
                  </span>
                ))}
              </div>
              <Link to="/contact">
                <Button variant="luxury" size="lg">
                  {language === 'fr' ? "Contactez-Nous" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagementFrance;
