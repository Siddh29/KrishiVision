import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
      )
    },
    {
      name: "Maps",
      href: "/map",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
      )
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
      )
    }
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-md md:flex">
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-2 px-4 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={isActive ? 'text-health-good' : 'text-current'}>{link.icon}</span>
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
          <div className="h-6 w-6 rounded-full bg-zinc-800 border border-white/10"></div>
          Settings
        </div>
      </div>
    </aside>
  );
}
