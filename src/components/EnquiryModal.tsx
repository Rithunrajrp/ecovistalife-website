"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, User, Mail, Phone, Send, MessageSquare } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export default function EnquiryModal({ isOpen, onClose, projectName }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
          message: formData.message || `Interested in ${projectName}`,
          projectname: projectName,
          location: "Coimbatore"
        }),
      });

      if (!res.ok) throw new Error('Failed to send details');

      setIsSuccess(true);
      
      // Close after a delay to show success state
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setFormData({ name: "", email: "", phone: "", countryCode: "+91", message: "" });
        onClose();
      }, 3000);
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
              <span className="text-accent text-xs font-mono uppercase tracking-[0.3em] mb-4 block">Project Enquiry</span>
              <h2 className="text-white font-heading text-3xl font-bold">{projectName}</h2>
              <p className="text-white/40 text-sm mt-2">Leave your details below and our property experts will get back to you shortly.</p>
            </div>

            {/* Form Content */}
            <div className="p-8 sm:p-10">
              {isSuccess ? (
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                  <h3 className="text-accent font-bold text-xl mb-2">Thank You!</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We have successfully received your enquiry for {projectName}. Our team will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* Phone */}
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
                    
                    {/* Message */}
                    <div className="relative group">
                      <MessageSquare className="absolute left-5 top-5 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                      <textarea
                        placeholder="Any specific questions? (Optional)"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
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
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Enquiry
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
