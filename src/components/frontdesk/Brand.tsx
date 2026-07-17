import React from "react";
import { Building2 } from "lucide-react";

const Brand: React.FC<{ subtitle?: string }> = ({ subtitle = "Front desk" }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-md bg-[#16233f] flex items-center justify-center text-[#c9a24b]">
      <Building2 className="w-5 h-5" strokeWidth={1.5} />
    </div>
    <div className="leading-tight">
      <div className="text-lg font-semibold text-[#16233f] tracking-tight">Skylight Suites</div>
      <div className="text-xs uppercase tracking-widest text-[#c9a24b]">{subtitle}</div>
    </div>
  </div>
);

export default Brand;
