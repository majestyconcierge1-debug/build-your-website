import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, MapPin, Users, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const categories = [
  { value: "all", label: { en: "All", fr: "Tout" } },
  { value: "city_tour", label: { en: "City Tour", fr: "Visite de Ville" } },
  { value: "luxury", label: { en: "Luxury", fr: "Luxe" } },
  { value: "adventure", label: { en: "Adventure", fr: "Aventure" } },
  { value: "food", label: { en: "Food & Wine", fr: "Gastronomie" } },
  { value: "culture", label: { en: "Culture", fr: "Culture" } },
  { value: "nightlife", label: { en: "Nightlife", fr: "Vie Nocturne" } },
  { value: "wine_tasting", label: { en: "Wine Tasting", fr: "Dégustation" } },
  { value: "tour", label: { en: "Private Tour", fr: "Visite Privée" } },
  { value: "wellness", label: { en: "Wellness", fr: "Bien-être" } },
  { value: "sports", label: { en: "Sports", fr: "Sports" } },
];

const Experiences = () => {
  const { language } = useLanguage();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data } = await supabase
        .from("experiences")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (data) setExperiences(data);
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  const filtered = experiences.filter((exp) => {
    const matchesCat = selectedCategory === "all" || exp.category === selectedCategory;
    const title = language === "fr" && exp.title_fr ? exp.title_fr : exp.title;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || exp.city?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>{language === "fr" ? "Expériences & Tours | Majesty Concierge" : "Experiences & Tours | Majesty Concierge"}</title>
        <meta name="description" content={language === "fr" ? "Découvrez nos expériences et tours de luxe exclusifs" : "Discover our exclusive luxury experiences and tours"} />
      </Helmet>
      <Navbar />
      <main className="pt-32">
        {/* Hero */}
        <section className="relative py-20 bg-emerald-dark text-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
              {language === "fr" ? "Expériences Exclusives" : "Exclusive Experiences"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {language === "fr"
                ? "Des expériences uniques et inoubliables, soigneusement sélectionnées pour vous"
                : "Unique and unforgettable experiences, carefully curated just for you"}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container px-4 md:px-6 flex flex-wrap gap-4 items-center">
            <Input
              placeholder={language === "fr" ? "Rechercher..." : "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {language === "fr" ? cat.label.fr : cat.label.en}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-muted animate-pulse rounded-xl h-[400px]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                {language === "fr" ? "Aucune expérience trouvée." : "No experiences found."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((exp) => {
                  const title = language === "fr" && exp.title_fr ? exp.title_fr : exp.title;
                  const shortDesc = language === "fr" && exp.short_description_fr ? exp.short_description_fr : exp.short_description;
                  const slug = exp.slug || exp.id;

                  return (
                    <Link
                      key={exp.id}
                      to={`/experiences/${slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={exp.featured_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {exp.best_seller && (
                          <Badge className="absolute top-3 left-3 bg-yellow-500 text-white gap-1">
                            <Award className="w-3 h-3" /> Best Seller
                          </Badge>
                        )}
                        {exp.featured && !exp.best_seller && (
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground gap-1">
                            <Star className="w-3 h-3" /> Featured
                          </Badge>
                        )}
                        {exp.level && (
                          <Badge variant="outline" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
                            {exp.level}
                          </Badge>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-accent uppercase tracking-wider mb-2">
                          {exp.category?.replace("_", " ")}
                        </p>
                        <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {title}
                        </h3>
                        {shortDesc && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{shortDesc}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {exp.city && (
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {exp.city}</span>
                          )}
                          {exp.duration && (
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exp.duration}</span>
                          )}
                          {exp.max_participants && (
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max {exp.max_participants}</span>
                          )}
                        </div>
                        {exp.price && (
                          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-lg font-semibold text-accent">
                              {exp.currency === "EUR" ? "€" : exp.currency === "USD" ? "$" : exp.currency === "GBP" ? "£" : exp.currency}{exp.price}
                              <span className="text-xs text-muted-foreground font-normal ml-1">
                                / {exp.price_type === "per_person" ? (language === "fr" ? "pers." : "person") : exp.price_type === "per_group" ? (language === "fr" ? "groupe" : "group") : ""}
                              </span>
                            </span>
                            <span className="text-sm text-accent font-medium group-hover:underline">
                              {language === "fr" ? "Voir détails →" : "View details →"}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Experiences;
