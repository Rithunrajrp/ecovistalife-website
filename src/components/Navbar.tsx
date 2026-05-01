"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/fest', label: 'Fest' },
  { href: '/nri', label: 'NRI' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300",
        scrolled ? "bg-bg-primary/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      )}
    >
      <Link href="/" className="relative h-20 w-auto flex items-center">
        <img 
          src="/logo.png" 
          alt="EcoVistaLife" 
          className="h-full w-auto object-contain"
        />
      </Link>
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent relative group",
                pathname === link.href ? "text-accent" : "text-text-primary"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full",
                pathname === link.href ? "w-full" : "w-0"
              )} />
            </Link>
          </li>
        ))}
      </ul>
      <button className="md:hidden text-white">
        {/* Simple mobile menu icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </motion.nav>
  );
}
