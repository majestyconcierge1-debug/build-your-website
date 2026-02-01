import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AmenityIcon from "@/components/AmenityIcon";
import { Tables } from "@/integrations/supabase/types";

type Amenity = Tables<"amenities">;

interface AmenitySelectorProps {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

const AmenitySelector = ({ selectedAmenities, onAmenitiesChange }: AmenitySelectorProps) => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      const { data } = await supabase
        .from("amenities")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true });
      
      if (data) setAmenities(data);
      setLoading(false);
    };

    fetchAmenities();
  }, []);

  const handleToggle = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      onAmenitiesChange(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      onAmenitiesChange([...selectedAmenities, amenityId]);
    }
  };

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const category = amenity.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  if (loading) {
    return <div className="text-muted-foreground text-sm">Loading amenities...</div>;
  }

  if (amenities.length === 0) {
    return <div className="text-muted-foreground text-sm">No amenities available.</div>;
  }

  return (
    <div className="space-y-6">
      <Label className="text-base font-medium">Amenities</Label>
      
      {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {category}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryAmenities.map((amenity) => (
              <label
                key={amenity.id}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAmenities.includes(amenity.id)
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <Checkbox
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={() => handleToggle(amenity.id)}
                />
                <AmenityIcon icon={amenity.icon} className="w-4 h-4 text-accent" />
                <span className="text-sm">{amenity.name}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground">
        {selectedAmenities.length} amenities selected
      </p>
    </div>
  );
};

export default AmenitySelector;