"use client";

import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <PageHeader 
        label="Legal"
        title="Terms & Conditions"
        subtitle="Last updated: May 2026"
      />
      
      <SectionWrapper className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 prose prose-invert prose-lg">
          <p>By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          
          <h2>1. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on EcoVistaLife's website for personal, non-commercial transitory viewing only.</p>
          
          <h2>2. Disclaimer</h2>
          <p>The materials on EcoVistaLife's website are provided on an 'as is' basis. EcoVistaLife makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2>3. Limitations</h2>
          <p>In no event shall EcoVistaLife or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EcoVistaLife's website.</p>
          
          <h2>4. Accuracy of Materials</h2>
          <p>The materials appearing on EcoVistaLife's website could include technical, typographical, or photographic errors. EcoVistaLife does not warrant that any of the materials on its website are accurate, complete or current.</p>
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
