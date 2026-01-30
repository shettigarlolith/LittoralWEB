import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/data/images';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    applyPromoCode, 
    removePromoCode,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getCartTotal,
    getItemCount
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const { toast } = useToast();

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    const success = applyPromoCode(promoInput.trim());
    if (success) {
      setPromoError('');
      setPromoInput('');
      toast({
        title: 'Promo code applied!',
        description: `You got ${cart.promoDiscount || 0}% off on your order.`,
      });
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getCartTotal();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products yet. Start exploring our delicious ready mixes!
            </p>
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Browse Products
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-accent to-secondary/50 py-8 md:py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Your Cart
            </h1>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => {
                const discountedPrice = item.selectedWeight.price * (1 - item.product.discount / 100);
                const itemImage = getProductImage(item.product.id);
                
                return (
                  <Card key={`${item.product.id}-${item.selectedWeight.value}`} className="overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img 
                            src={itemImage} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground truncate">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Weight: {item.selectedWeight.value}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id, item.selectedWeight.value)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-end justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(
                                  item.product.id, 
                                  item.selectedWeight.value, 
                                  item.quantity - 1
                                )}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(
                                  item.product.id, 
                                  item.selectedWeight.value, 
                                  item.quantity + 1
                                )}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="font-bold text-foreground">
                                ₹{Math.round(discountedPrice * item.quantity)}
                              </div>
                              {item.product.discount > 0 && (
                                <div className="text-sm text-muted-foreground line-through">
                                  ₹{item.selectedWeight.price * item.quantity}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Promo Code
                    </label>
                    {cart.promoCode ? (
                      <div className="flex items-center justify-between p-3 bg-healthy/10 rounded-lg border border-healthy/20">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-healthy" />
                          <span className="font-medium text-healthy">{cart.promoCode}</span>
                          <span className="text-sm text-muted-foreground">({cart.promoDiscount}% off)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removePromoCode}
                          className="text-destructive hover:text-destructive h-auto p-1"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            setPromoError('');
                          }}
                          className={promoError ? 'border-destructive' : ''}
                        />
                        <Button variant="outline" onClick={handleApplyPromo}>
                          Apply
                        </Button>
                      </div>
                    )}
                    {promoError && (
                      <p className="text-sm text-destructive mt-1">{promoError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Try: FLAT20, FIRST10, MILLET15, HEALTHY25
                    </p>
                  </div>

                  <Separator />

                  {/* Bill Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">₹{Math.round(subtotal)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-healthy flex items-center gap-1">
                          <Percent className="h-3 w-3" />
                          Promo Discount
                        </span>
                        <span className="text-healthy">-₹{Math.round(discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-healthy' : 'text-foreground'}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Add ₹{Math.round(499 - subtotal)} more for free shipping
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">₹{Math.round(total)}</span>
                  </div>

                  <Link to="/payment" className="block">
                    <Button size="lg" className="w-full gap-2">
                      Proceed to Payment
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>

                  <Link to="/products">
                    <Button variant="ghost" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
