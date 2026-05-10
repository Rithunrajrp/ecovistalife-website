"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Download, User, Mail, Phone } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  brochureUrl: string;
  projectName: string;
}

export default function BrochureModal({ isOpen, onClose, brochureUrl, projectName }: BrochureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectName
        }),
      });

      if (!res.ok) throw new Error('Failed to send details');

      // Trigger Download
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = `${projectName.replace(/\s+/g, '_')}_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close after a short delay
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-bg-secondary border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 sm:p-10 border-b border-white/5 relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <span className="text-accent text-xs font-mono uppercase tracking-[0.3em] mb-4 block">Exclusive Access</span>
              <h2 className="text-white font-heading text-3xl font-bold">Download Brochure</h2>
              <p className="text-white/40 text-sm mt-2">Please provide your details to receive the full specifications for {projectName}.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                  <input
                    required
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Phone with Country Code */}
                <div className="flex gap-3">
                  <div className="relative w-24">
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all"
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    />
                  </div>
                  <div className="relative flex-1 group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <MagneticButton 
                  className="w-full py-5 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                      Get Brochure Now
                    </>
                  )}
                </MagneticButton>
              </div>

              <p className="text-[10px] text-white/20 text-center uppercase tracking-widest leading-loose">
                By clicking, you agree to be contacted regarding <br /> EcoVistaLife projects.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
