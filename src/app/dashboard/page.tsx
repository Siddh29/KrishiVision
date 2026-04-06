"use client";

import React from "react";
import { useAppStore } from "@/store/useAppStore";
import { HealthTestCard } from "@/components/dashboard/HealthTestCard";

export default function DashboardPage() {
  const {
    userRole,
    setUserRole,
    selectedParcel,
    setSelectedParcel,
    landHealthData,
    setLandHealthData
  } = useAppStore();

  const handleSimulateSelectParcel = () => {
    setSelectedParcel({ id: "parcel-a", name: "North Valley Field", areaHa: 45.2 });
    setLandHealthData({
      ndviScore: 0.82,
      moistureLevel: 42,
      status: "good",
      lastUpdated: new Date().toISOString().split("T")[0]
    });
  };

  return (
    <div
      className="min-h-full"
      style={{
        background: "linear-gradient(160deg, #0a1a0f 0%, #111c14 60%, #0a1a0f 100%)",
      }}
    >
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=30')", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Golden glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto flex flex-col gap-8 p-6 sm:p-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#d4a017" }}>
              🌾 Farm Intelligence Platform
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5f1e6" }}
            >
              Overview
            </h1>
            <p className="text-sm" style={{ color: "rgba(245,241,230,0.5)" }}>
              Welcome back. You are logged in as a{" "}
              <span className="font-semibold capitalize" style={{ color: "#d4a017" }}>{userRole}</span>.
            </p>
          </div>

          {/* View toggle */}
          <div
            className="flex items-center gap-1 rounded-full p-1"
            style={{ background: "rgba(31,61,43,0.5)", border: "1px solid rgba(212,160,23,0.15)" }}
          >
            <button
              onClick={() => setUserRole("landowner")}
              className="px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
              style={{
                background: userRole === "landowner" ? "rgba(212,160,23,0.2)" : "transparent",
                color: userRole === "landowner" ? "#d4a017" : "rgba(245,241,230,0.4)",
                border: userRole === "landowner" ? "1px solid rgba(212,160,23,0.3)" : "1px solid transparent",
              }}
            >
              Owner View
            </button>
            <button
              onClick={() => setUserRole("consultant")}
              className="px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
              style={{
                background: userRole === "consultant" ? "rgba(212,160,23,0.2)" : "transparent",
                color: userRole === "consultant" ? "#d4a017" : "rgba(245,241,230,0.4)",
                border: userRole === "consultant" ? "1px solid rgba(212,160,23,0.3)" : "1px solid transparent",
              }}
            >
              Consultant View
            </button>
          </div>
        </div>

        {/* ── Top Stats Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Selected Parcel Card */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(31,61,43,0.45)",
              border: "1px solid rgba(212,160,23,0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: "rgba(212,160,23,0.15)" }}
              >
                🗺️
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(245,241,230,0.4)" }}>
                  Selected Parcel
                </p>
                <h2 className="text-lg font-bold truncate" style={{ color: "#f5f1e6", fontFamily: "'Playfair Display', serif" }}>
                  {selectedParcel ? selectedParcel.name : "None Selected"}
                </h2>
              </div>
            </div>
            {selectedParcel && (
              <div className="flex gap-6 pt-3 border-t" style={{ borderColor: "rgba(212,160,23,0.1)" }}>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "rgba(245,241,230,0.35)" }}>ID</p>
                  <p className="text-sm font-mono" style={{ color: "#d4a017" }}>{selectedParcel.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "rgba(245,241,230,0.35)" }}>Area</p>
                  <p className="text-sm font-mono" style={{ color: "#d4a017" }}>{selectedParcel.areaHa} Ha</p>
                </div>
              </div>
            )}
          </div>

          {/* Health Data Card */}
          <div
            className="rounded-2xl p-6 md:col-span-2 flex flex-col justify-center items-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(31,61,43,0.45)",
              border: "1px solid rgba(212,160,23,0.15)",
              backdropFilter: "blur(16px)",
              minHeight: "120px",
            }}
          >
            {landHealthData ? (
              <div className="w-full grid grid-cols-3 gap-4 z-10">
                <div className="text-center p-4 rounded-xl" style={{ background: "rgba(212,160,23,0.08)" }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,241,230,0.4)" }}>NDVI Index</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a017" }}>
                    {landHealthData.ndviScore.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "rgba(59,130,246,0.08)" }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,241,230,0.4)" }}>Moisture</p>
                  <p className="text-3xl font-bold text-blue-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {landHealthData.moistureLevel}%
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)" }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,241,230,0.4)" }}>Status</p>
                  <span className={`badge-${landHealthData.status} text-sm px-4 py-1.5`}>
                    {landHealthData.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center z-10 flex flex-col items-center gap-4">
                <p className="text-sm" style={{ color: "rgba(245,241,230,0.45)" }}>
                  No health data available. Select a parcel from the map.
                </p>
                <button
                  onClick={handleSimulateSelectParcel}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #d4a017, #b8860b)",
                    color: "white",
                    boxShadow: "0 4px 20px rgba(212,160,23,0.3)",
                  }}
                >
                  🌾 Simulate Parcel Selection
                </button>
              </div>
            )}
            {landHealthData?.status === "good" && (
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 60%)" }} />
            )}
          </div>
        </div>

        {/* ── Map Preview Panel ── */}
        <div
          className="flex-1 min-h-[380px] rounded-3xl relative overflow-hidden flex flex-col items-center justify-center"
          style={{
            background: "rgba(10,26,15,0.6)",
            border: "1px solid rgba(212,160,23,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(212,160,23,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,160,23,0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="z-10 flex flex-col items-center gap-5 text-center px-4 max-w-sm rounded-3xl p-8"
            style={{
              background: "rgba(31,61,43,0.55)",
              border: "1px solid rgba(212,160,23,0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="text-5xl">🌿</div>
            <div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}
              >
                Awaiting Module Connection
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,241,230,0.45)" }}>
                The dashboard listens to Zustand state automatically. When the map is instantiated,
                parcel highlights will bind to globally selected data synchronously.
              </p>
            </div>
            <a
              href="/map"
              className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #d4a017, #b8860b)",
                color: "white",
                boxShadow: "0 4px 20px rgba(212,160,23,0.3)",
              }}
            >
              🗺️ Open Live Map
            </a>
          </div>
        </div>

        {/* ── Health Test Card ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthTestCard />
        </div>
      </div>
    </div>
  );
}
