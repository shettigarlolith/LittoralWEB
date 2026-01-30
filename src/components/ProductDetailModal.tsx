import React, { useState } from 'react';
import { X, Star, Clock, Minus, Plus, ChefHat, ShoppingCart } from 'lucide-react';
import { Product, Weight } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedWeight, setSelectedWeight] = useState<Weight | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  React.useEffect(() => {
    if (product) {
      setSelectedWeight(product.weights[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product || !selectedWeight) return null;

  const discountedPrice = selectedWeight.price * (1 - product.discount / 100);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    onClose();
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Healthy':
      case 'No Preservatives':
        return 'bg-healthy/10 text-healthy border-healthy/20';
      case 'Millet':
        return 'bg-millet/10 text-millet border-millet/20';
      case 'Bestseller':
        return 'bg-bestseller/10 text-bestseller border-bestseller/20';
      case 'Traditional':
        return 'bg-traditional/10 text-traditional border-traditional/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-square bg-secondary">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm px-3 py-1">
                {product.discount}% OFF
              </Badge>
            )}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-healthy rounded flex items-center justify-center bg-background">
              <div className="w-3 h-3 rounded-full bg-healthy" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span 
                  key={tag} 
                  className={cn("text-xs px-2.5 py-1 rounded-full border", getTagColor(tag))}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Rating */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{product.prepTime}</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Weight Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Size</label>
              <div className="flex gap-2">
                {product.weights.map((weight) => (
                  <button
                    key={weight.value}
                    onClick={() => setSelectedWeight(weight)}
                    className={cn(
                      "px-4 py-2 text-sm rounded-lg border transition-colors",
                      selectedWeight.value === weight.value
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    )}
                  >
                    {weight.value} - ₹{weight.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ₹{Math.round(discountedPrice * quantity)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-muted-foreground line-through">
                      ₹{selectedWeight.price * quantity}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  ₹{Math.round(discountedPrice)} per {selectedWeight.value}
                </p>
              </div>
              <Button size="lg" onClick={handleAddToCart} className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Cooking Steps & Ingredients */}
        <div className="border-t border-border p-6 grid md:grid-cols-2 gap-6">
          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                🌾
              </span>
              Ingredients
            </h3>
            <ul className="space-y-1.5">
              {product.ingredients.map((ingredient, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Cooking Steps */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <ChefHat className="h-4 w-4 text-accent-foreground" />
              </span>
              How to Cook
            </h3>
            <ol className="space-y-2">
              {product.cookingSteps.map((step, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 font-medium">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
