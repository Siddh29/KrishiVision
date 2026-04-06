"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Overview",
      href: "/dashboard",
      emoji: "🌾",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
      )
    },
    {
      name: "Maps",
      href: "/map",
      emoji: "🗺️",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
      )
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      emoji: "📊",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
      )
    }
  ];

  return (
    <aside
      className="hidden w-64 flex-col md:flex"
      style={{
        background: "rgba(10,26,15,0.85)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(212,160,23,0.12)",
      }}
    >
      {/* Brand mark inside sidebar */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(212,160,23,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#d4a017" }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,241,230,0.4)" }}>
            Farm Intelligence
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
                style={{
                  background: isActive ? "rgba(212,160,23,0.15)" : "transparent",
                  border: isActive ? "1px solid rgba(212,160,23,0.25)" : "1px solid transparent",
                  color: isActive ? "#d4a017" : "rgba(245,241,230,0.5)",
                }}
              >
                <span style={{ color: isActive ? "#d4a017" : "rgba(245,241,230,0.4)" }}>{link.icon}</span>
                <span>{link.emoji} {link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom settings */}
      <div className="border-t p-4" style={{ borderColor: "rgba(212,160,23,0.1)" }}>
        <div
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200"
          style={{ color: "rgba(245,241,230,0.4)" }}
        >
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}
          >
            N
          </div>
          <span className="text-sm">Settings</span>
        </div>
      </div>
    </aside>
  );
}
