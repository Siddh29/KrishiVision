import React from "react";
import type { LandAnalysis } from "@/types";

export function HealthTestCard() {
  // Dummy data mapped straight to our strict TS interface
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
    <div className="glass-panel p-6 flex flex-col justify-between overflow-hidden relative group">
      {/* Background aesthetic glow reflecting the Healthy status */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-health-good/10 blur-[40px] pointer-events-none transition-all group-hover:bg-health-good/20"></div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-zinc-400 font-medium text-sm mb-1 uppercase tracking-wider">Land Health Index</h3>
          <p className="text-4xl font-bold text-white tracking-tighter">
            {dummyAnalysis.score.toFixed(1)}<span className="text-lg text-zinc-500 font-normal ml-1">/ 100</span>
          </p>
        </div>
        <span className="badge-good shadow-sm shadow-health-good/20 px-3 py-1">
          {dummyAnalysis.status}
        </span>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 border-b border-white/5 pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
          Automated Insights
        </h4>
        <ul className="space-y-3">
          {dummyAnalysis.insights.map((insight, index) => (
            <li key={index} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
              <span className="flex-shrink-0 flex items-center justify-center mt-0.5 h-4 w-4 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-500">
                {index + 1}
              </span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
        <span>Analysis model updated recently</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-health-good animate-pulse"></span>
          {dummyAnalysis.confidence}% Precision
        </span>
      </div>
    </div>
  );
}
