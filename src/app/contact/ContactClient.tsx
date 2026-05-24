"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

const CONTACT_FAQS = [
  { q: "What are your office hours?", a: "Our office is open seven days a week, from Monday to Sunday, 10:00 AM to 06:30 PM. We are also available for private appointments outside of these regular working hours." },
  { q: "Do you offer virtual consultations?", a: "Absolutely! We offer flexible virtual consultations at a time that works best for you. One of our expert agents will connect with you via phone or Google Meet." },
  { q: "Which regions do you serve?", a: "We proudly serve the prime areas of Karamadai, Mettupalayam, and Coimbatore. Our dedicated team is here to help you throughout every step of your real estate journey in these locations." },
  { q: "Do you assist first-time homebuyers or plot buyers?", a: "Yes, we specialize in supporting first-time buyers. Our experienced team will guide you transparently through the entire process of purchasing your first plot or dream home." },
  { q: "What should I do if I have a concern or complaint?", a: "We take your feedback very seriously. If you have any concerns regarding our properties or services, please contact us immediately via phone or email. We are fully committed to resolving any issues promptly and professionally." }
];

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
      projectname: 'General Enquiry',
      location: 'Coimbatore'
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
    <main className="bg-bg-primary min-h-screen pt-16 sm:pt-20">


      <SectionWrapper className="pt-0 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-6 block">Contact Us</span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 sm:mb-12 text-white">
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
            className="bg-bg-secondary p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] border border-white/5 relative overflow-hidden"
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

      {/* FAQs Section */}
      <SectionWrapper className="bg-bg-primary pt-0 pb-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Got Questions?</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {CONTACT_FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <FAQItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="p-0 pb-0">
        <div className="w-full h-[500px] overflow-hidden border-t border-white/5 relative">
          <iframe 
            src="https://maps.google.com/maps?q=60,+60,+Thirumurugan+Nagar+Road,+Thirumurugan+Nagar,+Coimbatore,+Tamil+Nadu+641048,+India&t=&z=15&ie=UTF8&iwloc=&output=embed" 
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

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-bg-secondary border-accent/30' : 'bg-transparent border-white/10 hover:border-white/20'}`}
    >
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left gap-4"
      >
        <span className="font-heading text-lg md:text-xl font-bold text-white pr-8">{question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isOpen ? 'bg-accent text-bg-primary' : 'bg-white/5 text-white'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 md:px-8 pb-8 pt-2 text-text-secondary leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

