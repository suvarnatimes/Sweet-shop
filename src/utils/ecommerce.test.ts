import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  validateAndCalculateDiscount,
  checkPincodeDelivery,
  generateWhatsAppOrderUrl,
  formatInr,
  FREE_SHIPPING_MIN,
  STANDARD_DELIVERY_FEE,
  COD_HANDLING_FEE,
} from './ecommerce';
import { CartItem } from '../types';

const sampleItem1: CartItem = {
  id: 'laddu_500g',
  productId: 'bandar-laddu',
  slug: 'bandar-laddu',
  name: 'Original GI Bandar Laddu',
  teluguName: 'అసలైన బందరు లడ్డూ',
  weight: '500g',
  unitPrice: 320,
  quantity: 2, // 640 total
  image: '/images/laddu.jpg',
};

const sampleItem2: CartItem = {
  id: 'halwa_500g',
  productId: 'bandar-halwa',
  slug: 'bandar-halwa',
  name: 'Royal Bandar Halwa',
  teluguName: 'రాచరికపు బందరు హల్వా',
  weight: '500g',
  unitPrice: 380,
  quantity: 1, // 380 total
  image: '/images/halwa.jpg',
};

test('Cart calculations under free shipping threshold includes delivery fee', () => {
  const items = [sampleItem1]; // 640 total
  const totals = calculateCartTotals(items);

  assert.equal(totals.subtotal, 640);
  assert.equal(totals.isFreeShipping, false);
  assert.equal(totals.deliveryFee, STANDARD_DELIVERY_FEE);
  assert.equal(totals.total, 640 + STANDARD_DELIVERY_FEE);
  assert.equal(totals.freeShippingRemaining, FREE_SHIPPING_MIN - 640);
});

test('Cart calculations over free shipping threshold gives free delivery', () => {
  const items = [sampleItem1, sampleItem2]; // 640 + 380 = 1020
  const totals = calculateCartTotals(items);

  assert.equal(totals.subtotal, 1020);
  assert.equal(totals.isFreeShipping, true);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.freeShippingRemaining, 0);
  assert.equal(totals.total, 1020);
});

test('Promo code BANDAR10 gives 10% discount when min requirement met', () => {
  const discountResult = validateAndCalculateDiscount('BANDAR10', 1000);
  assert.equal(discountResult.valid, true);
  assert.equal(discountResult.discount, 100);

  const cartTotalsWithPromo = calculateCartTotals([sampleItem1, sampleItem2], 'BANDAR10');
  assert.equal(cartTotalsWithPromo.discount, 102); // 10% of 1020 = 102
  assert.equal(cartTotalsWithPromo.total, 1020 - 102);
});

test('Promo code fails when min requirement not met', () => {
  const discountResult = validateAndCalculateDiscount('FESTIVE15', 500); // requires 1200
  assert.equal(discountResult.valid, false);
  assert.equal(discountResult.discount, 0);
});

test('COD fee adds 50 rupees when enabled', () => {
  const items = [sampleItem1];
  const totals = calculateCartTotals(items, '', true);
  assert.equal(totals.codFee, COD_HANDLING_FEE);
  assert.equal(totals.total, 640 + STANDARD_DELIVERY_FEE + COD_HANDLING_FEE);
});

test('Pincode check identifies AP / Telangana express delivery', () => {
  const machilipatnam = checkPincodeDelivery('521001');
  assert.equal(machilipatnam.isServiced, true);
  assert.equal(machilipatnam.expressAvailable, true);
  assert.equal(machilipatnam.city, 'Machilipatnam (Bandar)');

  const hyderabad = checkPincodeDelivery('500081');
  assert.equal(hyderabad.isServiced, true);
  assert.equal(hyderabad.expressAvailable, true);
  assert.equal(hyderabad.state, 'Telangana');

  const bangalore = checkPincodeDelivery('560001');
  assert.equal(bangalore.isServiced, true);
  assert.equal(bangalore.city, 'Bengaluru');
});

test('WhatsApp URL generates valid link with encoded text and phone number', () => {
  const url = generateWhatsAppOrderUrl([sampleItem1], { fullName: 'Suresh Kumar', pincode: '500081' });
  assert.ok(url.startsWith('https://wa.me/919177777296?text='));
  assert.ok(url.includes(encodeURIComponent('Original GI Bandar Laddu')));
  assert.ok(url.includes(encodeURIComponent('Suresh Kumar')));
});

test('formatInr formats numbers in Indian numbering format', () => {
  assert.equal(formatInr(1250), '₹1,250');
  assert.equal(formatInr(99), '₹99');
});
