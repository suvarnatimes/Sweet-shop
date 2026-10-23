import React, { useState } from 'react';
import { Product, WeightVariant } from '../types';
import { useCart } from '../context/CartContext';
import { formatInr, generateWhatsAppOrderUrl } from '../utils/ecommerce';
import { Award, ShoppingBag, Star, PhoneCall, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, openCart, navigateTo, activePincode, pincodeInfo } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<WeightVariant>('500g');
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = product.pricePerWeight[selectedWeight] || product.basePrice250g;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedWeight, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleWhatsAppQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const tempCartItem = {
      id: `${product.id}_${selectedWeight}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      teluguName: product.teluguName,
      weight: selectedWeight,
      unitPrice: currentPrice,
      quantity: 1,
      image: product.images[0],
    };
    const url = generateWhatsAppOrderUrl([tempCartItem], {
      pincode: activePincode,
      city: pincodeInfo?.city,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const weights: WeightVariant[] = ['250g', '500g', '1kg', '2kg'];

  return (
    <div
      onClick={() => navigateTo('product', product.slug)}
      className="group bg-white rounded-2xl border border-amber-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1.5"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-amber-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isGiTagged && (
            <span className="inline-flex items-center gap-1 bg-[#881337] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase tracking-wide border border-amber-300">
              <Award className="w-3 h-3 text-amber-300" />
              GI Tagged (Bandar)
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#D97706] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-200" />
              Best Seller
            </span>
          )}
        </div>

        {/* Rating pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-[10px] text-stone-500 font-normal">({product.reviewCount})</span>
        </div>

        {/* Shelf life pill */}
        <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded-md">
          {product.shelfLifeDays} Days Shelf Life
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#881337] transition-colors leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-amber-800 font-semibold mt-0.5">
                {product.teluguName}
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Sweetener & Ghee Attribute Tag */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
            <span className="bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md font-medium">
              {product.sweetener}
            </span>
            <span className="bg-rose-50 text-[#881337] border border-rose-200/80 px-2 py-0.5 rounded-md font-medium">
              Pure Cow Ghee
            </span>
          </div>

          {/* Weight Variant Selector Pills */}
          <div className="mt-4" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
              Select Pack Size:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {weights.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`py-1 text-xs font-semibold rounded-lg border transition-all text-center ${
                    selectedWeight === w
                      ? 'border-[#881337] bg-[#881337] text-white shadow-xs'
                      : 'border-amber-200 bg-amber-50/50 text-stone-700 hover:border-amber-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-5 pt-3 border-t border-amber-100 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-stone-500 font-medium">Price ({selectedWeight}):</span>
              <div className="text-lg sm:text-xl font-black text-[#881337] tracking-tight">
                {formatInr(currentPrice)}
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Fresh Daily Batch
            </span>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#881337] hover:bg-[#70102d] text-white active:scale-97'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppQuickBuy}
              className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition-colors"
              title="Instant WhatsApp Order"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
