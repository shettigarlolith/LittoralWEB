import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Returns: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <div className="bg-gradient-to-r from-accent to-secondary/50 py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-brand text-brand flex items-center gap-2">
            <RotateCcw className="h-8 w-8" />
            Return Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Our guidelines for returns and refunds.
          </p>
        </div>
      </div>
      <div className="container py-12 md:py-16 max-w-3xl space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            When you can return
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            You may return an item if:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
            <li>The product is unopened and in its original sealed packaging</li>
            <li>The return is requested within 7 days of delivery</li>
            <li>The product was damaged in transit or is defective</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-primary" />
            Non-returnable items
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Opened or used food products cannot be returned for hygiene and safety reasons. Once the seal is broken, we are unable to accept returns.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">How to initiate a return</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Email us at hello@littoral.com with your order number and reason for return. We will confirm eligibility and provide return instructions. Refunds are processed within 5–7 business days after we receive the returned product.
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

export default Returns;
