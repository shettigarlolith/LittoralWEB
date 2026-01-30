import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Clock, Package, Heart, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  const values = [
    { icon: Leaf, title: 'Natural & Fresh', description: 'We use only quality ingredients with no artificial preservatives.' },
    { icon: ShieldCheck, title: 'Authentic Recipes', description: 'Traditional South Indian recipes passed down and perfected.' },
    { icon: Clock, title: 'Quick & Easy', description: 'Ready mixes that save time without compromising on taste.' },
    { icon: Package, title: 'Hygienically Packed', description: 'Sealed for freshness and delivered with care.' },
  ];

  const stats = [
    { value: '18+', label: 'Products' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '4.6', label: 'Average Rating' },
    { value: '100%', label: 'Vegetarian Options' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-accent to-secondary/50 py-12 md:py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-brand text-brand">
              About Us
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Bringing traditional flavors to your kitchen since day one.
            </p>
          </div>
        </div>

        <div className="container py-12 md:py-16 space-y-16">
          {/* Our Story */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Heart className="h-7 w-7 text-primary" />
              Our Story
            </h2>
            <div className="prose prose-lg text-muted-foreground max-w-3xl">
              <p className="leading-relaxed">
                We started with a simple idea: make authentic South Indian flavors accessible to everyone, 
                without the hassle of grinding, fermenting, or hunting for rare spices. Our ready mixes 
                bring the taste of home-cooked idlis, dosas, upma, and more to your kitchen in minutes.
              </p>
              <p className="leading-relaxed mt-4">
                From breakfast mixes to traditional and millet-based options, we focus on quality, 
                authenticity, and convenience. Every product is crafted with care, so you can enjoy 
                Fresh & Tasty meals every day.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Target className="h-7 w-7 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              To preserve and share the rich culinary heritage of South India through convenient, 
              high-quality ready mixes. We believe everyone deserves a delicious, wholesome meal—whether 
              you're a busy parent, a student, or simply someone who loves good food.
            </p>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Award className="h-7 w-7 text-primary" />
              What We Stand For
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="p-6 rounded-xl border border-border bg-card shadow-card hover:shadow-hover transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 rounded-2xl bg-accent/50 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl md:text-4xl font-bold text-brand font-brand">{value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <p className="text-muted-foreground mb-6">
              Ready to explore our products?
            </p>
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Shop Now
              </Button>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
