import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { CheckInRow } from "@/lib/frontdeskApi";

export type CheckIn = CheckInRow;

type KycEntry = { name: string; url: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-07-27" -> "27 Jul'26"
const fmtDate = (s: string): string => {
  if (!s) return "";
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return s;
  const [, y, mo, d] = m;
  const monthIdx = Math.max(0, Math.min(11, Number(mo) - 1));
  return `${Number(d)} ${MONTHS[monthIdx]}'${y.slice(2)}`;
};

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

const Details: React.FC<{ item: CheckIn }> = ({ item }) => {
  const kyc = parseKyc(item.kyc || "");
  const guestNames = (item.guestNames || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <div className="bg-slate-50/60 px-4 py-3 text-sm space-y-2">
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
  );
};

const DesktopRow: React.FC<{ item: CheckIn }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer hover:bg-slate-50 border-t border-slate-200"
      >
        <td className="px-3 py-2.5 align-middle w-6">
          {open ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </td>
        <td className="px-3 py-2.5 font-medium text-[#16233f]">{item.primaryName}</td>
        <td className="px-3 py-2.5 text-slate-600 text-center whitespace-nowrap">{item.guestCount}</td>
        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{item.platform}</td>
        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{item.mobile}</td>
        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{fmtDate(item.checkin)}</td>
        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{fmtDate(item.checkout)}</td>
      </tr>
      {open && (
        <tr className="border-t border-slate-100">
          <td colSpan={7} className="p-0">
            <Details item={item} />
          </td>
        </tr>
      )}
    </>
  );
};

const MobileCard: React.FC<{ item: CheckIn }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-md bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-3 flex items-start gap-2"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
        )}
        <div className="flex-1 space-y-1 text-sm">
          <div className="font-medium text-[#16233f]">{item.primaryName}</div>
          <div className="text-slate-600">
            <span className="text-slate-400">Guests:</span> {item.guestCount}{" "}
            <span className="text-slate-400 ml-2">Source:</span> {item.platform}
          </div>
          <div className="text-slate-600">
            <span className="text-slate-400">Phone:</span> {item.mobile}
          </div>
          <div className="text-slate-600 whitespace-nowrap">
            <span className="text-slate-400">Stay:</span> {fmtDate(item.checkin)} → {fmtDate(item.checkout)}
          </div>
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-200">
          <Details item={item} />
        </div>
      )}
    </div>
  );
};

const CheckInsList: React.FC<{ items: CheckIn[]; loading: boolean }> = ({ items, loading }) => {
  if (loading) return <div className="text-sm text-slate-500">Loading…</div>;
  if (!items.length) return <div className="text-sm text-slate-500">No check-ins yet.</div>;
  return (
    <>
      {/* Desktop / tablet: compact table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-auto min-w-full text-sm border border-slate-200 rounded-md">
          <thead className="bg-slate-50 text-[#16233f]">
            <tr className="text-left">
              <th className="px-3 py-2 w-6"></th>
              <th className="px-3 py-2 font-semibold">Name</th>
              <th className="px-3 py-2 font-semibold text-center whitespace-nowrap">No. of Guests</th>
              <th className="px-3 py-2 font-semibold whitespace-nowrap">Source</th>
              <th className="px-3 py-2 font-semibold whitespace-nowrap">Phone Number</th>
              <th className="px-3 py-2 font-semibold whitespace-nowrap">Check-in</th>
              <th className="px-3 py-2 font-semibold whitespace-nowrap">Check-out</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c, i) => (
              <DesktopRow key={i} item={c} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden space-y-2">
        {items.map((c, i) => (
          <MobileCard key={i} item={c} />
        ))}
      </div>
    </>
  );
};

export default CheckInsList;
