import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4 4 4-4" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              Krishi<span className="text-emerald-400">Vision</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <Link href="/dashboard" className="transition-colors hover:text-white">Dashboard</Link>
            <Link href="#features" className="transition-colors hover:text-white">Features</Link>
            <Link href="#pricing" className="transition-colors hover:text-white">Pricing</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500">
            Log in
          </Link>
          <Link href="/dashboard" className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
