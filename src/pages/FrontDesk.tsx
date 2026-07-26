import React, { useEffect, useState, useCallback } from "react";
import LoginScreen from "@/components/frontdesk/LoginScreen";
import Dashboard from "@/components/frontdesk/Dashboard";
import { getToken, clearSession } from "@/lib/frontdeskApi";

const FrontDesk: React.FC = () => {
  const [token, setToken] = useState<string | null>(getToken());
  const [sessionMsg, setSessionMsg] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Front desk · Skylight Suites";
  }, []);

  const onLogin = useCallback((t: string) => {
    setSessionMsg(null);
    setToken(t);
  }, []);

  const onLogout = useCallback((msg?: string) => {
    clearSession();
    setToken(null);
    if (msg) setSessionMsg(msg);
  }, []);

  if (!token) return <LoginScreen onLogin={onLogin} notice={sessionMsg} />;
  return <Dashboard onLogout={onLogout} onSessionExpired={() => onLogout("Session expired. Please log in again.")} />;
};

export default FrontDesk;
