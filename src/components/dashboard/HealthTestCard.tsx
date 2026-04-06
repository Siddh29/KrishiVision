"use client";

import React from "react";
import type { LandAnalysis } from "@/types";

export function HealthTestCard() {
  const dummyAnalysis: LandAnalysis = {
    score: 87.5,
    status: "Healthy",
    confidence: 94,
    insights: [
      "Optimal soil moisture levels detected over the 3-day cycle.",
      "Minimal risk of drought projected for the upcoming week."
    ],
  };

  return (
    <div className="glass-panel p-8 flex flex-col justify-between overflow-hidden relative group h-full">
      {/* Background aesthetic glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/5 blur-[50px] pointer-events-none transition-all group-hover:bg-gold/10"></div>

      <div className="flex justify-between items-start mb-8 text-left">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#d4a017" }}>Land Health Index</h3>
          <p className="text-5xl font-bold tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>
            {dummyAnalysis.score.toFixed(1)}<span className="text-xl font-normal opacity-30 ml-1">/ 100</span>
          </p>
        </div>
        <span className="badge-good shadow-lg shadow-emerald-900/20 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold">
          {dummyAnalysis.status}
        </span>
      </div>

      <div className="space-y-6 text-left">
        <h4 className="text-xs font-bold text-[#f6f3eb] flex items-center gap-3 border-b border-gold/10 pb-3 uppercase tracking-widest">
          <span className="text-lg">🧠</span>
          Automated Insights
        </h4>
        <ul className="space-y-4">
          {dummyAnalysis.insights.map((insight, index) => (
            <li key={index} className="flex gap-4 text-sm leading-relaxed" style={{ color: "rgba(246,243,235,0.5)" }}>
              <span className="flex-shrink-0 flex items-center justify-center mt-0.5 h-5 w-5 rounded-full font-bold text-[10px]" style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.2)", color: "#d4a017" }}>
                {index + 1}
              </span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-gold/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(246,243,235,0.25)" }}>
        <span>Model Version 2.0.4</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
          {dummyAnalysis.confidence}% Precision
        </span>
      </div>
    </div>
  );
}
