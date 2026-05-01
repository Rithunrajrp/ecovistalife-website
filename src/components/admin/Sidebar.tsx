"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FolderKanban, FileText, Image as ImageIcon, Globe, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { href: '/admin/blogs', label: 'Blog Posts', icon: FileText },
    { href: '/admin/media', label: 'Media (CDN)', icon: ImageIcon },
  ];

  return (
    <aside className="w-64 bg-bg-secondary border-r border-white/5 h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-white/5">
        <h2 className="font-heading text-2xl font-bold text-white">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                isActive 
                  ? "bg-accent/10 text-accent" 
                  : "text-text-secondary hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 font-medium"
        >
          <Globe size={20} />
          View Site
        </Link>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-300 font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
