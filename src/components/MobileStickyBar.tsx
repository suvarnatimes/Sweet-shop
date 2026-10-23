import React from 'react';
import { useCart } from '../context/CartContext';
import { formatInr, generateWhatsAppOrderUrl } from '../utils/ecommerce';
import { ShoppingBag, ArrowRight, PhoneCall } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { items, totals, openCart, navigateTo, activePincode, pincodeInfo, currentView } = useCart();

  if (items.length === 0 || currentView === 'checkout') {
    return null;
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-amber-300 p-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        {/* Cart preview */}
        <button
          onClick={openCart}
          className="flex items-center gap-2 text-left focus:outline-none flex-shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#881337]">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#881337] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
              Cart Total
            </div>
            <div className="text-sm font-black text-[#881337]">
              {formatInr(totals.total)}
            </div>
          </div>
        </button>

        {/* Action CTAs */}
        <div className="flex items-center gap-1.5 flex-1 justify-end">
          <a
            href={generateWhatsAppOrderUrl(items, { pincode: activePincode, city: pincodeInfo?.city })}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center justify-center"
            title="Order on WhatsApp"
            aria-label="Order on WhatsApp"
          >
            <PhoneCall className="w-4 h-4" />
          </a>

          <button
            onClick={() => navigateTo('checkout')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98"
          >
            <span>Checkout Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
