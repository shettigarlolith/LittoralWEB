import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  {
    q: 'How do I prepare your ready mixes?',
    a: 'Each product has simple instructions on the pack. Generally, you add water (and optionally yogurt or buttermilk for some mixes), mix well, and cook as directed—steaming for idlis, on a tawa for dosas, etc. Prep time is usually under 15 minutes.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes. We deliver to all serviceable pincodes in India. Delivery typically takes 3–5 business days. Shipping is free on orders above ₹499.',
  },
  {
    q: 'Are your products vegetarian?',
    a: 'We offer both veg and non-veg options. You can filter by Veg / Non-Veg on our Products page. All ingredients are listed on each product page.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is shipped, you’ll receive an email and SMS with a tracking link. You can also log in and check your order status in your account.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns for unopened, sealed products within 7 days of delivery. Please see our Return Policy page for full details.',
  },
  {
    q: 'How can I contact customer support?',
    a: 'You can reach us at hello@littoral.com or call +91 98765 43210. We respond within 24 hours on business days.',
  },
];

const FAQs: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <div className="bg-gradient-to-r from-accent to-secondary/50 py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-brand text-brand flex items-center gap-2">
            <HelpCircle className="h-8 w-8" />
            FAQs
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Frequently asked questions about our products and services.
          </p>
        </div>
      </div>
      <div className="container py-12 md:py-16">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12">
          <p className="text-muted-foreground mb-4">Can’t find your question?</p>
          <Link to="/about">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQs;
