import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Paintbrush, Hammer, Home, Sparkles } from "lucide-react";

const Decoration = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Paintbrush,
      title: t.decorationPage.interiorDesign,
      description: t.decorationPage.interiorDesignDesc,
    },
    {
      icon: Hammer,
      title: t.decorationPage.renovation,
      description: t.decorationPage.renovationDesc,
    },
    {
      icon: Home,
      title: t.decorationPage.turnkey,
      description: t.decorationPage.turnkeyDesc,
    },
    {
      icon: Sparkles,
      title: t.decorationPage.luxuryFinishes,
      description: t.decorationPage.luxuryFinishesDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              alt="Interior Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-midnight/80" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center">
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
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card border border-border p-8 hover:border-accent/50 transition-colors duration-300 group"
                >
                  <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
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
