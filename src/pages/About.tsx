import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Wine, 
  Camera, 
  Heart, 
  Trophy, 
  PartyPopper,
  Star,
  Award,
  Users
} from "lucide-react";

const About = () => {
  const { language } = useLanguage();

  const activities = [
    {
      id: "private-tours",
      icon: Camera,
      title: { en: "Private Tours", fr: "Visites Privées" },
      description: {
        en: "Exclusive guided tours of the French Riviera, Italian coast, and beyond. Experience hidden gems and iconic landmarks with knowledgeable local guides.",
        fr: "Visites guidées exclusives de la Côte d'Azur, de la côte italienne et au-delà. Découvrez des joyaux cachés et des sites emblématiques avec des guides locaux."
      },
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80"
    },
    {
      id: "wine-tasting",
      icon: Wine,
      title: { en: "Wine Tasting Experiences", fr: "Dégustations de Vin" },
      description: {
        en: "Journey through renowned vineyards and private cellars. Savor exceptional wines while learning from sommeliers and winemakers.",
        fr: "Parcourez des vignobles renommés et des caves privées. Savourez des vins exceptionnels en apprenant auprès de sommeliers."
      },
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80"
    },
    {
      id: "wedding-planning",
      icon: Heart,
      title: { en: "Wedding Planning", fr: "Organisation de Mariages" },
      description: {
        en: "Create your dream wedding in the most stunning Mediterranean venues. From intimate ceremonies to grand celebrations, every detail perfected.",
        fr: "Créez le mariage de vos rêves dans les plus beaux lieux méditerranéens. Des cérémonies intimes aux grandes célébrations."
      },
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
    },
    {
      id: "sports-events",
      icon: Trophy,
      title: { en: "Sports Events Planning", fr: "Événements Sportifs" },
      description: {
        en: "VIP access to Monaco Grand Prix, tennis championships, and yacht regattas. Experience the thrill with premium hospitality.",
        fr: "Accès VIP au Grand Prix de Monaco, championnats de tennis et régates. Vivez l'émotion avec une hospitalité premium."
      },
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80"
    },
    {
      id: "birthday-events",
      icon: PartyPopper,
      title: { en: "Birthday & Private Events", fr: "Anniversaires & Événements Privés" },
      description: {
        en: "Celebrate life's milestones with unforgettable private events. From milestone birthdays to exclusive gatherings, we create magical moments.",
        fr: "Célébrez les moments importants avec des événements privés inoubliables. Des anniversaires aux réceptions exclusives."
      },
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80"
    },
  ];

  const stats = [
    { value: "20+", label: { en: "Years Experience", fr: "Années d'Expérience" } },
    { value: "500+", label: { en: "Properties Managed", fr: "Propriétés Gérées" } },
    { value: "5", label: { en: "Countries", fr: "Pays" } },
    { value: "1000+", label: { en: "Happy Clients", fr: "Clients Satisfaits" } },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? 'À Propos de Majesty Concierge | Services de Luxe' : 'About Majesty Concierge | Luxury Services'}</title>
        <meta name="description" content={language === 'fr' 
          ? 'Découvrez Majesty Concierge, votre partenaire de confiance pour l\'immobilier de luxe et les services de conciergerie haut de gamme.'
          : 'Discover Majesty Concierge, your trusted partner for luxury real estate and high-end concierge services.'} 
        />
      </Helmet>

      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
              alt="About Majesty Concierge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-purple/70" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-foreground">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              {language === 'fr' ? 'À Propos de Nous' : 'About Us'}
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Votre partenaire de confiance pour une vie de luxe sans souci.'
                : 'Your trusted partner for worry-free luxury living.'}
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-4">
                  <span className="w-8 h-px bg-accent" />
                  Majesty Concierge
                  <span className="w-8 h-px bg-accent" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl mb-6">
                  {language === 'fr' 
                    ? 'Excellence en Conciergerie & Immobilier de Luxe'
                    : 'Excellence in Concierge & Luxury Real Estate'}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {language === 'fr'
                      ? 'Fondée avec une vision d\'excellence, Majesty Concierge est devenue une référence dans les services de conciergerie et l\'immobilier de luxe à travers la Méditerranée et au-delà.'
                      : 'Founded with a vision of excellence, Majesty Concierge has become a reference in concierge services and luxury real estate across the Mediterranean and beyond.'}
                  </p>
                  <p>
                    {language === 'fr'
                      ? 'Notre équipe de professionnels dévoués travaille sans relâche pour transformer vos aspirations en réalité, qu\'il s\'agisse de trouver la propriété parfaite, d\'organiser un événement inoubliable ou de gérer votre patrimoine immobilier.'
                      : 'Our team of dedicated professionals works tirelessly to transform your aspirations into reality, whether finding the perfect property, organizing an unforgettable event, or managing your real estate portfolio.'}
                  </p>
                  <p>
                    {language === 'fr'
                      ? 'Avec une présence en France, Italie, Tunisie, Émirats Arabes Unis et Algérie, nous offrons une expertise locale avec des standards internationaux.'
                      : 'With a presence in France, Italy, Tunisia, UAE, and Algeria, we offer local expertise with international standards.'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80"
                  alt="Luxury property"
                  className="w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80"
                  alt="Property management"
                  className="w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
                  alt="Concierge service"
                  className="w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80"
                  alt="Luxury event"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-purple text-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="font-display text-4xl md:text-5xl text-accent mb-2">{stat.value}</div>
                  <div className="text-foreground/80">{stat.label[language]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 flex items-center justify-center rounded-full">
                  <Star className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-2">{language === 'fr' ? 'Excellence' : 'Excellence'}</h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'fr'
                    ? 'Nous visons la perfection dans chaque détail de nos services.'
                    : 'We strive for perfection in every detail of our services.'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 flex items-center justify-center rounded-full">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-2">{language === 'fr' ? 'Discrétion' : 'Discretion'}</h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'fr'
                    ? 'Votre vie privée et confidentialité sont notre priorité absolue.'
                    : 'Your privacy and confidentiality are our absolute priority.'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 flex items-center justify-center rounded-full">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-2">{language === 'fr' ? 'Personnalisation' : 'Personalization'}</h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'fr'
                    ? 'Chaque client est unique, nos services le sont aussi.'
                    : 'Every client is unique, and so are our services.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-4">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Nos Activités' : 'Our Activities'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-4">
                {language === 'fr' ? 'Expériences Exclusives' : 'Exclusive Experiences'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Découvrez notre gamme d\'expériences et activités de luxe conçues pour créer des souvenirs inoubliables.'
                  : 'Discover our range of luxury experiences and activities designed to create unforgettable memories.'}
              </p>
            </div>

            <div className="space-y-12">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title[language]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-accent flex items-center justify-center">
                          <activity.icon className="w-6 h-6 text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="font-display text-2xl md:text-3xl mb-4">{activity.title[language]}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {activity.description[language]}
                    </p>
                    <Link to="/contact">
                      <Button variant="luxury-outline">
                        {language === 'fr' ? 'En Savoir Plus' : 'Learn More'}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-purple text-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              {language === 'fr' ? 'Prêt à Vivre l\'Excellence ?' : 'Ready to Experience Excellence?'}
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto mb-8">
              {language === 'fr'
                ? 'Contactez-nous pour découvrir comment nous pouvons vous accompagner.'
                : 'Contact us to discover how we can assist you.'}
            </p>
            <Link to="/contact">
              <Button variant="luxury" size="xl">
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;