import React from 'react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_PHONE } from '../utils/ecommerce';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  Truck,
  Heart,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useCart();

  return (
    <footer className="bg-[#29150B] text-amber-100 pt-14 pb-8 border-t-4 border-[#D97706] relative overflow-hidden">
      {/* Decorative Traditional Rangoli / Kolam Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D97706] via-amber-300 to-[#881337]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-amber-900/60">
          {/* Brand & Heritage Story Column */}
          <div className="space-y-4">
            <Logo size="md" showText={true} />

            <p className="text-xs text-amber-200/80 leading-relaxed">
              Established in 1951 in Godugupet, Machilipatnam. Pioneer of the world-famous
              GI-tagged Bandar Laddu and melt-in-mouth Bandar Halwa, slow-cooked in pure desi cow ghee for over 75 years.
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-[#881337] text-amber-200 text-[11px] px-2.5 py-1 rounded-full border border-amber-500/30 font-medium">
                <Award className="w-3 h-3 text-amber-400" />
                GI Tag No. 438
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-950/80 text-amber-300 text-[11px] px-2.5 py-1 rounded-full border border-amber-600/40 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                FSSAI Lic. 10114018000123
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/80">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home & Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-amber-400 transition-colors"
                >
                  GI Special Bandar Sweets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  The Bandar Heritage Story (1951)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('track')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Track Consignment / Courier
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Thatha Rao Sweets, I want to inquire about bulk wedding / festive order discounts.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Bulk Wedding & Festive Gifting</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Freshness & Quality Promise */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300 uppercase tracking-wider">
              Our 4 Sacred Vows
            </h4>
            <div className="space-y-2.5 text-xs text-amber-200/80">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded bg-amber-900/60 text-amber-400 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-white">100% Pure Desi Cow Ghee:</span> No dalda,
                  no margarine, no cheap palm blends.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded bg-amber-900/60 text-amber-400 flex-shrink-0 mt-0.5">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-white">Zero Artificial Preservatives:</span> Sweetness
                  preserved naturally through traditional slow sugar/jaggery cooking.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded bg-amber-900/60 text-amber-400 flex-shrink-0 mt-0.5">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-white">Export-Grade Air Vacuum Pack:</span> Sealed in
                  multi-barrier foil packs ensuring crunch and aroma for 25+ days.
                </div>
              </div>
            </div>
          </div>

          {/* Original Store Address & Machilipatnam Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300 uppercase tracking-wider">
              Machilipatnam Flagship
            </h4>
            <div className="space-y-2.5 text-xs text-amber-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    Sri Lakshmi Satyanarayana Thatha Rao Sweets
                  </p>
                  <p>Fort Road, Godugupet,</p>
                  <p>Machilipatnam (Bandar), Krishna Dist,</p>
                  <p>Andhra Pradesh - 521001, India</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span>WhatsApp & Helpline: </span>
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE}`}
                    className="text-amber-300 font-bold hover:underline"
                  >
                    +91 91777 77296
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Kitchen Timings: 7:00 AM – 10:00 PM Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/60 gap-4">
          <p>
            © 1951 – 2026 Sri Lakshmi Satyanarayana Thatha Rao Sweets. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Refund & Freshness Guarantee</span>
            <span>•</span>
            <span>GI Registry Certificate No. 438</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
