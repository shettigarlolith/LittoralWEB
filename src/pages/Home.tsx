import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Leaf, Package, Truck, Percent, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { getBestSellers, categories, getProductsByCategory, searchProducts } from '@/data/products';
import { images, getProductImage } from '@/data/images';
import { Product } from '@/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const bestSellers = getBestSellers();

  const handleSearch = (query: string) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const categoryIcons = [
    { name: 'Breakfast Mixes', emoji: '🍳', color: 'bg-primary/10' },
    { name: 'Millet Mixes', emoji: '🌾', color: 'bg-healthy/10' },
    { name: 'Traditional Mixes', emoji: '🏺', color: 'bg-traditional/10' },
    { name: 'Quick Meals', emoji: '⚡', color: 'bg-warning/10' },
  ];

  const whyChooseUs = [
    { icon: Leaf, title: 'No Preservatives', description: 'Pure, natural ingredients only' },
    { icon: ShieldCheck, title: 'Authentic Taste', description: 'Traditional recipes, modern convenience' },
    { icon: Clock, title: 'Easy to Cook', description: 'Ready in under 15 minutes' },
    { icon: Package, title: 'Hygienically Packed', description: 'Sealed for freshness & safety' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={handleSearch} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={images.heroBanner} 
              alt="Fresh spices and ingredients"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>
          
          <div className="container relative py-16 md:py-24 lg:py-32">
            <div className="max-w-xl space-y-6">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
                🎉 Free shipping on orders above ₹499
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in">
                Fresh & Tasty<br />
                <span className="font-brand text-brand">ReadyMix</span>
              </h1>
              
              <p className="text-lg text-muted-foreground animate-fade-in">
                Traditional taste. Ready in minutes. Bring the authentic flavors of South India to your kitchen with our premium ready-mix products.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in">
                <Link to="/products">
                  <Button size="lg" className="gap-2 text-base px-8">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base px-8">
                  View Categories
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.8/5 from 2000+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find the perfect mix for every meal</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categoryIcons.map(({ name, emoji, color }) => (
                <Link 
                  key={name} 
                  to={`/products?category=${encodeURIComponent(name)}`}
                  className="group"
                >
                  <Card className="border-0 shadow-card card-hover overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                        {emoji}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getProductsByCategory(name as any).length} products
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banners */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Percent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Flat 20% OFF</h3>
                      <p className="text-primary-foreground/80">On your first order</p>
                    </div>
                  </div>
                  <p className="text-primary-foreground/80 mb-4">Use code: <span className="font-bold text-primary-foreground">FLAT20</span></p>
                  <Link to="/products">
                    <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      Shop Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-healthy to-healthy/80 text-primary-foreground overflow-hidden relative">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Free Shipping</h3>
                      <p className="text-primary-foreground/80">On orders above ₹499</p>
                    </div>
                  </div>
                  <p className="text-primary-foreground/80 mb-4">Fast delivery across India</p>
                  <Link to="/products">
                    <Button variant="secondary" className="bg-primary-foreground text-healthy hover:bg-primary-foreground/90">
                      Explore Products
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Best Sellers</h2>
                <p className="text-muted-foreground">Our customers' favorite picks</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={{ ...product, image: getProductImage(product.id) }}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Why Choose Us?</h2>
              <p className="text-muted-foreground">Quality you can trust, taste you'll love</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyChooseUs.map(({ icon: Icon, title, description }) => (
                <div key={title} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct ? { ...selectedProduct, image: getProductImage(selectedProduct.id) } : null}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Home;
