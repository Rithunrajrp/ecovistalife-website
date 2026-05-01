"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/ui/PageHeader';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    category: "General & Legal",
    questions: [
      { q: "Are all your properties DTCP/RERA approved?", a: "Yes, 100% of our plots and villa projects are fully approved by DTCP and RERA, ensuring completely clear titles and secure investments." },
      { q: "Do you assist with home loans?", a: "Absolutely. We have tie-ups with all major nationalized and private banks (HDFC, SBI, ICICI, etc.) and our CRM team will assist you through the entire loan processing and documentation phase." }
    ]
  },
  {
    category: "Buying & Construction",
    questions: [
      { q: "Can I customize the floor plan of my villa?", a: "Yes, we offer flexible customization options for our villas. Our in-house architectural team will work with you to tailor the interiors and floor plans to your specific requirements before construction begins." },
      { q: "What is the typical handover timeline?", a: "For plots, registration can be done immediately. For custom villas, the typical construction and handover timeline is between 8 to 12 months, depending on the scale and customization." },
      { q: "Do you offer commercial workspaces?", a: "No, EcoVistaLife specializes exclusively in premium residential living. We focus solely on creating high-quality gated communities, villas, and residential plots to ensure peaceful and dedicated family environments." }
    ]
  },
  {
    category: "NRI Services",
    questions: [
      { q: "Can NRIs buy property with EcoVistaLife?", a: "Yes, NRIs can seamlessly invest in our properties. We offer virtual site tours, digital documentation assistance, and dedicated NRI support to manage your investment from abroad." },
      { q: "How is the property managed when I am away?", a: "Our gated communities feature 24/7 security, CCTV surveillance, and dedicated estate management teams to ensure your property is safe and well-maintained year-round." }
    ]
  }
];

export default function FAQsPage() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <Navbar />
      
      <PageHeader 
        label="Got Questions?"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our properties, legal approvals, and the home-buying process."
      />

      <SectionWrapper className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {FAQ_DATA.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-16 last:mb-0">
              <h2 className="font-heading text-2xl font-bold text-white mb-8 flex items-center gap-4">
                <div className="w-8 h-px bg-accent"></div>
                {group.category}
              </h2>
              
              <div className="space-y-4">
                {group.questions.map((faq, faqIdx) => (
                  <FAQItem key={faqIdx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <Footer heading="Get In Touch"  image="/logo.png" />
    </main>
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

