import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import MapWrapper from "@/components/MapWrapper";

export default function MapPage() {
  return (
    <AppLayout showSidebar={true}>
      <div
        className="h-[calc(100vh-64px)] w-full flex flex-col pt-6 sm:pt-8 px-4 sm:px-8 pb-0 overflow-hidden max-w-[1600px] mx-auto"
        style={{ background: "linear-gradient(160deg, #0a1a0f 0%, #111c14 100%)" }}
      >
        
        {/* Header Block */}
        <div className="mb-6 shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex-1 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#d4a017" }}>
              🗺️ Field Intelligence Layer
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5f1e6" }}
            >
              Interactive Intelligence Map
            </h1>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(245,241,230,0.5)" }}>
              Explore structural bounds and simulated NDVI geographic models. Select a land parcel to inspect localized terrain indexing.
            </p>
          </div>

          <div className="flex items-center shrink-0">
            <div
              className="flex items-center gap-2.5 text-xs font-semibold px-4 py-2 rounded-full"
              style={{
                background: "rgba(212,160,23,0.1)",
                border: "1px solid rgba(212,160,23,0.25)",
                color: "#d4a017",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#d4a017" }}></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#d4a017" }}></span>
              </span>
              Engine Online
            </div>
          </div>
        </div>
        
        {/* Map Box rendered tightly and flawlessly rounded on huge screens */}
        <div className="flex-1 w-full min-h-0 relative z-0 rounded-t-2xl sm:rounded-t-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.5)]">
          <MapWrapper />
        </div>
        
      </div>
    </AppLayout>
  );
}
