import { Sparkles, Plane, Home, Building, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Sparkles,
    title: "Private Concierge",
    description: "Personalized assistance for every aspect of your lifestyle, from reservations to event planning.",
  },
  {
    icon: Plane,
    title: "Luxury Travel",
    description: "Exclusive travel experiences including private jets, yachts, and bespoke itineraries.",
  },
  {
    icon: Home,
    title: "Real Estate Services",
    description: "Access to the finest properties on the French Riviera, Tunisia, and worldwide.",
  },
  {
    icon: Building,
    title: "Property Management",
    description: "Complete property oversight ensuring your investment is maintained to the highest standards.",
  },
  {
    icon: Briefcase,
    title: "Corporate Services",
    description: "Tailored solutions for businesses, from executive travel to corporate events.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
            <span className="w-8 h-px bg-accent" />
            What We Offer
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
            Our Premium Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience unparalleled luxury with our comprehensive range of bespoke services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 bg-card border border-border hover:border-accent transition-all duration-500 luxury-shadow hover:luxury-shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center border border-accent/30 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="font-display text-xl md:text-2xl mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link 
            to="/services"
            className="inline-flex items-center gap-2 text-accent hover:text-gold-dark transition-colors tracking-wide uppercase text-sm font-medium"
          >
            Explore All Services
            <span className="w-8 h-px bg-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
