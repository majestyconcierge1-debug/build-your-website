import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertySearch from "@/components/PropertySearch";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PropertySearch />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
