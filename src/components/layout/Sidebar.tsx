"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { name: "Overview",   path: "/dashboard",           icon: "🏡" },
  { name: "Maps",       path: "/map",                 icon: "🗺️" },
  { name: "Analytics",  path: "/dashboard/analytics", icon: "📊" },
];

export function Sidebar() {
  const pathname = usePathname();
  const userRole = useAppStore((state) => state.userRole);

  return (
    <aside 
      className="w-72 h-screen fixed left-0 top-0 z-40 flex flex-col border-r transition-all duration-500 overflow-hidden"
      style={{ 
        background: "rgba(13,31,18,0.95)",
        borderColor: "rgba(212,160,23,0.1)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Sidebar Header/Logo area */}
      <div className="p-8 pb-4">
        <div className="flex flex-col gap-1 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#d4a017" }}>
            Farm Intelligence
          </p>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6f3eb" }}>
            Krishi<span style={{ color: "#d4a017" }}>Vision</span>
          </h2>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300"
                style={{
                  background: isActive ? "rgba(212,160,23,0.12)" : "transparent",
                  border: isActive ? "1px solid rgba(212,160,23,0.25)" : "1px solid transparent",
                }}
              >
                <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-60 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span 
                  className="text-sm font-semibold tracking-wide"
                  style={{ 
                    color: isActive ? "#d4a017" : "rgba(246,243,235,0.5)",
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {item.name}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#d4a017", boxShadow: "0 0 10px #d4a017" }} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 flex flex-col gap-6">
        {/* User Card */}
        <div className="p-5 rounded-2xl flex items-center gap-4 border" style={{ background: "rgba(246,243,235,0.03)", borderColor: "rgba(246,243,235,0.08)" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "linear-gradient(135deg, #d4a017, #8b6b11)", color: "#fff" }}>
            {userRole?.[0] || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(246,243,235,0.4)" }}>Account</span>
            <span className="text-sm font-semibold text-[#f6f3eb] capitalize">{userRole}</span>
          </div>
        </div>

        <Link 
          href="#" 
          className="flex items-center gap-4 px-5 py-3 rounded-xl transition-colors hover:bg-white/[0.05]"
          style={{ color: "rgba(246,243,235,0.5)" }}
        >
          <span className="text-xl">⚙️</span>
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
