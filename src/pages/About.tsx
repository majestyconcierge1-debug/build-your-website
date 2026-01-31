import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import LuxuryCarousel from "@/components/LuxuryCarousel";
import { 
  Heart, 
  Globe, 
  Award, 
  Users,
  Wine,
  MapPin,
  Cake,
  Medal,
  PartyPopper
} from "lucide-react";

const aboutCarouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    title: { en: "Luxury Concierge Excellence", fr: "Excellence Conciergerie de Luxe" },
    subtitle: { en: "Serving discerning clients worldwide", fr: "Au service de clients exigeants" },
  },
  {
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80",
    title: { en: "Yacht Experiences", fr: "Expériences Yacht" },
    subtitle: { en: "Private Mediterranean cruises", fr: "Croisières privées en Méditerranée" },
  },
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    title: { en: "Exclusive Events", fr: "Événements Exclusifs" },
    subtitle: { en: "Bespoke celebrations", fr: "Célébrations sur mesure" },
  },
];

const About = () => {
  const { language } = useLanguage();

  const activities = [
    {
      icon: Wine,
      title: language === 'fr' ? "Dégustations de Vin" : "Wine Tasting Experiences",
      description: language === 'fr' 
        ? "Découvrez les meilleurs vignobles de France, d'Italie et au-delà avec des dégustations privées guidées par des sommeliers experts."
        : "Discover the finest vineyards in France, Italy, and beyond with private tastings guided by expert sommeliers.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    },
    {
      icon: MapPin,
      title: language === 'fr' ? "Visites Privées" : "Private Tours",
      description: language === 'fr'
        ? "Explorez des destinations exclusives avec des guides privés. De la Côte d'Azur à Dubaï, vivez des expériences uniques."
        : "Explore exclusive destinations with private guides. From the French Riviera to Dubai, experience the extraordinary.",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    },
    {
      icon: Heart,
      title: language === 'fr' ? "Organisation de Mariages" : "Wedding Planning",
      description: language === 'fr'
        ? "Créez le mariage de vos rêves dans des châteaux et lieux exceptionnels. Service complet de A à Z."
        : "Create your dream wedding in stunning châteaux and exclusive venues. Complete service from A to Z.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    },
    {
      icon: Medal,
      title: language === 'fr' ? "Événements Sportifs" : "Sports Events",
      description: language === 'fr'
        ? "Accès VIP aux plus grands événements sportifs: Monaco Grand Prix, Roland Garros, matchs de football d'élite."
        : "VIP access to major sporting events: Monaco Grand Prix, Roland Garros, elite football matches.",
      image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    },
    {
      icon: Cake,
      title: language === 'fr' ? "Anniversaires & Célébrations" : "Birthdays & Celebrations",
      description: language === 'fr'
        ? "Des fêtes d'anniversaire inoubliables dans des lieux d'exception. Chaque détail est soigneusement orchestré."
        : "Unforgettable birthday parties in exceptional venues. Every detail carefully orchestrated.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    },
    {
      icon: PartyPopper,
      title: language === 'fr' ? "Événements Privés" : "Private Events",
      description: language === 'fr'
        ? "Galas, réceptions d'entreprise, soirées privées. Nous créons des moments magiques sur mesure."
        : "Galas, corporate receptions, private parties. We create magical bespoke moments.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff32?w=800&q=80",
    },
  ];

  const values = [
    {
      icon: Award,
      title: language === 'fr' ? "Excellence" : "Excellence",
      description: language === 'fr'
        ? "Nous visons la perfection dans chaque détail"
        : "We strive for perfection in every detail",
    },
    {
      icon: Users,
      title: language === 'fr' ? "Discrétion" : "Discretion",
      description: language === 'fr'
        ? "Votre vie privée est notre priorité absolue"
        : "Your privacy is our absolute priority",
    },
    {
      icon: Globe,
      title: language === 'fr' ? "Réseau International" : "Global Network",
      description: language === 'fr'
        ? "Présence dans les destinations les plus exclusives"
        : "Presence in the most exclusive destinations",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? "À Propos - Majesty Concierge | Services de Luxe" : "About Us - Majesty Concierge | Luxury Services"}</title>
        <meta 
          name="description" 
          content={language === 'fr' 
            ? "Découvrez Majesty Concierge, votre partenaire de confiance pour les services de conciergerie de luxe, l'immobilier premium et les expériences exclusives."
            : "Discover Majesty Concierge, your trusted partner for luxury concierge services, premium real estate, and exclusive experiences."
          }
        />
      </Helmet>

      <Navbar />
      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="relative">
          <LuxuryCarousel
            slides={aboutCarouselSlides}
            language={language}
            height="h-[60vh]"
            interval={5000}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {language === 'fr' ? 'À Propos de Nous' : 'About Us'}
              </h1>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-8">
              {language === 'fr' ? 'Bienvenue chez Majesty Concierge' : 'Welcome to Majesty Concierge'}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {language === 'fr'
                ? "Majesty Concierge est une société internationale de conciergerie de luxe dédiée à offrir des services exceptionnels aux clients les plus exigeants. Notre équipe d'experts passionnés s'engage à transformer vos rêves en réalité, qu'il s'agisse de trouver la propriété parfaite, d'organiser un événement inoubliable ou de créer des expériences sur mesure."
                : "Majesty Concierge is an international luxury concierge company dedicated to providing exceptional services to the most discerning clients. Our team of passionate experts is committed to turning your dreams into reality, whether it's finding the perfect property, organizing an unforgettable event, or creating bespoke experiences."}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {language === 'fr'
                ? "Avec une présence en France, Italie, Tunisie, Émirats Arabes Unis et Algérie, nous offrons un service personnalisé qui allie l'excellence locale à des standards internationaux."
                : "With a presence in France, Italy, Tunisia, the United Arab Emirates, and Algeria, we offer personalized service that combines local excellence with international standards."}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="text-center p-8 bg-card border border-border">
                  <div className="w-16 h-16 bg-accent/10 mx-auto flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Nos Activités' : 'Our Activities'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                {language === 'fr' ? 'Expériences Exclusives' : 'Exclusive Experiences'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? "Découvrez notre gamme complète de services et d'expériences sur mesure"
                  : "Discover our complete range of bespoke services and experiences"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-card border border-border overflow-hidden group hover:border-accent/50 transition-colors"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                        <activity.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-3">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
