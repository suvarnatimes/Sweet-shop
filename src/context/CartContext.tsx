import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartItem, CartTotals, OrderCustomer, OrderRecord, PincodeInfo, Product, WeightVariant } from '../types';
import { calculateCartTotals, checkPincodeDelivery, validateAndCalculateDiscount } from '../utils/ecommerce';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, weight: WeightVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totals: CartTotals;
  promoCode: string;
  promoMessage: string;
  promoError: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  includeGiftCard: boolean;
  setIncludeGiftCard: (include: boolean) => void;
  giftCardMessage: string;
  setGiftCardMessage: (msg: string) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  activePincode: string;
  pincodeInfo: PincodeInfo | null;
  setPincode: (pin: string) => void;
  badgeAnimate: boolean;
  orders: OrderRecord[];
  saveOrder: (order: OrderRecord) => void;
  // Navigation
  currentView: 'home' | 'shop' | 'product' | 'checkout' | 'track' | 'about';
  selectedProductSlug: string | null;
  navigateTo: (view: 'home' | 'shop' | 'product' | 'checkout' | 'track' | 'about', slug?: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'thatha_rao_cart_v1';
const ORDERS_STORAGE_KEY = 'thatha_rao_orders_v1';
const PINCODE_STORAGE_KEY = 'thatha_rao_pincode_v1';

// Seed sample order so Track Order has instant demonstrable data
const SEED_SAMPLE_ORDER: OrderRecord = {
  orderId: 'TR-1951-8291',
  date: '22 Oct 2026, 11:30 AM',
  customer: {
    fullName: 'Rajesh Naidu',
    phone: '98490 12345',
    email: 'rajesh.naidu@gmail.com',
    addressLine: 'Flat 402, Goutham Residency, Road No. 36, Jubilee Hills',
    landmark: 'Near Peddamma Temple',
    pincode: '500033',
    city: 'Hyderabad',
    state: 'Telangana',
    orderNotes: 'Please pack in extra seal for wedding gift.',
    includeGiftCard: true,
    giftCardMessage: 'Happy Deepavali to the Naidu family from Thatha Rao Machilipatnam!',
  },
  items: [
    {
      id: 'bandar-laddu_1kg',
      productId: 'bandar-laddu',
      slug: 'bandar-laddu',
      name: 'Original GI Bandar Laddu',
      teluguName: 'అసలైన బందరు లడ్డూ',
      weight: '1kg',
      unitPrice: 600,
      quantity: 2,
      image: '/images/sweets/bandar-laddu.jpg',
    },
    {
      id: 'bandar-halwa_500g',
      productId: 'bandar-halwa',
      slug: 'bandar-halwa',
      name: 'Heritage Bandar Halwa',
      teluguName: 'రాచరికపు బందరు హల్వా',
      weight: '500g',
      unitPrice: 340,
      quantity: 1,
      image: '/images/sweets/bandar-halwa.jpg',
    },
    {
      id: 'andhra-mixture_500g',
      productId: 'andhra-mixture',
      slug: 'andhra-mixture',
      name: 'Machilipatnam Special Mixture',
      teluguName: 'మచిలీపట్నం స్పెషల్ కారపు మిక్చర్',
      weight: '500g',
      unitPrice: 230,
      quantity: 1,
      image: '/images/sweets/machilipatnam-mixture.jpg',
    },
  ],
  totals: {
    subtotal: 1770,
    discount: 177,
    deliveryFee: 0,
    codFee: 0,
    giftCardFee: 49,
    total: 1642,
    freeShippingThreshold: 999,
    freeShippingRemaining: 0,
    isFreeShipping: true,
  },
  paymentMethod: 'upi',
  status: 'Dispatched & In Transit',
  courierName: 'Bluedart Air Express',
  trackingNumber: 'BD-884920412-IN',
  estimatedDelivery: 'Tomorrow by 1:00 PM',
  trackingSteps: [
    {
      title: 'Order Placed & Confirmed',
      description: 'Order confirmed with Sri Lakshmi Satyanarayana Thatha Rao Sweets, Machilipatnam.',
      timestamp: '22 Oct, 11:30 AM',
      completed: true,
      current: false,
    },
    {
      title: 'Kitchen Freshly Prepared & Vacuum Packed',
      description: 'Handcrafted in pure cow ghee and sealed in oxygen-barrier export packaging.',
      timestamp: '22 Oct, 03:45 PM',
      completed: true,
      current: false,
    },
    {
      title: 'Dispatched via Bluedart Air Express',
      description: 'In transit from Vijayawada Hub to Hyderabad Central Air Sort Facility.',
      timestamp: '22 Oct, 08:15 PM',
      completed: true,
      current: true,
    },
    {
      title: 'Out for Delivery in Jubilee Hills, Hyderabad',
      description: 'Assigned to courier executive for priority temperature-controlled delivery.',
      timestamp: 'Expected Tomorrow, 11:00 AM',
      completed: false,
      current: false,
    },
    {
      title: 'Delivered',
      description: 'Package handed over with freshness guarantee.',
      timestamp: 'Expected Tomorrow, 01:00 PM',
      completed: false,
      current: false,
    },
  ],
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product' | 'checkout' | 'track' | 'about'>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>('bandar-laddu');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [promoError, setPromoError] = useState('');
  const [includeGiftCard, setIncludeGiftCard] = useState(false);
  const [giftCardMessage, setGiftCardMessage] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pincode state
  const [activePincode, setActivePincode] = useState<string>(() => {
    try {
      return localStorage.getItem(PINCODE_STORAGE_KEY) || '521001';
    } catch {
      return '521001';
    }
  });

  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo | null>(() => checkPincodeDelivery('521001'));

  // Orders state
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [SEED_SAMPLE_ORDER];
    } catch {
      return [SEED_SAMPLE_ORDER];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable
    }
  }, [items]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Storage unavailable
    }
  }, [orders]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  const setPincode = useCallback((pin: string) => {
    setActivePincode(pin);
    const result = checkPincodeDelivery(pin);
    setPincodeInfo(result);
    try {
      localStorage.setItem(PINCODE_STORAGE_KEY, pin);
    } catch {
      // Ignore
    }
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const navigateTo = useCallback(
    (view: 'home' | 'shop' | 'product' | 'checkout' | 'track' | 'about', slug?: string) => {
      if (slug) {
        setSelectedProductSlug(slug);
      }
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const addItem = useCallback(
    (product: Product, weight: WeightVariant, quantity = 1) => {
      const unitPrice = product.pricePerWeight[weight] || product.basePrice250g;
      const itemId = `${product.id}_${weight}`;

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === itemId);
        if (existingIndex > -1) {
          const next = [...prev];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + quantity,
          };
          return next;
        } else {
          return [
            ...prev,
            {
              id: itemId,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              teluguName: product.teluguName,
              weight,
              unitPrice,
              quantity,
              image: product.images[0],
            },
          ];
        }
      });

      // Animate cart badge
      setBadgeAnimate(true);
      setTimeout(() => setBadgeAnimate(false), 800);
      showToast(`Added ${quantity}x ${product.name} (${weight}) to cart`);
    },
    [showToast]
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode('');
    setPromoMessage('');
    setPromoError('');
    setIncludeGiftCard(false);
    setGiftCardMessage('');
  }, []);

  const applyPromoCode = useCallback(
    (code: string): boolean => {
      const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      const res = validateAndCalculateDiscount(code, subtotal);
      if (res.valid) {
        setPromoCode(code.trim().toUpperCase());
        setPromoMessage(res.message);
        setPromoError('');
        showToast(res.message);
        return true;
      } else {
        setPromoError(res.message);
        setPromoMessage('');
        return false;
      }
    },
    [items, showToast]
  );

  const removePromoCode = useCallback(() => {
    setPromoCode('');
    setPromoMessage('');
    setPromoError('');
  }, []);

  const totals = useMemo(() => {
    return calculateCartTotals(items, promoCode, false, includeGiftCard);
  }, [items, promoCode, includeGiftCard]);

  const saveOrder = useCallback((order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totals,
        promoCode,
        promoMessage,
        promoError,
        applyPromoCode,
        removePromoCode,
        includeGiftCard,
        setIncludeGiftCard,
        giftCardMessage,
        setGiftCardMessage,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        activePincode,
        pincodeInfo,
        setPincode,
        badgeAnimate,
        orders,
        saveOrder,
        currentView,
        selectedProductSlug,
        navigateTo,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
