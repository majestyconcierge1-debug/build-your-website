import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    title: { en: "Exclusive Properties", fr: "Propriétés Exclusives" },
  },
  {
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80",
    title: { en: "Luxury Yachts", fr: "Yachts de Luxe" },
  },
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80",
    title: { en: "Premium Limousines", fr: "Limousines Premium" },
  },
  {
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1920&q=80",
    title: { en: "Ski Resorts", fr: "Stations de Ski" },
  },
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    title: { en: "Luxury Weddings", fr: "Mariages de Luxe" },
  },
  {
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80",
    title: { en: "Wine Experiences", fr: "Expériences Vinicoles" },
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title[language]}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/50 to-midnight/90" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 text-accent tracking-[0.4em] text-xs font-medium uppercase">
            <span className="w-12 h-px bg-accent" />
            Majesty Concierge
            <span className="w-12 h-px bg-accent" />
          </div>

          {/* Title - Always shows "Exclusive Properties" first, then carousel title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight">
            {heroSlides[currentSlide].title[language]}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/properties">
              <Button variant="luxury" size="lg" className="text-base px-8">
                {t.hero.cta}
              </Button>
            </Link>
            <Link to="/concierge">
              <Button variant="luxury-outline" size="lg" className="text-base px-8">
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-8">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="p-3 border border-foreground/20 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 transition-all duration-500 ${
                  index === currentSlide
                    ? "w-12 bg-accent"
                    : "w-6 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-3 border border-foreground/20 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Side Decorations */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden xl:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-accent to-transparent" />
          <span className="text-accent text-xs tracking-widest font-medium" style={{ writingMode: 'vertical-lr' }}>
            MAJESTY CONCIERGE
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-accent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
