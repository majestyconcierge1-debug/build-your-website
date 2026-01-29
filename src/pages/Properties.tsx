import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertySearch from "@/components/PropertySearch";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Square, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  city: string;
  country: string;
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
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      let query = supabase.from("properties").select("*");

      const status = searchParams.get("status");
      const propertyType = searchParams.get("propertyType");
      const country = searchParams.get("country");
      const city = searchParams.get("city");
      const bedrooms = searchParams.get("bedrooms");
      const maxPrice = searchParams.get("maxPrice");

      if (status && status !== "all" && (status === "for_rent" || status === "for_sale")) {
        query = query.eq("status", status);
      }
      if (propertyType && propertyType !== "all") {
        query = query.eq("property_type", propertyType as "apartment_rent" | "apartment_sale" | "penthouse_rent" | "penthouse_sale" | "villa_rent" | "villa_sale" | "riad_rent" | "riad_sale");
      }
      if (country && country !== "all") {
        query = query.ilike("country", `%${country}%`);
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
    return status === "for_rent" ? `${formatted}${t.properties.perMonth}` : formatted;
  };

  const formatPropertyType = (type: string) => {
    const types: Record<string, { en: string; fr: string }> = {
      apartment_rent: { en: "Apartment", fr: "Appartement" },
      apartment_sale: { en: "Apartment", fr: "Appartement" },
      penthouse_rent: { en: "Penthouse", fr: "Penthouse" },
      penthouse_sale: { en: "Penthouse", fr: "Penthouse" },
      villa_rent: { en: "Villa", fr: "Villa" },
      villa_sale: { en: "Villa", fr: "Villa" },
      riad_rent: { en: "Riad", fr: "Riad" },
      riad_sale: { en: "Riad", fr: "Riad" },
    };
    return types[type]?.[language] || type;
  };

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProperty && selectedProperty.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProperty.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProperty && selectedProperty.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length);
    }
  };

  const getWhatsAppUrl = (property: Property) => {
    const message = language === 'fr'
      ? `Bonjour, je suis intéressé(e) par la propriété: ${property.title} à ${property.city}. Pouvez-vous me donner plus d'informations?`
      : `Hello, I am interested in the property: ${property.title} in ${property.city}. Can you give me more information?`;
    return `https://wa.me/33767781026?text=${encodeURIComponent(message)}`;
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
            <div className="absolute inset-0 bg-midnight/80" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-foreground">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              {language === 'fr' ? 'Propriétés Exclusives' : 'Exclusive Listings'}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              {t.properties.title}
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              {t.properties.subtitle}
            </p>
          </div>
        </section>

        {/* Search */}
        <PropertySearch />

        {/* Properties Grid */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t.common.loading}</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="font-display text-2xl mb-4">{t.properties.noResults}</h3>
                <p className="text-muted-foreground mb-8">
                  {language === 'fr' 
                    ? 'Nous n\'avons trouvé aucune propriété correspondant à vos critères. Contactez-nous pour une assistance personnalisée.'
                    : 'We couldn\'t find any properties matching your criteria. Contact us for personalized assistance.'}
                </p>
                <Link to="/contact">
                  <Button variant="luxury">{t.cta.button}</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-muted-foreground">
                    {properties.length} {properties.length === 1 
                      ? (language === 'fr' ? 'propriété trouvée' : 'property found') 
                      : (language === 'fr' ? 'propriétés trouvées' : 'properties found')}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="group bg-card border border-border overflow-hidden luxury-shadow hover:luxury-shadow-lg transition-all duration-500"
                    >
                      {/* Image */}
                      <div 
                        className="relative h-64 overflow-hidden cursor-pointer"
                        onClick={() => openPropertyModal(property)}
                      >
                        <img
                          src={property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wide">
                            {property.status === "for_rent" ? t.search.forRent : t.search.forSale}
                          </span>
                        </div>
                        {property.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-foreground text-background text-xs font-medium uppercase tracking-wide">
                              {t.properties.featured}
                            </span>
                          </div>
                        )}
                        {property.images && property.images.length > 1 && (
                          <div className="absolute bottom-4 right-4">
                            <span className="px-2 py-1 bg-midnight/70 text-white text-xs">
                              {property.images.length} {language === 'fr' ? 'photos' : 'photos'}
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
                          <span>{property.city}, {property.country}</span>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-muted-foreground" />
                            <span>{property.bedrooms} {t.properties.beds}</span>
                          </div>
                          {property.size_sqm && (
                            <div className="flex items-center gap-2">
                              <Square className="w-4 h-4 text-muted-foreground" />
                              <span>{property.size_sqm} {t.properties.sqm}</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-border">
                          <span className="font-display text-xl text-accent block mb-4">
                            {formatPrice(property.price, property.status)}
                          </span>
                          
                          {/* Contact CTAs */}
                          <div className="flex gap-2">
                            <a href="tel:+33767781026" className="flex-1">
                              <Button variant="luxury-outline" size="sm" className="w-full gap-2">
                                <Phone className="w-4 h-4" />
                                {language === 'fr' ? 'Appeler' : 'Call'}
                              </Button>
                            </a>
                            <a href="mailto:majestyconcierge1@gmail.com" className="flex-1">
                              <Button variant="luxury-outline" size="sm" className="w-full gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                              </Button>
                            </a>
                            <a href={getWhatsAppUrl(property)} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Property Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 p-4" onClick={closeModal}>
            <div className="relative max-w-5xl w-full bg-card border border-border max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-midnight/50 hover:bg-midnight text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Gallery */}
              <div className="relative h-[50vh]">
                <img
                  src={selectedProperty.images?.[currentImageIndex] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                {selectedProperty.images && selectedProperty.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-midnight/50 hover:bg-midnight text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-midnight/50 hover:bg-midnight text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProperty.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-accent' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Property Details */}
              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-accent text-sm font-medium uppercase tracking-wide mb-2">
                      {formatPropertyType(selectedProperty.property_type)} • {selectedProperty.status === "for_rent" ? t.search.forRent : t.search.forSale}
                    </p>
                    <h2 className="font-display text-3xl">{selectedProperty.title}</h2>
                    <p className="flex items-center gap-2 text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4" />
                      {selectedProperty.city}, {selectedProperty.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl text-accent">
                      {formatPrice(selectedProperty.price, selectedProperty.status)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-muted-foreground" />
                    <span>{selectedProperty.bedrooms} {t.properties.beds}</span>
                  </div>
                  {selectedProperty.size_sqm && (
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5 text-muted-foreground" />
                      <span>{selectedProperty.size_sqm} {t.properties.sqm}</span>
                    </div>
                  )}
                </div>

                {selectedProperty.description && (
                  <div className="mb-8">
                    <h3 className="font-display text-xl mb-4">{language === 'fr' ? 'Description' : 'Description'}</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProperty.description}</p>
                  </div>
                )}

                {/* Contact CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a href="tel:+33767781026">
                    <Button variant="luxury" size="lg" className="gap-2">
                      <Phone className="w-5 h-5" />
                      {language === 'fr' ? 'Appeler l\'agence' : 'Call Agency'}
                    </Button>
                  </a>
                  <a href="mailto:majestyconcierge1@gmail.com">
                    <Button variant="luxury-outline" size="lg" className="gap-2">
                      <Mail className="w-5 h-5" />
                      {language === 'fr' ? 'Envoyer un Email' : 'Send Email'}
                    </Button>
                  </a>
                  <a href={getWhatsAppUrl(selectedProperty)} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
