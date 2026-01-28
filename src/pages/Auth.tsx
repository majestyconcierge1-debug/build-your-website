import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().optional(),
});

const Auth = () => {
  const { t, language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      authSchema.parse({ email, password, fullName });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0] === "email") fieldErrors.email = error.message;
          if (error.path[0] === "password") fieldErrors.password = error.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: language === 'fr' ? "Échec de connexion" : "Sign in failed",
            description: error.message === "Invalid login credentials" 
              ? (language === 'fr' ? "Email ou mot de passe invalide." : "Invalid email or password. Please try again.")
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: language === 'fr' ? "Bienvenue" : "Welcome back",
            description: language === 'fr' ? "Connexion réussie." : "You have successfully signed in.",
          });
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: language === 'fr' ? "Échec d'inscription" : "Sign up failed",
            description: error.message.includes("already registered")
              ? (language === 'fr' ? "Cet email est déjà enregistré." : "This email is already registered. Please sign in instead.")
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: language === 'fr' ? "Compte créé" : "Account created",
            description: language === 'fr' ? "Bienvenue chez Majesty Concierge!" : "Welcome to Majesty Concierge!",
          });
          navigate("/");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 min-h-[calc(100vh-80px)] flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-10 space-y-4">
                <div className="inline-flex items-center gap-3 text-accent tracking-[0.3em] text-sm font-medium uppercase">
                  <span className="w-8 h-px bg-accent" />
                  {language === 'fr' ? 'Espace Membre' : 'Member Area'}
                  <span className="w-8 h-px bg-accent" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl">
                  {isLogin 
                    ? (language === 'fr' ? "Bienvenue" : "Welcome Back")
                    : (language === 'fr' ? "Rejoignez Majesty" : "Join Majesty")}
                </h1>
                <p className="text-muted-foreground">
                  {isLogin 
                    ? (language === 'fr' 
                        ? "Connectez-vous pour accéder aux propriétés et services exclusifs." 
                        : "Sign in to access exclusive properties and services.")
                    : (language === 'fr'
                        ? "Créez un compte pour débloquer des avantages exclusifs."
                        : "Create an account to unlock exclusive benefits.")}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 border border-border">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.auth.fullName}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t.auth.fullName}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-background ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-background ${errors.password ? "border-destructive" : ""}`}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="luxury"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? t.common.loading : (isLogin ? t.auth.signInButton : t.auth.signUpButton)}
                </Button>
              </form>

              {/* Toggle */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground text-sm">
                  {isLogin ? t.auth.noAccount : t.auth.hasAccount}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-accent hover:underline font-medium"
                  >
                    {isLogin ? t.auth.signUp : t.auth.signIn}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
