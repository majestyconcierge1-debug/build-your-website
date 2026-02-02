import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80" alt="Luxury property" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
            <span className="w-8 h-px bg-accent" />
            Majesty Concierge
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">{t.cta.title}</h2>
          <p className="text-lg text-foreground/80">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/contact"><Button variant="luxury" size="lg" className="px-8">{t.cta.button}</Button></Link>
            <Link to="/properties"><Button variant="luxury-outline" size="lg" className="px-8">{t.hero.cta}</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
