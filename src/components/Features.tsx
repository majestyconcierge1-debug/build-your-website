import { Zap, Shield, Layers, Globe, Code, Cpu } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience blazing-fast performance with our optimized infrastructure.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protocols to keep your data safe and protected.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Grow without limits. Our platform scales seamlessly with your needs.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Deploy worldwide with our distributed network spanning 50+ regions.",
  },
  {
    icon: Code,
    title: "Developer First",
    description: "Powerful APIs and SDKs designed for seamless integration.",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Leverage cutting-edge AI to automate and optimize your workflows.",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Powerful <span className="text-gradient">features</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build, deploy, and scale your applications.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-glass hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;