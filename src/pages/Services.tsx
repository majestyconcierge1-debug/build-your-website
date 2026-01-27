import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Plane, 
  Home, 
  Building, 
  Briefcase, 
  Car, 
  Utensils, 
  Calendar,
  Shield,
  Users
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Private Concierge",
    description: "Your personal gateway to a world of exclusive experiences. From last-minute reservations at Michelin-starred restaurants to securing front-row seats at sold-out events, we make the impossible possible.",
    features: ["24/7 Personal Assistant", "VIP Access & Reservations", "Personal Shopping", "Event Planning"],
  },
  {
    icon: Plane,
    title: "Luxury Travel",
    description: "Experience travel redefined. We curate bespoke journeys that transform destinations into unforgettable memories, with every detail meticulously planned to your preferences.",
    features: ["Private Jet Charters", "Yacht Rentals", "Helicopter Transfers", "Luxury Accommodations"],
  },
  {
    icon: Home,
    title: "Real Estate Services",
    description: "Access an exclusive portfolio of the world's most prestigious properties. Whether you're seeking a seasonal villa on the Riviera or a permanent residence in Monaco, we connect you with exceptional opportunities.",
    features: ["Exclusive Listings", "Property Acquisition", "Rental Services", "Investment Advisory"],
  },
  {
    icon: Building,
    title: "Property Management",
    description: "Your property deserves exceptional care. We provide comprehensive management services ensuring your investment is maintained to the highest standards, even in your absence.",
    features: ["Full Maintenance", "Staff Management", "Rental Management", "Security Services"],
  },
  {
    icon: Briefcase,
    title: "Corporate Services",
    description: "Elevate your business with our tailored corporate solutions. From executive travel to high-profile corporate events, we ensure your company's image reflects the excellence you represent.",
    features: ["Executive Assistance", "Corporate Events", "Business Travel", "Meeting Coordination"],
  },
];

const additionalServices = [
  { icon: Car, title: "Luxury Transportation", description: "Chauffeur services, exotic car rentals, and transfers." },
  { icon: Utensils, title: "Private Dining", description: "Personal chefs, exclusive venues, and catering." },
  { icon: Calendar, title: "Event Management", description: "From intimate gatherings to grand celebrations." },
  { icon: Shield, title: "Security Services", description: "Discrete protection for you and your assets." },
  { icon: Users, title: "Personal Staff", description: "Vetted housekeepers, nannies, and personal assistants." },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
              alt="Luxury resort"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-white">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              What We Offer
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive luxury services tailored to your unique lifestyle.
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="w-16 h-16 flex items-center justify-center border border-accent">
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button variant="luxury-outline">Inquire Now</Button>
                    </Link>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0 ? "1542314831-068cd1dbfeeb" :
                        index === 1 ? "1540962351504-03099e0a754b" :
                        index === 2 ? "1600596542815-ffad4c1539a9" :
                        index === 3 ? "1600607687939-ce8a6c25118c" :
                        "1551882547-ff40c63fe5fa"
                      }?w=800&q=80`}
                      alt={service.title}
                      className="w-full h-[400px] object-cover luxury-shadow"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
                <span className="w-8 h-px bg-accent" />
                And More
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
                Additional Services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {additionalServices.map((service) => (
                <div key={service.title} className="p-6 bg-background border border-border text-center luxury-shadow">
                  <service.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contact us today and let us craft a bespoke experience tailored to your unique needs.
            </p>
            <Link to="/contact">
              <Button variant="luxury" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
