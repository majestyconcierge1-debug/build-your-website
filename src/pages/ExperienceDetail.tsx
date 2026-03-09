import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, MapPin, Users, Globe, CheckCircle, XCircle, ArrowLeft, Accessibility, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ExperienceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      // Try by slug first, then by id
      let { data } = await supabase.from("experiences").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      if (!data) {
        const res = await supabase.from("experiences").select("*").eq("id", slug).eq("published", true).maybeSingle();
        data = res.data;
      }
      setExperience(data);
      setLoading(false);
    };
    if (slug) fetch();
  }, [slug]);

  if (loading) return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>
    </>
  );

  if (!experience) return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">{language === "fr" ? "Expérience introuvable" : "Experience not found"}</p>
        <Button asChild variant="luxury"><Link to="/experiences">← {language === "fr" ? "Retour" : "Back"}</Link></Button>
      </div>
      <Footer />
    </>
  );

  const t = (en: string | null, fr: string | null) => language === "fr" && fr ? fr : en || "";
  const title = t(experience.title, experience.title_fr);
  const description = t(experience.description, experience.description_fr);
  const included = t(experience.included, experience.included_fr);
  const notIncluded = t(experience.not_included, experience.not_included_fr);
  const cancellation = t(experience.cancellation_policy, experience.cancellation_policy_fr);
  const whatToBring = t(experience.what_to_bring, experience.what_to_bring_fr);

  const allImages = [experience.featured_image, ...(experience.images || [])].filter(Boolean);
  const currencySymbol = experience.currency === "EUR" ? "€" : experience.currency === "USD" ? "$" : experience.currency === "GBP" ? "£" : experience.currency || "€";

  const whatsappMessage = encodeURIComponent(`Hello, I'm interested in the experience: ${experience.title}. Could you provide more details?`);
  const whatsappUrl = `https://wa.me/15052212757?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>{experience.meta_title || `${title} | Majesty Concierge`}</title>
        <meta name="description" content={experience.meta_description || t(experience.short_description, experience.short_description_fr) || ""} />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container px-4 md:px-6 py-4">
          <Link to="/experiences" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> {language === "fr" ? "Toutes les expériences" : "All Experiences"}
          </Link>
        </div>

        <div className="container px-4 md:px-6 pb-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-3 space-y-8">
              {/* Gallery */}
              {allImages.length > 0 && (
                <div className="space-y-3">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden">
                    <img src={allImages[selectedImage]} alt={title} className="w-full h-full object-cover" />
                  </div>
                  {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {allImages.map((img: string, i: number) => (
                        <button key={i} onClick={() => setSelectedImage(i)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-accent" : "border-transparent"}`}>
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Video */}
              {experience.video_url && (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe src={experience.video_url.replace("watch?v=", "embed/")} className="w-full h-full" allowFullScreen title="Video" />
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl mb-4">{language === "fr" ? "Description" : "About this experience"}</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</div>
              </div>

              {/* Included / Not Included */}
              {(included || notIncluded) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {included && (
                    <div>
                      <h3 className="font-display text-lg mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> {language === "fr" ? "Inclus" : "What's Included"}</h3>
                      <ul className="space-y-2">
                        {included.split("\n").filter(Boolean).map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {notIncluded && (
                    <div>
                      <h3 className="font-display text-lg mb-3 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-400" /> {language === "fr" ? "Non Inclus" : "Not Included"}</h3>
                      <ul className="space-y-2">
                        {notIncluded.split("\n").filter(Boolean).map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* What to Bring */}
              {whatToBring && (
                <div>
                  <h3 className="font-display text-lg mb-3">{language === "fr" ? "À apporter" : "What to Bring"}</h3>
                  <ul className="space-y-2">
                    {whatToBring.split("\n").filter(Boolean).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cancellation */}
              {cancellation && (
                <div className="bg-muted rounded-xl p-6">
                  <h3 className="font-display text-lg mb-2">{language === "fr" ? "Politique d'annulation" : "Cancellation Policy"}</h3>
                  <p className="text-sm text-muted-foreground">{cancellation}</p>
                </div>
              )}
            </div>

            {/* Right: Sticky Info Card */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-accent text-accent-foreground">{experience.category?.replace("_", " ")}</Badge>
                    {experience.level && <Badge variant="outline">{experience.level}</Badge>}
                    {experience.best_seller && <Badge className="bg-yellow-500 text-white">Best Seller</Badge>}
                  </div>

                  <h1 className="font-display text-2xl lg:text-3xl">{title}</h1>

                  {experience.price && (
                    <div className="text-3xl font-bold text-accent">
                      {currencySymbol}{experience.price}
                      <span className="text-sm text-muted-foreground font-normal ml-1">
                        / {experience.price_type === "per_person" ? (language === "fr" ? "personne" : "person") : experience.price_type === "per_group" ? "group" : ""}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    {experience.city && (
                      <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /><span>{experience.city}, {experience.country}</span></div>
                    )}
                    {experience.duration && (
                      <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-accent" /><span>{experience.duration}</span></div>
                    )}
                    {experience.max_participants && (
                      <div className="flex items-center gap-3"><Users className="w-4 h-4 text-accent" /><span>Max {experience.max_participants} {language === "fr" ? "participants" : "participants"}</span></div>
                    )}
                    {experience.languages?.length > 0 && (
                      <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-accent" /><span>{experience.languages.join(", ")}</span></div>
                    )}
                    {experience.accessibility && (
                      <div className="flex items-center gap-3"><Accessibility className="w-4 h-4 text-accent" /><span>{language === "fr" ? "Accessible PMR" : "Wheelchair accessible"}</span></div>
                    )}
                  </div>

                  {(experience.start_point || experience.end_point) && (
                    <div className="space-y-2 text-sm border-t border-border pt-4">
                      {experience.start_point && <div><span className="font-medium">{language === "fr" ? "Départ :" : "Start:"}</span> {experience.start_point}</div>}
                      {experience.end_point && <div><span className="font-medium">{language === "fr" ? "Arrivée :" : "End:"}</span> {experience.end_point}</div>}
                    </div>
                  )}

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="luxury" className="w-full text-lg py-6">
                      {language === "fr" ? "Réserver Maintenant" : "Book Now"}
                    </Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground">
                    {language === "fr" ? "Vous serez redirigé vers WhatsApp" : "You'll be redirected to WhatsApp"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExperienceDetail;
