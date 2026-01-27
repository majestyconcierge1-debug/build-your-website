import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Globe, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
              alt="Luxury interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-white">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              About Us
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              Majesty Concierge
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A global luxury concierge and real estate company serving discerning clients worldwide.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
                  <span className="w-8 h-px bg-accent" />
                  Our Story
                  <span className="w-8 h-px bg-accent" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
                  Redefining Luxury Service
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Majesty Concierge LLC was founded with a singular vision: to provide unparalleled luxury services to the world's most discerning individuals. Based in the United States, we have expanded our reach to encompass the most coveted destinations across the globe.
                  </p>
                  <p>
                    Our expertise spans from the sun-drenched shores of the French Riviera to the exotic landscapes of Tunisia, and we continue to expand our presence in premium locations worldwide.
                  </p>
                  <p>
                    What sets us apart is our unwavering commitment to discretion, excellence, and personalized service. Every client is unique, and every request is an opportunity for us to exceed expectations.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Luxury villa"
                  className="w-full h-[500px] object-cover luxury-shadow"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6">
                  <div className="font-display text-4xl font-medium">10+</div>
                  <div className="text-sm tracking-wide uppercase">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
                <span className="w-8 h-px bg-accent" />
                Our Presence
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
                Global Operations
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: MapPin,
                  title: "United States",
                  description: "Headquarters in New Mexico, serving clients across North America.",
                },
                {
                  icon: Globe,
                  title: "French Riviera",
                  description: "Cannes, Nice, Monaco, Saint-Tropez, and the entire Côte d'Azur.",
                },
                {
                  icon: Award,
                  title: "Tunisia",
                  description: "Exclusive properties and services in Tunis, Hammamet, and beyond.",
                },
              ].map((location) => (
                <div key={location.title} className="p-8 bg-background border border-border text-center luxury-shadow">
                  <location.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-2xl mb-3">{location.title}</h3>
                  <p className="text-muted-foreground text-sm">{location.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "Excellence", description: "Uncompromising quality in every detail." },
                { icon: Users, title: "Discretion", description: "Your privacy is our top priority." },
                { icon: Globe, title: "Global Reach", description: "Luxury service, wherever you are." },
                { icon: MapPin, title: "Local Expertise", description: "Deep knowledge of every destination." },
              ].map((value) => (
                <div key={value.title} className="text-center space-y-4">
                  <value.icon className="w-8 h-8 text-accent mx-auto" />
                  <h3 className="font-display text-xl">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
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

export default About;
