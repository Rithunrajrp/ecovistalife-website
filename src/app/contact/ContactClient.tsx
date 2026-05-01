"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: any) {
      setError(err.message || 'Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-bg-primary min-h-screen pt-20">


      <SectionWrapper className="pt-0 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-6 block">Contact Us</span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12 text-white">
              Let&apos;s Build Your Dream Together
            </h1>

            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10" />
              
              <ContactItem 
                label="Head Office" 
                value="Door no. 60/1, 60/2, Thirumurugan Nagar, Krishna Park, Veeriyampalayam Road, Nehru Nagar, Kalapatti, Coimbatore -641048" 
              />
              <ContactItem 
                label="Site Office" 
                value="EB Colony, next to SRSI School, Karamadai" 
              />
              <ContactItem 
                label="Phone" 
                value="+91 97877 95555" 
                isLink 
              />
              <ContactItem 
                label="Email" 
                value="info@ecovistalife.com" 
                isLink 
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-bg-secondary p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden"
          >
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 bg-bg-secondary flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/20 text-accent flex items-center justify-center text-4xl mb-6">
                    ✓
                  </div>
                  <h3 className="font-heading text-3xl font-bold mb-4">Request Sent!</h3>
                  <p className="text-text-secondary">Thank you for reaching out. Our team will get back to you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <h2 className="font-heading text-3xl font-bold mb-8">Book a Site Visit</h2>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-secondary ml-4">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  placeholder="Your name" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-secondary ml-4">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  placeholder="your@email.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-text-secondary ml-4">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  required
                  placeholder="+91 XXXXX XXXXX" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary ml-4">Message</label>
                <textarea 
                  id="message" 
                  required
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-colors resize-none"
                />
              </div>
              <div className="pt-4">
                <MagneticButton type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </MagneticButton>
                {error && (
                  <p className="mt-4 text-center text-sm text-red-400">{error}</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="p-0 pb-0">
        <div className="w-full h-[500px] overflow-hidden border-t border-white/5 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.658252277686!2d77.0267231!3d11.0642398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f9a2e639644f%3A0xc3b44b82d921b76e!2sEcoVistaLife!5e0!3m2!1sen!2sin!4v1714575800000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </SectionWrapper>


      <Footer heading="Get In Touch"  image="/logo.png" />
    </main>
  );
}

function ContactItem({ label, value, isLink = false }: { label: string, value: string, isLink?: boolean }) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-bg-secondary border border-white/20 flex items-center justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-accent" />
      </div>
      <h3 className="text-sm uppercase tracking-widest text-text-secondary mb-2">{label}</h3>
      {isLink ? (
        <a href={label === 'Phone' ? `tel:${value}` : `mailto:${value}`} className="text-lg text-white hover:text-accent transition-colors font-medium">
          {value}
        </a>
      ) : (
        <p className="text-lg text-white leading-relaxed">{value}</p>
      )}
    </div>
  );
}

