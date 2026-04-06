"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Scroll fade-in animation hook
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const stats = [
  { value: "12,400+", label: "Farms Supported", icon: "🌾" },
  { value: "3.2M",    label: "Acres Protected",  icon: "🛡️" },
  { value: "86,000+", label: "Farmers Registered", icon: "👨‍🌾" },
  { value: "98%",     label: "Crops Verified",   icon: "✅" },
];

const features = [
  {
    icon: "🗺️",
    title: "Precision Land Mapping",
    desc: "Satellite-grade GeoJSON parcel maps with boundary markers, real-time crop health overlays, and field-level analytics at your fingertips.",
    tag: "Core Platform",
  },
  {
    icon: "🌿",
    title: "NDVI Crop Health Index",
    desc: "Simulated and real NDVI data layered directly on your parcels. Instantly spot stressed zones, healthy fields, and irrigation needs.",
    tag: "AI Analytics",
  },
  {
    icon: "☁️",
    title: "Weather & Terrain Intelligence",
    desc: "Live terrain elevation data, weather overlays, and soil moisture tracking fused into one decision-ready dashboard.",
    tag: "Smart Data",
  },
  {
    icon: "📊",
    title: "Agricultural Planning Tools",
    desc: "Season planning, crop rotation calendars, harvest forecasting — all built for the modern Indian farmer and agri-consultant.",
    tag: "Planning",
  },
  {
    icon: "🚜",
    title: "Farmer Tools Marketplace",
    desc: "Browse and connect with verified vendors for seeds, fertilizers, machinery rentals, and soil testing services directly in-platform.",
    tag: "Marketplace",
  },
  {
    icon: "📷",
    title: "Crop Gallery Showcase",
    desc: "Visual crop progress tracking. Upload field photos, chart growth timelines, and share verified harvest reports with stakeholders.",
    tag: "Gallery",
  },
];

export default function Home() {
  useScrollAnimation();

  return (
    <AppLayout showSidebar={false}>
      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,26,15,0.55) 0%, rgba(10,26,15,0.75) 60%, rgba(10,26,15,0.98) 100%)",
          }}
        />
        {/* Warm glow orbs */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-10" style={{ background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none z-10" style={{ background: "radial-gradient(circle, rgba(31,61,43,0.4) 0%, transparent 70%)" }} />

        {/* Hero content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.35)", color: "#d4a017" }}>
            <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ background: "#d4a017" }} />
            Platform 2.0 is now live — India&apos;s smartest agri-intelligence layer
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#f5f1e6",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            Where Fields Meet{" "}
            <span style={{ color: "#d4a017" }}>Intelligence</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl max-w-2xl leading-relaxed"
            style={{ color: "rgba(245,241,230,0.7)" }}
          >
            Harness satellite imagery, AI mapping, and predictive analytics to make
            informed decisions for agriculture, conservation, and land planning —
            built for every farmer across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/dashboard"
              className="inline-flex h-13 items-center justify-center rounded-full px-8 py-3.5 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #d4a017, #b8860b)",
                boxShadow: "0 8px 32px rgba(212,160,23,0.4)",
                fontSize: "1rem",
              }}
            >
              🌾 Open Dashboard
            </Link>
            <Link
              href="/map"
              className="inline-flex h-13 items-center justify-center rounded-full px-8 py-3.5 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(245,241,230,0.08)",
                border: "1px solid rgba(245,241,230,0.3)",
                color: "#f5f1e6",
                fontSize: "1rem",
                backdropFilter: "blur(12px)",
              }}
            >
              🗺️ Explore Live Map
            </Link>
          </div>

          {/* Map preview mockup */}
          <div
            className="mt-12 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(31,61,43,0.4)",
              border: "1px solid rgba(212,160,23,0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(245,241,230,0.07)" }}>
              <div className="h-3 w-3 rounded-full bg-red-400/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <div className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs font-medium" style={{ color: "rgba(245,241,230,0.4)" }}>KrishiVision Interactive Map — India</span>
            </div>
            <div
              className="aspect-video w-full flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0a1a0f 0%, #1f3d2b 100%)" }}
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, #d4a01714 1px, transparent 1px), linear-gradient(to bottom, #d4a01714 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="flex flex-col items-center gap-3 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </svg>
                <Link href="/map" className="text-sm font-semibold px-5 py-2 rounded-full transition-all hover:scale-105" style={{ background: "rgba(212,160,23,0.2)", border: "1px solid rgba(212,160,23,0.4)", color: "#d4a017" }}>
                  Open Interactive Map →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS SECTION ══════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #1a3323 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#d4a017" }}>Trusted by farmers across India</p>
            <h2 className="text-3xl sm:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}>Rooted in Real Impact</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="fade-in-up rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: "rgba(31,61,43,0.5)",
                  border: "1px solid rgba(212,160,23,0.2)",
                  backdropFilter: "blur(12px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a017" }}>{stat.value}</div>
                <div className="text-sm font-medium" style={{ color: "rgba(245,241,230,0.6)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURES SECTION ══════════════════ */}
      <section id="features" className="py-24 relative overflow-hidden" style={{ background: "#0a1a0f" }}>
        {/* Blurred farm bg */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=50')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(8px)" }} />
        {/* Warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Everything you need to farm smarter</p>
            <h2 className="text-4xl sm:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}>
              Cultivated for <span style={{ color: "#d4a017" }}>Modern India</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,241,230,0.55)" }}>
              From satellite maps to harvest planning — every tool a farmer, consultant, or agri-business needs, unified in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="fade-in-up group relative rounded-3xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default"
                style={{
                  background: "rgba(31,61,43,0.3)",
                  border: "1px solid rgba(245,241,230,0.07)",
                  backdropFilter: "blur(12px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" style={{ background: "radial-gradient(ellipse at top left, rgba(212,160,23,0.08) 0%, transparent 70%)", boxShadow: "inset 0 0 0 1px rgba(212,160,23,0.2)" }} />

                <div className="text-4xl mb-5">{f.icon}</div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "rgba(212,160,23,0.12)", color: "#d4a017" }}>{f.tag}</span>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,241,230,0.55)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTACT SECTION ══════════════════ */}
      <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1a0f 0%, #1f3d2b 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />

        <div className="relative max-w-2xl mx-auto px-4">
          <div className="text-center mb-10 fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Reach out</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}>Get in Touch</h2>
            <p className="text-base" style={{ color: "rgba(245,241,230,0.55)" }}>Whether you&apos;re a farmer, researcher, or agri-tech investor — we&apos;d love to connect.</p>
          </div>

          <form
            className="fade-in-up rounded-3xl p-8 sm:p-10 flex flex-col gap-5"
            style={{ background: "rgba(31,61,43,0.45)", border: "1px solid rgba(212,160,23,0.15)", backdropFilter: "blur(20px)" }}
            onSubmit={e => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(245,241,230,0.5)" }}>Full Name</label>
                <input type="text" placeholder="Aarav Sharma" className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2" style={{ background: "rgba(245,241,230,0.06)", border: "1px solid rgba(245,241,230,0.12)", color: "#f5f1e6" }} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(245,241,230,0.5)" }}>Email Address</label>
                <input type="email" placeholder="aarav@farm.in" className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2" style={{ background: "rgba(245,241,230,0.06)", border: "1px solid rgba(245,241,230,0.12)", color: "#f5f1e6" }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(245,241,230,0.5)" }}>Your Message</label>
              <textarea rows={5} placeholder="Tell us about your farm or use case..." className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all resize-none focus:ring-2" style={{ background: "rgba(245,241,230,0.06)", border: "1px solid rgba(245,241,230,0.12)", color: "#f5f1e6" }} />
            </div>
            <button type="submit" className="w-full rounded-full py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl" style={{ background: "linear-gradient(135deg, #d4a017, #b8860b)", boxShadow: "0 8px 32px rgba(212,160,23,0.35)" }}>
              🌾 Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="py-10 border-t text-center" style={{ borderColor: "rgba(212,160,23,0.12)", background: "#060f09" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#f5f1e6" }}>
            Krishi<span style={{ color: "#d4a017" }}>Vision</span>
          </span>
          <p className="text-xs" style={{ color: "rgba(245,241,230,0.35)" }}>
            © {new Date().getFullYear()} KrishiVision. Built with 🌾 for the farmers of India.
          </p>
          <div className="flex gap-6 text-xs font-medium" style={{ color: "rgba(245,241,230,0.4)" }}>
            <Link href="/dashboard" className="hover:text-[#d4a017] transition-colors">Dashboard</Link>
            <Link href="/map" className="hover:text-[#d4a017] transition-colors">Map</Link>
            <Link href="#features" className="hover:text-[#d4a017] transition-colors">Features</Link>
          </div>
        </div>
      </footer>
    </AppLayout>
  );
}
