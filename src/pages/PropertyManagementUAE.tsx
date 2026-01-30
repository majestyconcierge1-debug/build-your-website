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
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    title: { en: "Dubai Excellence", fr: "Excellence de Dubai" },
    subtitle: { en: "World-class property management", fr: "Gestion immobilière de classe mondiale" },
  },
  {
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
    title: { en: "Abu Dhabi Luxury", fr: "Luxe d'Abu Dhabi" },
    subtitle: { en: "Premium investment services", fr: "Services d'investissement premium" },
  },
  {
    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1920&q=80",
    title: { en: "UAE Property Excellence", fr: "Excellence Immobilière aux EAU" },
    subtitle: { en: "International standards", fr: "Standards internationaux" },
  },
];

const PropertyManagementUAE = () => {
  const { language } = useLanguage();

  const services = [
    { icon: Key, title: language === 'fr' ? "Gestion Locative" : "Rental Management", desc: language === 'fr' ? "Maximisez vos revenus à Dubai et Abu Dhabi avec notre expertise locale." : "Maximize your income in Dubai and Abu Dhabi with our local expertise." },
    { icon: Wrench, title: language === 'fr' ? "Maintenance" : "Property Maintenance", desc: language === 'fr' ? "Maintenance professionnelle aux standards les plus élevés." : "Professional maintenance to the highest standards." },
    { icon: FileText, title: language === 'fr' ? "Reporting" : "Owner Reporting", desc: language === 'fr' ? "Rapports financiers complets et analyse de performance." : "Comprehensive financial reports and performance analysis." },
    { icon: Users, title: language === 'fr' ? "Locataires" : "Tenant Management", desc: language === 'fr' ? "Gestion professionnelle et sélection rigoureuse des locataires." : "Professional management and rigorous tenant selection." },
    { icon: Building, title: language === 'fr' ? "Conciergerie VIP" : "VIP Concierge", desc: language === 'fr' ? "Services de conciergerie VIP pour une clientèle exigeante." : "VIP concierge services for a demanding clientele." },
    { icon: TrendingUp, title: language === 'fr' ? "Investissement" : "Investment Advisory", desc: language === 'fr' ? "Conseils stratégiques pour optimiser vos investissements." : "Strategic advice to optimize your investments." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? "Gestion Immobilière Émirats Arabes Unis - Dubai | Majesty Concierge" : "Property Management UAE - Dubai | Majesty Concierge"}</title>
        <meta name="description" content={language === 'fr' ? "Gestion immobilière de luxe aux Émirats Arabes Unis. Dubai, Abu Dhabi. Services VIP de gestion locative et conciergerie." : "Luxury property management in the United Arab Emirates. Dubai, Abu Dhabi. VIP rental management and concierge services."} />
        <meta name="keywords" content="property management UAE, property management Dubai, luxury concierge Dubai, villa management Abu Dhabi, real estate services UAE, VIP concierge Emirates" />
        <link rel="canonical" href="https://majestyconcierge.com/property-management/uae" />
      </Helmet>
      
      <Navbar />
      <main className="pt-20">
        <section className="relative">
          <LuxuryCarousel slides={carouselSlides} language={language} height="h-[70vh]" interval={5000} />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Émirats Arabes Unis' : 'United Arab Emirates'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {language === 'fr' ? "Gestion Immobilière aux EAU" : "Property Management in UAE"}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? "Services de gestion immobilière de classe mondiale à Dubai et Abu Dhabi"
                  : "World-class property management services in Dubai and Abu Dhabi"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {language === 'fr' ? "Excellence aux Émirats" : "Excellence in the Emirates"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === 'fr' 
                  ? "Majesty Concierge offre des services de gestion immobilière premium aux Émirats Arabes Unis. Notre équipe expérimentée à Dubai et Abu Dhabi garantit une gestion irréprochable de vos investissements."
                  : "Majesty Concierge offers premium property management services in the United Arab Emirates. Our experienced team in Dubai and Abu Dhabi ensures impeccable management of your investments."}
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">
              {language === 'fr' ? "Nos Services aux EAU" : "Our Services in UAE"}
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
                {["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"].map((city) => (
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

export default PropertyManagementUAE;
