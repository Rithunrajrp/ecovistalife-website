"use client";

import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <PageHeader 
        label="Legal"
        title="Privacy Policy"
        subtitle="Last updated: May 2026"
      />
      
      <SectionWrapper className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 prose prose-invert prose-lg">
          <p>Your privacy is important to us. It is EcoVistaLife's policy to respect your privacy regarding any information we may collect from you across our website.</p>
          
          <h2>1. Information We Collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          
          <h2>2. Use of Information</h2>
          <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
          
          <h2>3. Cookies</h2>
          <p>We use cookies to help us understand how you use our site and to improve your experience.</p>
          
          <h2>4. Contact Us</h2>
          <p>If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
