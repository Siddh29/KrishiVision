"use client";

import React, { ReactNode, useState } from "react";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/layout/Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function AppLayout({ children, showSidebar = false }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-brand-surface">
      <Header />
      
      {/* Mobile Toolbar if sidebar is needed */}
      {showSidebar && (
        <div className="flex h-14 items-center justify-between border-b border-white/10 bg-black/40 px-4 md:hidden">
          <span className="text-sm font-medium text-zinc-300">Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* Mobile Sidebar Flyout */}
      {showSidebar && mobileMenuOpen && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="relative h-full w-3/4 max-w-sm bg-zinc-950 p-6 pt-20 border-r border-white/10">
            <button 
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {showSidebar && <Sidebar />}
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
