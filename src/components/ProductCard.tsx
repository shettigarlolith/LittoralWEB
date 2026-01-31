import React, { useState } from 'react';
import { Star, Clock, Plus, Check } from 'lucide-react';
import { Product, Weight } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  variant?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, variant = 'grid' }) => {
  const [selectedWeight, setSelectedWeight] = useState<Weight>(product.weights[0]);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountedPrice = selectedWeight.price * (1 - product.discount / 100);

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

  const imageBlock = (
    <div className={cn(
      "relative bg-secondary overflow-hidden shrink-0",
      variant === 'list' ? "w-28 h-28 sm:w-36 sm:h-36" : "aspect-square"
    )}>
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {product.discount > 0 && (
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-semibold px-2 py-1">
          {product.discount}% OFF
        </Badge>
      )}
      <div className={cn(
        "absolute top-3 right-3 w-5 h-5 border-2 rounded flex items-center justify-center bg-background",
        product.isVeg ? "border-healthy" : "border-destructive"
      )}>
        <div className={cn(
          "w-2.5 h-2.5 rounded-full",
          product.isVeg ? "bg-healthy" : "bg-destructive"
        )} />
      </div>
    </div>
  );

  const contentBlock = (
    <div className={cn(
      "space-y-3 flex flex-col min-w-0",
      variant === 'list' ? "p-4 flex-1" : "p-4"
    )}>
      <div className="flex flex-wrap gap-1.5">
        {product.tags.slice(0, 2).map(tag => (
          <span 
            key={tag} 
            className={cn("text-xs px-2 py-0.5 rounded-full border", getTagColor(tag))}
          >
            {tag}
          </span>
        ))}
      </div>
      <div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className={cn(
          "text-sm text-muted-foreground mt-1",
          variant === 'list' ? "line-clamp-2" : "line-clamp-2"
        )}>
          {product.description}
        </p>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-1 min-w-0">
          <Star className="h-4 w-4 shrink-0 fill-warning text-warning" />
          <span className="font-medium text-foreground truncate">{product.rating}</span>
          <span className="text-muted-foreground shrink-0">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground min-w-0">
          <Clock className="h-4 w-4 shrink-0" />
          <span className="truncate">{product.prepTime}</span>
        </div>
      </div>
      <div className="flex gap-2">
        {product.weights.map((weight) => (
          <button
            key={weight.value}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWeight(weight);
            }}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md border transition-colors",
              selectedWeight.value === weight.value
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border bg-background text-muted-foreground hover:border-primary/50"
            )}
          >
            {weight.value}
          </button>
        ))}
      </div>
      <div className={cn(
        "flex items-center justify-between gap-2 border-t border-border pt-2",
        variant === 'list' && "mt-auto"
      )}>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            ₹{Math.round(discountedPrice)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{selectedWeight.price}
            </span>
          )}
        </div>
        <Button
          size="sm"
          type="button"
          onClick={handleAddToCart}
          className={cn(
            "gap-1.5 transition-all shrink-0",
            isAdded && "bg-healthy hover:bg-healthy"
          )}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div 
      className={cn(
        "group bg-card rounded-xl border border-border overflow-hidden card-hover cursor-pointer shadow-card",
        variant === 'list' && "flex flex-row"
      )}
      onClick={() => onViewDetails?.(product)}
    >
      {imageBlock}
      {contentBlock}
    </div>
  );
};

export default ProductCard;
