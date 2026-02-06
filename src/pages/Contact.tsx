import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const { t, language } = useLanguage();

  const whatsappUrl = `https://wa.me/15052212757?text=${encodeURIComponent(
    language === 'fr' 
      ? 'Bonjour, je souhaite plus d\'informations sur vos services.'
      : 'Hello, I would like more information about your services.'
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{language === 'fr' ? "Contact - Majesty Concierge | Conciergerie de Luxe" : "Contact Us - Majesty Concierge | Luxury Concierge"}</title>
        <meta 
          name="description" 
          content={language === 'fr'
            ? "Contactez Majesty Concierge pour vos besoins en conciergerie de luxe, immobilier premium et services personnalisés."
            : "Contact Majesty Concierge for your luxury concierge needs, premium real estate and personalized services."
          }
        />
      </Helmet>

      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
              alt="Office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 container px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase mb-6">
              <span className="w-8 h-px bg-accent" />
              {language === 'fr' ? 'Contactez-Nous' : 'Get In Touch'}
              <span className="w-8 h-px bg-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
              {t.contactPage.title}
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              {t.contactPage.subtitle}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl mb-6">
                    {t.contactPage.companyInfo}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'fr' 
                      ? "Notre équipe est disponible pour répondre à toutes vos demandes. Que vous recherchiez une propriété de luxe, planifiez un événement ou ayez besoin de services de conciergerie personnalisés, nous sommes là pour vous."
                      : "Our team is available to assist you with any inquiry. Whether you're looking for a luxury property, planning a special event, or need personalized concierge services, we're here to help."}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent/10 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">{language === 'fr' ? 'Adresse' : 'Address'}</h3>
                      <p className="text-muted-foreground">
                        {t.footer.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent/10 flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">{language === 'fr' ? 'Téléphone' : 'Phone'}</h3>
                      <a 
                        href="tel:+15052212757"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +1 505 221 2757
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent/10 flex-shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">{t.contactPage.officeHours}</h3>
                      <p className="text-muted-foreground">
                        {t.contactPage.officeHoursValue}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.contactPage.whatsapp}
                </a>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 border border-border luxury-shadow">
                <h3 className="font-display text-2xl mb-6">
                  {language === 'fr' ? 'Envoyez-nous un Message' : 'Send Us a Message'}
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
