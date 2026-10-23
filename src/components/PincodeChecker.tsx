import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { checkPincodeDelivery } from '../utils/ecommerce';
import { MapPin, CheckCircle2, Truck, Sparkles, Clock, AlertCircle } from 'lucide-react';

export const PincodeChecker: React.FC = () => {
  const { activePincode, setPincode, pincodeInfo } = useCart();
  const [inputVal, setInputVal] = useState(activePincode);
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim().length === 6) {
      setPincode(inputVal.trim());
      setChecked(true);
    }
  };

  const currentResult = checkPincodeDelivery(inputVal);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#881337] uppercase tracking-wider bg-rose-100/70 px-2.5 py-1 rounded-full">
              <Truck className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Direct Pan-India Dispatch from Machilipatnam</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
              Check Express Delivery to Your Doorstep
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              24-Hour Express across Hyderabad, Vijayawada & AP/TG • 48-72 Hours Pan-India in vacuum sealed packaging.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-auto flex-shrink-0 flex flex-col sm:flex-row gap-2"
          >
            <div className="relative">
              <MapPin className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                maxLength={6}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value.replace(/\D/g, ''));
                  setChecked(false);
                }}
                placeholder="6-digit Pincode"
                className="w-full sm:w-48 pl-10 pr-3 py-2.5 rounded-xl border border-amber-300 focus:border-[#881337] focus:outline-none bg-white font-medium text-sm text-stone-900 shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={inputVal.trim().length !== 6}
              className="px-5 py-2.5 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors disabled:opacity-50 shadow-sm"
            >
              Verify Pincode
            </button>
          </form>
        </div>

        {/* Results Banner */}
        {inputVal.length === 6 && (
          <div className="mt-5 p-4 bg-white rounded-xl border border-amber-200/90 shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">
                      Pincode {inputVal} is Fully Serviced
                    </span>
                    {currentResult.expressAvailable && (
                      <span className="bg-amber-100 text-[#881337] border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        ⚡ 24-Hr Express Route
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Destination: <strong className="text-stone-800">{currentResult.city || 'India'}, {currentResult.state}</strong>
                  </p>
                  <p className="text-xs text-emerald-800 font-medium mt-1">
                    {currentResult.standardDays}
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-amber-100 sm:pl-4">
                <span className="text-[11px] text-stone-500 block">Orders over ₹999</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                  FREE Pan-India Shipping
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
