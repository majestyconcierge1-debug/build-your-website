import { useState, useEffect, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AppRole = "admin" | "user" | "assistant";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAssistant, setIsAssistant] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUserRole = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error && data) {
      const role = data.role as AppRole;
      setUserRole(role);
      setIsAdmin(role === "admin");
      setIsAssistant(role === "assistant");
    } else {
      setUserRole(null);
      setIsAdmin(false);
      setIsAssistant(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Listener for ongoing auth changes (does NOT control loading)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      // Defer role checks; never call Supabase queries directly in this callback
      if (session?.user) {
        setTimeout(() => {
          if (!isMounted) return;
          checkUserRole(session.user.id);
        }, 0);
      } else {
        setUserRole(null);
        setIsAdmin(false);
        setIsAssistant(false);
      }
    });

    // Initial load (controls loading)
    (async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await checkUserRole(session.user.id);
        } else {
          setUserRole(null);
          setIsAdmin(false);
          setIsAssistant(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [checkUserRole]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUserRole(null);
    setIsAdmin(false);
    setIsAssistant(false);
    return { error };
  };

  // Check if user has staff access (admin or assistant)
  const hasStaffAccess = isAdmin || isAssistant;

  return {
    user,
    session,
    userRole,
    isAdmin,
    isAssistant,
    hasStaffAccess,
    loading,
    signUp,
    signIn,
    signOut,
  };
};