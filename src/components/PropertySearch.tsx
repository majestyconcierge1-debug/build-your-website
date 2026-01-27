import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertySearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: "",
    propertyType: "",
    city: "",
    bedrooms: "",
    maxPrice: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative py-20 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
              <span className="w-8 h-px bg-accent" />
              Find Your Dream Property
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
              Luxury Real Estate
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Majesty Concierge will help you find the finest real estate property to match your lifestyle.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-background p-6 md:p-8 shadow-lg luxury-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="for_rent">For Rent</SelectItem>
                    <SelectItem value="for_sale">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Property Type
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment_rent">Apartment for Rent</SelectItem>
                    <SelectItem value="apartment_sale">Apartment for Sale</SelectItem>
                    <SelectItem value="cannes_congress">Cannes Congress</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="villa_rent">Villa for Rent</SelectItem>
                    <SelectItem value="villa_sale">Villa for Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Location
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="cannes">Cannes</SelectItem>
                    <SelectItem value="nice">Nice</SelectItem>
                    <SelectItem value="monaco">Monaco</SelectItem>
                    <SelectItem value="saint-tropez">Saint-Tropez</SelectItem>
                    <SelectItem value="antibes">Antibes</SelectItem>
                    <SelectItem value="tunis">Tunis</SelectItem>
                    <SelectItem value="hammamet">Hammamet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Bedrooms
                </label>
                <Select onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
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
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Max Price
                </label>
                <Input
                  type="number"
                  placeholder="Max Price (€)"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button variant="luxury" className="w-full h-10 gap-2" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                  Search Properties
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
