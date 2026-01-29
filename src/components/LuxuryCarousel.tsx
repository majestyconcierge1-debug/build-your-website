import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  image: string;
  title: { en: string; fr: string };
  subtitle?: { en: string; fr: string };
}

interface LuxuryCarouselProps {
  slides: CarouselSlide[];
  language: 'en' | 'fr';
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: string;
  overlay?: boolean;
}

const LuxuryCarousel = ({
  slides,
  language,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  height = "h-[500px]",
  overlay = true,
}: LuxuryCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={`relative ${height} overflow-hidden`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title[language]}
            className="w-full h-full object-cover"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/30 to-transparent" />
          )}
          <div className="absolute bottom-8 left-8 right-8 text-left">
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              {slide.title[language]}
            </h3>
            {slide.subtitle && (
              <p className="text-foreground/80 text-sm md:text-base">
                {slide.subtitle[language]}
              </p>
            )}
          </div>
        </div>
      ))}

      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 border border-foreground/20 bg-midnight/50 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 border border-foreground/20 bg-midnight/50 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-accent"
                  : "w-4 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LuxuryCarousel;
