import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury villa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center text-white space-y-8">
          <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
            <span className="w-8 h-px bg-accent" />
            Start Your Journey
            <span className="w-8 h-px bg-accent" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Experience Luxury Like Never Before
          </h2>
          
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
            Let Majesty Concierge transform your vision into reality. Our team of dedicated professionals is ready to exceed your expectations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/contact">
              <Button variant="luxury" size="xl" className="gap-2 min-w-[200px]">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/properties">
              <Button 
                variant="outline" 
                size="xl" 
                className="min-w-[200px] border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
