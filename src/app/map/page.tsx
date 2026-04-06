import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/20 border border-white/10 rounded-t-xl text-zinc-500">
      <div className="animate-pulse flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin"></div>
        <p>Initializing Map Engine...</p>
      </div>
    </div>
  )
});

export default function MapPage() {
  return (
    <AppLayout showSidebar={true}>
      <div className="h-[calc(100vh-64px)] w-full flex flex-col p-4 md:p-6 pb-0">
        <div className="mb-4">
          <h1 className="heading-2">Interactive Intelligence Map</h1>
          <p className="text-muted">Global map module placeholder utilizing MapLibre structural bounds.</p>
        </div>
        
        <div className="flex-1 w-full relative z-0">
          <MapView />
        </div>
      </div>
    </AppLayout>
  );
}
