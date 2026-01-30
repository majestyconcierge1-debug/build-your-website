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
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1920&q=80",
    title: { en: "Italian Riviera", fr: "Riviera Italienne" },
    subtitle: { en: "Exclusive property services", fr: "Services immobiliers exclusifs" },
  },
  {
    image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=1920&q=80",
    title: { en: "Portofino & Cinque Terre", fr: "Portofino & Cinque Terre" },
    subtitle: { en: "Mediterranean excellence", fr: "Excellence méditerranéenne" },
  },
  {
    image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=1920&q=80",
    title: { en: "Luxury Living", fr: "Art de Vivre de Luxe" },
    subtitle: { en: "Italian elegance", fr: "Élégance italienne" },
  },
];

const PropertyManagementItaly = () => {
  const { language } = useLanguage();

  const services = [
    { icon: Key, title: language === 'fr' ? "Gestion Locative" : "Rental Management", desc: language === 'fr' ? "Optimisez vos revenus sur la Riviera italienne avec notre expertise locale." : "Optimize your income on the Italian Riviera with our local expertise." },
    { icon: Wrench, title: language === 'fr' ? "Maintenance" : "Property Maintenance", desc: language === 'fr' ? "Entretien professionnel et réactif de vos propriétés italiennes." : "Professional and responsive maintenance of your Italian properties." },
    { icon: FileText, title: language === 'fr' ? "Reporting" : "Owner Reporting", desc: language === 'fr' ? "Suivi financier détaillé et transparent de vos investissements." : "Detailed and transparent financial tracking of your investments." },
    { icon: Users, title: language === 'fr' ? "Locataires" : "Tenant Management", desc: language === 'fr' ? "Sélection et gestion professionnelle de vos locataires." : "Professional selection and management of your tenants." },
    { icon: Building, title: language === 'fr' ? "Conciergerie" : "Concierge Services", desc: language === 'fr' ? "Services de conciergerie haut de gamme pour vos invités." : "High-end concierge services for your guests." },
    { icon: TrendingUp, title: language === 'fr' ? "Valorisation" : "Value Optimization", desc: language === 'fr' ? "Stratégies pour maximiser la valeur de vos biens." : "Strategies to maximize the value of your properties." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? "Gestion Immobilière Italie - Riviera Italienne | Majesty Concierge" : "Property Management Italy - Italian Riviera | Majesty Concierge"}</title>
        <meta name="description" content={language === 'fr' ? "Gestion immobilière de luxe en Italie. Portofino, San Remo, Cinque Terre. Services premium de gestion locative et conciergerie." : "Luxury property management in Italy. Portofino, San Remo, Cinque Terre. Premium rental management and concierge services."} />
        <meta name="keywords" content="property management Italy, gestione immobiliare Italia, Italian Riviera property, Portofino villa management, luxury property Liguria, servizi concierge di lusso Italia" />
        <link rel="canonical" href="https://majestyconcierge.com/property-management/italy" />
      </Helmet>
      
      <Navbar />
      <main className="pt-20">
        <section className="relative">
          <LuxuryCarousel slides={carouselSlides} language={language} height="h-[70vh]" interval={5000} />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                Italia
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {language === 'fr' ? "Gestion Immobilière en Italie" : "Property Management in Italy"}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? "Services de gestion immobilière de luxe sur la Riviera italienne"
                  : "Luxury property management services on the Italian Riviera"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {language === 'fr' ? "L'Excellence Italienne" : "Italian Excellence"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {language === 'fr' 
                  ? "Majesty Concierge vous accompagne dans la gestion de vos propriétés sur la magnifique Riviera italienne. De Portofino à San Remo, nous offrons des services de gestion immobilière alliant savoir-faire local et standards internationaux."
                  : "Majesty Concierge supports you in managing your properties on the magnificent Italian Riviera. From Portofino to San Remo, we offer property management services combining local expertise and international standards."}
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">
              {language === 'fr' ? "Nos Services en Italie" : "Our Services in Italy"}
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

        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {language === 'fr' ? "Zones Couvertes" : "Areas We Cover"}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["Portofino", "San Remo", "Ventimiglia", "Genova", "Cinque Terre", "Imperia"].map((city) => (
                  <span key={city} className="px-4 py-2 bg-card border border-border text-sm">{city}</span>
                ))}
              </div>
              <Link to="/contact"><Button variant="luxury" size="lg">{language === 'fr' ? "Contactez-Nous" : "Contact Us"}</Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagementItaly;
