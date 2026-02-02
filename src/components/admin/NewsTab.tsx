import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Edit, Trash2, Eye, EyeOff, Newspaper } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type NewsArticle = Tables<"news_articles">;

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

const NewsTab = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    title_fr: "",
    content: "",
    content_fr: "",
    excerpt: "",
    excerpt_fr: "",
    image_url: "",
    published: false,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data } = await supabase
      .from("news_articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setArticles(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const articleData = {
      title: form.title,
      title_fr: form.title_fr || null,
      content: form.content,
      content_fr: form.content_fr || null,
      excerpt: form.excerpt || null,
      excerpt_fr: form.excerpt_fr || null,
      image_url: form.image_url || null,
      published: form.published,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from("news_articles")
          .update(articleData)
          .eq("id", editing.id);
        if (error) throw error;
        
        if (user) {
          await logActivity("update_article", "news_article", editing.id, { title: form.title }, {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          });
        }
        toast({ title: "Article updated successfully" });
      } else {
        const { data, error } = await supabase.from("news_articles").insert([articleData]).select().single();
        if (error) throw error;
        
        if (user && data) {
          await logActivity("create_article", "news_article", data.id, { title: form.title }, {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          });
        }
        toast({ title: "Article created successfully" });
      }
      
      resetForm();
      fetchArticles();
    } catch (error) {
      toast({ title: "Error saving article", variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    const { error } = await supabase.from("news_articles").delete().eq("id", id);
    if (!error) {
      if (user) {
        await logActivity("delete_article", "news_article", id, { title }, {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name,
        });
      }
      toast({ title: "Article deleted" });
      fetchArticles();
    }
  };

  const togglePublish = async (article: NewsArticle) => {
    const { error } = await supabase
      .from("news_articles")
      .update({ published: !article.published })
      .eq("id", article.id);
    
    if (!error) {
      if (user) {
        await logActivity(
          article.published ? "unpublish_article" : "publish_article",
          "news_article",
          article.id,
          { title: article.title },
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name,
          }
        );
      }
      toast({ title: article.published ? "Article unpublished" : "Article published" });
      fetchArticles();
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditing(article);
    setForm({
      title: article.title,
      title_fr: article.title_fr || "",
      content: article.content,
      content_fr: article.content_fr || "",
      excerpt: article.excerpt || "",
      excerpt_fr: article.excerpt_fr || "",
      image_url: article.image_url || "",
      published: article.published || false,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm({
      title: "",
      title_fr: "",
      content: "",
      content_fr: "",
      excerpt: "",
      excerpt_fr: "",
      image_url: "",
      published: false,
    });
  };

  // Only admins can manage news (not assistants for this sensitive content)
  if (!isAdmin) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Only administrators can manage news articles.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl lg:text-3xl hidden lg:block">News Articles</h2>
        <Button variant="luxury" onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Article
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 luxury-shadow rounded-lg">
            <h3 className="font-display text-2xl mb-6">
              {editing ? "Edit Article" : "Add New Article"}
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
                  <Label>Excerpt (EN)</Label>
                  <Textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="min-h-[80px]"
                    placeholder="Short summary..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Excerpt (FR)</Label>
                  <Textarea
                    value={form.excerpt_fr}
                    onChange={(e) => setForm({ ...form, excerpt_fr: e.target.value })}
                    className="min-h-[80px]"
                    placeholder="Résumé court..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content (EN) *</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Content (FR)</Label>
                <Textarea
                  value={form.content_fr}
                  onChange={(e) => setForm({ ...form, content_fr: e.target.value })}
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Featured Image URL</Label>
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="accent-accent"
                />
                <span className="text-sm">Publish immediately</span>
              </label>

              <div className="flex gap-4 pt-4">
                <Button type="submit" variant="luxury" disabled={formLoading}>
                  {formLoading ? "Saving..." : editing ? "Update Article" : "Create Article"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
            No articles yet. Create your first news article!
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-card border border-border p-4 flex items-center gap-4 rounded-lg">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {article.published ? (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">Published</span>
                  ) : (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>
                  )}
                </div>
                <h4 className="font-display text-lg truncate">{article.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt || article.content.substring(0, 100)}...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePublish(article)}
                  title={article.published ? "Unpublish" : "Publish"}
                >
                  {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id, article.title)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsTab;
