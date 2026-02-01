import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Edit, Trash2, Wine, Plane, Camera, MapPin } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Experience = Tables<"experiences">;

const experienceCategories = [
  { value: "wine_tasting", label: "Wine Tasting", icon: Wine },
  { value: "tour", label: "Private Tour", icon: Camera },
  { value: "transfer", label: "Airport Transfer", icon: Plane },
  { value: "activity", label: "Activity", icon: MapPin },
];

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

const ExperiencesTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    title_fr: "",
    description: "",
    description_fr: "",
    category: "tour",
    duration: "",
    price: "",
    price_type: "per_person",
    location: "",
    city: "",
    country: "France",
    featured: false,
    published: true,
    images: "",
    featured_image: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setExperiences(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const experienceData = {
      title: form.title,
      title_fr: form.title_fr || null,
      description: form.description || null,
      description_fr: form.description_fr || null,
      category: form.category,
      duration: form.duration || null,
      price: form.price ? parseFloat(form.price) : null,
      price_type: form.price_type,
      location: form.location || null,
      city: form.city || null,
      country: form.country,
      featured: form.featured,
      published: form.published,
      images: form.images ? form.images.split(",").map(s => s.trim()) : [],
      featured_image: form.featured_image || null,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from("experiences")
          .update(experienceData)
          .eq("id", editing.id);
        if (error) throw error;
        
        if (user) {
          await logActivity("update_experience", "experience", editing.id, { title: form.title }, {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          });
        }
        toast({ title: "Experience updated successfully" });
      } else {
        const { data, error } = await supabase.from("experiences").insert([experienceData]).select().single();
        if (error) throw error;
        
        if (user && data) {
          await logActivity("create_experience", "experience", data.id, { title: form.title }, {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          });
        }
        toast({ title: "Experience created successfully" });
      }
      
      resetForm();
      fetchExperiences();
    } catch (error) {
      toast({ title: "Error saving experience", variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (!error) {
      if (user) {
        await logActivity("delete_experience", "experience", id, { title }, {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name,
        });
      }
      toast({ title: "Experience deleted" });
      fetchExperiences();
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditing(exp);
    setForm({
      title: exp.title,
      title_fr: exp.title_fr || "",
      description: exp.description || "",
      description_fr: exp.description_fr || "",
      category: exp.category,
      duration: exp.duration || "",
      price: exp.price?.toString() || "",
      price_type: exp.price_type || "per_person",
      location: exp.location || "",
      city: exp.city || "",
      country: exp.country || "France",
      featured: exp.featured || false,
      published: exp.published ?? true,
      images: exp.images?.join(", ") || "",
      featured_image: exp.featured_image || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm({
      title: "",
      title_fr: "",
      description: "",
      description_fr: "",
      category: "tour",
      duration: "",
      price: "",
      price_type: "per_person",
      location: "",
      city: "",
      country: "France",
      featured: false,
      published: true,
      images: "",
      featured_image: "",
    });
  };

  const getCategoryIcon = (category: string) => {
    const cat = experienceCategories.find(c => c.value === category);
    return cat ? cat.icon : Camera;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Experiences</h2>
        <Button variant="luxury" onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 luxury-shadow rounded-lg">
            <h3 className="font-display text-2xl mb-6">
              {editing ? "Edit Experience" : "Add New Experience"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title (EN) *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title (FR)</Label>
                  <Input
                    value={form.title_fr}
                    onChange={(e) => setForm({ ...form, title_fr: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g., 3 hours, Half day"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description (EN)</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (FR)</Label>
                <Textarea
                  value={form.description_fr}
                  onChange={(e) => setForm({ ...form, description_fr: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Price (€)</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price Type</Label>
                  <Select value={form.price_type} onValueChange={(value) => setForm({ ...form, price_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_person">Per Person</SelectItem>
                      <SelectItem value="per_group">Per Group</SelectItem>
                      <SelectItem value="flat_rate">Flat Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={form.country} onValueChange={(value) => setForm({ ...form, country: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Tunisia">Tunisia</SelectItem>
                      <SelectItem value="United Arab Emirates">UAE</SelectItem>
                      <SelectItem value="Algeria">Algeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Featured Image URL</Label>
                <Input
                  value={form.featured_image}
                  onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Image URLs (comma-separated)</Label>
                <Input
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="accent-accent"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="accent-accent"
                  />
                  <span className="text-sm">Published</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" variant="luxury" disabled={formLoading}>
                  {formLoading ? "Saving..." : editing ? "Update Experience" : "Create Experience"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No experiences yet. Create your first experience!
          </div>
        ) : (
          experiences.map((exp) => {
            const CategoryIcon = getCategoryIcon(exp.category);
            return (
              <div key={exp.id} className="bg-card border border-border p-4 flex items-center gap-4 rounded-lg">
                <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={exp.featured_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryIcon className="w-4 h-4 text-accent" />
                    <span className="text-xs text-accent uppercase tracking-wide">{exp.category.replace("_", " ")}</span>
                    {exp.featured && <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">Featured</span>}
                    {!exp.published && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>}
                  </div>
                  <h4 className="font-display text-lg truncate">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.city && `${exp.city}, `}{exp.country} • {exp.duration || "Duration TBD"}
                    {exp.price && ` • €${exp.price}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id, exp.title)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExperiencesTab;