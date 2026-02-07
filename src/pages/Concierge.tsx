import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import LuxuryCarousel from "@/components/LuxuryCarousel";

const conciergeCarouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    title: { en: "Luxury Wedding Ceremonies", fr: "Cérémonies de Mariage de Luxe" },
    subtitle: { en: "Exclusive château celebrations", fr: "Célébrations exclusives en château" },
  },
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    title: { en: "VIP Hotel Services", fr: "Services Hôteliers VIP" },
    subtitle: { en: "Premium welcome experience", fr: "Expérience d'accueil premium" },
  },
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80",
    title: { en: "Limousine Services", fr: "Services Limousine" },
    subtitle: { en: "Travel in ultimate luxury", fr: "Voyagez dans le luxe absolu" },
  },
  {
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80",
    title: { en: "Luxury Wine Experiences", fr: "Expériences Vinicoles de Luxe" },
    subtitle: { en: "Private tastings & tours", fr: "Dégustations & visites privées" },
  },
  {
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80",
    title: { en: "Yacht Rentals", fr: "Location de Yachts" },
    subtitle: { en: "Explore the seas in style", fr: "Explorez les mers avec style" },
  },
  {
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80",
    title: { en: "Helicopter Services", fr: "Services Hélicoptère" },
    subtitle: { en: "Aerial luxury transport", fr: "Transport aérien de luxe" },
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    title: { en: "Premium Cleaning", fr: "Nettoyage Premium" },
    subtitle: { en: "Luxury home care", fr: "Entretien résidentiel de luxe" },
  },
  {
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
    title: { en: "Personal Training", fr: "Coaching Personnel" },
    subtitle: { en: "Elite fitness services", fr: "Services fitness d'élite" },
  },
  {
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920&q=80",
    title: { en: "Sports Events", fr: "Événements Sportifs" },
    subtitle: { en: "VIP access to major events", fr: "Accès VIP aux grands événements" },
  },
];

const conciergeServices = [
  {
    title: { en: "Private Concierge", fr: "Conciergerie Privée" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    description: {
      en: "Your dedicated personal concierge is available around the clock to handle every aspect of your lifestyle. From securing last-minute reservations at the world's most exclusive Michelin-starred restaurants to arranging private viewings at luxury boutiques, our team anticipates your needs before you even express them. We manage your household staff, coordinate travel logistics, handle administrative tasks, and ensure every detail of your daily life runs seamlessly. Whether you need a rare vintage wine delivered within hours or a private jet arranged for a spontaneous getaway, your concierge makes it happen with discretion and elegance.",
      fr: "Votre concierge personnel dédié est disponible 24 heures sur 24 pour gérer chaque aspect de votre style de vie. De la réservation de dernière minute dans les restaurants étoilés Michelin les plus exclusifs au monde à l'organisation de visites privées dans les boutiques de luxe, notre équipe anticipe vos besoins avant même que vous ne les exprimiez. Nous gérons votre personnel de maison, coordonnons la logistique de vos voyages, traitons les tâches administratives et veillons à ce que chaque détail de votre quotidien se déroule parfaitement. Qu'il s'agisse d'un vin rare livré en quelques heures ou d'un jet privé organisé pour une escapade spontanée, votre concierge réalise tout avec discrétion et élégance.",
    },
  },
  {
    title: { en: "Luxury Wedding Planning", fr: "Organisation de Mariages de Luxe" },
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    description: {
      en: "Transform your dream wedding into an unforgettable reality with our bespoke wedding planning services. We specialize in exclusive château ceremonies across the French Riviera, Italian villas, and prestigious venues worldwide. Our team coordinates every element — from haute couture floral arrangements and world-class catering to live entertainment and luxury transportation for all guests. We handle venue scouting, vendor negotiations, guest accommodations, and create a seamless timeline ensuring your special day is nothing short of magical. Every wedding we plan reflects the unique love story of the couple, with personalized touches that leave lasting memories.",
      fr: "Transformez votre mariage de rêve en une réalité inoubliable grâce à nos services sur mesure d'organisation de mariages. Nous sommes spécialisés dans les cérémonies exclusives en châteaux sur la Côte d'Azur, dans les villas italiennes et dans les lieux prestigieux du monde entier. Notre équipe coordonne chaque élément — des arrangements floraux haute couture au traiteur de classe mondiale, en passant par les animations et le transport de luxe pour tous les invités. Nous gérons la recherche de lieux, les négociations avec les prestataires, l'hébergement des invités et créons un planning parfait pour que votre jour spécial soit tout simplement magique.",
    },
  },
  {
    title: { en: "Yacht Charters", fr: "Location de Yachts" },
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    description: {
      en: "Experience the ultimate in maritime luxury with our curated yacht charter services. Whether you desire a sun-drenched Mediterranean cruise along the Amalfi Coast, island hopping in the Greek Cyclades, or an exclusive Caribbean escape, we connect you with the finest vessels and most experienced crews in the world. Our fleet includes sleek motor yachts, classic sailing vessels, and mega-yachts with full amenities including private chefs, water sports equipment, and spa facilities. Every voyage is tailored to your preferences — from route planning and gourmet menu selection to arranging exclusive shore excursions at private beaches and hidden coves.",
      fr: "Vivez l'ultime expérience de luxe maritime avec nos services de location de yachts sur mesure. Que vous souhaitiez une croisière ensoleillée en Méditerranée le long de la côte amalfitaine, un tour des îles dans les Cyclades grecques ou une escapade exclusive dans les Caraïbes, nous vous mettons en relation avec les plus beaux navires et les équipages les plus expérimentés au monde. Notre flotte comprend des yachts à moteur élégants, des voiliers classiques et des méga-yachts avec toutes les commodités, incluant chefs privés, équipements de sports nautiques et installations spa. Chaque voyage est adapté à vos préférences.",
    },
  },
  {
    title: { en: "Helicopter & Private Aviation", fr: "Hélicoptère & Aviation Privée" },
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80",
    description: {
      en: "Soar above the ordinary with our premium aviation services. We arrange private helicopter transfers between airports, resorts, and exclusive destinations, offering breathtaking aerial views of the French Riviera, Monaco, and beyond. Our private jet charter service provides access to a global fleet of aircraft, from light jets for short hops to ultra-long-range jets for intercontinental travel. Every flight is arranged with meticulous attention to detail — custom catering, ground transportation coordination, and VIP terminal access. Whether it's a scenic helicopter tour over the Alps or an urgent business trip across continents, we deliver unparalleled aerial luxury.",
      fr: "Survolez l'ordinaire avec nos services d'aviation premium. Nous organisons des transferts privés en hélicoptère entre aéroports, stations balnéaires et destinations exclusives, offrant des vues aériennes à couper le souffle sur la Côte d'Azur, Monaco et au-delà. Notre service de jets privés donne accès à une flotte mondiale d'avions, des jets légers pour les courts trajets aux jets long-courrier pour les voyages intercontinentaux. Chaque vol est organisé avec une attention méticuleuse aux détails — restauration sur mesure, coordination du transport terrestre et accès au terminal VIP.",
    },
  },
  {
    title: { en: "Limousine & Chauffeur Services", fr: "Limousine & Services de Chauffeur" },
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    description: {
      en: "Travel in supreme comfort and style with our premium chauffeur and limousine services. Our fleet features the finest luxury vehicles — Rolls-Royce, Bentley, Mercedes-Maybach, and armored SUVs — each maintained to impeccable standards. Our professionally trained chauffeurs provide discreet, punctual service for airport transfers, business meetings, social events, and extended engagements. We offer 24/7 availability, multi-city service across Europe and the Middle East, and can accommodate special requests including child seats, specific refreshments, and personalized route planning. Every journey with us is an experience in refined elegance.",
      fr: "Voyagez dans un confort suprême et avec style grâce à nos services premium de chauffeur et limousine. Notre flotte comprend les véhicules de luxe les plus prestigieux — Rolls-Royce, Bentley, Mercedes-Maybach et SUV blindés — chacun entretenu selon des standards impeccables. Nos chauffeurs professionnels offrent un service discret et ponctuel pour les transferts aéroport, réunions d'affaires, événements mondains et missions prolongées. Disponibilité 24/7, service multi-villes en Europe et au Moyen-Orient, avec possibilité de répondre à des demandes spécifiques.",
    },
  },
  {
    title: { en: "Wine Tasting Experiences", fr: "Expériences de Dégustation de Vins" },
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    description: {
      en: "Immerse yourself in the world of fine wines with our exclusive tasting experiences. We arrange private tours to the most prestigious vineyards in Bordeaux, Burgundy, Tuscany, and Champagne, where you'll meet legendary winemakers and discover rare vintages unavailable to the public. Our sommelier-led experiences include private cellar tastings, wine-and-gastronomy pairing dinners at Michelin-starred restaurants, and bespoke wine collection advisory services. Whether you're a seasoned collector looking to acquire exceptional bottles at auction or a curious enthusiast eager to explore terroirs, we craft journeys that deepen your appreciation of the world's finest wines.",
      fr: "Plongez dans l'univers des grands vins avec nos expériences de dégustation exclusives. Nous organisons des visites privées dans les vignobles les plus prestigieux de Bordeaux, Bourgogne, Toscane et Champagne, où vous rencontrerez des vignerons légendaires et découvrirez des millésimes rares inaccessibles au public. Nos expériences dirigées par un sommelier incluent des dégustations privées en cave, des dîners accords mets-vins dans des restaurants étoilés et des services de conseil en collection de vins sur mesure. Que vous soyez un collectionneur averti ou un passionné curieux, nous créons des parcours qui approfondissent votre appréciation des plus grands vins du monde.",
    },
  },
  {
    title: { en: "VIP Sports Events", fr: "Événements Sportifs VIP" },
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    description: {
      en: "Access the world's most coveted sporting events with our VIP hospitality packages. From front-row seats at the Monaco Grand Prix and exclusive hospitality suites at Wimbledon to VIP boxes at the FIFA World Cup and Champions League finals, we secure the most sought-after tickets and experiences in global sports. Our packages include premium seating, private lounges with gourmet catering, meet-and-greet opportunities with athletes, and luxury transportation to and from venues. We also arrange private sporting experiences — from golf rounds at Augusta National to sailing regattas in Saint-Tropez — tailored to your passion.",
      fr: "Accédez aux événements sportifs les plus convoités au monde avec nos forfaits d'hospitalité VIP. Des places au premier rang du Grand Prix de Monaco aux suites d'hospitalité exclusives de Wimbledon, en passant par les loges VIP de la Coupe du Monde FIFA et les finales de la Ligue des Champions, nous sécurisons les billets et expériences les plus recherchés du sport mondial. Nos forfaits incluent des sièges premium, des salons privés avec restauration gastronomique, des rencontres avec les athlètes et un transport de luxe. Nous organisons également des expériences sportives privées sur mesure.",
    },
  },
  {
    title: { en: "Premium Cleaning & Housekeeping", fr: "Nettoyage & Entretien Premium" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: {
      en: "Maintain your residence in pristine condition with our premium cleaning and housekeeping services. Our vetted, professionally trained staff deliver meticulous care using eco-luxury products and techniques tailored to the finest materials — from marble floors and silk drapes to rare wood furnishings. We offer regular weekly maintenance, deep cleaning programs, pre- and post-event cleanup, seasonal property openings, and laundry services including delicate garment care. Our housekeeping managers conduct quality inspections after every visit and provide detailed reports. Whether for a private villa, penthouse, or estate, we ensure your home radiates perfection at all times.",
      fr: "Maintenez votre résidence dans un état impeccable avec nos services de nettoyage et d'entretien premium. Notre personnel vérifié et formé professionnellement apporte un soin méticuleux en utilisant des produits éco-luxe et des techniques adaptées aux matériaux les plus fins — du marbre aux rideaux en soie en passant par les boiseries rares. Nous offrons un entretien hebdomadaire régulier, des programmes de nettoyage en profondeur, un nettoyage avant et après événement, des ouvertures saisonnières de propriétés et des services de blanchisserie. Nos responsables vérifient la qualité après chaque visite.",
    },
  },
  {
    title: { en: "Personal Training & Wellness", fr: "Coaching Personnel & Bien-être" },
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    description: {
      en: "Achieve your health and fitness goals with our elite personal training and wellness programs. We connect you with world-class certified trainers, nutritionists, and wellness coaches who design fully personalized programs around your lifestyle, schedule, and objectives. Sessions can take place at your private residence, aboard your yacht, or at exclusive gym facilities. Our offerings extend beyond fitness to include yoga and meditation retreats, holistic spa treatments, physiotherapy, and stress management programs. We also coordinate with private chefs to align your nutrition plan with your training regimen, creating a comprehensive approach to peak physical and mental well-being.",
      fr: "Atteignez vos objectifs de santé et de forme physique avec nos programmes d'élite de coaching personnel et de bien-être. Nous vous mettons en relation avec des entraîneurs certifiés de classe mondiale, des nutritionnistes et des coachs bien-être qui conçoivent des programmes entièrement personnalisés autour de votre style de vie. Les séances peuvent avoir lieu à votre résidence privée, à bord de votre yacht ou dans des installations exclusives. Nos offres s'étendent au-delà du fitness pour inclure des retraites de yoga et méditation, des soins spa holistiques, de la physiothérapie et des programmes de gestion du stress.",
    },
  },
  {
    title: { en: "Private Dining & Chef Services", fr: "Dîners Privés & Services de Chef" },
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    description: {
      en: "Elevate your dining experience with our private chef and gastronomy services. We partner with Michelin-starred chefs, pastry masters, and culinary artists who bring extraordinary cuisine directly to your home, yacht, or private event venue. Whether it's an intimate dinner for two with a seven-course tasting menu, a lavish celebration for fifty guests, or daily meal preparation tailored to your dietary preferences, our chefs deliver unforgettable culinary moments. We handle everything from ingredient sourcing at premium markets to table styling, wine pairing by expert sommeliers, and full service staff for the evening.",
      fr: "Sublimez votre expérience gastronomique avec nos services de chef privé et de gastronomie. Nous collaborons avec des chefs étoilés Michelin, des maîtres pâtissiers et des artistes culinaires qui apportent une cuisine extraordinaire directement chez vous, sur votre yacht ou dans votre lieu d'événement privé. Qu'il s'agisse d'un dîner intime pour deux avec un menu dégustation de sept plats, d'une célébration somptueuse pour cinquante convives ou d'une préparation quotidienne de repas adaptée à vos préférences alimentaires, nos chefs livrent des moments culinaires inoubliables.",
    },
  },
  {
    title: { en: "Event Planning & Management", fr: "Organisation d'Événements" },
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    description: {
      en: "Create extraordinary events that leave lasting impressions with our bespoke event planning services. From exclusive birthday celebrations and anniversary galas in historic venues to corporate retreats and product launches at prestigious locations, we design and execute events of every scale with impeccable attention to detail. Our team manages venue selection, décor and floral design, entertainment booking, catering coordination, guest list management, and security arrangements. We collaborate with the finest artisans, designers, and performers to transform any space into a breathtaking environment that perfectly reflects your vision and style.",
      fr: "Créez des événements extraordinaires qui laissent des impressions durables avec nos services d'organisation sur mesure. Des célébrations d'anniversaire exclusives et galas dans des lieux historiques aux retraites d'entreprise et lancements de produits dans des lieux prestigieux, nous concevons et exécutons des événements de toute envergure avec une attention impeccable aux détails. Notre équipe gère la sélection du lieu, le décor, les divertissements, la restauration, la gestion des invités et les dispositifs de sécurité. Nous collaborons avec les meilleurs artisans et designers pour transformer tout espace.",
    },
  },
  {
    title: { en: "Corporate Services", fr: "Services Entreprise" },
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    description: {
      en: "Elevate your company's image and executive lifestyle with our tailored corporate concierge solutions. We provide comprehensive support for C-suite executives and their teams, including business travel coordination with private aviation, luxury accommodation bookings, high-profile meeting and conference arrangements at prestigious venues, and corporate hospitality for clients and partners. Our services extend to executive relocation assistance, PA support, corporate event management, and exclusive team-building experiences. We understand the demands of modern business leadership and deliver seamless, confidential solutions that allow executives to focus on what matters most.",
      fr: "Rehaussez l'image de votre entreprise et le style de vie de vos dirigeants avec nos solutions de conciergerie corporate sur mesure. Nous fournissons un soutien complet pour les dirigeants et leurs équipes, incluant la coordination des voyages d'affaires en aviation privée, les réservations d'hébergement de luxe, l'organisation de réunions et conférences dans des lieux prestigieux, et l'hospitalité corporate pour clients et partenaires. Nos services s'étendent à l'aide à la relocalisation, au soutien d'assistanat personnel et à l'organisation d'événements d'entreprise.",
    },
  },
];

const Concierge = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="relative">
          <LuxuryCarousel
            slides={conciergeCarouselSlides}
            language={language}
            height="h-[70vh]"
            interval={4000}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'Conciergerie de Luxe' : 'Luxury Concierge'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t.conciergePage.title}
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                {t.conciergePage.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* All Concierge Services */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
                <span className="w-8 h-px bg-accent" />
                {language === 'fr' ? 'NOS SERVICES' : 'OUR SERVICES'}
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
                {language === 'fr' ? 'Services de Conciergerie Exclusifs' : 'Exclusive Concierge Services'}
              </h2>
            </div>
            <div className="space-y-16 max-w-6xl mx-auto">
              {conciergeServices.map((service, index) => (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? '' : ''}`}
                >
                  <div className={`relative h-80 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.title[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className="font-display text-2xl md:text-3xl">{service.title[language]}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description[language]}</p>
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

export default Concierge;
