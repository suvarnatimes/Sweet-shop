import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, SweetenerType, SweetnessLevel } from '../types';
import { Filter, SlidersHorizontal, Sparkles, X, RotateCcw, Search } from 'lucide-react';

export const ShopView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedSweetness, setSelectedSweetness] = useState<string>('all');
  const [selectedSweetener, setSelectedSweetener] = useState<string>('all');
  const [minShelfLife, setMinShelfLife] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Delicacies', count: PRODUCTS.length },
    { id: 'gi-special', label: 'GI Special Bandar Sweets', count: PRODUCTS.filter((p) => p.category === 'gi-special').length },
    { id: 'desi-ghee', label: 'Pure Desi Ghee Sweets', count: PRODUCTS.filter((p) => p.category === 'desi-ghee').length },
    { id: 'dry-fruit', label: 'Dry Fruit & Cashew Sweets', count: PRODUCTS.filter((p) => p.category === 'dry-fruit').length },
    { id: 'traditional-savouries', label: 'Andhra Savouries & Mixture', count: PRODUCTS.filter((p) => p.category === 'traditional-savouries').length },
    { id: 'festival-boxes', label: 'Festival Gift Caskets', count: PRODUCTS.filter((p) => p.category === 'festival-boxes').length },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Sweetness
      if (selectedSweetness !== 'all' && p.sweetness !== selectedSweetness) return false;

      // Sweetener
      if (selectedSweetener !== 'all' && p.sweetener !== selectedSweetener) return false;

      // Shelf life
      if (minShelfLife > 0 && p.shelfLifeDays < minShelfLife) return false;

      // Search
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesTelugu = p.teluguName.includes(query);
        const matchesIng = p.ingredients.some((i) => i.toLowerCase().includes(query));
        if (!matchesName && !matchesTelugu && !matchesIng) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice250g - b.basePrice250g;
      if (sortBy === 'price-desc') return b.basePrice250g - a.basePrice250g;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedSweetness, selectedSweetener, minShelfLife, sortBy, searchFilter]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSweetness !== 'all' ||
    selectedSweetener !== 'all' ||
    minShelfLife > 0 ||
    searchFilter.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSweetness('all');
    setSelectedSweetener('all');
    setMinShelfLife(0);
    setSearchFilter('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Grand 3D Indian Heritage Catalog Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#240F16] via-[#1A0A10] to-[#12050A] text-white rounded-3xl border-2 border-amber-500/40 p-6 sm:p-10 lg:p-12 mb-8 sm:mb-12 shadow-2xl overflow-hidden">
        {/* Kolam Architectural Watermark */}
        <div className="absolute inset-0 kolam-pattern opacity-10 pointer-events-none" />

        {/* Ambient Warm Golden Backlight */}
        <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 rounded-full bg-[#881337]/40 blur-3xl pointer-events-none" />

        {/* Temple Cornice Top Gold Leaf Border */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Right Column (Platter): On top in mobile view */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer" onClick={() => setSelectedCategory('gi-special')}>
              {/* Outer Golden Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/40 to-[#881337]/40 rounded-full blur-xl group-hover:blur-2xl transition-all" />

              {/* 3D Brass Thali Image Pod */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-200 border-4 border-amber-300/80 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                <img
                  src="/images/sweets/bandar-laddu.jpg"
                  alt="Original Bandar Laddu"
                  className="w-full h-full object-cover rounded-full filter contrast-[1.05]"
                />
                
                {/* Floating 3D Badge */}
                <div className="absolute -bottom-2 -left-2 bg-stone-950/90 text-amber-300 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-amber-400 shadow-xl backdrop-blur-md">
                  ✨ Bandar Laddu • GI 438
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (Content): Below platter on mobile */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 text-center lg:text-left">
            {/* Royal Insignia Tag */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-950/40 to-transparent px-3 py-1.5 rounded-xl border border-amber-500/40 backdrop-blur-md">
              <span className="bg-amber-400 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                Estd. 1951
              </span>
              <span className="text-amber-200 text-xs font-bold tracking-wide">
                Sri Thatha Rao Confectionery Pantry • Machilipatnam
              </span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Authentic Bandar Sweets &{' '}
              <span className="gold-metallic-text">Savouries</span>
            </h1>

            <p className="text-sm font-semibold text-amber-300">
              శ్రీ తాతా రావు సంప్రదాయ మిఠాయిల భాండాగారం • 100% స్వచ్ఛమైన ఆవు నెయ్యి
            </p>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl font-normal">
              Freshly prepared each morning over traditional brass hearths using coastal cow ghee, hand-pounded boondi, and organic Krishna delta jaggery. Select your desired package variant from 250g personal boxes to 5kg celebration hampers.
            </p>

            {/* Live Dispatch Status Beacon */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FRESH BATCH COOKED TODAY: 06:00 AM</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <span>🛡️ GI REGISTRY NO. 438</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <div className="flex items-center gap-2 font-serif-luxury text-base font-bold text-stone-900">
                <SlidersHorizontal className="w-4 h-4 text-[#D97706]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#881337] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2.5">
                Sweet Categories
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#881337] text-white font-bold'
                        : 'text-stone-700 hover:bg-amber-50 font-medium'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness Level */}
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2.5">
                Sweetness Intensity
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'Mild', 'Medium', 'Rich', 'Savory'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSweetness(lvl)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                      selectedSweetness === lvl
                        ? 'border-[#881337] bg-[#881337] text-white font-bold'
                        : 'border-amber-200 bg-amber-50/50 text-stone-700 hover:border-amber-300'
                    }`}
                  >
                    {lvl === 'all' ? 'All' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetener Filter */}
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2.5">
                Sweetener Type
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Sweeteners' },
                  { id: 'Pure Bellam (Jaggery)', label: 'Pure Bellam (Organic Jaggery)' },
                  { id: 'Refined Sugar', label: 'Traditional Sugar' },
                  { id: 'Khandsari Unrefined Sugar', label: 'Khandsari Unrefined' },
                  { id: 'Savory (No Sugar)', label: 'Savory (Zero Sugar)' },
                ].map((sw) => (
                  <label key={sw.id} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-amber-50">
                    <input
                      type="radio"
                      name="sweetener"
                      checked={selectedSweetener === sw.id}
                      onChange={() => setSelectedSweetener(sw.id)}
                      className="text-[#881337] focus:ring-[#881337]"
                    />
                    <span className="text-stone-700">{sw.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Shelf Life Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                <span>Minimum Shelf Life</span>
                <span className="text-[#881337]">{minShelfLife > 0 ? `${minShelfLife}+ Days` : 'Any'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={45}
                step={15}
                value={minShelfLife}
                onChange={(e) => setMinShelfLife(Number(e.target.value))}
                className="w-full accent-[#881337] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Any</span>
                <span>15d</span>
                <span>30d</span>
                <span>45d</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Product Grid & Mobile Filter Bar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Controls: Search, Sort & Mobile Filter Toggle */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search within catalog */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by sweet name or ingredient..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-amber-200 focus:outline-none focus:border-[#881337] bg-white text-stone-900"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 text-xs font-semibold text-amber-900"
              >
                <Filter className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-stone-600 flex-1 sm:flex-initial justify-end">
                <span className="font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-amber-200 bg-white font-semibold text-stone-800 text-xs focus:outline-none focus:border-[#881337]"
                >
                  <option value="featured">Best Sellers & Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="text-stone-500 font-medium">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold">
                  Category: {categories.find((c) => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3 text-amber-800" />
                  </button>
                </span>
              )}
              {selectedSweetness !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold">
                  Sweetness: {selectedSweetness}
                  <button onClick={() => setSelectedSweetness('all')}>
                    <X className="w-3 h-3 text-amber-800" />
                  </button>
                </span>
              )}
              {selectedSweetener !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold">
                  Sweetener: {selectedSweetener}
                  <button onClick={() => setSelectedSweetener('all')}>
                    <X className="w-3 h-3 text-amber-800" />
                  </button>
                </span>
              )}
              {minShelfLife > 0 && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold">
                  Shelf Life: {minShelfLife}+ days
                  <button onClick={() => setMinShelfLife(0)}>
                    <X className="w-3 h-3 text-amber-800" />
                  </button>
                </span>
              )}
              {searchFilter && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold">
                  Search: "{searchFilter}"
                  <button onClick={() => setSearchFilter('')}>
                    <X className="w-3 h-3 text-amber-800" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#881337] hover:underline ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-amber-200">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-800 mb-2">
                No sweets matched your filter criteria
              </h3>
              <p className="text-xs text-stone-500 mb-6 max-w-sm mx-auto">
                Try clearing one of your filters or search keywords to view our full collection of Machilipatnam sweets.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#881337] text-white font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">Filter Sweets</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                Categories
              </label>
              <div className="grid grid-cols-1 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                    className={`text-left px-3 py-2 rounded-lg text-xs flex justify-between ${
                      selectedCategory === cat.id ? 'bg-[#881337] text-white font-bold' : 'bg-amber-50/70 text-stone-800'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span>({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness */}
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                Sweetness
              </label>
              <div className="flex flex-wrap gap-2">
                {['all', 'Mild', 'Medium', 'Rich', 'Savory'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSweetness(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedSweetness === lvl
                        ? 'bg-[#881337] text-white'
                        : 'border border-amber-200 bg-amber-50 text-stone-800'
                    }`}
                  >
                    {lvl === 'all' ? 'All' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Reset */}
            <div className="pt-4 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 border border-amber-300 rounded-xl text-xs font-bold text-stone-700"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#881337] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
