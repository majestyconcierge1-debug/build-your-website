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
  X
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties">;
type Inquiry = Tables<"inquiries">;
type Profile = Tables<"profiles">;

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"properties" | "users" | "inquiries">("properties");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [propertyForm, setPropertyForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    price: "",
    status: "for_sale" as "for_rent" | "for_sale",
    property_type: "villa_sale" as "apartment_rent" | "apartment_sale" | "cannes_congress" | "penthouse" | "villa_rent" | "villa_sale",
    bedrooms: "3",
    size_sqm: "",
    images: "",
    featured: false,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, activeTab]);

  const fetchData = async () => {
    if (activeTab === "properties") {
      const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (data) setProperties(data);
    } else if (activeTab === "inquiries") {
      const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (data) setInquiries(data);
    } else if (activeTab === "users") {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data) setProfiles(data);
    }
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const propertyData = {
      title: propertyForm.title,
      description: propertyForm.description || null,
      location: propertyForm.location,
      city: propertyForm.city,
      price: parseFloat(propertyForm.price),
      status: propertyForm.status,
      property_type: propertyForm.property_type,
      bedrooms: parseInt(propertyForm.bedrooms),
      size_sqm: propertyForm.size_sqm ? parseFloat(propertyForm.size_sqm) : null,
      images: propertyForm.images ? propertyForm.images.split(",").map(s => s.trim()) : [],
      featured: propertyForm.featured,
    };

    try {
      if (editingProperty) {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", editingProperty.id);
        if (error) throw error;
        toast({ title: "Property updated successfully" });
      } else {
        const { error } = await supabase.from("properties").insert([propertyData]);
        if (error) throw error;
        toast({ title: "Property created successfully" });
      }
      
      resetForm();
      fetchData();
    } catch (error) {
      toast({ title: "Error saving property", variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) {
      toast({ title: "Property deleted" });
      fetchData();
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title,
      description: property.description || "",
      location: property.location,
      city: property.city,
      price: property.price.toString(),
      status: property.status,
      property_type: property.property_type,
      bedrooms: property.bedrooms.toString(),
      size_sqm: property.size_sqm?.toString() || "",
      images: property.images?.join(", ") || "",
      featured: property.featured || false,
    });
    setShowPropertyForm(true);
  };

  const resetForm = () => {
    setShowPropertyForm(false);
    setEditingProperty(null);
    setPropertyForm({
      title: "",
      description: "",
      location: "",
      city: "",
      price: "",
      status: "for_sale",
      property_type: "villa_sale",
      bedrooms: "3",
      size_sqm: "",
      images: "",
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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-foreground text-background transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-6 border-b border-background/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl">Majesty</h1>
              <p className="text-xs text-background/60 tracking-wider uppercase">Admin Panel</p>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { id: "properties", label: "Properties", icon: Home },
            { id: "users", label: "Users", icon: Users },
            { id: "inquiries", label: "Inquiries", icon: MessageSquare },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as typeof activeTab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${
                activeTab === item.id ? "bg-accent text-accent-foreground" : "text-background/70 hover:bg-background/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-background/10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-background/70 hover:bg-background/10 rounded transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
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
                <div className="bg-background border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 luxury-shadow">
                  <h3 className="font-display text-2xl mb-6">
                    {editingProperty ? "Edit Property" : "Add New Property"}
                  </h3>
                  <form onSubmit={handlePropertySubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                          value={propertyForm.title}
                          onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Input
                          value={propertyForm.city}
                          onChange={(e) => setPropertyForm({ ...propertyForm, city: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Input
                        value={propertyForm.location}
                        onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                        placeholder="e.g., French Riviera, Côte d'Azur"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={propertyForm.description}
                        onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                        className="min-h-[100px]"
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
                          onValueChange={(value: typeof propertyForm.property_type) => setPropertyForm({ ...propertyForm, property_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment_rent">Apartment for Rent</SelectItem>
                            <SelectItem value="apartment_sale">Apartment for Sale</SelectItem>
                            <SelectItem value="cannes_congress">Cannes Congress</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                            <SelectItem value="villa_rent">Villa for Rent</SelectItem>
                            <SelectItem value="villa_sale">Villa for Sale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
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
                        <Label>Bedrooms *</Label>
                        <Input
                          type="number"
                          value={propertyForm.bedrooms}
                          onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                          required
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
                    </div>

                    <div className="space-y-2">
                      <Label>Image URLs (comma-separated)</Label>
                      <Input
                        value={propertyForm.images}
                        onChange={(e) => setPropertyForm({ ...propertyForm, images: e.target.value })}
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={propertyForm.featured}
                        onChange={(e) => setPropertyForm({ ...propertyForm, featured: e.target.checked })}
                      />
                      <Label htmlFor="featured">Featured Property</Label>
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
              {properties.map((property) => (
                <div key={property.id} className="bg-card border border-border p-4 flex items-center gap-4">
                  <img
                    src={property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80"}
                    alt={property.title}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg truncate">{property.title}</h4>
                    <p className="text-sm text-muted-foreground">{property.city} • €{property.price.toLocaleString()}</p>
                    <p className="text-xs text-accent uppercase tracking-wide">
                      {property.status === "for_rent" ? "For Rent" : "For Sale"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditProperty(property)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProperty(property.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {properties.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No properties yet. Add your first property!</p>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h2 className="font-display text-2xl lg:text-3xl mb-8 hidden lg:block">Users</h2>
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div key={profile.id} className="bg-card border border-border p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{profile.full_name || "No name"}</h4>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {profiles.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No users yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div>
            <h2 className="font-display text-2xl lg:text-3xl mb-8 hidden lg:block">Inquiries</h2>
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-card border border-border p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-medium">{inquiry.name}</h4>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      {inquiry.phone && <p className="text-sm text-muted-foreground">{inquiry.phone}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs uppercase tracking-wide ${
                        inquiry.status === "new" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                      }`}>
                        {inquiry.status}
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteInquiry(inquiry.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm">{inquiry.message}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {inquiries.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No inquiries yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
