import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import LuxuryCarousel from "@/components/LuxuryCarousel";
import { UserCheck, Calendar, Plane, Briefcase } from "lucide-react";

const conciergeCarouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    title: { en: "Luxury Wedding Ceremonies", fr: "Cérémonies de Mariage de Luxe" },
    subtitle: { en: "Exclusive château celebrations", fr: "Célébrations exclusives en château" },
  },
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    title: { en: "VIP Hotel Services", fr: "Services Hôteliers VIP" },
    subtitle: { en: "Premium welcome experience", fr: "Expérience d'accueil premium" },
  },
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80",
    title: { en: "Limousine Services", fr: "Services Limousine" },
    subtitle: { en: "Travel in ultimate luxury", fr: "Voyagez dans le luxe absolu" },
  },
  {
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80",
    title: { en: "Luxury Wine Experiences", fr: "Expériences Vinicoles de Luxe" },
    subtitle: { en: "Private tastings & tours", fr: "Dégustations & visites privées" },
  },
  {
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80",
    title: { en: "Yacht Rentals", fr: "Location de Yachts" },
    subtitle: { en: "Explore the seas in style", fr: "Explorez les mers avec style" },
  },
  {
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80",
    title: { en: "Helicopter Services", fr: "Services Hélicoptère" },
    subtitle: { en: "Aerial luxury transport", fr: "Transport aérien de luxe" },
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    title: { en: "Premium Cleaning", fr: "Nettoyage Premium" },
    subtitle: { en: "Luxury home care", fr: "Entretien résidentiel de luxe" },
  },
  {
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
    title: { en: "Personal Training", fr: "Coaching Personnel" },
    subtitle: { en: "Elite fitness services", fr: "Services fitness d'élite" },
  },
  {
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920&q=80",
    title: { en: "Sports Events", fr: "Événements Sportifs" },
    subtitle: { en: "VIP access to major events", fr: "Accès VIP aux grands événements" },
  },
];

const serviceImages = {
  privateConcierge: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  lifestyle: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
  travel: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  corporate: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
};

const Concierge = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: UserCheck,
      title: t.conciergePage.privateConcierge,
      description: t.conciergePage.privateConciergeDesc,
      image: serviceImages.privateConcierge,
    },
    {
      icon: Calendar,
      title: t.conciergePage.lifestyle,
      description: t.conciergePage.lifestyleDesc,
      image: serviceImages.lifestyle,
    },
    {
      icon: Plane,
      title: t.conciergePage.travel,
      description: t.conciergePage.travelDesc,
      image: serviceImages.travel,
    },
    {
      icon: Briefcase,
      title: t.conciergePage.corporate,
      description: t.conciergePage.corporateDesc,
      image: serviceImages.corporate,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="relative">
          <LuxuryCarousel
            slides={conciergeCarouselSlides}
            language={language}
            height="h-[70vh]"
            interval={4000}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Conciergerie de Luxe' : 'Luxury Concierge'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t.conciergePage.title}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {t.conciergePage.subtitle}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
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

export default Concierge;
