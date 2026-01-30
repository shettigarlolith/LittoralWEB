export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  weights: Weight[];
  rating: number;
  reviewCount: number;
  prepTime: string;
  discount: number;
  tags: ProductTag[];
  category: Category;
  ingredients: string[];
  cookingSteps: string[];
  isVeg: boolean;
}

export interface Weight {
  value: string;
  price: number;
}

export type ProductTag = 'Healthy' | 'Millet' | 'Bestseller' | 'No Preservatives' | 'Traditional' | 'Quick' | 'Protein Rich';

export type Category = 'Breakfast Mixes' | 'Millet Mixes' | 'Traditional Mixes' | 'Quick Meals';

export interface CartItem {
  product: Product;
  selectedWeight: Weight;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  cookingNote?: string;
}

export interface PaymentDetails {
  upiId: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
  selectedBank: string;
}

export type DietFilter = 'all' | 'veg' | 'nonveg';

export interface FilterState {
  categories: Category[];
  prepTime: string[];
  rating: number;
  tags: ProductTag[];
  searchQuery: string;
  dietFilter: DietFilter;
}
