import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import LoginScreen from "@/components/frontdesk/LoginScreen";
import Dashboard from "@/components/frontdesk/Dashboard";

const FrontDesk: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Front desk · Skylight Suites";
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6fa]">
        <div className="text-[#16233f]">Loading…</div>
      </div>
    );
  }

  return session ? <Dashboard /> : <LoginScreen />;
};

export default FrontDesk;
