"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";
import { useEffect } from "react";

function useScrollFade() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
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

const items_tools = [
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
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90')`,
          backgroundSize: "cover", backgroundPosition: "center 40%", backgroundAttachment: "fixed",
        }} />
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(180deg, rgba(13,31,18,0.4) 0%, rgba(13,31,18,0.65) 50%, rgba(13,31,18,0.97) 100%)",
        }} />
        
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
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1f12 0%, #1a3323 100%)" }}>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="fade-up stat-card">
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4a017" }}>{s.value}</div>
                <div className="text-sm font-medium" style={{ color: "rgba(246,243,235,0.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24" style={{ background: "#0d1f12" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#d4a017" }}>Farm Gallery</p>
            <h2 className="heading-1">Fields of <span style={{ color: "#d4a017", fontStyle: "italic" }}>Beauty</span></h2>
          </div>
          <div className="masonry-grid fade-up">
            {gallery.map((img, i) => (
              <div key={i} className="masonry-item">
                <img src={img.src} alt={img.label} className={`w-full object-cover ${img.h}`} />
                <div className="masonry-overlay">
                  <span className="text-xs font-semibold text-white/90 tracking-wide">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0d1f12 0%, #1a3323 50%, #0d1f12 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="heading-1 mb-16">Everything Your <span style={{ color: "#d4a017", fontStyle: "italic" }}>Farm Needs</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplace.map((item, i) => (
                <div key={i} className="fade-up feature-card text-left">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <span className="badge-good mb-3">{item.tag}</span>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>{item.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(246,243,235,0.5)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24" style={{ background: "linear-gradient(180deg, #0d1f12 0%, #1f3d2b 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="heading-1 mb-10">Let&apos;s Grow <span style={{ color: "#d4a017", fontStyle: "italic" }}>Together</span></h2>
          <form className="fade-up glass-card p-10 flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
            <input placeholder="Name" className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none" />
            <input placeholder="Email" className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none" />
            <textarea placeholder="Message" rows={4} className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none resize-none" />
            <button className="btn-gold w-full">🌾 Send Message</button>
          </form>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center" style={{ background: "#060f09" }}>
        <p className="text-xs opacity-30">© {new Date().getFullYear()} KrishiVision — India&apos;s Digital Farm Layer</p>
      </footer>
    </AppLayout>
  );
}
