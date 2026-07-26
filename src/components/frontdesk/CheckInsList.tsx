import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { CheckInRow } from "@/lib/frontdeskApi";

export type CheckIn = CheckInRow;

type KycEntry = { name: string; url: string };

// `kyc` is newline-separated; each line "Guest name: https://drive-link".
const parseKyc = (kyc: string): KycEntry[] => {
  if (!kyc) return [];
  return kyc
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf("http");
      if (idx === -1) return { name: line.replace(/:\s*$/, ""), url: "" };
      const url = line.slice(idx).trim();
      const name = line.slice(0, idx).replace(/:\s*$/, "").trim();
      return { name: name || "Guest", url };
    });
};

const Row: React.FC<{ item: CheckIn }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const kyc = parseKyc(item.kyc || "");
  const guestNames = (item.guestNames || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="border border-slate-200 rounded-md">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 text-left px-4 py-3 hover:bg-slate-50"
      >
        {open ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-2 text-sm">
          <div className="font-medium text-[#16233f]">{item.primaryName}</div>
          <div className="text-slate-600">
            {item.guestCount} guest{item.guestCount === "1" ? "" : "s"}
          </div>
          <div className="text-slate-600">{item.platform}</div>
          <div className="text-slate-600">{item.mobile}</div>
          <div className="text-slate-600">
            {item.checkin} → {item.checkout}
          </div>
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-200 px-4 py-3 bg-slate-50/50 text-sm space-y-2">
          <div>
            <span className="text-slate-500">Email:</span> {item.email}
          </div>
          <div>
            <span className="text-slate-500">From → To:</span> {item.from} → {item.to}
          </div>
          <div>
            <span className="text-slate-500">Consent:</span> {item.consent}
          </div>
          {guestNames.length > 0 && (
            <div>
              <span className="text-slate-500">Guests:</span> {guestNames.join(", ")}
            </div>
          )}
          {kyc.length > 0 && (
            <div>
              <div className="text-slate-500 mb-1">KYC:</div>
              <ul className="space-y-1">
                {kyc.map((k, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-2">
                    <span className="text-[#16233f]">
                      {i + 1}. {k.name}
                    </span>
                    {k.url ? (
                      <a
                        href={k.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c9a24b] hover:underline"
                      >
                        view ID
                      </a>
                    ) : (
                      <span className="text-slate-400">No image</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
      {items.map((c, i) => (
        <Row key={i} item={c} />
      ))}
    </div>
  );
};

export default CheckInsList;
