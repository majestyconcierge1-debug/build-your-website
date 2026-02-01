import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertySearch from "@/components/PropertySearch";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import AmenityIcon from "@/components/AmenityIcon";
import { MapPin, Bed, Square, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, X, Heart, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Tables } from "@/integrations/supabase/types";

type Amenity = Tables<"amenities">;

interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  city: string;
  country: string;
  price: number;
  daily_price: number | null;
  weekly_price: number | null;
  monthly_price: number | null;
  status: string;
  property_type: string;
  bedrooms: number;
  size_sqm: number | null;
  images: string[];
  featured_image: string | null;
  featured: boolean;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface PropertyAmenity {
  amenity: Amenity;
}

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyAmenities, setPropertyAmenities] = useState<Record<string, Amenity[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem("property-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

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
        
        // Fetch amenities for all properties
        const propertyIds = data.map(p => p.id);
        if (propertyIds.length > 0) {
          const { data: amenityData } = await supabase
            .from("property_amenities")
            .select("property_id, amenity:amenities(*)")
            .in("property_id", propertyIds);
          
          if (amenityData) {
            const amenitiesByProperty: Record<string, Amenity[]> = {};
            amenityData.forEach((pa: { property_id: string; amenity: Amenity }) => {
              if (!amenitiesByProperty[pa.property_id]) {
                amenitiesByProperty[pa.property_id] = [];
              }
              amenitiesByProperty[pa.property_id].push(pa.amenity);
            });
            setPropertyAmenities(amenitiesByProperty);
          }
        }
      }
      setLoading(false);
    };

    fetchProperties();
  }, [searchParams]);

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(newFavorites);
    localStorage.setItem("property-favorites", JSON.stringify(newFavorites));
  };

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
    if (selectedProperty) {
      const images = selectedProperty.images || [];
      if (images.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }
  };

  const prevImage = () => {
    if (selectedProperty) {
      const images = selectedProperty.images || [];
      if (images.length > 0) {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  const getWhatsAppUrl = (property: Property) => {
    const message = language === 'fr'
      ? `Bonjour, je suis intéressé(e) par la propriété: ${property.title} à ${property.city}. Pouvez-vous me donner plus d'informations?`
      : `Hello, I am interested in the property: ${property.title} in ${property.city}. Can you give me more information?`;
    return `https://wa.me/33767781026?text=${encodeURIComponent(message)}`;
  };

  const getGoogleMapsUrl = (property: Property) => {
    if (property.latitude && property.longitude) {
      return `https://www.google.com/maps?q=${property.latitude},${property.longitude}`;
    }
    if (property.address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.city}, ${property.country}`)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? 'Propriétés de Luxe | Majesty Concierge' : 'Luxury Properties | Majesty Concierge'}</title>
        <meta name="description" content={language === 'fr' 
          ? 'Découvrez notre sélection exclusive de propriétés de luxe à vendre et à louer en France, Italie, Tunisie, EAU et Algérie.'
          : 'Discover our exclusive selection of luxury properties for sale and rent in France, Italy, Tunisia, UAE, and Algeria.'} 
        />
      </Helmet>

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
            <div className="absolute inset-0 bg-purple/80" />
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

        {/* Properties Grid - Airbnb Style */}
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((property) => {
                    const amenities = propertyAmenities[property.id] || [];
                    const displayImage = property.featured_image || property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80";
                    
                    return (
                      <div
                        key={property.id}
                        className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        {/* Image */}
                        <div 
                          className="relative h-56 overflow-hidden cursor-pointer"
                          onClick={() => openPropertyModal(property)}
                        >
                          <img
                            src={displayImage}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Favorite Button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                          >
                            <Heart 
                              className={`w-5 h-5 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                            />
                          </button>
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                              {property.status === "for_rent" ? t.search.forRent : t.search.forSale}
                            </span>
                            {property.featured && (
                              <span className="px-2 py-1 bg-purple text-white text-xs font-medium rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                {t.properties.featured}
                              </span>
                            )}
                          </div>
                          
                          {/* Image Count */}
                          {property.images && property.images.length > 1 && (
                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
                              1/{property.images.length}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                          {/* Location & Type */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{property.city}, {property.country}</span>
                            </div>
                            <span className="text-xs text-accent font-medium uppercase">
                              {formatPropertyType(property.property_type)}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 
                            className="font-display text-lg line-clamp-1 cursor-pointer hover:text-accent transition-colors"
                            onClick={() => openPropertyModal(property)}
                          >
                            {property.title}
                          </h3>

                          {/* Amenities Icons - Airbnb Style */}
                          {amenities.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              {amenities.slice(0, 4).map((amenity) => (
                                <div
                                  key={amenity.id}
                                  className="flex items-center gap-1 text-xs text-muted-foreground"
                                  title={language === 'fr' ? amenity.name_fr || amenity.name : amenity.name}
                                >
                                  <AmenityIcon icon={amenity.icon} className="w-3.5 h-3.5" />
                                </div>
                              ))}
                              {amenities.length > 4 && (
                                <span className="text-xs text-muted-foreground">+{amenities.length - 4}</span>
                              )}
                            </div>
                          )}

                          {/* Details */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              <span>{property.bedrooms}</span>
                            </div>
                            {property.size_sqm && (
                              <div className="flex items-center gap-1">
                                <Square className="w-4 h-4" />
                                <span>{property.size_sqm}m²</span>
                              </div>
                            )}
                          </div>

                          {/* Price */}
                          <div className="pt-2 border-t border-border">
                            <span className="font-display text-lg text-accent">
                              {formatPrice(property.price, property.status)}
                            </span>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2 pt-2">
                            <a href="tel:+33767781026" className="flex-1">
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <Phone className="w-3 h-3" />
                              </Button>
                            </a>
                            <a 
                              href={getGoogleMapsUrl(property)} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex-1"
                            >
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <MapPin className="w-3 h-3" />
                              </Button>
                            </a>
                            <a href={getWhatsAppUrl(property)} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                                <MessageCircle className="w-3 h-3" />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Property Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple/90 p-4" onClick={closeModal}>
            <div className="relative max-w-5xl w-full bg-card border border-border rounded-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-purple/50 hover:bg-purple text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Gallery */}
              <div className="relative h-[50vh]">
                <img
                  src={selectedProperty.images?.[currentImageIndex] || selectedProperty.featured_image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                {selectedProperty.images && selectedProperty.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
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
                    {selectedProperty.status === "for_rent" && selectedProperty.daily_price && (
                      <p className="text-sm text-muted-foreground">
                        €{selectedProperty.daily_price}/day • €{selectedProperty.weekly_price}/week
                      </p>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
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

                {/* Amenities */}
                {propertyAmenities[selectedProperty.id]?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-display text-lg mb-3">{language === 'fr' ? 'Équipements' : 'Amenities'}</h3>
                    <div className="flex flex-wrap gap-3">
                      {propertyAmenities[selectedProperty.id].map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm"
                        >
                          <AmenityIcon icon={amenity.icon} className="w-4 h-4 text-accent" />
                          <span>{language === 'fr' ? amenity.name_fr || amenity.name : amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProperty.description && (
                  <div className="mb-8">
                    <h3 className="font-display text-xl mb-4">{language === 'fr' ? 'Description' : 'Description'}</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProperty.description}</p>
                  </div>
                )}

                {/* Map Link */}
                {(selectedProperty.address || selectedProperty.latitude) && (
                  <div className="mb-6">
                    <a 
                      href={getGoogleMapsUrl(selectedProperty)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:underline"
                    >
                      <MapPin className="w-4 h-4" />
                      {language === 'fr' ? 'Voir sur Google Maps' : 'View on Google Maps'}
                    </a>
                  </div>
                )}

                {/* Contact CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a href="tel:+33767781026">
                    <Button variant="luxury" size="lg" className="gap-2">
                      <Phone className="w-5 h-5" />
                      {t.properties.callAgency}
                    </Button>
                  </a>
                  <a href={getWhatsAppUrl(selectedProperty)} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                  </a>
                  <button onClick={() => toggleFavorite(selectedProperty.id)}>
                    <Button variant="luxury-outline" size="lg" className="gap-2">
                      <Heart className={`w-5 h-5 ${favorites.includes(selectedProperty.id) ? 'fill-current' : ''}`} />
                      {favorites.includes(selectedProperty.id) 
                        ? (language === 'fr' ? 'Sauvegardé' : 'Saved') 
                        : (language === 'fr' ? 'Sauvegarder' : 'Save')}
                    </Button>
                  </button>
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