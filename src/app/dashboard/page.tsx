"use client";

import React from "react";
import { useAppStore } from "@/store/useAppStore";
import { HealthTestCard } from "@/components/dashboard/HealthTestCard";

export default function DashboardPage() {
  // Pull state pieces from the Zustand store
  const { 
    userRole, 
    setUserRole, 
    selectedParcel, 
    setSelectedParcel,
    landHealthData,
    setLandHealthData
  } = useAppStore();

  // Mock function to simulate clicking on a map parcel
  const handleSimulateSelectParcel = () => {
    setSelectedParcel({ id: "parcel-a", name: "North Valley Field", areaHa: 45.2 });
    setLandHealthData({
      ndviScore: 0.82,
      moistureLevel: 42,
      status: "good",
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-8 h-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Overview</h1>
          <p className="text-zinc-400 text-sm">
            Welcome back to the KrishiVision platform. You are logged in as a 
            <span className="font-semibold text-emerald-400 capitalize ml-1">{userRole}</span>.
          </p>
        </div>
        
        {/* State Management example toggles */}
        <div className="flex items-center gap-2 glass-panel !rounded-lg p-1">
          <button 
            onClick={() => setUserRole("landowner")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${userRole === 'landowner' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Owner View
          </button>
          <button 
            onClick={() => setUserRole("consultant")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${userRole === 'consultant' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Consultant View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Selected Parcel</p>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white truncate break-words">
                {selectedParcel ? selectedParcel.name : "None Selected"}
              </h2>
            </div>
          </div>
          {selectedParcel && (
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
              <div>
                 <p className="text-xs text-zinc-500">ID</p>
                 <p className="text-sm font-mono text-zinc-300">{selectedParcel.id}</p>
              </div>
              <div>
                 <p className="text-xs text-zinc-500">Area</p>
                 <p className="text-sm font-mono text-zinc-300">{selectedParcel.areaHa} Ha</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-sm backdrop-blur-sm md:col-span-2 flex flex-col justify-center items-center relative overflow-hidden">
           {landHealthData ? (
             <div className="w-full flex justify-around items-center z-10">
                <div className="text-center">
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">NDVI Index</p>
                  <p className="text-3xl font-bold text-white">{landHealthData.ndviScore.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Moisture</p>
                  <p className="text-3xl font-bold text-blue-400">{landHealthData.moistureLevel}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Status</p>
                  <span className={`badge-${landHealthData.status} text-sm px-3 py-1`}>
                    {landHealthData.status.toUpperCase()}
                  </span>
                </div>
             </div>
           ) : (
              <div className="text-center z-10">
                <p className="text-zinc-400 mb-4">No health data available. Select a parcel from the map.</p>
                <button onClick={handleSimulateSelectParcel} className="btn-secondary text-sm h-9 px-4">
                  Simulate Parcel Selection
                </button>
              </div>
           )}
           
           {/* Background glow if health data is good */}
           {landHealthData?.status === 'good' && (
             <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
           )}
        </div>
      </div>

          {/* Main Map Empty Area */}
      <div className="flex-1 min-h-[400px] rounded-xl border border-white/10 bg-black/20 relative overflow-hidden flex flex-col items-center justify-center text-zinc-500 mb-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="z-10 flex flex-col items-center gap-4 text-center px-4 max-w-sm glass-panel p-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Awaiting Module Connection</h3>
            <p className="text-sm">The dashboard listens to Zustand state automatically. When the map is instantiated in this view, parcel highlights will bind to globally selected data synchronously.</p>
          </div>
        </div>
      </div>
      
      {/* Additional UI Testing Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <HealthTestCard />
      </div>
    </div>
  );
}
