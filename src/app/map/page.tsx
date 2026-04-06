import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function MapPage() {
  return (
    <AppLayout showSidebar={true}>
      <div className="h-[calc(100vh-64px)] w-full flex flex-col p-4 md:p-6 pb-0">
        <div className="mb-4">
          <h1 className="heading-2">Interactive Intelligence Map</h1>
          <p className="text-muted">Global map module placeholder utilizing MapLibre structural bounds.</p>
        </div>
        
        {/* Full-bleed mock map container */}
        <div className="flex-1 w-full rounded-t-xl border border-white/10 bg-black/20 relative overflow-hidden flex flex-col items-center justify-center text-zinc-500">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Mock Floating Action Bar for Map context */}
          <div className="absolute top-4 left-4 flex gap-2 z-10 glass-panel !bg-black/60 p-1.5 rounded-lg border-white/10">
            <button className="px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-white/20 rounded shadow transition-colors">Satellite</button>
            <button className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white rounded transition-colors">NDVI Index</button>
            <button className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white rounded transition-colors">Moisture</button>
          </div>

          <div className="absolute bottom-6 right-6 z-10 hidden sm:flex flex-col gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-md bg-black/60 border border-white/10 text-white hover:bg-white/20 transition-colors">+</button>
            <button className="h-8 w-8 flex items-center justify-center rounded-md bg-black/60 border border-white/10 text-white hover:bg-white/20 transition-colors">-</button>
          </div>

          <div className="z-10 flex flex-col items-center gap-4 text-center px-4 max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
            <div>
              <h3 className="text-lg font-medium text-zinc-300">MapLibre Engine Initializing</h3>
              <p className="text-sm mt-1">This space is fully parameterized for `react-map-gl` injection. Tiles will render here.</p>
            </div>
            
            <div className="flex gap-2.5 mt-2">
               <span className="badge-good">Engine OK</span>
               <span className="badge-warning">Awaiting Token</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
