"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Send } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function CampaignPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+91" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Show after a short delay so it doesn't block immediate render
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("hasSeenCampaign")) {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenCampaign", "true");
      }
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          message: "Campaign Enquiry",
          projectname: "Campaign Offer",
          location: "Coimbatore"
        }),
      });

      if (!res.ok) throw new Error('Failed to send details');

      setIsSuccess(true);
      setTimeout(() => setIsOpen(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-7xl bg-bg-secondary border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:min-h-[650px]"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-[55%] relative h-96 md:h-auto flex-shrink-0 bg-black">
              <img 
                src="https://ik.imagekit.io/bgvtzewqf/ecovista/images/PHOTO-2026-05-18-18-08-17.jpg?updatedAt=1779124640258"
                alt="Campaign"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent md:hidden" />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-[45%] p-6 sm:p-10 flex flex-col justify-center overflow-y-auto no-scrollbar">
              <span className="text-accent text-xs font-mono uppercase tracking-[0.3em] mb-4 block">Special Offer</span>
              <h2 className="text-white font-heading text-2xl sm:text-3xl font-bold mb-2">Register Your Interest</h2>
              <p className="text-white/40 text-sm mb-8">Please provide your details below and our team will get in touch with you shortly.</p>

              {isSuccess ? (
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
                  <h3 className="text-accent font-bold text-xl mb-2">Thank You!</h3>
                  <p className="text-white/60 text-sm">We have received your enquiry. Our team will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                      <input required type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 sm:py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>

                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                      <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 sm:py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <div className="relative w-20 sm:w-24 flex-shrink-0">
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 sm:py-4 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all" value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} />
                      </div>
                      <div className="relative flex-1 group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                        <input required type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <MagneticButton className="w-full py-4 sm:py-5 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Submit Enquiry
                        </>
                      )}
                    </MagneticButton>
                  </div>
                  <p className="text-[10px] text-white/20 text-center uppercase tracking-widest leading-relaxed mt-4">
                    By clicking, you agree to be contacted by our team.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
