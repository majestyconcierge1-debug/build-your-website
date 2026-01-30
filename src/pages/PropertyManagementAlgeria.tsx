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
    image: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=1920&q=80",
    title: { en: "Algeria - Mediterranean Pearl", fr: "Algérie - Perle Méditerranéenne" },
    subtitle: { en: "Premium property services", fr: "Services immobiliers premium" },
  },
  {
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&q=80",
    title: { en: "Algiers Excellence", fr: "Excellence d'Alger" },
    subtitle: { en: "Capital city expertise", fr: "Expertise de la capitale" },
  },
  {
    image: "https://images.unsplash.com/photo-1580223530509-849e0ad5eb44?w=1920&q=80",
    title: { en: "Coastal Properties", fr: "Propriétés Côtières" },
    subtitle: { en: "Mediterranean lifestyle", fr: "Style de vie méditerranéen" },
  },
];

const PropertyManagementAlgeria = () => {
  const { language } = useLanguage();

  const services = [
    { icon: Key, title: language === 'fr' ? "Gestion Locative" : "Rental Management", desc: language === 'fr' ? "Gestion complète de vos locations en Algérie avec expertise locale." : "Complete management of your rentals in Algeria with local expertise." },
    { icon: Wrench, title: language === 'fr' ? "Maintenance" : "Property Maintenance", desc: language === 'fr' ? "Entretien professionnel et réactif de vos propriétés." : "Professional and responsive maintenance of your properties." },
    { icon: FileText, title: language === 'fr' ? "Reporting" : "Owner Reporting", desc: language === 'fr' ? "Rapports détaillés sur la performance de vos investissements." : "Detailed reports on the performance of your investments." },
    { icon: Users, title: language === 'fr' ? "Locataires" : "Tenant Management", desc: language === 'fr' ? "Sélection rigoureuse et accompagnement de vos locataires." : "Rigorous selection and support of your tenants." },
    { icon: Building, title: language === 'fr' ? "Conciergerie" : "Concierge Services", desc: language === 'fr' ? "Services de conciergerie de prestige pour vos invités." : "Prestigious concierge services for your guests." },
    { icon: TrendingUp, title: language === 'fr' ? "Valorisation" : "Value Optimization", desc: language === 'fr' ? "Stratégies pour maximiser vos rendements." : "Strategies to maximize your returns." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? "Gestion Immobilière Algérie - Alger | Majesty Concierge" : "Property Management Algeria - Algiers | Majesty Concierge"}</title>
        <meta name="description" content={language === 'fr' ? "Gestion immobilière de luxe en Algérie. Alger, Oran, Constantine. Services premium de gestion locative et conciergerie." : "Luxury property management in Algeria. Algiers, Oran, Constantine. Premium rental management and concierge services."} />
        <meta name="keywords" content="gestion immobilière Algérie, property management Algeria, concierge de prestige Alger, villa management Oran, luxury property Constantine, services immobiliers Algérie" />
        <link rel="canonical" href="https://majestyconcierge.com/property-management/algeria" />
      </Helmet>
      
      <Navbar />
      <main className="pt-20">
        <section className="relative">
          <LuxuryCarousel slides={carouselSlides} language={language} height="h-[70vh]" interval={5000} />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Algérie' : 'Algeria'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {language === 'fr' ? "Gestion Immobilière en Algérie" : "Property Management in Algeria"}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? "Services de gestion immobilière adaptés au marché algérien"
                  : "Property management services tailored to the Algerian market"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                {language === 'fr' ? "Expertise Algérienne" : "Algerian Expertise"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === 'fr' 
                  ? "Majesty Concierge vous accompagne dans la gestion de vos propriétés en Algérie. D'Alger à Oran, en passant par Constantine et Tizi Ouzou, nous offrons des services de gestion immobilière de prestige."
                  : "Majesty Concierge supports you in managing your properties in Algeria. From Algiers to Oran, through Constantine and Tizi Ouzou, we offer prestigious property management services."}
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">
              {language === 'fr' ? "Nos Services en Algérie" : "Our Services in Algeria"}
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
                {["Alger", "Oran", "Constantine", "Tizi Ouzou", "Bejaia", "Boumerdès", "Tlemcen", "Ghardaïa", "Djanet", "Bouira"].map((city) => (
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

export default PropertyManagementAlgeria;
