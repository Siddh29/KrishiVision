import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AppLayout showSidebar={false}>
      <div className="flex flex-1 items-center justify-center h-full w-full p-4">
        <div className="w-full max-w-md glass-panel p-8 space-y-8">
          <div className="text-center">
            <h1 className="heading-2">Welcome Back</h1>
            <p className="text-muted mt-2">Log in to your KrishiVision portal to access land intelligence.</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Email Address</label>
              <input 
                type="email" 
                disabled
                placeholder="operator@krishivision.com" 
                className="w-full rounded-md border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-health-good focus:outline-none focus:ring-1 focus:ring-health-good disabled:opacity-75"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Password</label>
                <Link href="#" className="text-xs text-health-good hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                disabled
                placeholder="••••••••" 
                className="w-full rounded-md border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-health-good focus:outline-none focus:ring-1 focus:ring-health-good disabled:opacity-75"
              />
            </div>
            
            <button className="btn-primary w-full mt-4" type="button">
              Sign In (Mock)
            </button>
          </form>
          
          <p className="text-center text-sm text-zinc-500">
            Don't have an account? <Link href="#" className="text-health-good hover:underline">Request access</Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
