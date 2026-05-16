"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FooterProps {
  heading?: string;
  body?: string;
  image?: string;
}

export default function Footer({ 
  heading = "Start Your Journey With Us", 
  body = "Discover premium living spaces designed for modern families and investors in Coimbatore. We build sustainable communities that last generations.", 
  image 
}: FooterProps) {
  return (
    <footer className="relative bg-bg-secondary pt-24 pb-12 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-16 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{heading}</h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md mb-6 sm:mb-8">
              {body}
            </p>
            {image && (
              <div className="mb-8">
                <img src={image} alt="Ecovistalife Logo" className="h-12 w-auto object-contain brightness-0 invert opacity-80" />
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-text-secondary hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/projects" className="text-text-secondary hover:text-accent transition-colors">Projects</Link></li>
                <li><Link href="/services" className="text-text-secondary hover:text-accent transition-colors">Services</Link></li>
                {/* <li><Link href="/career" className="text-text-secondary hover:text-accent transition-colors">Career</Link></li> */}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="/fest" className="text-text-secondary hover:text-accent transition-colors">Fest</Link></li>
                <li><Link href="/nri" className="text-text-secondary hover:text-accent transition-colors">NRI Investment</Link></li>
                <li><Link href="/blog" className="text-text-secondary hover:text-accent transition-colors">Blog</Link></li>
                <li><Link href="/faqs" className="text-text-secondary hover:text-accent transition-colors">FAQs</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Contact</h4>
              <ul className="space-y-4 text-text-secondary">
                <li>Door no. 60/1, 60/2, Thirumurugan Nagar, Krishna Park, Veeriyampalayam Road, Nehru Nagar, Kalapatti</li>
                <li>Coimbatore - 641048</li>
                <li><a href="tel:+919787795555" className="hover:text-accent transition-colors">+91 97877 95555</a></li>
                <li><a href="mailto:info@ecovistalife.com" className="hover:text-accent transition-colors">info@ecovistalife.com</a></li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} ECOVISTALIFE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
