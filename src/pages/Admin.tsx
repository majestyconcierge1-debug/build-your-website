import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  Users, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Menu,
  X,
  Wine,
  History
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { countries, citiesByCountry, propertyTypes } from "@/data/locations";
import ImageUploader from "@/components/admin/ImageUploader";
import AmenitySelector from "@/components/admin/AmenitySelector";
import ExperiencesTab from "@/components/admin/ExperiencesTab";
import ActivityLogTab from "@/components/admin/ActivityLogTab";

type Property = Tables<"properties">;
type Inquiry = Tables<"inquiries">;
type Profile = Tables<"profiles">;

type PropertyType = "apartment_rent" | "apartment_sale" | "penthouse_rent" | "penthouse_sale" | "villa_rent" | "villa_sale" | "riad_rent" | "riad_sale";

const logActivity = async (
  action: string,
  entityType: string,
  entityId: string,
  details: { title: string },
  user: { id: string; email?: string; full_name?: string }
) => {
  await supabase.from("activity_logs").insert([{
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details as unknown as Record<string, string>,
    user_id: user.id,
    user_email: user.email || null,
    user_name: user.full_name || user.email || null,
  }]);
};

const Admin = () => {
  const { user, isAdmin, isAssistant, hasStaffAccess, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"properties" | "experiences" | "users" | "inquiries" | "activity">("properties");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  const [propertyForm, setPropertyForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    country: "France",
    price: "",
    daily_price: "",
    weekly_price: "",
    monthly_price: "",
    status: "for_sale" as "for_rent" | "for_sale",
    property_type: "villa_sale" as PropertyType,
    bedrooms: "3",
    size_sqm: "",
    address: "",
    latitude: "",
    longitude: "",
    featured: false,
  });

  const availableCities = citiesByCountry[propertyForm.country.toLowerCase()] || [];

  useEffect(() => {
    if (!loading && !hasStaffAccess) {
      navigate("/auth");
    }
  }, [hasStaffAccess, loading, navigate]);

  useEffect(() => {
    if (hasStaffAccess) {
      fetchData();
    }
  }, [hasStaffAccess, activeTab]);

  const fetchData = async () => {
    if (activeTab === "properties") {
      const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (data) setProperties(data);
    } else if (activeTab === "inquiries" && isAdmin) {
      const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (data) setInquiries(data);
    } else if (activeTab === "users" && isAdmin) {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data) setProfiles(data);
    }
  };

  const fetchPropertyAmenities = async (propertyId: string) => {
    const { data } = await supabase
      .from("property_amenities")
      .select("amenity_id")
      .eq("property_id", propertyId);
    
    if (data) {
      setSelectedAmenities(data.map(pa => pa.amenity_id));
    }
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const propertyData = {
      title: propertyForm.title,
      description: propertyForm.description || null,
      location: propertyForm.location || propertyForm.city,
      city: propertyForm.city,
      country: propertyForm.country,
      price: parseFloat(propertyForm.price),
      daily_price: propertyForm.daily_price ? parseFloat(propertyForm.daily_price) : null,
      weekly_price: propertyForm.weekly_price ? parseFloat(propertyForm.weekly_price) : null,
      monthly_price: propertyForm.monthly_price ? parseFloat(propertyForm.monthly_price) : null,
      status: propertyForm.status,
      property_type: propertyForm.property_type,
      bedrooms: parseInt(propertyForm.bedrooms),
      size_sqm: propertyForm.size_sqm ? parseFloat(propertyForm.size_sqm) : null,
      address: propertyForm.address || null,
      latitude: propertyForm.latitude ? parseFloat(propertyForm.latitude) : null,
      longitude: propertyForm.longitude ? parseFloat(propertyForm.longitude) : null,
      images: propertyImages,
      featured_image: featuredImage,
      featured: propertyForm.featured,
    };

    try {
      let propertyId: string;

      if (editingProperty) {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", editingProperty.id);
        if (error) throw error;
        propertyId = editingProperty.id;

        if (user) {
          await logActivity("update_property", "property", propertyId, { title: propertyForm.title }, {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          });
        }

        toast({ title: "Property updated successfully" });
      } else {
        const { data, error } = await supabase.from("properties").insert([propertyData]).select().single();
        if (error) throw error;
        propertyId = data.id;

        if (user) {
          await logActivity("create_property", "property", propertyId, { title: propertyForm.title }, {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          });
        }

        toast({ title: "Property created successfully" });
      }

      // Update property amenities
      await supabase.from("property_amenities").delete().eq("property_id", propertyId);
      
      if (selectedAmenities.length > 0) {
        const amenityInserts = selectedAmenities.map(amenityId => ({
          property_id: propertyId,
          amenity_id: amenityId,
        }));
        await supabase.from("property_amenities").insert(amenityInserts);
      }
      
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving property:", error);
      toast({ title: "Error saving property", variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProperty = async (id: string, title: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) {
      if (user) {
        await logActivity("delete_property", "property", id, { title }, {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name,
        });
      }
      toast({ title: "Property deleted" });
      fetchData();
    }
  };

  const handleEditProperty = async (property: Property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title,
      description: property.description || "",
      location: property.location,
      city: property.city,
      country: property.country,
      price: property.price.toString(),
      daily_price: property.daily_price?.toString() || "",
      weekly_price: property.weekly_price?.toString() || "",
      monthly_price: property.monthly_price?.toString() || "",
      status: property.status,
      property_type: property.property_type as PropertyType,
      bedrooms: property.bedrooms.toString(),
      size_sqm: property.size_sqm?.toString() || "",
      address: property.address || "",
      latitude: property.latitude?.toString() || "",
      longitude: property.longitude?.toString() || "",
      featured: property.featured || false,
    });
    setPropertyImages(property.images || []);
    setFeaturedImage(property.featured_image || null);
    await fetchPropertyAmenities(property.id);
    setShowPropertyForm(true);
  };

  const resetForm = () => {
    setShowPropertyForm(false);
    setEditingProperty(null);
    setSelectedAmenities([]);
    setPropertyImages([]);
    setFeaturedImage(null);
    setPropertyForm({
      title: "",
      description: "",
      location: "",
      city: "",
      country: "France",
      price: "",
      daily_price: "",
      weekly_price: "",
      monthly_price: "",
      status: "for_sale",
      property_type: "villa_sale",
      bedrooms: "3",
      size_sqm: "",
      address: "",
      latitude: "",
      longitude: "",
      featured: false,
    });
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (!error) {
      toast({ title: "Inquiry deleted" });
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!hasStaffAccess) {
    return null;
  }

  const tabs = [
    { id: "properties", label: "Properties", icon: Home, access: true },
    { id: "experiences", label: "Experiences", icon: Wine, access: true },
    { id: "users", label: "Users", icon: Users, access: isAdmin },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare, access: isAdmin },
    { id: "activity", label: "Activity Log", icon: History, access: isAdmin },
  ].filter(tab => tab.access);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-purple text-foreground transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-6 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl text-accent">Majesty</h1>
              <p className="text-xs text-foreground/60 tracking-wider uppercase">
                {isAdmin ? "Admin Panel" : "Assistant Panel"}
              </p>
            </div>
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as typeof activeTab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${
                activeTab === item.id ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/20">
          <div className="px-4 py-2 text-xs text-foreground/60 mb-2">
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/70 hover:bg-white/10 hover:text-foreground rounded transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-display text-xl capitalize">{activeTab}</h2>
          <div className="w-6" />
        </div>

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Properties</h2>
              <Button variant="luxury" onClick={() => setShowPropertyForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Property
              </Button>
            </div>

            {/* Property Form Modal */}
            {showPropertyForm && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-card border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 luxury-shadow rounded-lg">
                  <h3 className="font-display text-2xl mb-6">
                    {editingProperty ? "Edit Property" : "Add New Property"}
                  </h3>
                  <form onSubmit={handlePropertySubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title * (max 10 words)</Label>
                        <Input
                          value={propertyForm.title}
                          onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                          required
                          maxLength={100}
                          className="font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Country *</Label>
                        <Select
                          value={propertyForm.country}
                          onValueChange={(value) => setPropertyForm({ ...propertyForm, country: value, city: "" })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c.value} value={c.label.en}>{c.label.en}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Select
                          value={propertyForm.city}
                          onValueChange={(value) => setPropertyForm({ ...propertyForm, city: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCities.map((city) => (
                              <SelectItem key={city.value} value={city.label}>{city.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Address (for Google Maps)</Label>
                        <Input
                          value={propertyForm.address}
                          onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                          placeholder="123 Rue de la Mer, Nice"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={propertyForm.description}
                        onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                        className="min-h-[120px]"
                        placeholder="Describe the property..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Status *</Label>
                        <Select
                          value={propertyForm.status}
                          onValueChange={(value: "for_rent" | "for_sale") => setPropertyForm({ ...propertyForm, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="for_sale">For Sale</SelectItem>
                            <SelectItem value="for_rent">For Rent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Property Type *</Label>
                        <Select
                          value={propertyForm.property_type}
                          onValueChange={(value: PropertyType) => setPropertyForm({ ...propertyForm, property_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>{type.label.en}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="p-4 border border-border rounded-lg space-y-4">
                      <h4 className="font-medium">Pricing</h4>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Price (€) *</Label>
                          <Input
                            type="number"
                            value={propertyForm.price}
                            onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Daily Price (€)</Label>
                          <Input
                            type="number"
                            value={propertyForm.daily_price}
                            onChange={(e) => setPropertyForm({ ...propertyForm, daily_price: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Weekly Price (€)</Label>
                          <Input
                            type="number"
                            value={propertyForm.weekly_price}
                            onChange={(e) => setPropertyForm({ ...propertyForm, weekly_price: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Monthly Price (€)</Label>
                          <Input
                            type="number"
                            value={propertyForm.monthly_price}
                            onChange={(e) => setPropertyForm({ ...propertyForm, monthly_price: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Bedrooms *</Label>
                        <Input
                          type="number"
                          value={propertyForm.bedrooms}
                          onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                          required
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Size (m²)</Label>
                        <Input
                          type="number"
                          value={propertyForm.size_sqm}
                          onChange={(e) => setPropertyForm({ ...propertyForm, size_sqm: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location/Region</Label>
                        <Input
                          value={propertyForm.location}
                          onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                          placeholder="French Riviera"
                        />
                      </div>
                    </div>

                    {/* Map Coordinates */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Latitude</Label>
                        <Input
                          type="number"
                          step="any"
                          value={propertyForm.latitude}
                          onChange={(e) => setPropertyForm({ ...propertyForm, latitude: e.target.value })}
                          placeholder="43.7102"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Longitude</Label>
                        <Input
                          type="number"
                          step="any"
                          value={propertyForm.longitude}
                          onChange={(e) => setPropertyForm({ ...propertyForm, longitude: e.target.value })}
                          placeholder="7.2620"
                        />
                      </div>
                    </div>

                    {/* Images */}
                    <ImageUploader
                      images={propertyImages}
                      featuredImage={featuredImage}
                      onImagesChange={setPropertyImages}
                      onFeaturedImageChange={setFeaturedImage}
                      maxImages={20}
                    />

                    {/* Amenities */}
                    <AmenitySelector
                      selectedAmenities={selectedAmenities}
                      onAmenitiesChange={setSelectedAmenities}
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={propertyForm.featured}
                        onChange={(e) => setPropertyForm({ ...propertyForm, featured: e.target.checked })}
                        className="accent-accent"
                      />
                      <Label htmlFor="featured">Featured Property (show on homepage)</Label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" variant="luxury" disabled={formLoading}>
                        {formLoading ? "Saving..." : editingProperty ? "Update Property" : "Create Property"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Properties List */}
            <div className="space-y-4">
              {properties.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No properties yet. Add your first property!
                </div>
              ) : (
                properties.map((property) => (
                  <div key={property.id} className="bg-card border border-border p-4 flex items-center gap-4 rounded-lg">
                    <img
                      src={property.featured_image || property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80"}
                      alt={property.title}
                      className="w-24 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-accent uppercase tracking-wide">
                          {property.status === "for_rent" ? "For Rent" : "For Sale"}
                        </span>
                        {property.featured && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">Featured</span>
                        )}
                      </div>
                      <h4 className="font-display text-lg truncate">{property.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {property.city}, {property.country} • {property.bedrooms} beds
                        {property.size_sqm && ` • ${property.size_sqm}m²`}
                      </p>
                      <p className="text-accent font-medium">€{property.price.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditProperty(property)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProperty(property.id, property.title)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === "experiences" && <ExperiencesTab />}

        {/* Activity Log Tab */}
        {activeTab === "activity" && isAdmin && <ActivityLogTab />}

        {/* Users Tab */}
        {activeTab === "users" && isAdmin && (
          <div>
            <h2 className="font-display text-2xl lg:text-3xl mb-8 hidden lg:block">Users</h2>
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div key={profile.id} className="bg-card border border-border p-4 flex items-center justify-between rounded-lg">
                  <div>
                    <h4 className="font-display">{profile.full_name || "Unnamed User"}</h4>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Joined: {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {profiles.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No users found.</p>
              )}
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && isAdmin && (
          <div>
            <h2 className="font-display text-2xl lg:text-3xl mb-8 hidden lg:block">Inquiries</h2>
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-card border border-border p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-display">{inquiry.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          inquiry.status === 'new' ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{inquiry.email}</p>
                      {inquiry.phone && <p className="text-sm text-muted-foreground mb-2">{inquiry.phone}</p>}
                      <p className="text-sm">{inquiry.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(inquiry.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteInquiry(inquiry.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No inquiries yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;