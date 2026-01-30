import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import LuxuryCarousel from "@/components/LuxuryCarousel";
import { Paintbrush, Hammer, Home, Sparkles } from "lucide-react";

const decorationCarouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    title: { en: "Modern Interior Design", fr: "Design Intérieur Moderne" },
    subtitle: { en: "Elegant living spaces", fr: "Espaces de vie élégants" },
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
    title: { en: "Luxury Renovations", fr: "Rénovations de Luxe" },
    subtitle: { en: "Complete transformations", fr: "Transformations complètes" },
  },
  {
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80",
    title: { en: "Premium Finishes", fr: "Finitions Premium" },
    subtitle: { en: "Attention to every detail", fr: "Attention à chaque détail" },
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80",
    title: { en: "Before & After", fr: "Avant & Après" },
    subtitle: { en: "Stunning transformations", fr: "Transformations saisissantes" },
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    title: { en: "Luxury Painting", fr: "Peinture de Luxe" },
    subtitle: { en: "Expert color consulting", fr: "Conseils couleurs experts" },
  },
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
    title: { en: "Kitchen Design", fr: "Design Cuisine" },
    subtitle: { en: "Gourmet kitchen spaces", fr: "Espaces cuisine gastronomique" },
  },
];

const serviceImages = {
  interiorDesign: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  renovation: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  turnkey: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  luxuryFinishes: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
};

const Decoration = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Paintbrush,
      title: t.decorationPage.interiorDesign,
      description: t.decorationPage.interiorDesignDesc,
      image: serviceImages.interiorDesign,
    },
    {
      icon: Hammer,
      title: t.decorationPage.renovation,
      description: t.decorationPage.renovationDesc,
      image: serviceImages.renovation,
    },
    {
      icon: Home,
      title: t.decorationPage.turnkey,
      description: t.decorationPage.turnkeyDesc,
      image: serviceImages.turnkey,
    },
    {
      icon: Sparkles,
      title: t.decorationPage.luxuryFinishes,
      description: t.decorationPage.luxuryFinishesDesc,
      image: serviceImages.luxuryFinishes,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="relative">
          <LuxuryCarousel
            slides={decorationCarouselSlides}
            language={language}
            height="h-[70vh]"
            interval={4500}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Design & Rénovation' : 'Design & Renovation'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t.decorationPage.title}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {t.decorationPage.subtitle}
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

export default Decoration;
