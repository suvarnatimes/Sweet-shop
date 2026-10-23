export type WeightVariant = '250g' | '500g' | '1kg' | '2kg' | '5kg';

export type ProductCategory = 
  | 'all'
  | 'gi-special'
  | 'desi-ghee'
  | 'dry-fruit'
  | 'traditional-savouries'
  | 'festival-boxes';

export type SweetenerType = 'Pure Bellam (Jaggery)' | 'Refined Sugar' | 'Khandsari Unrefined Sugar' | 'Savory (No Sugar)';

export type SweetnessLevel = 'Mild' | 'Medium' | 'Rich' | 'Savory';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  teluguName: string;
  tagline: string;
  category: 'gi-special' | 'desi-ghee' | 'dry-fruit' | 'traditional-savouries' | 'festival-boxes';
  sweetness: SweetnessLevel;
  sweetener: SweetenerType;
  shelfLifeDays: number;
  basePrice250g: number; // Price for 250g base unit
  pricePerWeight: Record<WeightVariant, number>;
  images: string[];
  description: string;
  heritageStory: string;
  ingredients: string[];
  nutrition: {
    caloriesPer100g: number;
    proteinG: number;
    fatG: number;
    carbsG: number;
    pureDesiGheePercent: number;
  };
  isGiTagged?: boolean;
  giTagNumber?: string;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  storageInstructions: string;
}

export interface CartItem {
  id: string; // unique combo of productId_weight
  productId: string;
  slug: string;
  name: string;
  teluguName: string;
  weight: WeightVariant;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  codFee: number;
  giftCardFee: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  expressAvailable: boolean; // 24-hr delivery for AP & Telangana
  standardDays: string; // e.g., "1 Day (Express)" or "2-3 Days"
  isServiced: boolean;
}

export type PaymentMethod = 'upi' | 'card' | 'cod';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
  orderNotes?: string;
  giftCardMessage?: string;
  includeGiftCard?: boolean;
}

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface OrderRecord {
  orderId: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  totals: CartTotals;
  paymentMethod: PaymentMethod;
  status: 'Order Placed' | 'Kitchen Freshly Prepared' | 'Dispatched & In Transit' | 'Out for Delivery' | 'Delivered';
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}
