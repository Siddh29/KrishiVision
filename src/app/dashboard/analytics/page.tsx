"use client";

import React, { useState } from "react";

// Simulated crop data
const cropData = [
  { crop: "Wheat",     area: 1240, ndvi: 0.81, moisture: 68, yield: 4.2, status: "good",     trend: "+12%" },
  { crop: "Rice",      area: 890,  ndvi: 0.74, moisture: 82, yield: 3.8, status: "good",     trend: "+8%"  },
  { crop: "Cotton",    area: 560,  ndvi: 0.51, moisture: 38, yield: 2.1, status: "warning",  trend: "-3%"  },
  { crop: "Sugarcane", area: 320,  ndvi: 0.88, moisture: 75, yield: 6.4, status: "good",     trend: "+18%" },
  { crop: "Soybean",   area: 430,  ndvi: 0.35, moisture: 22, yield: 1.4, status: "critical", trend: "-14%" },
  { crop: "Maize",     area: 670,  ndvi: 0.66, moisture: 54, yield: 3.1, status: "warning",  trend: "+2%"  },
];

const monthlyYield = [
  { month: "Oct", value: 62 },
  { month: "Nov", value: 71 },
  { month: "Dec", value: 58 },
  { month: "Jan", value: 80 },
  { month: "Feb", value: 88 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 91 },
];

const insights = [
  { icon: "🌧️", title: "Monsoon Forecast",     desc: "Above-average rainfall expected next 14 days. Pre-position drainage infrastructure for rice paddies.",   priority: "high"   },
  { icon: "🌡️", title: "Temperature Anomaly",  desc: "2.3°C above seasonal average detected in cotton zones. Increase irrigation frequency by 20%.",              priority: "medium" },
  { icon: "🐛", title: "Pest Risk Alert",       desc: "Historical pest pressure patterns suggest elevated armyworm risk in maize fields — schedule scouting.",     priority: "high"   },
  { icon: "💧", title: "Soil Moisture Low",     desc: "Soybean sector moisture dropped below critical 25% threshold. Immediate drip irrigation recommended.",     priority: "high"   },
  { icon: "📈", title: "Sugarcane Performing",  desc: "NDVI index of 0.88 indicates excellent canopy growth. Harvest window optimal in 3–4 weeks.",               priority: "low"    },
  { icon: "🌿", title: "Wheat Stable",          desc: "Wheat crop showing consistent NDVI above seasonal benchmark. No intervention required this week.",          priority: "low"    },
];

const statusColors: Record<string, string> = {
  good:     "rgba(16,185,129,0.15)",
  warning:  "rgba(245,158,11,0.15)",
  critical: "rgba(239,68,68,0.15)",
};
const statusText: Record<string, string> = {
  good:     "#10b981",
  warning:  "#f59e0b",
  critical: "#ef4444",
};
const priorityBadge: Record<string, { bg: string; text: string; label: string }> = {
  high:   { bg: "rgba(239,68,68,0.15)",    text: "#ef4444", label: "High Priority"   },
  medium: { bg: "rgba(245,158,11,0.15)",   text: "#f59e0b", label: "Medium Priority" },
  low:    { bg: "rgba(16,185,129,0.15)",   text: "#10b981", label: "Low Priority"    },
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"crops" | "insights">("crops");

  const totalArea  = cropData.reduce((a, c) => a + c.area, 0);
  const avgNDVI    = (cropData.reduce((a, c) => a + c.ndvi, 0) / cropData.length).toFixed(2);
  const avgMoisture = Math.round(cropData.reduce((a, c) => a + c.moisture, 0) / cropData.length);
  const healthyCount = cropData.filter(c => c.status === "good").length;

  const maxYield = Math.max(...monthlyYield.map(m => m.value));

  return (
    <div
      className="min-h-full"
      style={{ background: "linear-gradient(160deg, #0a1a0f 0%, #111c14 60%, #0a1a0f 100%)" }}
    >
      {/* Subtle farm bg texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=30')", backgroundSize: "cover" }} />
      <div className="fixed top-0 right-0 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-8 p-6 sm:p-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#d4a017" }}>
              📊 Data Intelligence
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5f1e6" }}>
              Farm Analytics
            </h1>
            <p className="text-sm" style={{ color: "rgba(245,241,230,0.45)" }}>
              Aggregated crop health, yield forecasts, and AI-driven field insights across all registered parcels.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#d4a017" }} />
            Live Data · Updated Now
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Area",       value: `${totalArea.toLocaleString()} Ha`, icon: "🌾", sub: "Across all parcels"        },
            { label: "Avg NDVI Score",   value: avgNDVI,                            icon: "🌿", sub: "Vegetation health index"   },
            { label: "Avg Soil Moisture",value: `${avgMoisture}%`,                  icon: "💧", sub: "Field moisture levels"     },
            { label: "Healthy Crops",    value: `${healthyCount}/${cropData.length}`,icon: "✅", sub: "Meeting health thresholds" },
          ].map((kpi, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{ background: "rgba(31,61,43,0.5)", border: "1px solid rgba(212,160,23,0.15)", backdropFilter: "blur(16px)" }}
            >
              <div className="text-2xl">{kpi.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a017" }}>{kpi.value}</div>
              <div className="text-xs font-semibold" style={{ color: "#f5f1e6" }}>{kpi.label}</div>
              <div className="text-xs" style={{ color: "rgba(245,241,230,0.4)" }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Yield Trend Chart ── */}
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{ background: "rgba(31,61,43,0.4)", border: "1px solid rgba(212,160,23,0.12)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(245,241,230,0.4)" }}>Monthly Performance</p>
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}>Yield Index Trend</h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>
              ↑ +18.3% this season
            </span>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-40">
            {monthlyYield.map((m, i) => {
              const h = (m.value / maxYield) * 100;
              const isLast = i === monthlyYield.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#d4a017" }}>
                    {m.value}%
                  </span>
                  <div className="w-full rounded-t-xl transition-all duration-300 hover:scale-y-105 origin-bottom" style={{
                    height: `${h}%`,
                    background: isLast
                      ? "linear-gradient(180deg, #d4a017, #b8860b)"
                      : "rgba(212,160,23,0.3)",
                    border: isLast ? "1px solid rgba(212,160,23,0.6)" : "1px solid rgba(212,160,23,0.15)",
                    minHeight: "12px",
                  }} />
                  <span className="text-xs font-medium" style={{ color: "rgba(245,241,230,0.45)" }}>{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tab: Crop Table / Insights ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(31,61,43,0.4)", border: "1px solid rgba(212,160,23,0.12)", backdropFilter: "blur(16px)" }}
        >
          {/* Tab bar */}
          <div className="flex border-b" style={{ borderColor: "rgba(212,160,23,0.1)" }}>
            {(["crops", "insights"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 text-sm font-semibold capitalize transition-all duration-200"
                style={{
                  color: activeTab === tab ? "#d4a017" : "rgba(245,241,230,0.4)",
                  borderBottom: activeTab === tab ? "2px solid #d4a017" : "2px solid transparent",
                  background: "transparent",
                }}
              >
                {tab === "crops" ? "🌾 Crop Overview" : "🧠 AI Insights"}
              </button>
            ))}
          </div>

          {/* Crop Table */}
          {activeTab === "crops" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
                    {["Crop", "Area (Ha)", "NDVI", "Moisture", "Est. Yield", "Trend", "Status"].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(245,241,230,0.35)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cropData.map((row, i) => (
                    <tr
                      key={i}
                      className="transition-colors duration-200 hover:bg-white/[0.03]"
                      style={{ borderBottom: "1px solid rgba(245,241,230,0.04)" }}
                    >
                      <td className="px-5 py-4 font-semibold" style={{ color: "#f5f1e6" }}>{row.crop}</td>
                      <td className="px-5 py-4 font-mono" style={{ color: "rgba(245,241,230,0.6)" }}>{row.area.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full max-w-[60px]" style={{ background: "rgba(255,255,255,0.08)" }}>
                            <div className="h-full rounded-full" style={{ width: `${row.ndvi * 100}%`, background: row.ndvi >= 0.6 ? "#10b981" : row.ndvi >= 0.4 ? "#f59e0b" : "#ef4444" }} />
                          </div>
                          <span className="font-mono text-xs" style={{ color: statusText[row.status] }}>{row.ndvi.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono" style={{ color: "rgba(245,241,230,0.6)" }}>{row.moisture}%</td>
                      <td className="px-5 py-4 font-mono" style={{ color: "rgba(245,241,230,0.6)" }}>{row.yield} t/ha</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold" style={{ color: row.trend.startsWith("+") ? "#10b981" : "#ef4444" }}>
                          {row.trend}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full capitalize" style={{ background: statusColors[row.status], color: statusText[row.status], border: `1px solid ${statusText[row.status]}33` }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* AI Insights */}
          {activeTab === "insights" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {insights.map((ins, i) => {
                const badge = priorityBadge[ins.priority];
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "rgba(10,26,15,0.5)", border: "1px solid rgba(212,160,23,0.1)" }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-2xl">{ins.icon}</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: badge.bg, color: badge.text }}>
                        {badge.label}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold" style={{ color: "#f5f1e6" }}>{ins.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(245,241,230,0.5)" }}>{ins.desc}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
