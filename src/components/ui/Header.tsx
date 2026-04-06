import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: 'rgba(10,26,15,0.75)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,160,23,0.15)' }}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #d4a017, #1f3d2b)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 2C6.5 2 2 6.5 2 12" />
                <path d="M12 22V12" />
                <path d="m8 18 4 4 4-4" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: '#f5f1e6', fontFamily: "'Playfair Display', serif" }}>
              Krishi<span style={{ color: '#d4a017' }}>Vision</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: 'rgba(245,241,230,0.65)' }}>
            <Link href="/" className="transition-colors hover:text-[#d4a017]">Home</Link>
            <Link href="/dashboard" className="transition-colors hover:text-[#d4a017]">Dashboard</Link>
            <Link href="#features" className="transition-colors hover:text-[#d4a017]">Features</Link>
            <Link href="#map" className="transition-colors hover:text-[#d4a017]">Map</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden sm:inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-200 hover:bg-white/5" style={{ border: '1px solid rgba(245,241,230,0.2)', color: '#f5f1e6' }}>
            Log in
          </Link>
          <Link href="/dashboard" className="inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95" style={{ background: 'linear-gradient(135deg, #d4a017, #b8860b)', boxShadow: '0 4px 20px rgba(212,160,23,0.35)' }}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
