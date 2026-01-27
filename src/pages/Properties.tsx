import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertySearch from "@/components/PropertySearch";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Square, ArrowRight } from "lucide-react";

interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  city: string;
  price: number;
  status: string;
  property_type: string;
  bedrooms: number;
  size_sqm: number | null;
  images: string[];
  featured: boolean;
}

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      let query = supabase.from("properties").select("*");

      const status = searchParams.get("status");
      const propertyType = searchParams.get("propertyType");
      const city = searchParams.get("city");
      const bedrooms = searchParams.get("bedrooms");
      const maxPrice = searchParams.get("maxPrice");

      if (status && status !== "all" && (status === "for_rent" || status === "for_sale")) {
        query = query.eq("status", status);
      }
      if (propertyType && propertyType !== "all") {
        const validTypes = ["apartment_rent", "apartment_sale", "cannes_congress", "penthouse", "villa_rent", "villa_sale"] as const;
        if (validTypes.includes(propertyType as typeof validTypes[number])) {
          query = query.eq("property_type", propertyType as typeof validTypes[number]);
        }
      }
      if (city && city !== "all") {
        query = query.ilike("city", `%${city}%`);
      }
      if (bedrooms && bedrooms !== "any") {
        query = query.gte("bedrooms", parseInt(bedrooms));
      }
      if (maxPrice) {
        query = query.lte("price", parseFloat(maxPrice));
      }

      query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });

      const { data, error } = await query;

      if (!error && data) {
        setProperties(data);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [searchParams]);

  const formatPrice = (price: number, status: string) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
    return status === "for_rent" ? `${formatted}/month` : formatted;
  };

  const formatPropertyType = (type: string) => {
    const types: Record<string, string> = {
      apartment_rent: "Apartment",
      apartment_sale: "Apartment",
      cannes_congress: "Cannes Congress",
      penthouse: "Penthouse",
      villa_rent: "Villa",
      villa_sale: "Villa",
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
              alt="Luxury property"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-white">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              Exclusive Listings
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              Luxury Properties
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover exceptional properties on the French Riviera, Tunisia, and beyond.
            </p>
          </div>
        </section>

        {/* Search */}
        <PropertySearch />

        {/* Properties Grid */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading properties...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="font-display text-2xl mb-4">No Properties Found</h3>
                <p className="text-muted-foreground mb-8">
                  We couldn't find any properties matching your criteria. Please try adjusting your filters or contact us for personalized assistance.
                </p>
                <Link to="/contact">
                  <Button variant="luxury">Contact Us</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-muted-foreground">
                    {properties.length} {properties.length === 1 ? "property" : "properties"} found
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="group bg-card border border-border overflow-hidden luxury-shadow hover:luxury-shadow-lg transition-all duration-500"
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={property.images[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wide">
                            {property.status === "for_rent" ? "For Rent" : "For Sale"}
                          </span>
                        </div>
                        {property.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-foreground text-background text-xs font-medium uppercase tracking-wide">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <p className="text-accent text-sm font-medium uppercase tracking-wide mb-1">
                            {formatPropertyType(property.property_type)}
                          </p>
                          <h3 className="font-display text-xl line-clamp-1">
                            {property.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{property.city}, {property.location}</span>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-muted-foreground" />
                            <span>{property.bedrooms} Beds</span>
                          </div>
                          {property.size_sqm && (
                            <div className="flex items-center gap-2">
                              <Square className="w-4 h-4 text-muted-foreground" />
                              <span>{property.size_sqm} m²</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <span className="font-display text-xl text-accent">
                            {formatPrice(property.price, property.status)}
                          </span>
                          <Link to={`/properties/${property.id}`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                              Details
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
