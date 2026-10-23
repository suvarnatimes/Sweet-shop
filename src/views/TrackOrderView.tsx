import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatInr, WHATSAPP_PHONE } from '../utils/ecommerce';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  ExternalLink,
  ChefHat,
  Sparkles,
} from 'lucide-react';

export const TrackOrderView: React.FC = () => {
  const { orders } = useCart();
  const [searchInput, setSearchInput] = useState('TR-1951-8291');
  const [activeOrder, setActiveOrder] = useState(() => orders[0]);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.orderId.toUpperCase() === query ||
        o.customer.phone.replace(/\D/g, '') === query.replace(/\D/g, '') ||
        o.trackingNumber.toUpperCase() === query
    );
    setActiveOrder(found || null);
    setHasSearched(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Grand 3D Dispatch Hero */}
      <div className="relative bg-gradient-to-r from-[#240F16] via-[#1A0A10] to-[#12050A] text-white rounded-3xl border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Kolam Watermark */}
        <div className="absolute inset-0 kolam-pattern opacity-10 pointer-events-none" />
        
        {/* Ambient Backlight */}
        <div className="absolute top-0 right-1/4 -mt-20 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 rounded-full bg-[#881337]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-950/40 to-transparent px-3 py-1 rounded-xl border border-amber-500/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-200 text-xs font-mono font-bold tracking-wider uppercase">
              LIVE DISPATCH // MACHILIPATNAM CORRIDOR
            </span>
          </div>

          <h1 className="font-serif-luxury text-2xl sm:text-4xl font-black text-white tracking-tight">
            Track Your Fresh Sweet <span className="gold-metallic-text">Consignment</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
            Monitor the journey of your freshly packed sweets from our 1951 Fort Road kitchen straight to your doorstep via priority cold-barrier transit.
          </p>

          {/* Express Corridor Route Badge */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-amber-300">
            <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">🏛️ Bandar Kitchen</span>
            <span>➔</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✈️ Air Cargo Hub</span>
            <span>➔</span>
            <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/40 font-bold">🏠 Your Doorstep</span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (e.g. TR-1951-8291) or Phone..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-amber-300 focus:outline-none focus:border-[#881337] bg-white text-sm font-semibold text-stone-900 shadow-sm uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
          >
            Track Status
          </button>
        </form>

        {/* Quick Demo Pre-fill Pill */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-stone-500">
          <span>Recent demo consignment:</span>
          <button
            onClick={() => {
              setSearchInput('TR-1951-8291');
              setActiveOrder(orders[0]);
            }}
            className="text-[#881337] font-bold hover:underline"
          >
            TR-1951-8291 (Hyderabad Air Express)
          </button>
        </div>
      </div>

      {/* Active Order Tracking Result */}
      {activeOrder ? (
        <div className="bg-white rounded-3xl border border-amber-200/90 shadow-lg overflow-hidden animate-in fade-in duration-300">
          {/* Top Banner */}
          <div className="p-6 bg-gradient-to-r from-amber-50 via-rose-50/40 to-amber-50 border-b border-amber-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#881337]">
                  Order #{activeOrder.orderId}
                </span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {activeOrder.status}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Placed on: {activeOrder.date} • Customer: {activeOrder.customer.fullName}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-left md:text-right">
                <span className="text-stone-500 block">Courier Carrier:</span>
                <span className="font-bold text-stone-900">{activeOrder.courierName}</span>
              </div>
              <div className="text-left md:text-right">
                <span className="text-stone-500 block">Estimated Arrival:</span>
                <span className="font-bold text-emerald-700">{activeOrder.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Visual Milestones Stepper */}
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-stone-900 mb-6">
                Live Shipment Milestones
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-amber-200">
                {activeOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        step.completed
                          ? 'bg-emerald-700 text-white ring-4 ring-emerald-100'
                          : step.current
                          ? 'bg-[#881337] text-white ring-4 ring-rose-100 animate-pulse'
                          : 'bg-white text-stone-400 border-2 border-stone-300'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <h4
                          className={`text-sm font-bold ${
                            step.completed || step.current ? 'text-stone-900' : 'text-stone-400'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-medium text-stone-500">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consignment Items & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-amber-100">
              {/* Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Consignment Contents ({activeOrder.items.length} items)
                </h4>
                <div className="space-y-2">
                  {activeOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/80 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-amber-200"
                        />
                        <div>
                          <span className="font-bold text-stone-900">{item.name}</span>
                          <div className="text-[10px] text-stone-500">
                            Pack: {item.weight} × {item.quantity}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-[#881337]">
                        {formatInr(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Destination Details
                </h4>
                <div className="p-4 bg-white rounded-xl border border-amber-200 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-stone-900">{activeOrder.customer.fullName}</div>
                      <p className="text-stone-600">{activeOrder.customer.addressLine}</p>
                      <p className="text-stone-600">
                        {activeOrder.customer.city}, {activeOrder.customer.state} - {activeOrder.customer.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Carrier AWB Tracking:</span>
                    <span className="font-mono font-bold text-stone-900">{activeOrder.trackingNumber}</span>
                  </div>
                </div>

                {/* WhatsApp Help CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hi Thatha Rao Sweets, I am checking status on my Order #${activeOrder.orderId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Connect with Dispatch Desk on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-amber-200">
          <p className="text-stone-600 text-sm mb-4">
            No order found matching "{searchInput}". Please double check your 10-digit mobile number or Order ID.
          </p>
          <button
            onClick={() => {
              setSearchInput('TR-1951-8291');
              setActiveOrder(orders[0]);
            }}
            className="px-5 py-2.5 bg-[#881337] text-white font-bold text-xs uppercase tracking-wider rounded-xl"
          >
            Load Sample Hyderabad Consignment
          </button>
        </div>
      ) : null}
    </div>
  );
};
