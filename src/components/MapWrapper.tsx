"use client";

import React from "react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 rounded-t-xl text-zinc-500">
      <div className="animate-pulse flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-emerald-100 animate-spin"></div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Initializing Map Wrapper...</p>
      </div>
    </div>
  )
});

export default function MapWrapper() {
  return <MapView />;
}
