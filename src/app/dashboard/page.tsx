"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { HealthTestCard } from "@/components/dashboard/HealthTestCard";
import Link from "next/link";

export default function DashboardPage() {
  const { userRole, selectedParcel, setSelectedParcel } = useAppStore();
  const [viewMode, setViewMode] = useState<"owner" | "consultant">("owner");

  const handleSimulateSelect = () => {
    setSelectedParcel({
      id: "P-1042",
      name: "North Orchard Plot",
      area: 12.4,
      crop: "Wheat",
      healthScore: 84,
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <div 
      className="min-h-full"
      style={{ background: "linear-gradient(160deg, #0a1a0f 0%, #111c14 60%, #0a1a0f 100%)" }}
    >
      {/* Background texture and glow */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=30')", backgroundSize: "cover" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-10 p-8 sm:p-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}>
              🌾 Farm Intelligence Platform
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>
              Overview
            </h1>
            <p className="text-sm font-medium" style={{ color: "rgba(246,243,235,0.45)" }}>
              Welcome back. You are viewing as a <span style={{ color: "#d4a017" }}>{userRole}</span>.
            </p>
          </div>

          <div className="flex p-1 rounded-2xl border transition-all duration-300" style={{ background: "rgba(31,61,43,0.4)", borderColor: "rgba(212,160,23,0.1)" }}>
            {(["owner", "consultant"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${viewMode === mode ? 'shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                style={{
                  background: viewMode === mode ? "rgba(212,160,23,0.15)" : "transparent",
                  color: viewMode === mode ? "#d4a017" : "#f6f3eb",
                  border: viewMode === mode ? "1px solid rgba(212,160,23,0.3)" : "1px solid transparent",
                }}
              >
                {mode} View
              </button>
            ))}
          </div>
        </div>

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Parcel Selection */}
          <div className="glass-card p-8 flex flex-col gap-6 group transition-all duration-500 hover:shadow-gold/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)" }}>
                🗺️
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#d4a017" }}>Selected Parcel</span>
                <span className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>
                  {selectedParcel ? selectedParcel.name : "None Selected"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border flex flex-col gap-1" style={{ background: "rgba(13,31,18,0.3)", borderColor: "rgba(212,160,23,0.1)" }}>
                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(246,243,235,0.4)" }}>Parcel ID</span>
                <span className="text-sm font-semibold tracking-wide text-[#f6f3eb]">{selectedParcel?.id || "---"}</span>
              </div>
              <div className="p-4 rounded-xl border flex flex-col gap-1" style={{ background: "rgba(13,31,18,0.3)", borderColor: "rgba(212,160,23,0.1)" }}>
                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(246,243,235,0.4)" }}>Total Area</span>
                <span className="text-sm font-semibold tracking-wide text-[#f6f3eb]">{selectedParcel?.area ? `${selectedParcel.area} Ha` : "---"}</span>
              </div>
            </div>

            {!selectedParcel && (
              <button 
                onClick={handleSimulateSelect}
                className="btn-gold w-full text-sm rounded-2xl h-14 group"
              >
                🌾 Simulate Parcel Selection
              </button>
            )}
          </div>

          {/* Health Stats / Action Center */}
          <div className="glass-panel p-8 flex flex-col justify-center items-center gap-6 text-center">
            {selectedParcel ? (
              <div className="w-full h-full flex flex-col gap-4">
                <HealthTestCard parcel={selectedParcel} />
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl animate-pulse" style={{ background: "rgba(212,160,23,0.06)", border: "1px dashed rgba(212,160,23,0.3)" }}>
                  🛰️
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>Awaiting Live Selection</h3>
                  <p className="text-xs leading-relaxed max-w-[280px] mx-auto" style={{ color: "rgba(246,243,235,0.45)" }}>
                    The dashboard is synced with the Map module. Open the map to choose a field for deep-field analysis.
                  </p>
                </div>
                <Link href="/map" className="btn-outline-cream text-xs px-6 py-3 rounded-xl h-auto">
                  📍 Open Live Map
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>Field Intelligence</h2>
            <Link href="/dashboard/analytics" className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors" style={{ color: "#d4a017" }}>View Full Report →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🌡️", title: "Soil Condition", val: "Optimal", color: "#10b981", desc: "Moisture levels at 42%, ideal for upcoming sowing." },
              { icon: "🐛", title: "Pest Warning",  val: "Low Risk", color: "#f59e0b", desc: "Minimal pest pressure detected in surrounding area." },
              { icon: "🌧️", title: "Atmosphere",    val: "Heavy Rain", color: "#ef4444", desc: "Heavy rainfall expected in 48h. Adjust drainage." },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-gold/20">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${stat.color}15`, color: stat.color, border: `1px solid ${stat.color}33` }}>
                    {stat.val}
                  </span>
                </div>
                <h4 className="text-sm font-bold" style={{ color: "#f6f3eb" }}>{stat.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(246,243,235,0.45)" }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
