import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Banknote, CheckCircle2, ArrowLeft, Truck, ShieldCheck, Wallet, Pencil, ShoppingCart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/data/images';
import { cn } from '@/lib/utils';
import { CustomerDetails, PaymentDetails } from '@/types';
import { z } from 'zod';

const customerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().trim().email('Enter a valid email address').max(255, 'Email is too long'),
  address: z.string().trim().min(10, 'Address must be at least 10 characters').max(500, 'Address is too long'),
  city: z.string().trim().min(2, 'City is required').max(100, 'City name is too long'),
  pincode: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
});

const upiSchema = z.object({
  upiId: z.string().trim().min(1, 'Enter your UPI ID').regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID (e.g. name@bank)'),
});

const cardSchema = z.object({
  cardNumber: z
    .string()
    .transform((s) => s.replace(/\s/g, ''))
    .refine((s) => /^\d{13,19}$/.test(s), 'Enter a valid 13–19 digit card number'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Enter expiry as MM/YY'),
  cardCvv: z.string().trim().regex(/^\d{3,4}$/, 'Enter a valid 3 or 4 digit CVV'),
  cardName: z.string().trim().min(2, 'Cardholder name required').max(100, 'Name too long'),
});

const NETBANKING_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Yes Bank',
  'Federal Bank',
  'IDFC First Bank',
  'South Indian Bank',
  'Other Bank',
];

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const v = value.replace(/\D/g, '');
  if (v.length >= 2) return v.slice(0, 2) + '/' + v.slice(2, 4);
  return v;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    getSubtotal, 
    getDiscountAmount, 
    getShippingCost, 
    getCartTotal,
    clearCart 
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    cookingNote: '',
  });
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    selectedBank: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentDetails, string>>>({});

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getCartTotal();

  const validateForm = (): boolean => {
    try {
      customerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};
        err.errors.forEach(e => {
          const field = e.path[0] as keyof CustomerDetails;
          newErrors[field] = e.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setStep('payment');
      setPaymentErrors({});
    }
  };

  const validatePaymentDetails = (): boolean => {
    if (paymentMethod === 'cod') {
      setPaymentErrors({});
      return true;
    }
    if (paymentMethod === 'upi') {
      try {
        upiSchema.parse({ upiId: paymentDetails.upiId });
        setPaymentErrors({});
        return true;
      } catch (err) {
        if (err instanceof z.ZodError) {
          setPaymentErrors({ upiId: err.errors[0]?.message ?? 'Invalid UPI ID' });
        }
        return false;
      }
    }
    if (paymentMethod === 'card') {
      try {
        cardSchema.parse({
          cardNumber: paymentDetails.cardNumber,
          cardExpiry: paymentDetails.cardExpiry,
          cardCvv: paymentDetails.cardCvv,
          cardName: paymentDetails.cardName,
        });
        setPaymentErrors({});
        return true;
      } catch (err) {
        if (err instanceof z.ZodError) {
          const newErrors: Partial<Record<keyof PaymentDetails, string>> = {};
          err.errors.forEach((e) => {
            const field = e.path[0] as keyof PaymentDetails;
            newErrors[field] = e.message;
          });
          setPaymentErrors(newErrors);
        }
        return false;
      }
    }
    if (paymentMethod === 'netbanking') {
      if (!paymentDetails.selectedBank) {
        setPaymentErrors({ selectedBank: 'Please select your bank' });
        return false;
      }
      setPaymentErrors({});
      return true;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validatePaymentDetails()) return;
    setIsProcessing(true);
    // Simulate payment gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: Smartphone, description: 'GPay, PhonePe, Paytm & others' },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', label: 'Net Banking', icon: Building2, description: 'All major banks supported' },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
  ];

  // Empty cart: show empty state with back / shopping options
  if (cart.items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-16 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center animate-in fade-in-0 duration-300">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add items from the shop to checkout. You can go back to your cart or continue shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cart">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Button>
              </Link>
              <Link to="/products">
                <Button className="w-full sm:w-auto gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Success Screen
  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container py-16">
          <div className="max-w-md mx-auto text-center animate-scale-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-healthy/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-healthy" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Order Placed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. Your delicious ready mixes are on the way!
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: <span className="font-mono font-medium text-foreground">RM{Date.now().toString().slice(-8)}</span>
            </p>
            
            <div className="bg-accent rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Delivery Details
              </h3>
              <p className="text-sm text-muted-foreground">
                {formData.name}<br />
                {formData.address}<br />
                {formData.city} - {formData.pincode}<br />
                Phone: {formData.phone}
              </p>
              <p className="text-sm text-primary mt-4 font-medium">
                Expected delivery: 3-5 business days
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
              <Link to="/products" className="flex-1">
                <Button className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
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
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => step === 'payment' ? setStep('details') : navigate('/cart')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {step === 'details' ? 'Checkout' : 'Payment'}
                </h1>
                <p className="text-muted-foreground">
                  {step === 'details' ? 'Enter your delivery details' : 'Choose payment method'}
                </p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-sm font-medium text-foreground">Details</span>
              </div>
              <div className={cn("h-0.5 w-12", step === 'payment' ? 'bg-primary' : 'bg-border')} />
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step === 'payment' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                )}>
                  2
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  step === 'payment' ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  Payment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 'details' ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Account & delivery details</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Update your name, phone, email and delivery address. You can change these on the payment step too.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="10-digit mobile number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="House/Flat No., Street, Landmark"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={errors.address ? 'border-destructive' : ''}
                        rows={3}
                      />
                      {errors.address && (
                        <p className="text-sm text-destructive mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="City name"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          placeholder="6-digit pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          className={errors.pincode ? 'border-destructive' : ''}
                        />
                        {errors.pincode && (
                          <p className="text-sm text-destructive mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cookingNote">Cooking Preference Note (Optional)</Label>
                      <Textarea
                        id="cookingNote"
                        placeholder="Any special instructions for your order..."
                        value={formData.cookingNote}
                        onChange={(e) => handleInputChange('cookingNote', e.target.value)}
                        rows={2}
                      />
                    </div>

                    <Button size="lg" className="w-full" onClick={handleContinueToPayment}>
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                      Delivering to {formData.name}
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="h-auto p-0 gap-1.5 text-primary"
                        onClick={() => setStep('details')}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Update account & address
                      </Button>
                    </p>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        {paymentMethods.map(({ id, label, icon: Icon, description }) => (
                          <label
                            key={id}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors",
                              paymentMethod === id 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <RadioGroupItem value={id} id={id} />
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{label}</p>
                              <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>

                    {/* Payment Gateway: UPI */}
                    {paymentMethod === 'upi' && (
                      <div className="mt-6 p-5 bg-muted/50 rounded-xl border border-border space-y-4 animate-in fade-in-0 duration-200">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Wallet className="h-4 w-4 text-primary" />
                          UPI Payment Gateway
                        </div>
                        <div>
                          <Label htmlFor="upi">UPI ID *</Label>
                          <Input
                            id="upi"
                            placeholder="yourname@paytm / name@ybl / name@okaxis"
                            value={paymentDetails.upiId}
                            onChange={(e) => {
                              setPaymentDetails((p) => ({ ...p, upiId: e.target.value }));
                              if (paymentErrors.upiId) setPaymentErrors((e) => ({ ...e, upiId: undefined }));
                            }}
                            className={paymentErrors.upiId ? 'border-destructive' : ''}
                          />
                          {paymentErrors.upiId && (
                            <p className="text-sm text-destructive mt-1">{paymentErrors.upiId}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            You will be redirected to your UPI app to complete payment
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Payment Gateway: Card */}
                    {paymentMethod === 'card' && (
                      <div className="mt-6 p-5 bg-muted/50 rounded-xl border border-border space-y-4 animate-in fade-in-0 duration-200">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Card Payment Gateway
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => {
                              setPaymentDetails((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }));
                              if (paymentErrors.cardNumber) setPaymentErrors((e) => ({ ...e, cardNumber: undefined }));
                            }}
                            maxLength={19 + 4}
                            className={paymentErrors.cardNumber ? 'border-destructive' : ''}
                          />
                          {paymentErrors.cardNumber && (
                            <p className="text-sm text-destructive mt-1">{paymentErrors.cardNumber}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input
                            id="cardName"
                            placeholder="As shown on card"
                            value={paymentDetails.cardName}
                            onChange={(e) => {
                              setPaymentDetails((p) => ({ ...p, cardName: e.target.value }));
                              if (paymentErrors.cardName) setPaymentErrors((e) => ({ ...e, cardName: undefined }));
                            }}
                            className={paymentErrors.cardName ? 'border-destructive' : ''}
                          />
                          {paymentErrors.cardName && (
                            <p className="text-sm text-destructive mt-1">{paymentErrors.cardName}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry (MM/YY) *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={paymentDetails.cardExpiry}
                              onChange={(e) => {
                                setPaymentDetails((p) => ({ ...p, cardExpiry: formatExpiry(e.target.value) }));
                                if (paymentErrors.cardExpiry) setPaymentErrors((e) => ({ ...e, cardExpiry: undefined }));
                              }}
                              maxLength={5}
                              className={paymentErrors.cardExpiry ? 'border-destructive' : ''}
                            />
                            {paymentErrors.cardExpiry && (
                              <p className="text-sm text-destructive mt-1">{paymentErrors.cardExpiry}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              type="password"
                              maxLength={4}
                              value={paymentDetails.cardCvv}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setPaymentDetails((p) => ({ ...p, cardCvv: v }));
                                if (paymentErrors.cardCvv) setPaymentErrors((e) => ({ ...e, cardCvv: undefined }));
                              }}
                              className={paymentErrors.cardCvv ? 'border-destructive' : ''}
                            />
                            {paymentErrors.cardCvv && (
                              <p className="text-sm text-destructive mt-1">{paymentErrors.cardCvv}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">3 or 4 digits on back</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Gateway: Net Banking */}
                    {paymentMethod === 'netbanking' && (
                      <div className="mt-6 p-5 bg-muted/50 rounded-xl border border-border space-y-4 animate-in fade-in-0 duration-200">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Building2 className="h-4 w-4 text-primary" />
                          Net Banking
                        </div>
                        <div>
                          <Label>Select your bank *</Label>
                          <Select
                            value={paymentDetails.selectedBank}
                            onValueChange={(v) => {
                              setPaymentDetails((p) => ({ ...p, selectedBank: v }));
                              if (paymentErrors.selectedBank) setPaymentErrors((e) => ({ ...e, selectedBank: undefined }));
                            }}
                          >
                            <SelectTrigger className={paymentErrors.selectedBank ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Choose your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {NETBANKING_BANKS.map((bank) => (
                                <SelectItem key={bank} value={bank}>
                                  {bank}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {paymentErrors.selectedBank && (
                            <p className="text-sm text-destructive mt-1">{paymentErrors.selectedBank}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            You will be redirected to your bank&apos;s secure page
                          </p>
                        </div>
                      </div>
                    )}

                    {/* COD: No extra fields */}
                    {paymentMethod === 'cod' && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
                        <p className="text-sm text-muted-foreground">
                          Pay in cash when your order is delivered. No online payment required.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex items-center gap-2 p-3 bg-healthy/10 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-healthy" />
                      <p className="text-sm text-healthy">
                        Your payment is secure and encrypted
                      </p>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full mt-6" 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Processing...
                        </>
                      ) : (
                        `Place Order • ₹${Math.round(total)}`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                    {cart.items.map((item) => (
                      <div 
                        key={`${item.product.id}-${item.selectedWeight.value}`}
                        className="flex gap-3"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img 
                            src={getProductImage(item.product.id)} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.selectedWeight.value} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ₹{Math.round(item.selectedWeight.price * (1 - item.product.discount / 100) * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Bill Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">₹{Math.round(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-healthy">
                        <span>Promo Discount</span>
                        <span>-₹{Math.round(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-healthy' : 'text-foreground'}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{Math.round(total)}</span>
                  </div>

                  {step === 'payment' && (
                    <div className="pt-2 border-t border-border space-y-3">
                      <p className="text-sm font-medium text-foreground">Delivering to:</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.name}<br />
                        {formData.phone} · {formData.email}<br />
                        {formData.address}, {formData.city} - {formData.pincode}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => setStep('details')}
                      >
                        <Pencil className="h-4 w-4" />
                        Update account & address
                      </Button>
                    </div>
                  )}
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

export default Payment;
