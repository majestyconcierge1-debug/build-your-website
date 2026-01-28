import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      contactSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: t.contactPage.success,
        description: t.contactPage.successDesc,
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: t.common.error,
        description: language === 'fr' ? "Échec de l'envoi. Veuillez réessayer." : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/33767781026?text=${encodeURIComponent(
    language === 'fr' 
      ? 'Bonjour, je souhaite plus d\'informations sur vos services.'
      : 'Hello, I would like more information about your services.'
  )}`;

  return (
    <div className="min-h-screen bg-background">
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
            <div className="absolute inset-0 bg-midnight/80" />
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
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">Email</h3>
                      <a 
                        href="mailto:contact@majestyconcierge.com"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        contact@majestyconcierge.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent/10 flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-1">{language === 'fr' ? 'Téléphone' : 'Phone'}</h3>
                      <a 
                        href="tel:+33767781026"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +33 7 67 78 10 26
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
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors"
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contactPage.name} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`bg-background ${errors.name ? "border-destructive" : ""}`}
                      placeholder={t.contactPage.name}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contactPage.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`bg-background ${errors.email ? "border-destructive" : ""}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.contactPage.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background"
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contactPage.message} *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`min-h-[150px] bg-background ${errors.message ? "border-destructive" : ""}`}
                      placeholder={language === 'fr' ? "Décrivez-nous vos besoins..." : "Tell us about your needs..."}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="luxury" className="w-full" disabled={loading}>
                    {loading ? t.common.loading : t.contactPage.send}
                  </Button>
                </form>
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
