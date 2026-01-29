import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, MessageCircle, Calendar, User } from "lucide-react";
import { z } from "zod";

interface NewsArticle {
  id: string;
  title: string;
  title_fr: string | null;
  content: string;
  content_fr: string | null;
  excerpt: string | null;
  excerpt_fr: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const commentSchema = z.object({
  author_name: z.string().min(2, "Name must be at least 2 characters").max(50),
  author_email: z.string().email("Please enter a valid email"),
  content: z.string().min(10, "Comment must be at least 10 characters").max(500),
  mathAnswer: z.string(),
});

const News = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comment form state
  const [commentForm, setCommentForm] = useState({
    author_name: "",
    author_email: "",
    content: "",
    mathAnswer: "",
  });
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // Anti-bot math question
  const [mathQuestion, setMathQuestion] = useState({ a: 0, b: 0 });

  useEffect(() => {
    generateMathQuestion();
    fetchArticles();
  }, []);

  const generateMathQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({ a, b });
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (articleId: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, author_name, content, created_at")
        .eq("article_id", articleId)
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    fetchComments(article.id);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentErrors({});

    // Validate math answer
    const correctAnswer = mathQuestion.a + mathQuestion.b;
    if (parseInt(commentForm.mathAnswer) !== correctAnswer) {
      setCommentErrors({ mathAnswer: language === 'fr' ? "Réponse incorrecte" : "Incorrect answer" });
      return;
    }

    try {
      commentSchema.parse(commentForm);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setCommentErrors(fieldErrors);
        return;
      }
    }

    if (!selectedArticle) return;

    setSubmittingComment(true);
    try {
      const { error } = await supabase.from("comments").insert([
        {
          article_id: selectedArticle.id,
          author_name: commentForm.author_name,
          author_email: commentForm.author_email,
          content: commentForm.content,
          approved: false,
        },
      ]);

      if (error) throw error;

      toast({
        title: language === 'fr' ? "Commentaire envoyé" : "Comment submitted",
        description: language === 'fr' 
          ? "Votre commentaire sera affiché après modération."
          : "Your comment will be displayed after moderation.",
      });

      setCommentForm({ author_name: "", author_email: "", content: "", mathAnswer: "" });
      generateMathQuestion();
    } catch (error) {
      toast({
        title: t.common.error,
        description: language === 'fr' ? "Échec de l'envoi." : "Failed to submit comment.",
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
              alt="News"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-midnight/80" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              {language === 'fr' ? 'Actualités' : 'News'}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
              {t.newsPage.title}
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              {t.newsPage.subtitle}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="text-center">
                <p className="text-muted-foreground">{t.common.loading}</p>
              </div>
            ) : selectedArticle ? (
              /* Article Detail View */
              <div className="max-w-4xl mx-auto">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedArticle(null)}
                  className="mb-8"
                >
                  ← {t.common.back}
                </Button>

                {selectedArticle.image_url && (
                  <img
                    src={selectedArticle.image_url}
                    alt={language === 'fr' && selectedArticle.title_fr ? selectedArticle.title_fr : selectedArticle.title}
                    className="w-full h-[400px] object-cover mb-8"
                  />
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedArticle.created_at)}
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl mb-8">
                  {language === 'fr' && selectedArticle.title_fr ? selectedArticle.title_fr : selectedArticle.title}
                </h1>

                <div className="prose prose-invert max-w-none mb-16">
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {language === 'fr' && selectedArticle.content_fr ? selectedArticle.content_fr : selectedArticle.content}
                  </p>
                </div>

                {/* Comments Section */}
                <div className="border-t border-border pt-12">
                  <h2 className="font-display text-2xl mb-8 flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-accent" />
                    {language === 'fr' ? 'Commentaires' : 'Comments'} ({comments.length})
                  </h2>

                  {/* Comments List */}
                  <div className="space-y-6 mb-12">
                    {comments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        {language === 'fr' ? 'Aucun commentaire pour le moment.' : 'No comments yet.'}
                      </p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="bg-card p-6 border border-border">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                              <User className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium">{comment.author_name}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</p>
                            </div>
                          </div>
                          <p className="text-foreground/80">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Comment Form */}
                  <div className="bg-card p-8 border border-border">
                    <h3 className="font-display text-xl mb-6">
                      {language === 'fr' ? 'Laisser un commentaire' : 'Leave a Comment'}
                    </h3>
                    <form onSubmit={handleCommentSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="author_name">{language === 'fr' ? 'Nom' : 'Name'} *</Label>
                          <Input
                            id="author_name"
                            value={commentForm.author_name}
                            onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                            className={`bg-background ${commentErrors.author_name ? "border-destructive" : ""}`}
                          />
                          {commentErrors.author_name && (
                            <p className="text-sm text-destructive">{commentErrors.author_name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="author_email">Email *</Label>
                          <Input
                            id="author_email"
                            type="email"
                            value={commentForm.author_email}
                            onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                            className={`bg-background ${commentErrors.author_email ? "border-destructive" : ""}`}
                          />
                          {commentErrors.author_email && (
                            <p className="text-sm text-destructive">{commentErrors.author_email}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">{language === 'fr' ? 'Commentaire' : 'Comment'} *</Label>
                        <Textarea
                          id="content"
                          value={commentForm.content}
                          onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                          className={`min-h-[120px] bg-background ${commentErrors.content ? "border-destructive" : ""}`}
                        />
                        {commentErrors.content && (
                          <p className="text-sm text-destructive">{commentErrors.content}</p>
                        )}
                      </div>

                      {/* Anti-bot verification */}
                      <div className="space-y-2">
                        <Label htmlFor="mathAnswer">
                          {language === 'fr' ? 'Vérification anti-bot:' : 'Anti-bot verification:'} {mathQuestion.a} + {mathQuestion.b} = ?
                        </Label>
                        <Input
                          id="mathAnswer"
                          value={commentForm.mathAnswer}
                          onChange={(e) => setCommentForm({ ...commentForm, mathAnswer: e.target.value })}
                          className={`bg-background max-w-[150px] ${commentErrors.mathAnswer ? "border-destructive" : ""}`}
                          placeholder="?"
                        />
                        {commentErrors.mathAnswer && (
                          <p className="text-sm text-destructive">{commentErrors.mathAnswer}</p>
                        )}
                      </div>

                      <Button type="submit" variant="luxury" disabled={submittingComment}>
                        {submittingComment 
                          ? t.common.loading 
                          : (language === 'fr' ? 'Publier le commentaire' : 'Post Comment')}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ) : articles.length === 0 ? (
              /* No Articles */
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 bg-accent/10 mx-auto flex items-center justify-center mb-8">
                  <Newspaper className="w-12 h-12 text-accent" />
                </div>
                <h2 className="font-display text-3xl mb-4">{t.newsPage.comingSoon}</h2>
                <p className="text-muted-foreground text-lg">{t.newsPage.comingSoonDesc}</p>
              </div>
            ) : (
              /* Articles Grid */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-card border border-border overflow-hidden hover:border-accent/50 transition-colors duration-300 cursor-pointer group"
                    onClick={() => handleArticleClick(article)}
                  >
                    {article.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={language === 'fr' && article.title_fr ? article.title_fr : article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-3">{formatDate(article.created_at)}</p>
                      <h3 className="font-display text-xl mb-3 group-hover:text-accent transition-colors">
                        {language === 'fr' && article.title_fr ? article.title_fr : article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {language === 'fr' && article.excerpt_fr 
                          ? article.excerpt_fr 
                          : article.excerpt || article.content.substring(0, 150) + '...'}
                      </p>
                      <p className="text-accent text-sm mt-4 font-medium">
                        {t.newsPage.readMore} →
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
