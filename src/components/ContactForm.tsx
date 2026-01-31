import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
}

const ContactForm = ({ propertyId, propertyTitle, className = "" }: ContactFormProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: propertyTitle 
      ? (language === 'fr' 
          ? `Je suis intéressé(e) par la propriété: ${propertyTitle}` 
          : `I am interested in the property: ${propertyTitle}`)
      : "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          property_id: propertyId || null,
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

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
          className={`min-h-[120px] bg-background ${errors.message ? "border-destructive" : ""}`}
          placeholder={language === 'fr' ? "Décrivez-nous vos besoins..." : "Tell us about your needs..."}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" variant="luxury" className="w-full" disabled={loading}>
        {loading ? t.common.loading : t.contactPage.send}
      </Button>
    </form>
  );
};

export default ContactForm;
