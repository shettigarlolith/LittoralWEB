import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <div className="bg-gradient-to-r from-accent to-secondary/50 py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-brand text-brand flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            How we collect, use, and protect your information.
          </p>
        </div>
      </div>
      <div className="container py-12 md:py-16 max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">1. Information we collect</h2>
          <p>
            We collect information you provide when placing an order (name, email, phone, address), and usage data such as IP address and browser type when you visit our website. Payment details are processed securely by our payment partners and are not stored on our servers.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">2. How we use your information</h2>
          <p>
            We use your information to process orders, send order and delivery updates, respond to enquiries, and improve our website and services. With your consent, we may send you promotional emails; you can unsubscribe at any time.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">3. Sharing of information</h2>
          <p>
            We do not sell your personal information. We may share data with service providers (e.g. courier, payment gateway) only to fulfil your order and as required by law.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">4. Data security</h2>
          <p>
            We use industry-standard measures to protect your data. Our website uses HTTPS and we work with compliant payment and logistics partners.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">5. Cookies</h2>
          <p>
            We use cookies and similar technologies to improve site functionality, remember your preferences, and analyse traffic. You can manage cookie settings in your browser.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">6. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data by contacting us at hello@littoral.com. Applicable laws may give you additional rights depending on your location.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">7. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest version will be posted here with the revision date.
          </p>
        </section>
        <section>
          <p className="text-sm">
            Last updated: January 2026. For any privacy-related questions, contact us at hello@littoral.com.
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

export default Privacy;
