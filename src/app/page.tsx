import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";

export default function Home() {
  return (
    <AppLayout showSidebar={false}>
      <main className="flex-1 flex flex-col items-center justify-center p-8 sm:p-20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl w-full z-10 flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Platform 2.0 is now live
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-400 sm:leading-[1.1]">
            Next-generation <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">land intelligence</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Harness the power of satellite imagery, AI mapping, and predictive analytics to make informed decisions for agriculture, conservation, and urban planning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link 
              href="/dashboard" 
              className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-8 font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95"
            >
              Open Dashboard
            </Link>
            <Link 
              href="#demo" 
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-8 font-medium text-white transition-all hover:bg-white/10"
            >
              Request Demo
            </Link>
          </div>
          
          {/* Mockup / Dashboard Preview snippet */}
          <div className="mt-16 w-full rounded-2xl border border-white/10 bg-black/40 shadow-2xl p-2 backdrop-blur-sm overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="rounded-xl border border-white/5 bg-zinc-950/80 aspect-video relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <p className="text-zinc-600 font-medium z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
                Interactive Map Preview
              </p>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
