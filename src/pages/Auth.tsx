import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { Eye, EyeOff, Mail, Lock, User, Check, X } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .regex(/[0-9]/, "Password must contain at least 1 number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character");

const Auth = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const resolveRedirectAfterLogin = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    const role = data?.role;

    if (role === "admin" || role === "assistant") {
      navigate("/admin");
      return;
    }

    navigate("/");
  }, [navigate]);

  // Password validation rules display
  const passwordRules = [
    { rule: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { rule: "1 uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { rule: "1 lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { rule: "1 number", test: (p: string) => /[0-9]/.test(p) },
    { rule: "1 special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ];

  useEffect(() => {
    let isMounted = true;

    // Listen for auth state changes (e.g. after login)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_IN' && session?.user?.id) {
        setTimeout(() => {
          if (isMounted) resolveRedirectAfterLogin(session.user.id);
        }, 0);
      }
    });

    // Check existing session on mount
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session?.user?.id) return; // Stay on auth page
        if (!isMounted) return;
        await resolveRedirectAfterLogin(session.user.id);
      } catch {
        // no-op: stay on the auth page
      }
    };
    checkUser();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [resolveRedirectAfterLogin]);

  const validatePassword = (pass: string) => {
    try {
      passwordSchema.parse(pass);
      setPasswordErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordErrors(error.errors.map(e => e.message));
      }
      return false;
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!validatePassword(password)) {
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName },
          },
        });

        if (error) throw error;

        toast({
          title: language === 'fr' ? "Compte créé avec succès!" : "Account created successfully!",
          description: language === 'fr' 
            ? "Vérifiez votre email pour confirmer votre compte."
            : "Please check your email to confirm your account.",
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: language === 'fr' ? "Connexion réussie!" : "Signed in successfully!",
        });

        const userId = data.user?.id ?? data.session?.user?.id;
        if (userId) {
          await resolveRedirectAfterLogin(userId);
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: t.common.error,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container px-4 md:px-6 max-w-md mx-auto py-16">
          <div className="bg-card border border-border p-8 luxury-shadow">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-foreground mb-2">
                {isSignUp ? t.auth.signUp : t.auth.signIn}
              </h1>
              <p className="text-muted-foreground text-sm">
                {language === 'fr' 
                  ? "Accédez à votre espace Majesty Concierge"
                  : "Access your Majesty Concierge account"}
              </p>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t.auth.fullName}
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'fr' ? "Votre nom complet" : "Your full name"}
                    required={isSignUp}
                    className="bg-background"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t.auth.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t.auth.password}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (isSignUp) validatePassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    required
                    className="bg-background pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Requirements (Sign Up only) */}
                {isSignUp && password.length > 0 && (
                  <div className="mt-3 p-3 bg-secondary/30 rounded text-sm space-y-1">
                    {passwordRules.map((rule, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {rule.test(password) ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <X className="w-4 h-4 text-destructive" />
                        )}
                        <span className={rule.test(password) ? "text-accent" : "text-muted-foreground"}>
                          {rule.rule}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="luxury"
                className="w-full"
                disabled={loading}
              >
                {loading ? t.common.loading : (isSignUp ? t.auth.signUpButton : t.auth.signInButton)}
              </Button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignUp ? t.auth.hasAccount : t.auth.noAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setPassword("");
                  setPasswordErrors([]);
                }}
                className="text-accent hover:underline font-medium"
              >
                {isSignUp ? t.auth.signIn : t.auth.signUp}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
