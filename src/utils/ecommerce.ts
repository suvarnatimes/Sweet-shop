import { CartItem, CartTotals, OrderCustomer, PincodeInfo, WeightVariant } from '../types';

export const FREE_SHIPPING_MIN = 999;
export const STANDARD_DELIVERY_FEE = 79;
export const COD_HANDLING_FEE = 50;
export const GIFT_CARD_FEE = 49;
export const WHATSAPP_PHONE = '919177777296';

export interface PromoCodeDetails {
  code: string;
  type: 'percent' | 'flat';
  value: number;
  minOrder: number;
  description: string;
}

export const AVAILABLE_PROMOS: Record<string, PromoCodeDetails> = {
  BANDAR10: {
    code: 'BANDAR10',
    type: 'percent',
    value: 10,
    minOrder: 499,
    description: '10% OFF on authentic heritage sweets (Min ₹499)',
  },
  THATHARAO50: {
    code: 'THATHARAO50',
    type: 'flat',
    value: 50,
    minOrder: 500,
    description: 'Flat ₹50 OFF on orders above ₹500',
  },
  FESTIVE15: {
    code: 'FESTIVE15',
    type: 'percent',
    value: 15,
    minOrder: 1200,
    description: '15% Festive Celebration Discount (Min ₹1,200)',
  },
};

/**
 * Validates promo code and returns discount amount
 */
export function validateAndCalculateDiscount(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
  const normalized = code.trim().toUpperCase();
  const promo = AVAILABLE_PROMOS[normalized];

  if (!promo) {
    return { valid: false, discount: 0, message: 'Invalid coupon code.' };
  }

  if (subtotal < promo.minOrder) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order value of ₹${promo.minOrder} required for ${promo.code}.`,
    };
  }

  let discount = 0;
  if (promo.type === 'percent') {
    discount = Math.round((subtotal * promo.value) / 100);
  } else {
    discount = promo.value;
  }

  return {
    valid: true,
    discount,
    message: `${promo.code} applied! Saved ₹${discount}`,
  };
}

/**
 * Calculates all cart financial totals cleanly
 */
export function calculateCartTotals(
  items: CartItem[],
  promoCode: string = '',
  isCod: boolean = false,
  includeGiftCard: boolean = false
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const { discount } = promoCode ? validateAndCalculateDiscount(promoCode, subtotal) : { discount: 0 };
  const discountedSubtotal = Math.max(0, subtotal - discount);

  const isFreeShipping = items.length > 0 && subtotal >= FREE_SHIPPING_MIN;
  const deliveryFee = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_DELIVERY_FEE;
  const codFee = isCod && items.length > 0 ? COD_HANDLING_FEE : 0;
  const giftCardFee = includeGiftCard && items.length > 0 ? GIFT_CARD_FEE : 0;

  const total = items.length === 0 ? 0 : discountedSubtotal + deliveryFee + codFee + giftCardFee;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_MIN - subtotal);

  return {
    subtotal,
    discount,
    deliveryFee,
    codFee,
    giftCardFee,
    total,
    freeShippingThreshold: FREE_SHIPPING_MIN,
    freeShippingRemaining,
    isFreeShipping,
  };
}

/**
 * Formats Indian Rupee currency
 */
export function formatInr(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Checks serviceability and estimated delivery by 6-digit Indian Pincode
 */
export function checkPincodeDelivery(rawPin: string): PincodeInfo {
  const pin = rawPin.trim().replace(/\D/g, '');

  if (pin.length !== 6) {
    return {
      pincode: rawPin,
      city: '',
      state: '',
      expressAvailable: false,
      standardDays: '',
      isServiced: false,
    };
  }

  const prefix2 = pin.substring(0, 2);
  const prefix3 = pin.substring(0, 3);

  // Machilipatnam local home zone
  if (prefix3 === '521') {
    return {
      pincode: pin,
      city: pin === '521001' ? 'Machilipatnam (Bandar)' : 'Krishna District',
      state: 'Andhra Pradesh',
      expressAvailable: true,
      standardDays: 'Same-day or next-morning doorstep delivery (Fresh from our Fort Road Kitchen)',
      isServiced: true,
    };
  }

  // Andhra Pradesh (520xxx to 535xxx)
  if (parseInt(prefix2) >= 51 && parseInt(prefix2) <= 53) {
    let city = 'Andhra Pradesh';
    if (prefix3 === '520') city = 'Vijayawada';
    else if (prefix3 === '522') city = 'Guntur';
    else if (prefix3 === '530') city = 'Visakhapatnam';
    else if (prefix3 === '533') city = 'Kakinada / Rajahmundry';
    else if (prefix3 === '517') city = 'Tirupati';

    return {
      pincode: pin,
      city,
      state: 'Andhra Pradesh',
      expressAvailable: true,
      standardDays: 'Express 24-hr Doorstep Delivery via Bluedart Air',
      isServiced: true,
    };
  }

  // Telangana (500xxx to 509xxx)
  if (parseInt(prefix2) === 50) {
    let city = 'Telangana';
    if (prefix3 === '500') city = 'Hyderabad / Secunderabad';
    else if (prefix3 === '506') city = 'Warangal';

    return {
      pincode: pin,
      city,
      state: 'Telangana',
      expressAvailable: true,
      standardDays: 'Express 24-hr Doorstep Delivery via Bluedart Air',
      isServiced: true,
    };
  }

  // Karnataka (560xxx to 590xxx)
  if (parseInt(prefix2) >= 56 && parseInt(prefix2) <= 59) {
    let city = 'Karnataka';
    if (prefix3 === '560') city = 'Bengaluru';
    else if (prefix3 === '570') city = 'Mysuru';

    return {
      pincode: pin,
      city,
      state: 'Karnataka',
      expressAvailable: false,
      standardDays: '24-48 hrs Express Delivery via Air Cargo',
      isServiced: true,
    };
  }

  // Tamil Nadu (600xxx to 643xxx)
  if (parseInt(prefix2) >= 60 && parseInt(prefix2) <= 64) {
    let city = 'Tamil Nadu';
    if (prefix3 === '600') city = 'Chennai';
    else if (prefix3 === '641') city = 'Coimbatore';

    return {
      pincode: pin,
      city,
      state: 'Tamil Nadu',
      expressAvailable: false,
      standardDays: '48 hrs Pan-India Express Delivery',
      isServiced: true,
    };
  }

  // Maharashtra (400xxx to 445xxx)
  if (parseInt(prefix2) >= 40 && parseInt(prefix2) <= 44) {
    let city = 'Maharashtra';
    if (prefix3 === '400') city = 'Mumbai / Navi Mumbai';
    else if (prefix3 === '411') city = 'Pune';

    return {
      pincode: pin,
      city,
      state: 'Maharashtra',
      expressAvailable: false,
      standardDays: '48-72 hrs Insulated Vacuum Pack Delivery',
      isServiced: true,
    };
  }

  // Delhi NCR (110xxx)
  if (prefix3 === '110' || prefix3 === '201' || prefix3 === '122') {
    return {
      pincode: pin,
      city: prefix3 === '110' ? 'New Delhi' : prefix3 === '122' ? 'Gurugram' : 'Noida',
      state: 'Delhi NCR',
      expressAvailable: false,
      standardDays: '48-72 hrs Pan-India Air Express Delivery',
      isServiced: true,
    };
  }

  // All other valid 6 digit Indian pincodes
  return {
    pincode: pin,
    city: 'All India Service Area',
    state: 'India',
    expressAvailable: false,
    standardDays: '48-72 hrs Vacuum-Sealed Pan-India Air Delivery',
    isServiced: true,
  };
}

/**
 * Builds standard WhatsApp 1-Click order link pre-filled with all cart details
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customer?: Partial<OrderCustomer>,
  orderId?: string
): string {
  if (items.length === 0) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      'Namaste Thatha Rao Sweets! I would like to enquire about your authentic Bandar Laddu & Halwa.'
    )}`;
  }

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* (${item.weight}) x ${item.quantity} = ${formatInr(item.unitPrice * item.quantity)}`
    )
    .join('\n');

  const totals = calculateCartTotals(items);

  let message = `Namaste Sri Lakshmi Satyanarayana Thatha Rao Sweets! 🙏\n\n`;
  if (orderId) {
    message += `*Order Ref:* #${orderId}\n`;
  }
  message += `I would like to order fresh sweets from Machilipatnam:\n\n${itemsList}\n\n`;
  message += `*Estimated Total:* ${formatInr(totals.total)} ${
    totals.isFreeShipping ? '(Free Pan-India Shipping)' : `(+ ${formatInr(totals.deliveryFee)} Express Delivery)`
  }\n`;

  if (customer && (customer.fullName || customer.city || customer.pincode)) {
    message += `\n*Delivery Details:*\n`;
    if (customer.fullName) message += `• Name: ${customer.fullName}\n`;
    if (customer.phone) message += `• Phone: ${customer.phone}\n`;
    if (customer.addressLine) message += `• Address: ${customer.addressLine}\n`;
    if (customer.city || customer.pincode) message += `• Location: ${customer.city || ''} - ${customer.pincode || ''}\n`;
    if (customer.orderNotes) message += `• Note: ${customer.orderNotes}\n`;
  } else {
    message += `\nPlease confirm batch availability and delivery schedule for my location. Dhanyavadalu!`;
  }

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates an authentic order reference ID e.g. TR-1954-4821
 */
export function generateOrderId(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TR-1951-${random}`;
}
