import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import MapWrapper from "@/components/MapWrapper";

export default function MapPage() {
  return (
    <AppLayout showSidebar={true}>
      <div className="h-[calc(100vh-64px)] w-full flex flex-col pt-4 sm:pt-8 px-4 sm:px-8 pb-0 overflow-hidden max-w-[1600px] mx-auto">
        
        {/* Header Block constraints to prevent overlapping or breaking layout flow */}
        <div className="mb-6 shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">Interactive Intelligence Map</h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Explore structural bounds and simulated NDVI geographic models. Select a land parcel to inspect localized terrain indexing.
            </p>
          </div>
          
          <div className="flex items-center">
             <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 shadow-inner">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
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
