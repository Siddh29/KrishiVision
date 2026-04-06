import React from "react";
import type { LandAnalysis } from "@/types";

export function HealthTestCard() {
  const dummyAnalysis: LandAnalysis = {
    score: 87.5,
    status: "Healthy",
    confidence: 94,
    insights: [
      "Optimal soil moisture levels detected over the 3-day cycle.",
      "Minimal risk of drought projected for the upcoming week.",
    ],
  };

  return (
    <div
      className="rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative group transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(31,61,43,0.45)",
        border: "1px solid rgba(212,160,23,0.15)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
      />

      {/* Header row */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(245,241,230,0.4)" }}>
            Land Health Index
          </p>
          <p className="text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5f1e6" }}>
            {dummyAnalysis.score.toFixed(1)}
            <span className="text-xl font-normal ml-1" style={{ color: "rgba(245,241,230,0.4)" }}>/100</span>
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
          style={{
            background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.3)",
            color: "#10b981",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-green-400" />
          {dummyAnalysis.status}
        </span>
      </div>

      {/* Insights */}
      <div className="space-y-4 relative z-10">
        <h4
          className="text-sm font-semibold flex items-center gap-2 pb-2 border-b"
          style={{ color: "rgba(245,241,230,0.6)", borderColor: "rgba(212,160,23,0.12)" }}
        >
          <span style={{ color: "#d4a017" }}>🌿</span>
          Automated Insights
        </h4>
        <ul className="space-y-3">
          {dummyAnalysis.insights.map((insight, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "rgba(245,241,230,0.55)" }}>
              <span
                className="flex-shrink-0 flex items-center justify-center mt-0.5 h-5 w-5 rounded-full text-[10px] font-bold"
                style={{ background: "rgba(212,160,23,0.15)", color: "#d4a017", border: "1px solid rgba(212,160,23,0.25)" }}
              >
                {i + 1}
              </span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div
        className="mt-6 pt-4 border-t flex items-center justify-between text-xs relative z-10"
        style={{ borderColor: "rgba(212,160,23,0.1)", color: "rgba(245,241,230,0.35)" }}
      >
        <span>Analysis model updated recently</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {dummyAnalysis.confidence}% Precision
        </span>
      </div>
    </div>
  );
}
