import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Brand from "./Brand";
import CheckInForm from "./CheckInForm";
import CheckInsList, { CheckIn } from "./CheckInsList";
import { LogOut, Plus, RefreshCw } from "lucide-react";

type View = "home" | "new" | "saved";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<View>("home");
  const [recent, setRecent] = useState<CheckIn[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  const [briefMode, setBriefMode] = useState<"single" | "range">("single");
  const [briefSingle, setBriefSingle] = useState("");
  const [briefFrom, setBriefFrom] = useState("");
  const [briefTo, setBriefTo] = useState("");
  const [briefResults, setBriefResults] = useState<CheckIn[] | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);

  const loadRecent = useCallback(async () => {
    setLoadingRecent(true);
    const { data, error } = await supabase
      .from("checkins")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    if (!error && data) setRecent(data as unknown as CheckIn[]);
    setLoadingRecent(false);
  }, []);

  useEffect(() => {
    if (view === "home") loadRecent();
  }, [view, loadRecent]);

  const runBrief = async () => {
    setBriefError(null);
    setBriefLoading(true);
    setBriefResults(null);
    try {
      let q = supabase.from("checkins").select("*").order("checkin_date", { ascending: true });
      if (briefMode === "single") {
        if (!briefSingle) throw new Error("Pick a date.");
        q = q.eq("checkin_date", briefSingle);
      } else {
        if (!briefFrom || !briefTo) throw new Error("Pick both dates.");
        if (briefFrom > briefTo) throw new Error("From date must be before To date.");
        q = q.gte("checkin_date", briefFrom).lte("checkin_date", briefTo);
      }
      const { data, error } = await q;
      if (error) throw error;
      setBriefResults((data ?? []) as unknown as CheckIn[]);
    } catch (e) {
      setBriefError((e as Error).message);
    } finally {
      setBriefLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const header = useMemo(
    () => (
      <header className="bg-[#16233f] text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-white [&_.text-\\[\\#16233f\\]]:text-white">
            <Brand />
          </div>
          <Button
            variant="outline"
            className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" /> Log out
          </Button>
        </div>
      </header>
    ),
    [],
  );

  if (view === "new") {
    return (
      <div className="min-h-screen bg-[#f4f6fa]">
        {header}
        <main className="max-w-3xl mx-auto px-4 py-6">
          <CheckInForm
            onCancel={() => setView("home")}
            onSaved={() => setView("saved")}
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
              <Button
                className="bg-[#16233f] hover:bg-[#0f1a30] text-white"
                onClick={() => setView("new")}
              >
                Add another
              </Button>
              <Button variant="outline" onClick={() => setView("home")}>
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
        {/* Begin */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#16233f]">Begin a check-in</h2>
            <p className="text-sm text-slate-500">Record a new guest arrival.</p>
          </div>
          <Button
            className="bg-[#16233f] hover:bg-[#0f1a30] text-white"
            onClick={() => setView("new")}
          >
            <Plus className="w-4 h-4 mr-2" /> New check-in
          </Button>
        </section>

        {/* Last 10 */}
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

        {/* Briefs */}
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
            <Button
              className="bg-[#c9a24b] hover:bg-[#b3893a] text-white"
              onClick={runBrief}
              disabled={briefLoading}
            >
              {briefLoading ? "Loading…" : "View"}
            </Button>
          </div>

          {briefError && (
            <div className="mt-3 text-sm text-red-600">{briefError}</div>
          )}

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

// Prevent unused-import type-check
void Textarea;

export default Dashboard;
