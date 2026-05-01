"use client";

import { Bell, Search, User } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-20 bg-bg-secondary/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-bg-primary border border-white/10 rounded-full pl-10 pr-4 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-bg-primary border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
            <User size={20} />
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-bold text-white leading-none mb-1">Admin</div>
            <div className="text-xs text-text-secondary leading-none">Superuser</div>
          </div>
        </div>
      </div>
    </header>
  );
}
