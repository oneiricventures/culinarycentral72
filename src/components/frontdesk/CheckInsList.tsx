import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export type Guest = { name: string; id_image_url: string };

export type CheckIn = {
  id: string;
  created_at: string;
  primary_name: string;
  guest_count: number;
  mobile: string;
  email: string;
  checkin_date: string;
  checkout_date: string;
  booking_platform: string;
  booking_platform_other: string | null;
  coming_from: string;
  heading_to: string;
  consent: boolean;
  guests: Guest[];
};

const platformLabel = (c: CheckIn) =>
  c.booking_platform === "Others" && c.booking_platform_other
    ? `Others: ${c.booking_platform_other}`
    : c.booking_platform;

const Row: React.FC<{ item: CheckIn }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-md">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 text-left px-4 py-3 hover:bg-slate-50"
      >
        {open ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-2 text-sm">
          <div className="font-medium text-[#16233f]">{item.primary_name}</div>
          <div className="text-slate-600">{item.guest_count} guest{item.guest_count === 1 ? "" : "s"}</div>
          <div className="text-slate-600">{platformLabel(item)}</div>
          <div className="text-slate-600">{item.mobile}</div>
          <div className="text-slate-600">{item.checkin_date} → {item.checkout_date}</div>
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-200 px-4 py-3 bg-slate-50/50 text-sm space-y-2">
          <div><span className="text-slate-500">Email:</span> {item.email}</div>
          <div>
            <span className="text-slate-500">From → To:</span> {item.coming_from} → {item.heading_to}
          </div>
          <div>
            <span className="text-slate-500">Consent:</span> {item.consent ? "Yes" : "No"}
          </div>
          <div>
            <div className="text-slate-500 mb-1">Guests & KYC:</div>
            <ul className="space-y-1">
              {item.guests?.map((g, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2">
                  <span className="text-[#16233f]">{i + 1}. {g.name || "—"}</span>
                  {g.id_image_url ? (
                    <a
                      href={g.id_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c9a24b] hover:underline"
                    >
                      View ID
                    </a>
                  ) : (
                    <span className="text-slate-400">No image</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckInsList: React.FC<{ items: CheckIn[]; loading: boolean }> = ({ items, loading }) => {
  if (loading) return <div className="text-sm text-slate-500">Loading…</div>;
  if (!items.length) return <div className="text-sm text-slate-500">No check-ins yet.</div>;
  return (
    <div className="space-y-2">
      {items.map((c) => (
        <Row key={c.id} item={c} />
      ))}
    </div>
  );
};

export default CheckInsList;
