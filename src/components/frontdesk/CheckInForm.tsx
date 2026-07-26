import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiPost, fileToResizedDataUrl, getToken } from "@/lib/frontdeskApi";

type Guest = { name: string; file: File | null };

const PLATFORMS = ["Airbnb", "Booking.com", "Agoda", "MakeMyTrip", "Direct", "Others"] as const;

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
const mobileOk = (s: string) => /^[+\d][\d\s-]{6,19}$/.test(s.trim());
const today = () => new Date().toISOString().slice(0, 10);

type Props = {
  onCancel: () => void;
  onSaved: () => void;
  onSessionExpired: () => void;
};

const CheckInForm: React.FC<Props> = ({ onCancel, onSaved, onSessionExpired }) => {
  const [primaryName, setPrimaryName] = useState("");
  const [guestCountStr, setGuestCountStr] = useState("1");
  const guestCount = Math.max(1, Math.min(20, Number(guestCountStr) || 1));
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("Airbnb");
  const [platformOther, setPlatformOther] = useState("");
  const [comingFrom, setComingFrom] = useState("");
  const [headingTo, setHeadingTo] = useState("");
  const [consent, setConsent] = useState(true);

  const [guests, setGuests] = useState<Guest[]>([{ name: "", file: null }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const minDate = today();

  // Sync guest blocks with guest count. Guests 2+ start blank.
  useEffect(() => {
    setGuests((prev) => {
      const next = prev.slice(0, guestCount);
      while (next.length < guestCount) next.push({ name: "", file: null });
      return next;
    });
  }, [guestCount]);

  // Keep Guest 1 name in sync with the primary guest name as it's typed.
  useEffect(() => {
    setGuests((prev) => {
      if (!prev.length) return prev;
      if (prev[0].name === primaryName) return prev;
      const copy = [...prev];
      copy[0] = { ...copy[0], name: primaryName };
      return copy;
    });
  }, [primaryName]);

  const setGuestField = (i: number, patch: Partial<Guest>) =>
    setGuests((prev) => prev.map((g, idx) => (idx === i ? { ...g, ...patch } : g)));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!primaryName.trim()) e.primaryName = "Required";
    if (!guestCount || guestCount < 1 || guestCount > 20) e.guestCount = "1-20";
    if (!mobileOk(mobile)) e.mobile = "Invalid mobile";
    if (!emailOk(email)) e.email = "Invalid email";
    if (!checkinDate) e.checkinDate = "Required";
    else if (checkinDate < minDate) e.checkinDate = "Cannot be in the past";
    if (!checkoutDate) e.checkoutDate = "Required";
    else if (checkoutDate < minDate) e.checkoutDate = "Cannot be in the past";
    if (checkinDate && checkoutDate && checkoutDate <= checkinDate)
      e.checkoutDate = "Must be after check-in";
    if (!comingFrom.trim()) e.comingFrom = "Required";
    if (!headingTo.trim()) e.headingTo = "Required";
    if (platform === "Others" && !platformOther.trim()) e.platformOther = "Please specify";
    guests.forEach((g, i) => {
      if (!g.name.trim()) e[`guest_name_${i}`] = "Required";
      if (!g.file) e[`guest_file_${i}`] = "ID image required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setBusy(true);
    try {
      const guestsPayload: { name: string; idImage: string }[] = [];
      for (const g of guests) {
        const idImage = g.file ? await fileToResizedDataUrl(g.file) : "";
        guestsPayload.push({ name: g.name.trim(), idImage });
      }

      const platformValue =
        platform === "Others" ? `Others: ${platformOther.trim()}` : platform;

      const res = await apiPost({
        action: "checkin",
        token: getToken(),
        primaryName: primaryName.trim(),
        guestCount,
        mobile: mobile.trim(),
        email: email.trim(),
        checkin: checkinDate,
        checkout: checkoutDate,
        platform: platformValue,
        from: comingFrom.trim(),
        to: headingTo.trim(),
        consent: consent ? "Yes" : "No",
        submittedAt: new Date().toISOString(),
        guests: guestsPayload,
      });

      if (res.result === "unauthorized") {
        onSessionExpired();
        return;
      }
      if (res.result !== "success") {
        throw new Error(res.message || "Failed to save");
      }
      onSaved();
    } catch (e) {
      setSubmitError((e as Error).message ?? "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  const fieldErr = (k: string) =>
    errors[k] ? <div className="text-xs text-red-600 mt-1">{errors[k]}</div> : null;

  const inputCls = (k: string) => (errors[k] ? "border-red-400" : "");

  const guestBlocks = useMemo(
    () =>
      guests.map((g, i) => (
        <div key={i} className="border border-slate-200 rounded-md p-4 space-y-3 bg-slate-50/40">
          <div className="text-sm font-medium text-[#16233f]">Guest {i + 1}</div>
          <div>
            <Label>Full name (as on ID)</Label>
            <Input
              className={inputCls(`guest_name_${i}`)}
              value={g.name}
              onChange={(e) => {
                const v = e.target.value;
                setGuestField(i, { name: v });
                // Keep primary name in sync when Guest 1 is edited directly.
                if (i === 0) setPrimaryName(v);
              }}
            />
            {fieldErr(`guest_name_${i}`)}
          </div>
          <div>
            <Label>Photo of government ID</Label>
            <Input
              type="file"
              accept="image/*"
              className={inputCls(`guest_file_${i}`)}
              onChange={(e) => setGuestField(i, { file: e.target.files?.[0] ?? null })}
            />
            {g.file && <div className="text-xs text-slate-500 mt-1">Selected: {g.file.name}</div>}
            {fieldErr(`guest_file_${i}`)}
          </div>
        </div>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [guests, errors],
  );

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#16233f]">New check-in</h1>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Primary guest full name</Label>
          <Input
            className={inputCls("primaryName")}
            value={primaryName}
            onChange={(e) => setPrimaryName(e.target.value)}
          />
          {fieldErr("primaryName")}
        </div>
        <div>
          <Label>Number of guests</Label>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            step={1}
            className={inputCls("guestCount")}
            value={guestCountStr}
            onChange={(e) => setGuestCountStr(e.target.value)}
            onBlur={() => setGuestCountStr(String(guestCount))}
          />
          {fieldErr("guestCount")}
        </div>
        <div>
          <Label>Mobile</Label>
          <Input className={inputCls("mobile")} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91…" />
          {fieldErr("mobile")}
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" className={inputCls("email")} value={email} onChange={(e) => setEmail(e.target.value)} />
          {fieldErr("email")}
        </div>
        <div>
          <Label>Check-in date</Label>
          <Input type="date" min={minDate} className={inputCls("checkinDate")} value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
          {fieldErr("checkinDate")}
        </div>
        <div>
          <Label>Check-out date</Label>
          <Input type="date" min={checkinDate || minDate} className={inputCls("checkoutDate")} value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} />
          {fieldErr("checkoutDate")}
        </div>
        <div>
          <Label>Coming from</Label>
          <Input className={inputCls("comingFrom")} value={comingFrom} onChange={(e) => setComingFrom(e.target.value)} placeholder="City / place" />
          {fieldErr("comingFrom")}
        </div>
        <div>
          <Label>Heading to</Label>
          <Input className={inputCls("headingTo")} value={headingTo} onChange={(e) => setHeadingTo(e.target.value)} placeholder="City / place" />
          {fieldErr("headingTo")}
        </div>
      </div>

      <div>
        <Label>Booking platform</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {PLATFORMS.map((p) => (
            <label key={p} className="inline-flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="platform"
                value={p}
                checked={platform === p}
                onChange={() => setPlatform(p)}
                className="accent-[#16233f]"
              />
              {p}
            </label>
          ))}
        </div>
        {platform === "Others" && (
          <div className="mt-3">
            <Label>Please specify</Label>
            <Input className={inputCls("platformOther")} value={platformOther} onChange={(e) => setPlatformOther(e.target.value)} />
            {fieldErr("platformOther")}
          </div>
        )}
      </div>

      <div>
        <div className="text-sm font-semibold text-[#16233f] mb-2">KYC — one block per guest</div>
        <div className="space-y-3">{guestBlocks}</div>
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 accent-[#16233f]"
        />
        <span>Guest agrees to receive communication from Skylight Suites regarding the booking.</span>
      </label>

      {submitError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
          {submitError}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={busy} className="bg-[#16233f] hover:bg-[#0f1a30] text-white">
          {busy ? "Saving…" : "Save check-in"}
        </Button>
      </div>
    </form>
  );
};

export default CheckInForm;
