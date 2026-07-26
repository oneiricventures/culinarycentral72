import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Brand from "./Brand";
import { apiPost, setSession } from "@/lib/frontdeskApi";

type Props = { onLogin: (token: string) => void; notice?: string | null };

const LoginScreen: React.FC<Props> = ({ onLogin, notice }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await apiPost<{ token: string; username: string; name?: string }>({
      action: "login",
      username: username.trim(),
      password,
    });
    setBusy(false);
    if (res.result === "success") {
      setSession(res.token, res.name ?? res.username);
      onLogin(res.token);
    } else if (res.result === "error") {
      setError(res.message || "Invalid username or password.");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Brand />
        </div>
        <form
          onSubmit={submit}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5"
        >
          <div>
            <h1 className="text-xl font-semibold text-[#16233f]">Sign in</h1>
            <p className="text-sm text-slate-500 mt-1">
              Staff access only. Enter your front desk credentials.
            </p>
          </div>

          {notice && (
            <div className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded px-3 py-2">
              {notice}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-[#16233f] hover:bg-[#0f1a30] text-white"
          >
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
