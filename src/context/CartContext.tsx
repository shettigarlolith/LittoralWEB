import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Weight, CartState } from '@/types';
import { promoCodes } from '@/data/products';

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, weight: Weight, quantity?: number) => void;
  removeFromCart: (productId: string, weightValue: string) => void;
  updateQuantity: (productId: string, weightValue: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getCartTotal: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'littoral-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return { items: [], promoCode: null, promoDiscount: 0 };
        }
      }
    }
    return { items: [], promoCode: null, promoDiscount: 0 };
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, weight: Weight, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.items.findIndex(
        item => item.product.id === product.id && item.selectedWeight.value === weight.value
      );

      if (existingIndex >= 0) {
        const updatedItems = [...prev.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { ...prev, items: updatedItems };
      }

      return {
        ...prev,
        items: [...prev.items, { product, selectedWeight: weight, quantity }],
      };
    });
  };

  const removeFromCart = (productId: string, weightValue: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(
        item => !(item.product.id === productId && item.selectedWeight.value === weightValue)
      ),
    }));
  };

  const updateQuantity = (productId: string, weightValue: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weightValue);
      return;
    }

    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.product.id === productId && item.selectedWeight.value === weightValue
          ? { ...item, quantity }
          : item
      ),
    }));
  };

  const clearCart = () => {
    setCart({ items: [], promoCode: null, promoDiscount: 0 });
  };

  const applyPromoCode = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (promoCodes[upperCode]) {
      setCart(prev => ({
        ...prev,
        promoCode: upperCode,
        promoDiscount: promoCodes[upperCode],
      }));
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setCart(prev => ({
      ...prev,
      promoCode: null,
      promoDiscount: 0,
    }));
  };

  const getSubtotal = (): number => {
    return cart.items.reduce((total, item) => {
      const originalPrice = item.selectedWeight.price;
      const discountedPrice = originalPrice * (1 - item.product.discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const getDiscountAmount = (): number => {
    const subtotal = getSubtotal();
    return subtotal * (cart.promoDiscount / 100);
  };

  const getShippingCost = (): number => {
    const subtotal = getSubtotal();
    return subtotal >= 499 ? 0 : 49;
  };

  const getCartTotal = (): number => {
    return getSubtotal() - getDiscountAmount() + getShippingCost();
  };

  const getItemCount = (): number => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        getCartTotal,
        getSubtotal,
        getDiscountAmount,
        getShippingCost,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
