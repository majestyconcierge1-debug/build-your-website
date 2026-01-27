import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    alt: "Luxury villa on the French Riviera",
  },
  {
    url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80",
    alt: "Luxury yacht in Mediterranean",
  },
  {
    url: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80",
    alt: "Private jet",
  },
  {
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
    alt: "Luxury hotel suite",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1 transition-all duration-300 ${
              index === currentSlide ? "bg-accent" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
              <span className="w-12 h-px bg-accent" />
              Worldwide Luxury Services
              <span className="w-12 h-px bg-accent" />
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-tight">
              Majesty Concierge
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
              Exceptional concierge and real estate services, tailored to your lifestyle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="luxury" size="xl" className="min-w-[200px]">
              Explore Properties
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="min-w-[200px] border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
