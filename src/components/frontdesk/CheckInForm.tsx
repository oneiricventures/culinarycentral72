import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiPost, fileToResizedDataUrl, getToken } from "@/lib/frontdeskApi";

type Guest = { name: string; file: File | null };

const PLATFORMS = ["Airbnb", "Booking.com", "Agoda", "MakeMyTrip", "Direct", "Others"] as const;
type Platform = (typeof PLATFORMS)[number];

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

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
  const [guestCountStr, setGuestCountStr] = useState("");
  const parsedGuestCount = Number(guestCountStr);
  const guestCountValid =
    guestCountStr.trim() !== "" &&
    Number.isInteger(parsedGuestCount) &&
    parsedGuestCount >= 1 &&
    parsedGuestCount <= 20;
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [platform, setPlatform] = useState<Platform | "">("");
  const [platformOther, setPlatformOther] = useState("");
  const [comingFrom, setComingFrom] = useState("");
  const [headingTo, setHeadingTo] = useState("");
  const [consent, setConsent] = useState(true);

  const [guests, setGuests] = useState<Guest[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const minDate = today();

  // Sync guest blocks with a valid guest count. Guests 2+ start blank.
  useEffect(() => {
    if (!guestCountValid) {
      setGuests([]);
      return;
    }
    setGuests((prev) => {
      const next = prev.slice(0, parsedGuestCount);
      while (next.length < parsedGuestCount) next.push({ name: "", file: null });
      return next;
    });
  }, [guestCountValid, parsedGuestCount]);

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

  const onGuestFile = (i: number, file: File | null) => {
    if (!file) {
      setGuestField(i, { file: null });
      setErrors((e) => {
        const { [`guest_file_${i}`]: _, ...rest } = e;
        return rest;
      });
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setGuestField(i, { file: null });
      setErrors((e) => ({ ...e, [`guest_file_${i}`]: "Image must be under 4 MB" }));
      return;
    }
    setErrors((e) => {
      const { [`guest_file_${i}`]: _, ...rest } = e;
      return rest;
    });
    setGuestField(i, { file });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!primaryName.trim()) e.primaryName = "Required";
    if (!guestCountValid) e.guestCount = "Enter a number 1-20";
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
    if (!platform) e.platform = "Please select a booking platform";
    if (platform === "Others" && !platformOther.trim()) e.platformOther = "Please specify";
    guests.forEach((g, i) => {
      if (!g.name.trim()) e[`guest_name_${i}`] = "Required";
      if (!g.file && !errors[`guest_file_${i}`]) e[`guest_file_${i}`] = "ID image required";
      else if (errors[`guest_file_${i}`]) e[`guest_file_${i}`] = errors[`guest_file_${i}`];
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
        guestCount: parsedGuestCount,
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
              onChange={(e) => onGuestFile(i, e.target.files?.[0] ?? null)}
            />
            {g.file && <div className="text-xs text-slate-500 mt-1">Selected: {g.file.name}</div>}
            <div className="text-[11px] text-slate-400 mt-1">Max file size: 4 MB.</div>
            {fieldErr(`guest_file_${i}`)}
          </div>
        </div>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [guests, errors],
  );

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6"
    >
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg sm:text-xl font-semibold text-[#16233f]">New check-in</h1>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            placeholder="e.g. 2"
            className={inputCls("guestCount")}
            value={guestCountStr}
            onChange={(e) => setGuestCountStr(e.target.value.replace(/[^\d]/g, ""))}
          />
          {fieldErr("guestCount")}
        </div>
        <div>
          <Label>Mobile</Label>
          <Input
            className={inputCls("mobile")}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile number"
            inputMode="tel"
          />
          {fieldErr("mobile")}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            className={inputCls("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErr("email")}
        </div>
        <div>
          <Label>Check-in date</Label>
          <Input
            type="date"
            min={minDate}
            className={inputCls("checkinDate")}
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
          />
          {fieldErr("checkinDate")}
        </div>
        <div>
          <Label>Check-out date</Label>
          <Input
            type="date"
            min={checkinDate || minDate}
            className={inputCls("checkoutDate")}
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
          />
          {fieldErr("checkoutDate")}
        </div>
        <div>
          <Label>Coming from</Label>
          <Input
            className={inputCls("comingFrom")}
            value={comingFrom}
            onChange={(e) => setComingFrom(e.target.value)}
            placeholder="City / place"
          />
          {fieldErr("comingFrom")}
        </div>
        <div>
          <Label>Heading to</Label>
          <Input
            className={inputCls("headingTo")}
            value={headingTo}
            onChange={(e) => setHeadingTo(e.target.value)}
            placeholder="City / place"
          />
          {fieldErr("headingTo")}
        </div>
      </div>

      <div>
        <Label>Booking platform</Label>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
          {PLATFORMS.map((p) => (
            <label
              key={p}
              className="inline-flex items-center gap-2 text-sm min-h-[44px] py-2"
            >
              <input
                type="radio"
                name="platform"
                value={p}
                checked={platform === p}
                onChange={() => setPlatform(p)}
                className="accent-[#16233f] w-4 h-4"
              />
              {p}
            </label>
          ))}
        </div>
        {fieldErr("platform")}
        {platform === "Others" && (
          <div className="mt-3">
            <Label>Please specify</Label>
            <Input
              className={inputCls("platformOther")}
              value={platformOther}
              onChange={(e) => setPlatformOther(e.target.value)}
            />
            {fieldErr("platformOther")}
          </div>
        )}
      </div>

      <div>
        <div className="text-sm font-semibold text-[#16233f] mb-2">KYC — one block per guest</div>
        {guests.length === 0 ? (
          <div className="text-sm text-slate-500">
            Enter a valid number of guests above to add KYC details.
          </div>
        ) : (
          <div className="space-y-3">{guestBlocks}</div>
        )}
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 accent-[#16233f] w-4 h-4"
        />
        <span>Guest agrees to receive communication from Skylight Suites regarding the booking.</span>
      </label>

      {submitError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
          {submitError}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={busy}
          className="w-full sm:w-auto bg-[#16233f] hover:bg-[#0f1a30] text-white"
        >
          {busy ? "Saving…" : "Save check-in"}
        </Button>
      </div>
    </form>
  );
};

export default CheckInForm;
