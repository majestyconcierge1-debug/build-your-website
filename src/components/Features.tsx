import { Globe, Award, UserCheck, Shield, Sparkles, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Features = () => {
  const { t, language } = useLanguage();

  const services = [
    { icon: Globe, title: t.features.globalPresence, description: t.features.globalPresenceDesc },
    { icon: Award, title: t.features.luxuryExpertise, description: t.features.luxuryExpertiseDesc },
    { icon: UserCheck, title: t.features.personalService, description: t.features.personalServiceDesc },
    { icon: Shield, title: t.features.discretion, description: t.features.discretionDesc },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
            <span className="w-8 h-px bg-accent" />
            {t.features.subtitle}
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">{t.features.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="text-center group p-6 bg-card border border-border hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
