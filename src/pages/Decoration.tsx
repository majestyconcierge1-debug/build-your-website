import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Helmet } from "react-helmet-async";
import { 
  Paintbrush, 
  Bath, 
  ChefHat, 
  Waves, 
  Building, 
  Home,
  Store,
  Sparkles,
  Palette,
  Sofa,
  Lamp
} from "lucide-react";

// Before/After renovation images
const renovationServices = [
  {
    id: "painting",
    title: { en: "Luxury Painting", fr: "Peinture de Luxe" },
    description: {
      en: "Expert color consulting and premium paint application for walls, ceilings, and decorative finishes that transform your space with sophistication.",
      fr: "Conseils couleurs experts et application de peinture premium pour murs, plafonds et finitions décoratives qui transforment votre espace avec sophistication."
    },
    icon: Paintbrush,
    beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    id: "tiling",
    title: { en: "Premium Tiling", fr: "Carrelage Premium" },
    description: {
      en: "Italian marble, ceramic masterpieces, and bespoke mosaic installations for floors and walls that define luxury living.",
      fr: "Marbre italien, chefs-d'œuvre en céramique et installations de mosaïques sur mesure pour sols et murs qui définissent le luxe."
    },
    icon: Sparkles,
    beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
  },
  {
    id: "bathrooms",
    title: { en: "Bathroom Renovation", fr: "Rénovation Salle de Bain" },
    description: {
      en: "Complete bathroom transformations featuring designer fixtures, spa-quality finishes, and intelligent storage solutions.",
      fr: "Transformations complètes de salles de bain avec équipements design, finitions spa et solutions de rangement intelligentes."
    },
    icon: Bath,
    beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80",
  },
  {
    id: "kitchens",
    title: { en: "Kitchen Design", fr: "Design Cuisine" },
    description: {
      en: "Gourmet kitchen spaces with premium appliances, custom cabinetry, and contemporary designs for culinary excellence.",
      fr: "Espaces cuisine gastronomique avec appareils haut de gamme, ébénisterie sur mesure et designs contemporains."
    },
    icon: ChefHat,
    beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    id: "pools",
    title: { en: "Swimming Pools", fr: "Piscines" },
    description: {
      en: "Luxury pool construction and renovation with infinity edges, heating systems, and integrated lighting.",
      fr: "Construction et rénovation de piscines de luxe avec débordements, systèmes de chauffage et éclairage intégré."
    },
    icon: Waves,
    beforeImage: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
  {
    id: "apartments",
    title: { en: "Apartment Renovation", fr: "Rénovation Appartement" },
    description: {
      en: "Complete apartment transformations optimizing space, light, and modern comfort while preserving architectural heritage.",
      fr: "Transformations complètes d'appartements optimisant espace, lumière et confort moderne tout en préservant le patrimoine."
    },
    icon: Building,
    beforeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    id: "penthouses",
    title: { en: "Penthouse Renovation", fr: "Rénovation Penthouse" },
    description: {
      en: "Exclusive penthouse renovations with panoramic views optimization, rooftop terraces, and bespoke luxury finishes.",
      fr: "Rénovations exclusives de penthouses avec optimisation des vues panoramiques, terrasses rooftop et finitions luxe."
    },
    icon: Home,
    beforeImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    id: "villas",
    title: { en: "Villa Renovation", fr: "Rénovation Villa" },
    description: {
      en: "Complete villa transformations including landscaping, outdoor living spaces, and integration with Mediterranean lifestyle.",
      fr: "Transformations complètes de villas incluant aménagement paysager, espaces extérieurs et intégration au style méditerranéen."
    },
    icon: Home,
    beforeImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    id: "commercial",
    title: { en: "Commercial Spaces", fr: "Espaces Commerciaux" },
    description: {
      en: "Premium commercial renovations for boutiques, offices, and hospitality venues that reflect brand excellence.",
      fr: "Rénovations commerciales premium pour boutiques, bureaux et établissements hôteliers reflétant l'excellence de la marque."
    },
    icon: Store,
    beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
  },
];

const decorationServices = [
  {
    id: "interior-design",
    title: { en: "Bespoke Interior Design", fr: "Design Intérieur Sur Mesure" },
    description: {
      en: "Personalized interior design services creating unique living spaces that reflect your personality and lifestyle aspirations.",
      fr: "Services de design intérieur personnalisés créant des espaces de vie uniques reflétant votre personnalité et aspirations."
    },
    icon: Palette,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    id: "furniture",
    title: { en: "Luxury Furniture Selection", fr: "Sélection Mobilier de Luxe" },
    description: {
      en: "Access to exclusive designer furniture collections and custom-made pieces from the world's finest artisans.",
      fr: "Accès à des collections de mobilier design exclusives et pièces sur mesure des meilleurs artisans du monde."
    },
    icon: Sofa,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "lighting",
    title: { en: "Lighting Design", fr: "Design Éclairage" },
    description: {
      en: "Sophisticated lighting solutions combining ambient, task, and accent lighting to create the perfect atmosphere.",
      fr: "Solutions d'éclairage sophistiquées combinant lumière ambiante, fonctionnelle et d'accentuation pour une atmosphère parfaite."
    },
    icon: Lamp,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
];

const Decoration = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? 'Décoration & Rénovation de Luxe | Majesty Concierge' : 'Luxury Decoration & Renovation | Majesty Concierge'}</title>
        <meta name="description" content={language === 'fr' 
          ? 'Services de décoration et rénovation haut de gamme. Transformations avant/après exceptionnelles pour propriétés de luxe.'
          : 'High-end decoration and renovation services. Exceptional before/after transformations for luxury properties.'} 
        />
      </Helmet>

      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              alt="Luxury Interior Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center text-foreground">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              {language === 'fr' ? 'Design & Rénovation' : 'Design & Renovation'}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              {language === 'fr' ? 'Décoration & Rénovation' : 'Decoration & Renovation'}
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Transformez votre propriété en chef-d\'œuvre avec nos services de rénovation et décoration de luxe.'
                : 'Transform your property into a masterpiece with our luxury renovation and decoration services.'}
            </p>
          </div>
        </section>

        {/* Renovation Services - Before/After */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-4">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Nos Services' : 'Our Services'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-4">
                {language === 'fr' ? 'Services de Rénovation' : 'Renovation Services'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Découvrez nos transformations exceptionnelles avec des images avant/après de nos projets de rénovation.'
                  : 'Discover our exceptional transformations with before/after images of our renovation projects.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renovationServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-500 group"
                >
                  {/* Before/After Image Slider */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={service.beforeImage}
                          alt={`Before - ${service.title[language]}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {language === 'fr' ? 'Avant' : 'Before'}
                        </div>
                      </div>
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={service.afterImage}
                          alt={`After - ${service.title[language]}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                          {language === 'fr' ? 'Après' : 'After'}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/50" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-accent/20 flex items-center justify-center rounded">
                        <service.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-display text-xl">{service.title[language]}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interior Decoration Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-4">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Design Intérieur' : 'Interior Design'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-4">
                {language === 'fr' ? 'Décoration Intérieure' : 'Interior Decoration'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'fr'
                  ? 'Créez des espaces de vie uniques avec notre expertise en décoration de luxe.'
                  : 'Create unique living spaces with our luxury decoration expertise.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {decorationServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-500 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm flex items-center justify-center rounded">
                        <service.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-3">{service.title[language]}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-purple text-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              {language === 'fr' ? 'Prêt à Transformer Votre Espace ?' : 'Ready to Transform Your Space?'}
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto mb-8">
              {language === 'fr'
                ? 'Contactez nos experts pour discuter de votre projet de rénovation ou décoration.'
                : 'Contact our experts to discuss your renovation or decoration project.'}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 font-medium hover:bg-accent/90 transition-colors"
            >
              {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Decoration;