import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Shipping: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <div className="bg-gradient-to-r from-accent to-secondary/50 py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-brand text-brand flex items-center gap-2">
            <Truck className="h-8 w-8" />
            Shipping Info
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            How we deliver your orders.
          </p>
        </div>
      </div>
      <div className="container py-12 md:py-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Delivery areas
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We ship to all serviceable pincodes across India. At checkout, enter your pincode to confirm delivery availability.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Delivery time
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Orders are typically delivered within 3–5 business days from the date of dispatch. You will receive tracking details via email and SMS once your order is shipped.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Shipping charges
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Shipping is <strong className="text-foreground">FREE</strong> on orders of ₹499 and above. For orders below ₹499, a flat shipping charge of ₹49 applies.
          </p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm">
            For any shipping-related queries, contact us at hello@littoral.com or +91 98765 43210.
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

export default Shipping;
