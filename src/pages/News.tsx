import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Newspaper } from "lucide-react";

const News = () => {
  const { t, language } = useLanguage();

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

        {/* Coming Soon */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-accent/10 mx-auto flex items-center justify-center mb-8">
                <Newspaper className="w-12 h-12 text-accent" />
              </div>
              <h2 className="font-display text-3xl mb-4">{t.newsPage.comingSoon}</h2>
              <p className="text-muted-foreground text-lg">{t.newsPage.comingSoonDesc}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
