import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <div className="bg-gradient-to-r from-accent to-secondary/50 py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-brand text-brand flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Please read these terms before using our website and services.
          </p>
        </div>
      </div>
      <div className="container py-12 md:py-16 max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">1. Use of website</h2>
          <p>
            By accessing and using this website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our site or services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">2. Orders and payment</h2>
          <p>
            All orders are subject to availability. We reserve the right to refuse or cancel orders. Prices are in Indian Rupees (₹) and include applicable taxes unless stated otherwise. Payment must be completed at the time of order.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">3. Delivery</h2>
          <p>
            Delivery timelines are estimates. We are not liable for delays caused by courier partners or circumstances beyond our control. Risk of loss passes to you upon delivery to the carrier.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">4. Returns and refunds</h2>
          <p>
            Our Return Policy applies to all purchases. Please refer to the Return Policy page for eligibility and process.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">5. Intellectual property</h2>
          <p>
            All content on this website, including text, logos, images, and design, is the property of Littoral and is protected by applicable laws. You may not use, copy, or distribute any content without our written permission.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">6. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Littoral shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or products.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">7. Changes</h2>
          <p>
            We may update these Terms & Conditions from time to time. The updated version will be posted on this page with a revised date. Continued use of the site after changes constitutes acceptance.
          </p>
        </section>
        <section>
          <p className="text-sm">
            Last updated: January 2026. For questions, contact us at hello@littoral.com.
          </p>
        </section>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
