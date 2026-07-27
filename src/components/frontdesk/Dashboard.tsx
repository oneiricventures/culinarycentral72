import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Brand from "./Brand";
import CheckInForm from "./CheckInForm";
import CheckInsList from "./CheckInsList";
import type { CheckInRow } from "@/lib/frontdeskApi";
import { apiPost, getToken } from "@/lib/frontdeskApi";
import { LogOut, Plus, RefreshCw } from "lucide-react";

type View = "home" | "new" | "saved";

type Props = {
  onLogout: () => void;
  onSessionExpired: () => void;
};

const Dashboard: React.FC<Props> = ({ onLogout, onSessionExpired }) => {
  const [view, setView] = useState<View>("home");
  const [recent, setRecent] = useState<CheckInRow[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  const [briefMode, setBriefMode] = useState<"single" | "range">("single");
  const [briefSingle, setBriefSingle] = useState("");
  const [briefFrom, setBriefFrom] = useState("");
  const [briefTo, setBriefTo] = useState("");
  const [briefResults, setBriefResults] = useState<CheckInRow[] | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);

  const loadRecent = useCallback(async () => {
    setLoadingRecent(true);
    const res = await apiPost<{ rows: CheckInRow[] }>({ action: "recent", token: getToken() });
    setLoadingRecent(false);
    if (res.result === "success") setRecent(res.rows || []);
    else if (res.result === "unauthorized") onSessionExpired();
  }, [onSessionExpired]);

  useEffect(() => {
    if (view === "home") loadRecent();
  }, [view, loadRecent]);

  const runBrief = async () => {
    setBriefError(null);
    setBriefLoading(true);
    setBriefResults(null);
    try {
      let from: string, to: string;
      if (briefMode === "single") {
        if (!briefSingle) throw new Error("Pick a date.");
        from = briefSingle;
        to = briefSingle;
      } else {
        if (!briefFrom || !briefTo) throw new Error("Pick both dates.");
        if (briefFrom > briefTo) throw new Error("From date must be before To date.");
        from = briefFrom;
        to = briefTo;
      }
      const res = await apiPost<{ rows: CheckInRow[] }>({
        action: "briefs",
        token: getToken(),
        from,
        to,
      });
      if (res.result === "unauthorized") {
        onSessionExpired();
        return;
      }
      if (res.result !== "success") throw new Error(res.message || "Failed to load briefs.");
      setBriefResults(res.rows || []);
    } catch (e) {
      setBriefError((e as Error).message);
    } finally {
      setBriefLoading(false);
    }
  };

  const goHome = useCallback(() => setView("home"), []);

  const header = useMemo(
    () => (
      <header className="bg-[#16233f] text-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="min-w-0 text-white [&_.text-\\[\\#16233f\\]]:text-white">
            <Brand onClick={goHome} />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </header>
    ),
    [goHome, onLogout],
  );

  if (view === "new") {
    return (
      <div className="min-h-screen bg-[#f4f6fa]">
        {header}
        <main className="max-w-3xl mx-auto px-4 py-6">
          <CheckInForm
            onCancel={goHome}
            onSaved={() => setView("saved")}
            onSessionExpired={onSessionExpired}
          />
        </main>
      </div>
    );
  }

  if (view === "saved") {
    return (
      <div className="min-h-screen bg-[#f4f6fa]">
        {header}
        <main className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-2xl">✓</div>
            <h2 className="text-xl font-semibold text-[#16233f] mt-4">Check-in saved</h2>
            <p className="text-slate-500 mt-1">The guest record has been recorded.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-[#16233f] hover:bg-[#0f1a30] text-white" onClick={() => setView("new")}>
                Add another
              </Button>
              <Button variant="outline" onClick={goHome}>
                Return home
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      {header}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#16233f]">Begin a check-in</h2>
            <p className="text-sm text-slate-500">Record a new guest arrival.</p>
          </div>
          <Button className="bg-[#16233f] hover:bg-[#0f1a30] text-white" onClick={() => setView("new")}>
            <Plus className="w-4 h-4 mr-2" /> New check-in
          </Button>
        </section>

        <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#16233f]">Last 10 check-ins</h2>
            <Button variant="outline" size="sm" onClick={loadRecent} disabled={loadingRecent}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingRecent ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <CheckInsList items={recent} loading={loadingRecent} />
        </section>

        <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-[#16233f] mb-4">Check-in briefs</h2>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-md text-sm border ${briefMode === "single" ? "bg-[#16233f] text-white border-[#16233f]" : "bg-white text-[#16233f] border-slate-300"}`}
              onClick={() => setBriefMode("single")}
            >
              Single date
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-md text-sm border ${briefMode === "range" ? "bg-[#16233f] text-white border-[#16233f]" : "bg-white text-[#16233f] border-slate-300"}`}
              onClick={() => setBriefMode("range")}
            >
              Date range
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 items-end">
            {briefMode === "single" ? (
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input type="date" value={briefSingle} onChange={(e) => setBriefSingle(e.target.value)} />
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <Label>From</Label>
                  <Input type="date" value={briefFrom} onChange={(e) => setBriefFrom(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>To</Label>
                  <Input type="date" value={briefTo} onChange={(e) => setBriefTo(e.target.value)} />
                </div>
              </>
            )}
            <Button className="bg-[#c9a24b] hover:bg-[#b3893a] text-white" onClick={runBrief} disabled={briefLoading}>
              {briefLoading ? "Loading…" : "View"}
            </Button>
          </div>

          {briefError && <div className="mt-3 text-sm text-red-600">{briefError}</div>}

          {briefResults && (
            <div className="mt-5">
              <div className="text-sm text-slate-500 mb-2">
                {briefResults.length} result{briefResults.length === 1 ? "" : "s"}
              </div>
              <CheckInsList items={briefResults} loading={false} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
