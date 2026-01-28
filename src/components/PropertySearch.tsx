import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { countries, citiesByCountry, propertyTypes } from "@/data/locations";

const PropertySearch = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState({
    status: "",
    propertyType: "",
    country: "",
    city: "",
    bedrooms: "",
    maxPrice: "",
  });

  const [availableCities, setAvailableCities] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    if (filters.country && filters.country !== "all") {
      const countryKey = filters.country.toLowerCase().replace(/ /g, '-');
      // Map country names to keys
      const countryMapping: Record<string, string> = {
        'france': 'france',
        'united arab emirates': 'uae',
        'tunisia': 'tunisia',
        'italy': 'italy',
      };
      const key = countryMapping[filters.country.toLowerCase()] || countryKey;
      setAvailableCities(citiesByCountry[key] || []);
    } else {
      setAvailableCities([]);
    }
    // Reset city when country changes
    if (filters.city) {
      setFilters(prev => ({ ...prev, city: "" }));
    }
  }, [filters.country]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "any") params.append(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative py-20 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
              <span className="w-8 h-px bg-accent" />
              {t.search.title}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
              {language === 'fr' ? 'Immobilier de Luxe' : 'Luxury Real Estate'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Status Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-sm overflow-hidden border border-border">
              {[
                { value: "", label: t.search.allStatus },
                { value: "for_rent", label: t.search.forRent },
                { value: "for_sale", label: t.search.forSale },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setFilters({ ...filters, status: status.value })}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    filters.status === status.value
                      ? "bg-accent text-accent-foreground"
                      : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-card p-6 md:p-8 border border-border luxury-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.search.lookingFor}
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t.search.allTypes} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.search.allTypes}</SelectItem>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.search.country}
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, country: value })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t.search.allCountries} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.search.allCountries}</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.label.en}>
                        {country.label[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.search.city}
                </label>
                <Select 
                  onValueChange={(value) => setFilters({ ...filters, city: value })}
                  disabled={!filters.country || filters.country === "all"}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t.search.allCities} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.search.allCities}</SelectItem>
                    {availableCities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.search.bedrooms}
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t.search.anyBedrooms} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t.search.anyBedrooms}</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Max Price */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.search.maxPrice}
                </label>
                <Input
                  type="number"
                  placeholder="€"
                  className="bg-background"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button variant="luxury" className="w-full h-10 gap-2" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                  {t.search.search}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
