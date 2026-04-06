"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";
import { useEffect } from "react";

function useScrollFade() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const stats = [
  { value: "1,000+", label: "Farmers Connected", icon: "👨‍🌾" },
  { value: "5,000+", label: "Acres Managed",     icon: "🌾" },
  { value: "200+",   label: "Tools Listed",       icon: "🔧" },
  { value: "98%",    label: "Farmer Satisfaction",icon: "⭐" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80", h: "h-64",  label: "Golden Wheat Fields"     },
  { src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80", h: "h-44",  label: "Harvest Season"           },
  { src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80", h: "h-56",  label: "Lush Green Farmlands"     },
  { src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80", h: "h-36",  label: "Sunrise Over Crops"       },
  { src: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=600&q=80", h: "h-48",  label: "Farmer at Work"           },
  { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80", h: "h-40",  label: "Fresh Produce"            },
  { src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80", h: "h-52",  label: "Rice Fields"              },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80", h: "h-44",  label: "Soil & Seeds"             },
];

const marketplace = [
  { icon: "🌱", name: "Premium Seeds",     desc: "Verified hybrid & heirloom seeds from trusted suppliers",   tag: "Seeds"      },
  { icon: "🚜", name: "Farm Equipment",    desc: "Tractors, tillers, sprayers — buy, rent or lease",           tag: "Equipment"  },
  { icon: "💧", name: "Irrigation Tools",  desc: "Drip systems, sprinklers, smart soil moisture monitors",     tag: "Water Mgmt" },
  { icon: "🧪", name: "Soil Testing Kits", desc: "Lab-grade at-home kits with AI-powered analysis reports",    tag: "Analysis"   },
  { icon: "🌿", name: "Organic Inputs",    desc: "Bio-fertilizers, pest repellents, compost boosters",          tag: "Organic"    },
  { icon: "📦", name: "Post-Harvest",      desc: "Storage, packaging, cold chain logistics partners",           tag: "Logistics"  },
];

const tools = [
  { icon: "🗓️", title: "Season Planner",      desc: "Crop calendar with sowing, irrigation, harvest schedules"   },
  { icon: "🌦️", title: "Weather Intelligence", desc: "14-day hyperlocal forecasts fused with field sensors"       },
  { icon: "📊", title: "Yield Forecasting",    desc: "AI-powered harvest estimates based on NDVI and soil data"   },
  { icon: "🌿", title: "Crop Rotation Guide",  desc: "Smart crop rotation plans to restore soil nutrients"        },
  { icon: "📍", title: "Field Mapping",         desc: "GPS-accurate parcel boundaries with satellite overlays"     },
  { icon: "💬", title: "Expert Connect",        desc: "Chat with agronomists and field specialists on demand"      },
];

export default function Home() {
  useScrollFade();

  return (
    <AppLayout showSidebar={false}>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic BG */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90')`,
          backgroundSize: "cover", backgroundPosition: "center 40%", backgroundAttachment: "fixed",
        }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(180deg, rgba(13,31,18,0.4) 0%, rgba(13,31,18,0.65) 50%, rgba(13,31,18,0.97) 100%)",
        }} />
        {/* Warm glows */}
        <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] rounded-full z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(31,61,43,0.5) 0%, transparent 70%)" }} />

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium" style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.35)", color: "#d4a017" }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#d4a017" }} />
            Platform 2.0 — India&apos;s Precision Agriculture Layer
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl" style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700,
            color: "#f6f3eb", lineHeight: 1.05, letterSpacing: "-0.02em",
            textShadow: "0 4px 60px rgba(0,0,0,0.4)",
          }}>
            Growing the<br />
            <span style={{ color: "#d4a017", fontStyle: "italic" }}>Future</span> of Farming
          </h1>

          <p className="text-xl sm:text-2xl max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(246,243,235,0.65)", fontWeight: 300 }}>
            Harness satellite imagery, AI mapping, and precision analytics — built for every farmer across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/map" className="btn-gold text-base">🌾 Explore Farms</Link>
            <Link href="/dashboard" className="btn-outline-cream text-base">🚀 Get Started</Link>
          </div>

          {/* Floating image strip */}
          <div className="mt-12 w-full max-w-4xl flex gap-3 overflow-hidden rounded-3xl" style={{ height: "200px" }}>
            {["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=70",
              "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=70",
              "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=70",
            ].map((src, i) => (
              <div key={i} className="flex-1 overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(212,160,23,0.12)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1f12 0%, #1a3323 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=30')", backgroundSize: "cover", filter: "blur(4px)" }} />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#d4a017" }}>Trusted across India</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#f6f3eb" }}>Rooted in Real Impact</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div key={i} className="fade-up stat-card" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4a017", textShadow: "0 0 30px rgba(212,160,23,0.4)" }}>{s.value}</div>
                <div className="text-sm font-medium" style={{ color: "rgba(246,243,235,0.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PINTEREST FARM GALLERY ══════════ */}
      <section id="gallery" className="py-24 relative overflow-hidden" style={{ background: "#0d1f12" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#d4a017" }}>Farm Gallery</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#f6f3eb" }}>Fields of <span style={{ color: "#d4a017", fontStyle: "italic" }}>Beauty</span></h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "rgba(246,243,235,0.5)", fontWeight: 300 }}>A visual journey through the farms, fields, and harvests we serve.</p>
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid fade-up">
            {gallery.map((img, i) => (
              <div key={i} className="masonry-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.label} className={`w-full object-cover ${img.h}`} />
                <div className="masonry-overlay">
                  <span className="text-xs font-semibold text-white/90 tracking-wide">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MARKETPLACE ══════════ */}
      <section id="marketplace" className="py-24 relative" style={{ background: "linear-gradient(180deg, #0d1f12 0%, #1a3323 50%, #0d1f12 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=30')", backgroundSize: "cover", filter: "blur(6px)" }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#d4a017" }}>Farmer Marketplace</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#f6f3eb" }}>Everything Your <span style={{ color: "#d4a017", fontStyle: "italic" }}>Farm Needs</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {marketplace.map((item, i) => (
              <div key={i} className="fade-up feature-card group" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-3xl" style={{ background: "radial-gradient(ellipse at top left, rgba(212,160,23,0.07) 0%, transparent 70%)", boxShadow: "inset 0 0 0 1px rgba(212,160,23,0.18)" }} />
                <div className="text-4xl mb-4">{item.icon}</div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: "rgba(212,160,23,0.12)", color: "#d4a017" }}>{item.tag}</span>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#f6f3eb" }}>{item.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(246,243,235,0.5)", fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FARM MANAGEMENT TOOLS ══════════ */}
      <section id="tools" className="py-24 relative" style={{ background: "#0d1f12" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#d4a017" }}>Farm Management</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#f6f3eb" }}>Built for the <span style={{ color: "#d4a017", fontStyle: "italic" }}>Modern Farmer</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((t, i) => (
              <div key={i} className="fade-up glass-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(212,160,23,0.3)]" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="text-3xl mb-4">{t.icon}</div>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#f6f3eb" }}>{t.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(246,243,235,0.5)", fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1f12 0%, #1f3d2b 100%)" }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&q=40')", backgroundSize: "cover", filter: "blur(8px)" }} />
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="text-center mb-10 fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#d4a017" }}>Reach Out</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 700, color: "#f6f3eb" }}>Let&apos;s Grow <span style={{ color: "#d4a017", fontStyle: "italic" }}>Together</span></h2>
          </div>
          <form className="fade-up glass-card p-8 sm:p-10 flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ label: "Full Name", placeholder: "Aarav Sharma", type: "text" }, { label: "Email Address", placeholder: "aarav@farm.in", type: "email" }].map(f => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(246,243,235,0.45)" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "rgba(246,243,235,0.06)", border: "1px solid rgba(246,243,235,0.1)", color: "#f6f3eb" }} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(246,243,235,0.45)" }}>Your Message</label>
              <textarea rows={5} placeholder="Tell us about your farm..." className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none" style={{ background: "rgba(246,243,235,0.06)", border: "1px solid rgba(246,243,235,0.1)", color: "#f6f3eb" }} />
            </div>
            <button type="submit" className="btn-gold w-full text-base rounded-xl">🌾 Send Message</button>
          </form>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-10 border-t text-center" style={{ borderColor: "rgba(212,160,23,0.1)", background: "#060f09" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#f6f3eb" }}>
            Krishi<span style={{ color: "#d4a017" }}>Vision</span>
          </span>
          <p className="text-xs" style={{ color: "rgba(246,243,235,0.3)" }}>
            © {new Date().getFullYear()} KrishiVision — Built for the farmers of India 🌾
          </p>
          <div className="flex gap-6 text-xs font-medium" style={{ color: "rgba(246,243,235,0.4)" }}>
            <Link href="/dashboard" className="hover:text-[#d4a017] transition-colors">Dashboard</Link>
            <Link href="/map" className="hover:text-[#d4a017] transition-colors">Map</Link>
            <Link href="#gallery" className="hover:text-[#d4a017] transition-colors">Gallery</Link>
          </div>
        </div>
      </footer>
    </AppLayout>
  );
}
