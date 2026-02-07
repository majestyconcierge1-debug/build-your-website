import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar } from "lucide-react";

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

const News = () => {
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

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

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getArticleContent = (article: NewsArticle) => {
    return language === 'fr' && article.content_fr ? article.content_fr : article.content;
  };

  const getArticleTitle = (article: NewsArticle) => {
    return language === 'fr' && article.title_fr ? article.title_fr : article.title;
  };

  const getArticleExcerpt = (article: NewsArticle) => {
    if (language === 'fr' && article.excerpt_fr) return article.excerpt_fr;
    if (article.excerpt) return article.excerpt;
    // Strip HTML tags for excerpt fallback
    const text = article.content.replace(/<[^>]*>/g, '');
    return text.substring(0, 150) + '...';
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
            <div className="absolute inset-0 bg-black/40" />
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
                    alt={getArticleTitle(selectedArticle)}
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
                  {getArticleTitle(selectedArticle)}
                </h1>

                <div 
                  className="prose prose-invert max-w-none mb-16 
                    [&_h1]:font-display [&_h1]:text-3xl [&_h1]:mb-6
                    [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-accent
                    [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
                    [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                    [&_li]:text-foreground/80
                    [&_a]:text-accent [&_a]:underline [&_a]:hover:text-accent/80
                    [&_img]:rounded-lg [&_img]:my-8 [&_img]:w-full [&_img]:object-cover
                    [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: getArticleContent(selectedArticle) }}
                />
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
                          alt={getArticleTitle(article)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-3">{formatDate(article.created_at)}</p>
                      <h3 className="font-display text-xl mb-3 group-hover:text-accent transition-colors">
                        {getArticleTitle(article)}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {getArticleExcerpt(article)}
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
