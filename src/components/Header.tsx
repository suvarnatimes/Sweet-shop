import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { formatInr, WHATSAPP_PHONE } from '../utils/ecommerce';
import { Logo } from './Logo';
import {
  ShoppingBag,
  Search,
  MapPin,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  Award,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    items,
    totals,
    openCart,
    badgeAnimate,
    currentView,
    navigateTo,
    activePincode,
    pincodeInfo,
    setPincode,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(activePincode);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Search filter
  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.teluguName.includes(searchTerm) ||
          p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      setPincode(tempPincode.trim());
      setPincodeModalOpen(false);
    }
  };

  return (
    <>
      {/* 1. Dynamic Announcement Bar */}
      <div className="bg-[#881337] text-[#FFFBEB] text-xs py-2 px-4 shadow-inner relative z-30 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1 bg-[#D97706]/30 text-amber-200 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase">
              <Award className="w-3 h-3 text-amber-300" />
              GI Tag No. 438
            </span>
            <span className="truncate">
              Shipping Fresh Batches Across Hyderabad, Vijayawada, Bangalore & Pan-India • Free Delivery on orders over ₹999!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-amber-100 flex-shrink-0">
            <span className="opacity-90">75 ఏళ్ళ స్వచ్ఛమైన నెయ్యి సాంప్రదాయం (Estd. 1951)</span>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Namaste Thatha Rao Sweets! I have a question about delivery.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
            >
              <PhoneCall className="w-3 h-3 text-green-300" />
              <span>WhatsApp: +91 91777 77296</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header
        className={`sticky top-0 z-20 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-[#FFFDF7]/95 shadow-md border-b border-amber-200/80 py-2.5'
            : 'bg-[#FFFDF7] border-b border-amber-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Heritage Crest */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
              aria-label="Thatha Rao Sweets Home"
            >
              <Logo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium text-[#29150B]/85">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'text-[#881337] font-semibold bg-amber-100/60'
                    : 'hover:text-[#881337] hover:bg-amber-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'shop'
                    ? 'text-[#881337] font-semibold bg-amber-100/60'
                    : 'hover:text-[#881337] hover:bg-amber-50'
                }`}
              >
                Shop All Sweets
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'about'
                    ? 'text-[#881337] font-semibold bg-amber-100/60'
                    : 'hover:text-[#881337] hover:bg-amber-50'
                }`}
              >
                Our 75-Yr Legacy
              </button>
              <button
                onClick={() => navigateTo('track')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'track'
                    ? 'text-[#881337] font-semibold bg-amber-100/60'
                    : 'hover:text-[#881337] hover:bg-amber-50'
                }`}
              >
                Track Order
              </button>
            </nav>

            {/* Action Bar: Search, Pincode, Cart, Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Pincode Selector Pill */}
              <button
                onClick={() => setPincodeModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-full border border-amber-300 bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 transition-colors"
                title="Change delivery location"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-semibold">{activePincode}</span>
                <span className="text-[#29150B]/60 max-w-[80px] truncate">
                  {pincodeInfo?.city || 'Select'}
                </span>
                <ChevronDown className="w-3 h-3 text-amber-700" />
              </button>

              {/* Search Icon Trigger */}
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen) {
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }
                }}
                className="p-2 text-stone-700 hover:text-[#881337] hover:bg-amber-100/60 rounded-full transition-colors relative"
                aria-label="Search Sweets"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-sm ${
                  badgeAnimate
                    ? 'scale-105 bg-[#881337] text-white ring-4 ring-amber-300'
                    : 'bg-[#881337] hover:bg-[#70102d] text-white'
                }`}
                aria-label={`Shopping Cart with ${totalItemCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {totalItemCount > 0 && (
                    <span
                      className={`absolute -top-2 -right-2 bg-[#D97706] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#881337] ${
                        badgeAnimate ? 'animate-bounce' : ''
                      }`}
                    >
                      {totalItemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block font-sans">
                  {totalItemCount > 0 ? formatInr(totals.subtotal) : 'Cart'}
                </span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-stone-800 hover:text-[#881337] rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Dropdown / Bar */}
          {searchOpen && (
            <div className="mt-3 relative pt-1 pb-2">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-amber-600 absolute left-3.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Bandar Laddu, Halwa, Bellam Jalebi, Cashew Pakam, Mixture..."
                  className="w-full pl-11 pr-10 py-2.5 rounded-xl border-2 border-amber-300 bg-white focus:outline-none focus:border-[#881337] text-sm shadow-sm text-stone-900 placeholder-stone-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Autocomplete Results */}
              {searchTerm.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-amber-200 z-50 max-h-80 overflow-y-auto p-2">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-amber-100">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchTerm('');
                            navigateTo('product', product.slug);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-amber-50/80 rounded-lg cursor-pointer transition-colors"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md border border-amber-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-stone-900 truncate">
                                {product.name}
                              </h4>
                              <span className="text-sm font-bold text-[#881337]">
                                {formatInr(product.basePrice250g)}
                                <span className="text-[11px] font-normal text-stone-500"> / 250g</span>
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 font-medium">{product.teluguName}</p>
                            <p className="text-xs text-stone-500 truncate">{product.tagline}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-stone-500">
                      No sweets found matching "{searchTerm}". Try "Laddu", "Halwa", or "Mixture".
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-amber-200 bg-[#FFFDF7] px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="flex items-center justify-between py-2 border-b border-amber-100">
              <div className="flex items-center gap-2 text-xs text-amber-900">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>Delivery Pincode: </span>
                <span className="font-bold">{activePincode}</span>
                <span className="text-stone-500">({pincodeInfo?.city || 'AP'})</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPincodeModalOpen(true);
                }}
                className="text-xs text-[#881337] font-semibold underline"
              >
                Change
              </button>
            </div>

            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('home');
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-800 hover:bg-amber-50"
              >
                <span>Home Showcase</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('shop');
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-800 hover:bg-amber-50"
              >
                <span>Shop All Sweets & Savouries</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('about');
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-800 hover:bg-amber-50"
              >
                <span>The 75-Year Bandar Heritage</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('track');
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-800 hover:bg-amber-50"
              >
                <span>Track Your Consignment</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
            </nav>

            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Namaste Thatha Rao Sweets! I would like to place an order via WhatsApp.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-800 transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Order on WhatsApp (+91 91777 77296)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Pincode Selector Modal */}
      {pincodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#881337]">
                <MapPin className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-serif-luxury text-lg font-bold">Check Delivery to Your Area</h3>
              </div>
              <button
                onClick={() => setPincodeModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              We deliver fresh batches daily from Machilipatnam. Enter your 6-digit pin code for estimated delivery timelines and express eligibility.
            </p>

            <form onSubmit={handlePincodeSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 500081)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 focus:border-[#881337] focus:outline-none text-base font-medium text-stone-900 tracking-wider"
                  autoFocus
                />
              </div>

              {tempPincode.length === 6 && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Delivery to: {checkPincodeDelivery(tempPincode).city || 'India'}, {checkPincodeDelivery(tempPincode).state}
                  </div>
                  <p className="mt-1 text-stone-600">
                    {checkPincodeDelivery(tempPincode).standardDays}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPincodeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tempPincode.length !== 6}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#881337] hover:bg-[#70102d] text-white rounded-xl disabled:opacity-50 transition-colors shadow"
                >
                  Set Delivery Pincode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
