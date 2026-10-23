import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { checkPincodeDelivery, formatInr, generateOrderId, generateWhatsAppOrderUrl } from '../utils/ecommerce';
import { OrderCustomer, OrderRecord, PaymentMethod } from '../types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Gift,
  PhoneCall,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    items,
    totals,
    clearCart,
    saveOrder,
    navigateTo,
    activePincode,
    setPincode,
    includeGiftCard,
    giftCardMessage,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Form State
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    landmark: '',
    pincode: activePincode,
    city: checkPincodeDelivery(activePincode).city || 'Machilipatnam',
    state: checkPincodeDelivery(activePincode).state || 'Andhra Pradesh',
    orderNotes: '',
    includeGiftCard,
    giftCardMessage,
  });

  const [isPlacing, setIsPlacing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  // Auto city / state lookup when pincode changes
  useEffect(() => {
    if (customer.pincode.length === 6) {
      const pinResult = checkPincodeDelivery(customer.pincode);
      if (pinResult.isServiced) {
        setCustomer((prev) => ({
          ...prev,
          city: pinResult.city || prev.city,
          state: pinResult.state || prev.state,
        }));
        setPincode(customer.pincode);
      }
    }
  }, [customer.pincode, setPincode]);

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-xl p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed & Payment Verified
            </span>
            <h1 className="font-serif-luxury text-3xl font-black text-stone-900 mt-3">
              Dhanyavadalu, {completedOrder.customer.fullName}!
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Your fresh batch of authentic Bandar sweets is being scheduled in our Machilipatnam kitchen.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Order Reference:</span>
              <span className="font-bold text-[#881337] font-mono">{completedOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Estimated Delivery:</span>
              <span className="font-bold text-stone-900">{completedOrder.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="font-medium text-stone-800 truncate max-w-[200px]">
                {completedOrder.customer.addressLine}, {completedOrder.customer.city}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-amber-200">
              <span className="text-stone-700 font-semibold">Total Paid:</span>
              <span className="font-black text-[#881337]">{formatInr(completedOrder.totals.total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('track')}
              className="w-full sm:w-auto px-6 py-3 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors"
            >
              Track Courier & Milestones
            </button>

            <a
              href={generateWhatsAppOrderUrl(completedOrder.items, completedOrder.customer, completedOrder.orderId)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Get WhatsApp Updates</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-[#881337] mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif-luxury text-xl font-bold text-stone-900 mb-2">
          Your cart is currently empty
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          Add fresh Bandar Laddu or Halwa from our catalog to proceed with checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#881337] text-white font-bold text-xs uppercase tracking-wider rounded-xl"
        >
          Explore Bandar Sweets
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacing(true);

    const isCod = paymentMethod === 'cod';
    const finalTotals = { ...totals };
    if (isCod) {
      finalTotals.codFee = 50;
      finalTotals.total = finalTotals.total + 50;
    }

    setTimeout(() => {
      const orderId = generateOrderId();
      const pinInfo = checkPincodeDelivery(customer.pincode);

      const newOrder: OrderRecord = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customer,
        items: [...items],
        totals: finalTotals,
        paymentMethod,
        status: 'Order Placed',
        courierName: pinInfo.expressAvailable ? 'Bluedart Air Express' : 'DTDC Priority Air Cargo',
        trackingNumber: `TR-${Math.floor(100000000 + Math.random() * 900000000)}-IN`,
        estimatedDelivery: pinInfo.expressAvailable ? 'Tomorrow by 2:00 PM' : 'In 48 Hours',
        trackingSteps: [
          {
            title: 'Order Confirmed in Machilipatnam',
            description: 'Fresh batch preparation queued at our Godugupet kitchen.',
            timestamp: 'Just now',
            completed: true,
            current: true,
          },
          {
            title: 'Desi Ghee Cooking & Nitrogen Packaging',
            description: 'Slow boondi pounding and multi-layer vacuum foil sealing.',
            timestamp: 'Within 4 hours',
            completed: false,
            current: false,
          },
          {
            title: 'Dispatched via Air Courier',
            description: `Handed over to ${pinInfo.expressAvailable ? 'Bluedart Air' : 'DTDC Air'}.`,
            timestamp: 'Tonight, 8:00 PM',
            completed: false,
            current: false,
          },
          {
            title: 'Out for Delivery',
            description: `Courier rider delivering to ${customer.city || 'your address'}.`,
            timestamp: pinInfo.expressAvailable ? 'Tomorrow Morning' : 'Day after Tomorrow',
            completed: false,
            current: false,
          },
        ],
      };

      saveOrder(newOrder);
      setCompletedOrder(newOrder);
      clearCart();
      setIsPlacing(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-black text-stone-900">
          Secure Doorstep Checkout
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Direct dispatch from Sri Lakshmi Satyanarayana Thatha Rao Sweets, Machilipatnam.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Address & Payment Selection */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact & Shipping Address */}
          <div className="p-6 bg-white rounded-2xl border border-amber-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-amber-100">
              <Truck className="w-5 h-5 text-[#881337]" />
              <h2 className="font-serif-luxury text-base font-bold text-stone-900">
                1. Delivery Address & Contact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="e.g. Suresh Varma"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#881337]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Mobile Number (For WhatsApp Tracking) *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="e.g. 98490 12345"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#881337]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="e.g. suresh@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#881337]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Pincode (Auto-lookup) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={customer.pincode}
                  onChange={(e) =>
                    setCustomer({ ...customer, pincode: e.target.value.replace(/\D/g, '') })
                  }
                  placeholder="6-digit Pincode"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#881337] font-bold text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Flat / House / Street Address *
              </label>
              <textarea
                required
                rows={2}
                value={customer.addressLine}
                onChange={(e) => setCustomer({ ...customer, addressLine: e.target.value })}
                placeholder="House no., apartment name, road name..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#881337]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-200 bg-amber-50/50 font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">State</label>
                <input
                  type="text"
                  required
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-200 bg-amber-50/50 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="p-6 bg-white rounded-2xl border border-amber-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-amber-100">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h2 className="font-serif-luxury text-base font-bold text-stone-900">
                2. Select Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#881337] bg-amber-50/50 ring-1 ring-[#881337]'
                    : 'border-amber-200 hover:border-amber-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 text-[#881337] focus:ring-[#881337]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      UPI (Google Pay, PhonePe, Paytm, QR)
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Fastest & Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Instant zero-fee transfer via any UPI application or QR scan.
                  </p>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-amber-200/60 space-y-2">
                      <div className="flex gap-2 text-xs">
                        {['gpay', 'phonepe', 'paytm', 'qr'].map((app) => (
                          <button
                            type="button"
                            key={app}
                            onClick={() => setUpiApp(app as any)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase ${
                              upiApp === app
                                ? 'bg-[#881337] text-white border-[#881337]'
                                : 'bg-white text-stone-700 border-amber-200'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>

                      {upiApp === 'qr' ? (
                        <div className="p-3 bg-white border border-amber-200 rounded-xl flex items-center gap-3">
                          <QrCode className="w-12 h-12 text-[#881337]" />
                          <div className="text-[11px] text-stone-600">
                            Scan dynamic QR code on submit with any UPI application.
                          </div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter your UPI ID (e.g. yourname@okhdfcbank)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                        />
                      )}
                    </div>
                  )}
                </div>
              </label>

              {/* Cards Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#881337] bg-amber-50/50 ring-1 ring-[#881337]'
                    : 'border-amber-200 hover:border-amber-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 text-[#881337] focus:ring-[#881337]"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-stone-900">
                    Credit / Debit Card (Visa, Mastercard, RuPay)
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Secured by 256-bit bank grade encryption.
                  </p>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-amber-200/60 space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number (e.g. 4532 •••• •••• 8291)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                        />
                        <input
                          type="password"
                          placeholder="CVV (3 digits)"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#881337] bg-amber-50/50 ring-1 ring-[#881337]'
                    : 'border-amber-200 hover:border-amber-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-[#881337] focus:ring-[#881337]"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900">
                    Cash on Delivery (COD) (+₹50 Handling Fee)
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Pay in cash when our courier executive delivers to your doorstep.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-amber-200/90 shadow-sm space-y-4 sticky top-24">
            <h2 className="font-serif-luxury text-base font-bold text-stone-900 pb-3 border-b border-amber-100">
              Order Summary ({items.length} Sweets)
            </h2>

            <div className="divide-y divide-amber-100 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-amber-200"
                    />
                    <div>
                      <div className="font-bold text-stone-900">{item.name}</div>
                      <div className="text-[10px] text-stone-500">
                        {item.weight} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-[#881337]">
                    {formatInr(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-2 border-t border-amber-200 space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatInr(totals.subtotal)}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatInr(totals.discount)}</span>
                </div>
              )}

              {includeGiftCard && (
                <div className="flex justify-between">
                  <span>Festival Card Packaging</span>
                  <span>{formatInr(totals.giftCardFee)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span>
                  {totals.isFreeShipping ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    formatInr(totals.deliveryFee)
                  )}
                </span>
              </div>

              {paymentMethod === 'cod' && (
                <div className="flex justify-between text-amber-900 font-semibold">
                  <span>Cash on Delivery Handling</span>
                  <span>₹50</span>
                </div>
              )}

              <div className="flex justify-between text-base font-black text-[#881337] pt-2 border-t border-amber-200">
                <span>Total Payable</span>
                <span>
                  {formatInr(totals.total + (paymentMethod === 'cod' ? 50 : 0))}
                </span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-3.5 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPlacing ? (
                <span>Generating Order Batch...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    Place Order (
                    {formatInr(totals.total + (paymentMethod === 'cod' ? 50 : 0))})
                  </span>
                </>
              )}
            </button>

            <div className="text-[10px] text-center text-stone-500">
              Freshly crafted in Machilipatnam with 100% money-back freshness guarantee.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
