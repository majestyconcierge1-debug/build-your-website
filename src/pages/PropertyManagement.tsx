import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import LuxuryCarousel from "@/components/LuxuryCarousel";
import { Building, Key, Wrench, FileText } from "lucide-react";

const propertyCarouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
    title: { en: "Premium Property Management", fr: "Gestion Immobilière Premium" },
    subtitle: { en: "Comprehensive solutions", fr: "Solutions complètes" },
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    title: { en: "Luxury Rentals", fr: "Locations de Luxe" },
    subtitle: { en: "Maximize your investment", fr: "Maximisez votre investissement" },
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    title: { en: "Property Maintenance", fr: "Maintenance Immobilière" },
    subtitle: { en: "Expert care for your assets", fr: "Entretien expert de vos biens" },
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    title: { en: "Owner Services", fr: "Services Propriétaires" },
    subtitle: { en: "Complete transparency", fr: "Transparence totale" },
  },
];

const serviceImages = {
  rentalManagement: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  maintenance: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  ownerReporting: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  conciergeServices: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
};

const PropertyManagement = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Key,
      title: t.propertyManagementPage.rentalManagement,
      description: t.propertyManagementPage.rentalManagementDesc,
      image: serviceImages.rentalManagement,
    },
    {
      icon: Wrench,
      title: t.propertyManagementPage.maintenance,
      description: t.propertyManagementPage.maintenanceDesc,
      image: serviceImages.maintenance,
    },
    {
      icon: FileText,
      title: t.propertyManagementPage.ownerReporting,
      description: t.propertyManagementPage.ownerReportingDesc,
      image: serviceImages.ownerReporting,
    },
    {
      icon: Building,
      title: t.propertyManagementPage.conciergeServices,
      description: t.propertyManagementPage.conciergeServicesDesc,
      image: serviceImages.conciergeServices,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="relative">
          <LuxuryCarousel
            slides={propertyCarouselSlides}
            language={language}
            height="h-[70vh]"
            interval={4500}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Services' : 'Services'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t.propertyManagementPage.title}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {t.propertyManagementPage.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid with Images */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card border border-border overflow-hidden hover:border-accent/50 transition-colors duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagement;
