import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatInr, generateWhatsAppOrderUrl } from '../utils/ecommerce';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Percent,
  CheckCircle2,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
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
    navigateTo,
    activePincode,
    pincodeInfo,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyPromoCode(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigateTo('checkout');
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl(items, {
      pincode: activePincode,
      city: pincodeInfo?.city,
      orderNotes: orderNotes || undefined,
      includeGiftCard,
      giftCardMessage: includeGiftCard ? giftCardMessage : undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const progressPercent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF7] shadow-2xl flex flex-col border-l border-amber-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-amber-200 bg-amber-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#881337] text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-lg font-bold text-[#881337]">Your Mithai Box</h2>
                <p className="text-xs text-stone-600">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-amber-100/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-amber-100/60 border-b border-amber-200/80 px-4 py-3">
            {totals.isFreeShipping ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>🎉 Congratulations! You have unlocked Free Pan-India Delivery!</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    Add {formatInr(totals.freeShippingRemaining)} more for Free Pan-India Shipping!
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D97706] to-[#881337] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-800 mb-1">
                  Your Sweets Box is Empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                  Experience the 75-year legacy of original Bandar Laddu & freshly stirred Halwa.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-[#881337] hover:bg-[#70102d] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors"
                >
                  Explore Authentic Sweets
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-white rounded-xl border border-amber-200/80 shadow-xs hover:border-amber-300 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-amber-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-rose-700 p-0.5"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-amber-800 font-medium">{item.teluguName}</p>
                        <div className="mt-1">
                          <span className="inline-block bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Pack: {item.weight}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-amber-100/70">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-amber-200 rounded-lg bg-amber-50/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-stone-600 hover:text-[#881337] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-stone-600 hover:text-[#881337] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-[#881337]">
                            {formatInr(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Personalized Greeting / Festival Gift Box Addon */}
                <div className="p-3.5 bg-gradient-to-r from-amber-50 to-rose-50/40 rounded-xl border border-amber-300">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeGiftCard}
                      onChange={(e) => setIncludeGiftCard(e.target.checked)}
                      className="mt-1 rounded text-[#881337] focus:ring-[#881337]"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Add Handcrafted Festival Greeting Card (+₹49)</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Gold-embossed royal Thatha Rao Machilipatnam postcard with your handwritten message.
                      </p>
                    </div>
                  </label>

                  {includeGiftCard && (
                    <div className="mt-2.5">
                      <textarea
                        value={giftCardMessage}
                        onChange={(e) => setGiftCardMessage(e.target.value)}
                        placeholder="Write your greeting (e.g. 'Warm Deepavali wishes to the Sharma family from Hyderabad!')..."
                        rows={2}
                        className="w-full text-xs p-2 rounded-lg border border-amber-300 bg-white focus:outline-none focus:border-[#881337]"
                      />
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="pt-1">
                  {promoCode ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                        <Percent className="w-4 h-4 text-emerald-600" />
                        <span>Coupon "{promoCode}" applied (-{formatInr(totals.discount)})</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-stone-500 hover:text-rose-700 text-xs font-bold underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="Coupon code (try BANDAR10)"
                        className="flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded-xl border border-amber-300 focus:outline-none focus:border-[#881337] bg-white font-medium"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
                </div>

                {/* Order Special Instructions */}
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Special Batch Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Dispatch for Wedding on Friday, extra seal packaging"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-200 focus:outline-none focus:border-[#881337] bg-white"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout CTA Buttons */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-amber-200 bg-amber-50/40 space-y-3">
              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span>Mithai Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatInr(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatInr(totals.discount)}</span>
                  </div>
                )}

                {totals.giftCardFee > 0 && (
                  <div className="flex justify-between">
                    <span>Festival Card & Casket Tag</span>
                    <span className="font-semibold">{formatInr(totals.giftCardFee)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span>
                    {totals.isFreeShipping ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      formatInr(totals.deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold text-[#881337] pt-2 border-t border-amber-200">
                  <span>Grand Total</span>
                  <span>{formatInr(totals.total)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                {/* 1. Primary: Secure Online Checkout */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all transform active:scale-[0.99]"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 2. Secondary: 1-Click WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <span>1-Click Order on WhatsApp (+91 91777 77296)</span>
                </button>
              </div>

              <div className="text-[10px] text-center text-stone-500 flex items-center justify-center gap-1.5">
                <span>🔒 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>100% Pure Cow Ghee Guarantee</span>
                <span>•</span>
                <span>FSSAI Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
