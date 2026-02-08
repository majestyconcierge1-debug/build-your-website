import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Edit, Trash2, Search, Star, Eye, EyeOff, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experienceCategories = [
  { value: "city_tour", label: "City Tour" },
  { value: "luxury", label: "Luxury" },
  { value: "adventure", label: "Adventure" },
  { value: "food", label: "Food & Wine" },
  { value: "culture", label: "Culture" },
  { value: "nightlife", label: "Nightlife" },
  { value: "wine_tasting", label: "Wine Tasting" },
  { value: "tour", label: "Private Tour" },
  { value: "transfer", label: "Airport Transfer" },
  { value: "activity", label: "Activity" },
  { value: "wellness", label: "Wellness & Spa" },
  { value: "sports", label: "Sports & Events" },
];

const levels = ["Easy", "Medium", "Premium", "VIP"];
const currencies = ["EUR", "USD", "GBP", "AED", "DZD", "TND"];

const logActivity = async (
  action: string, entityType: string, entityId: string,
  details: { title: string },
  user: { id: string; email?: string; full_name?: string }
) => {
  await supabase.from("activity_logs").insert([{
    action, entity_type: entityType, entity_id: entityId,
    details: details as unknown as Record<string, string>,
    user_id: user.id, user_email: user.email || null,
    user_name: user.full_name || user.email || null,
  }]);
};

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

interface ExperienceForm {
  title: string; title_fr: string;
  short_description: string; short_description_fr: string;
  description: string; description_fr: string;
  category: string; duration: string;
  languages: string; price: string; price_type: string;
  currency: string; max_participants: string; level: string;
  location: string; city: string; country: string;
  video_url: string; start_point: string; end_point: string;
  included: string; included_fr: string;
  not_included: string; not_included_fr: string;
  cancellation_policy: string; cancellation_policy_fr: string;
  what_to_bring: string; what_to_bring_fr: string;
  accessibility: boolean; featured: boolean; published: boolean;
  best_seller: boolean; sort_order: string;
  slug: string; meta_title: string; meta_description: string;
  images: string; featured_image: string;
}

const defaultForm: ExperienceForm = {
  title: "", title_fr: "",
  short_description: "", short_description_fr: "",
  description: "", description_fr: "",
  category: "tour", duration: "",
  languages: "English, French", price: "", price_type: "per_person",
  currency: "EUR", max_participants: "", level: "Medium",
  location: "", city: "", country: "France",
  video_url: "", start_point: "", end_point: "",
  included: "", included_fr: "",
  not_included: "", not_included_fr: "",
  cancellation_policy: "", cancellation_policy_fr: "",
  what_to_bring: "", what_to_bring_fr: "",
  accessibility: false, featured: false, published: true,
  best_seller: false, sort_order: "0",
  slug: "", meta_title: "", meta_description: "",
  images: "", featured_image: "",
};

const ExperiencesTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState<ExperienceForm>({ ...defaultForm });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formStep, setFormStep] = useState(0);

  useEffect(() => { fetchExperiences(); }, []);

  const fetchExperiences = async () => {
    const { data } = await supabase.from("experiences").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (data) setExperiences(data);
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || exp.city?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || exp.category === filterCategory;
    const matchesStatus = filterStatus === "all" || (filterStatus === "published" && exp.published) || (filterStatus === "draft" && !exp.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const slug = form.slug || generateSlug(form.title);
    const experienceData = {
      title: form.title, title_fr: form.title_fr || null,
      short_description: form.short_description || null, short_description_fr: form.short_description_fr || null,
      description: form.description || null, description_fr: form.description_fr || null,
      category: form.category, duration: form.duration || null,
      languages: form.languages ? form.languages.split(",").map(s => s.trim()) : [],
      price: form.price ? parseFloat(form.price) : null, price_type: form.price_type,
      currency: form.currency, max_participants: form.max_participants ? parseInt(form.max_participants) : null,
      level: form.level, location: form.location || null,
      city: form.city || null, country: form.country,
      video_url: form.video_url || null, start_point: form.start_point || null,
      end_point: form.end_point || null,
      included: form.included || null, included_fr: form.included_fr || null,
      not_included: form.not_included || null, not_included_fr: form.not_included_fr || null,
      cancellation_policy: form.cancellation_policy || null, cancellation_policy_fr: form.cancellation_policy_fr || null,
      what_to_bring: form.what_to_bring || null, what_to_bring_fr: form.what_to_bring_fr || null,
      accessibility: form.accessibility, featured: form.featured,
      published: form.published, best_seller: form.best_seller,
      sort_order: parseInt(form.sort_order) || 0,
      slug, meta_title: form.meta_title || null, meta_description: form.meta_description || null,
      images: form.images ? form.images.split(",").map(s => s.trim()) : [],
      featured_image: form.featured_image || null,
    };

    try {
      if (editing) {
        const { error } = await supabase.from("experiences").update(experienceData).eq("id", editing.id);
        if (error) throw error;
        if (user) await logActivity("update_experience", "experience", editing.id, { title: form.title }, { id: user.id, email: user.email, full_name: user.user_metadata?.full_name });
        toast({ title: "Experience updated successfully" });
      } else {
        const { data, error } = await supabase.from("experiences").insert([experienceData]).select().single();
        if (error) throw error;
        if (user && data) await logActivity("create_experience", "experience", data.id, { title: form.title }, { id: user.id, email: user.email, full_name: user.user_metadata?.full_name });
        toast({ title: "Experience created successfully" });
      }
      resetForm();
      fetchExperiences();
    } catch (error: any) {
      toast({ title: "Error saving experience", description: error.message, variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm("Delete this experience?")) return;
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (!error) {
      if (user) await logActivity("delete_experience", "experience", id, { title }, { id: user.id, email: user.email, full_name: user.user_metadata?.full_name });
      toast({ title: "Experience deleted" });
      fetchExperiences();
    }
  };

  const handleEdit = (exp: any) => {
    setEditing(exp);
    setForm({
      title: exp.title, title_fr: exp.title_fr || "",
      short_description: exp.short_description || "", short_description_fr: exp.short_description_fr || "",
      description: exp.description || "", description_fr: exp.description_fr || "",
      category: exp.category, duration: exp.duration || "",
      languages: exp.languages?.join(", ") || "", price: exp.price?.toString() || "",
      price_type: exp.price_type || "per_person", currency: exp.currency || "EUR",
      max_participants: exp.max_participants?.toString() || "", level: exp.level || "Medium",
      location: exp.location || "", city: exp.city || "", country: exp.country || "France",
      video_url: exp.video_url || "", start_point: exp.start_point || "", end_point: exp.end_point || "",
      included: exp.included || "", included_fr: exp.included_fr || "",
      not_included: exp.not_included || "", not_included_fr: exp.not_included_fr || "",
      cancellation_policy: exp.cancellation_policy || "", cancellation_policy_fr: exp.cancellation_policy_fr || "",
      what_to_bring: exp.what_to_bring || "", what_to_bring_fr: exp.what_to_bring_fr || "",
      accessibility: exp.accessibility || false, featured: exp.featured || false,
      published: exp.published ?? true, best_seller: exp.best_seller || false,
      sort_order: exp.sort_order?.toString() || "0",
      slug: exp.slug || "", meta_title: exp.meta_title || "", meta_description: exp.meta_description || "",
      images: exp.images?.join(", ") || "", featured_image: exp.featured_image || "",
    });
    setFormStep(0);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false); setEditing(null); setFormStep(0);
    setForm({ ...defaultForm });
  };

  const togglePublished = async (exp: any) => {
    await supabase.from("experiences").update({ published: !exp.published }).eq("id", exp.id);
    fetchExperiences();
  };

  const formSteps = ["Basic Info", "Details", "Logistics", "Media & SEO"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">Experiences & Tours</h2>
        <Button variant="luxury" onClick={() => { setForm({ ...defaultForm }); setFormStep(0); setShowForm(true); }} className="gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search experiences..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {experienceCategories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 luxury-shadow rounded-lg">
            <h3 className="font-display text-2xl mb-2">{editing ? "Edit Experience" : "New Experience"}</h3>

            {/* Step nav */}
            <div className="flex gap-2 mb-6">
              {formSteps.map((step, i) => (
                <button key={step} onClick={() => setFormStep(i)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${formStep === i ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >{step}</button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 0: Basic Info */}
              {formStep === 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Title (EN) *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Title (FR)</Label><Input value={form.title_fr} onChange={(e) => setForm({ ...form, title_fr: e.target.value })} /></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Category *</Label>
                      <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{experienceCategories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Level</Label>
                      <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{levels.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Duration</Label><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 hours" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Short Description (EN)</Label><Textarea value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="min-h-[80px]" /></div>
                    <div className="space-y-2"><Label>Short Description (FR)</Label><Textarea value={form.short_description_fr} onChange={(e) => setForm({ ...form, short_description_fr: e.target.value })} className="min-h-[80px]" /></div>
                  </div>
                  <div className="space-y-2"><Label>Full Description (EN)</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[120px]" /></div>
                  <div className="space-y-2"><Label>Full Description (FR)</Label><Textarea value={form.description_fr} onChange={(e) => setForm({ ...form, description_fr: e.target.value })} className="min-h-[120px]" /></div>
                </>
              )}

              {/* Step 1: Details */}
              {formStep === 1 && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Price</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Currency</Label>
                      <Select value={form.currency} onValueChange={(v) => setForm({ ...form, currency: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{currencies.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Price Type</Label>
                      <Select value={form.price_type} onValueChange={(v) => setForm({ ...form, price_type: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per_person">Per Person</SelectItem>
                          <SelectItem value="per_group">Per Group</SelectItem>
                          <SelectItem value="flat_rate">Flat Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Country</Label>
                      <Select value={form.country} onValueChange={(v) => setForm({ ...form, country: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="France">France</SelectItem><SelectItem value="Italy">Italy</SelectItem>
                          <SelectItem value="Tunisia">Tunisia</SelectItem><SelectItem value="United Arab Emirates">UAE</SelectItem>
                          <SelectItem value="Algeria">Algeria</SelectItem><SelectItem value="USA">USA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Region/area" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Languages (comma-separated)</Label><Input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} placeholder="English, French, Arabic" /></div>
                    <div className="space-y-2"><Label>Max Participants</Label><Input type="number" value={form.max_participants} onChange={(e) => setForm({ ...form, max_participants: e.target.value })} /></div>
                  </div>
                </>
              )}

              {/* Step 2: Logistics */}
              {formStep === 2 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Start Point</Label><Input value={form.start_point} onChange={(e) => setForm({ ...form, start_point: e.target.value })} /></div>
                    <div className="space-y-2"><Label>End Point</Label><Input value={form.end_point} onChange={(e) => setForm({ ...form, end_point: e.target.value })} /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>What's Included (EN)</Label><Textarea value={form.included} onChange={(e) => setForm({ ...form, included: e.target.value })} className="min-h-[80px]" placeholder="One item per line" /></div>
                    <div className="space-y-2"><Label>Inclus (FR)</Label><Textarea value={form.included_fr} onChange={(e) => setForm({ ...form, included_fr: e.target.value })} className="min-h-[80px]" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Not Included (EN)</Label><Textarea value={form.not_included} onChange={(e) => setForm({ ...form, not_included: e.target.value })} className="min-h-[80px]" /></div>
                    <div className="space-y-2"><Label>Non Inclus (FR)</Label><Textarea value={form.not_included_fr} onChange={(e) => setForm({ ...form, not_included_fr: e.target.value })} className="min-h-[80px]" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Cancellation Policy (EN)</Label><Textarea value={form.cancellation_policy} onChange={(e) => setForm({ ...form, cancellation_policy: e.target.value })} className="min-h-[60px]" /></div>
                    <div className="space-y-2"><Label>Politique d'annulation (FR)</Label><Textarea value={form.cancellation_policy_fr} onChange={(e) => setForm({ ...form, cancellation_policy_fr: e.target.value })} className="min-h-[60px]" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>What to Bring (EN)</Label><Textarea value={form.what_to_bring} onChange={(e) => setForm({ ...form, what_to_bring: e.target.value })} className="min-h-[60px]" /></div>
                    <div className="space-y-2"><Label>À Apporter (FR)</Label><Textarea value={form.what_to_bring_fr} onChange={(e) => setForm({ ...form, what_to_bring_fr: e.target.value })} className="min-h-[60px]" /></div>
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.accessibility} onChange={(e) => setForm({ ...form, accessibility: e.target.checked })} className="accent-accent" />
                    <span className="text-sm">Accessible (PMR)</span>
                  </label>
                </>
              )}

              {/* Step 3: Media & SEO */}
              {formStep === 3 && (
                <>
                  <div className="space-y-2"><Label>Cover Image URL</Label><Input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Gallery Image URLs (comma-separated)</Label><Input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Video URL (YouTube/Vimeo)</Label><Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
                  <hr className="border-border" />
                  <div className="space-y-2"><Label>URL Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={form.title ? generateSlug(form.title) : "auto-generated-from-title"} /></div>
                  <div className="space-y-2"><Label>Meta Title</Label><Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} maxLength={60} /></div>
                  <div className="space-y-2"><Label>Meta Description</Label><Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} className="min-h-[60px]" maxLength={160} /></div>
                  <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-accent" /><span className="text-sm">Featured</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-accent" /><span className="text-sm">Published</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.best_seller} onChange={(e) => setForm({ ...form, best_seller: e.target.checked })} className="accent-accent" /><span className="text-sm">Best Seller</span></label>
                  </div>
                </>
              )}

              {/* Navigation & Submit */}
              <div className="flex justify-between pt-4">
                <div className="flex gap-2">
                  {formStep > 0 && <Button type="button" variant="outline" onClick={() => setFormStep(formStep - 1)}>Previous</Button>}
                  {formStep < formSteps.length - 1 && <Button type="button" variant="outline" onClick={() => setFormStep(formStep + 1)}>Next</Button>}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button type="submit" variant="luxury" disabled={formLoading}>{formLoading ? "Saving..." : editing ? "Update" : "Create"}</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experiences List */}
      <div className="space-y-3">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No experiences found.</div>
        ) : (
          filteredExperiences.map((exp) => (
            <div key={exp.id} className="bg-card border border-border p-4 flex items-center gap-4 rounded-lg">
              <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                <img src={exp.featured_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"} alt={exp.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs text-accent uppercase tracking-wide">{exp.category?.replace("_", " ")}</span>
                  {exp.level && <Badge variant="outline" className="text-xs">{exp.level}</Badge>}
                  {exp.featured && <Badge className="text-xs bg-accent text-accent-foreground">Featured</Badge>}
                  {exp.best_seller && <Badge className="text-xs bg-yellow-500 text-white"><Award className="w-3 h-3 mr-1" />Best Seller</Badge>}
                  {!exp.published && <Badge variant="secondary" className="text-xs">Draft</Badge>}
                </div>
                <h4 className="font-display text-lg truncate">{exp.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {exp.city && `${exp.city}, `}{exp.country} • {exp.duration || "TBD"}
                  {exp.price && ` • ${exp.currency || "€"}${exp.price}`}
                  {exp.max_participants && ` • Max ${exp.max_participants} pax`}
                </p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => togglePublished(exp)} title={exp.published ? "Unpublish" : "Publish"}>
                  {exp.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id, exp.title)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperiencesTab;
