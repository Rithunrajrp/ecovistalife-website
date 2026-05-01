"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

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

export default function HomeFAQs() {
  return (
    <SectionWrapper className="py-32 bg-bg-secondary overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Got Questions?</span>
          <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Frequently Asked Questions</h2>
        </motion.div>

        {FAQ_DATA.map((group, groupIdx) => (
          <motion.div 
            key={groupIdx} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: groupIdx * 0.2, ease: "easeOut" }}
            className="mb-16 last:mb-0"
          >
            <h3 className="font-heading text-2xl font-bold text-white mb-8 flex items-center gap-4">
              <div className="w-8 h-px bg-accent"></div>
              {group.category}
            </h3>
            
            <div className="space-y-4">
              {group.questions.map((faq, faqIdx) => (
                <motion.div
                  key={faqIdx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (groupIdx * 0.2) + (faqIdx * 0.1), ease: "easeOut" }}
                >
                  <FAQItem question={faq.q} answer={faq.a} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-bg-primary border-accent/30' : 'bg-transparent border-white/10 hover:border-white/20'}`}
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
