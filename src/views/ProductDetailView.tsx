import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { WeightVariant, ProductReview } from '../types';
import { formatInr, generateWhatsAppOrderUrl } from '../utils/ecommerce';
import {
  Award,
  Sparkles,
  Star,
  ShoppingBag,
  PhoneCall,
  Check,
  ShieldCheck,
  Clock,
  Heart,
  ArrowLeft,
  Gift,
  Flame,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductSlug,
    addItem,
    navigateTo,
    activePincode,
    pincodeInfo,
    includeGiftCard,
    setIncludeGiftCard,
    giftCardMessage,
    setGiftCardMessage,
    showToast,
  } = useCart();

  const product = PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];

  const [selectedWeight, setSelectedWeight] = useState<WeightVariant>('500g');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'story' | 'reviews'>('specs');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Review Form State
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([
    {
      id: 'rev-p1',
      author: 'Subba Rao Patnaik',
      rating: 5,
      date: '18 Oct 2026',
      location: 'Vijayawada',
      comment:
        'The distinct boondi pounding process gives Thatha Rao’s Bandar Laddu that unbelievable silky melt. Pure cow ghee fragrance hits you as soon as you tear the vacuum pack!',
      verified: true,
    },
    {
      id: 'rev-p2',
      author: 'Ananya Sharma',
      rating: 5,
      date: '10 Oct 2026',
      location: 'Hyderabad',
      comment:
        'Received in Hyderabad the very next day. Perfect packaging, zero breakage. Ordered 2kg for my parents and they felt nostalgic!',
      verified: true,
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const currentPrice = product.pricePerWeight[selectedWeight] || product.basePrice250g;
  const packVariants: WeightVariant[] = ['250g', '500g', '1kg', '2kg', '5kg'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addItem(product, selectedWeight, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleWhatsAppBuy = () => {
    const tempItem = {
      id: `${product.id}_${selectedWeight}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      teluguName: product.teluguName,
      weight: selectedWeight,
      unitPrice: currentPrice,
      quantity,
      image: product.images[selectedImageIndex] || product.images[0],
    };

    const url = generateWhatsAppOrderUrl([tempItem], {
      pincode: activePincode,
      city: pincodeInfo?.city,
      includeGiftCard,
      giftCardMessage: includeGiftCard ? giftCardMessage : undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewLocation.trim() || 'India',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewComment('');
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-[#881337]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('shop')} className="hover:text-[#881337]">
          Sweets Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 font-bold truncate">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery with Loupe Zoom */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 to-[#220B13] border-4 border-amber-400/80 shadow-[0_25px_50px_rgba(40,10,5,0.35)] cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 filter contrast-[1.04]"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isZoomed ? 'scale(2.0)' : 'scale(1)',
              }}
            />

            {/* Top Heritage Medallion */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
              {product.isGiTagged && (
                <div className="bg-[#881337]/95 backdrop-blur-md text-amber-200 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xl uppercase tracking-wide border-2 border-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>GI Protected • {product.giTagNumber}</span>
                </div>
              )}
              <div className="bg-stone-950/85 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/40 w-fit">
                Estd. 1951 Machilipatnam
              </div>
            </div>

            {/* Loupe Zoom Helper Indicator */}
            <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-md text-amber-200 text-xs px-3.5 py-1.5 rounded-xl border border-amber-400/40 flex items-center gap-1.5 pointer-events-none shadow-lg">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Hover photo to inspect texture</span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#881337] ring-2 ring-amber-300 shadow-md'
                      : 'border-amber-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Purity Assurance Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-center">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#881337] mx-auto" />
              <div className="text-[11px] font-bold text-stone-900">100% Pure Ghee</div>
              <div className="text-[10px] text-stone-500">Zero Artificial Fats</div>
            </div>
            <div className="space-y-1 border-x border-amber-200">
              <Clock className="w-5 h-5 text-[#D97706] mx-auto" />
              <div className="text-[11px] font-bold text-stone-900">{product.shelfLifeDays} Days Shelf Life</div>
              <div className="text-[10px] text-stone-500">Vacuum Nitrogen Pack</div>
            </div>
            <div className="space-y-1">
              <Sparkles className="w-5 h-5 text-emerald-700 mx-auto" />
              <div className="text-[11px] font-bold text-stone-900">Slow Handcrafted</div>
              <div className="text-[10px] text-stone-500">Machilipatnam Kitchen</div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs, Pack Selector & Buying Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                Estd. 1951 • Sri Thatha Rao
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-stone-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-500 font-normal">({product.reviewCount} Reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-4xl font-black text-stone-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-base sm:text-lg font-bold text-amber-800 mt-1">
              {product.teluguName}
            </p>

            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pack Size Selector Radio Pills */}
          <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Select Pack Weight:
              </label>
              <span className="text-xs text-amber-900 font-medium">
                {selectedWeight === '5kg' ? 'Bulk Festive Box (15% Savings)' : 'Vacuum Foil Sealed'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {packVariants.map((weight) => (
                <button
                  key={weight}
                  type="button"
                  onClick={() => setSelectedWeight(weight)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all ${
                    selectedWeight === weight
                      ? 'border-[#881337] bg-[#881337] text-white shadow-sm ring-2 ring-amber-300'
                      : 'border-amber-200 bg-amber-50/50 text-stone-700 hover:border-amber-400'
                  }`}
                >
                  <div>{weight}</div>
                  <div className="text-[10px] font-normal opacity-90">
                    {formatInr(product.pricePerWeight[weight] || 0)}
                  </div>
                </button>
              ))}
            </div>

            {/* Price Display */}
            <div className="pt-2 flex items-baseline justify-between border-t border-amber-100">
              <div>
                <span className="text-xs text-stone-500">Total Price for {selectedWeight}:</span>
                <div className="text-2xl sm:text-3xl font-black text-[#881337]">
                  {formatInr(currentPrice * quantity)}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-amber-300 rounded-xl bg-amber-50/50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center font-bold text-stone-700 hover:text-[#881337]"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-stone-700 hover:text-[#881337]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Gifting / Card Message Option */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50/50 rounded-2xl border border-amber-300">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGiftCard}
                onChange={(e) => setIncludeGiftCard(e.target.checked)}
                className="mt-1 rounded text-[#881337] focus:ring-[#881337]"
              />
              <div className="text-xs">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#881337]" />
                  <span>Send as a Festival Gift with Handwritten Greeting Card (+₹49)</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  We write your personalized greeting on our gold-embossed Thatha Rao heritage postcard.
                </p>
              </div>
            </label>

            {includeGiftCard && (
              <div className="mt-3">
                <textarea
                  value={giftCardMessage}
                  onChange={(e) => setGiftCardMessage(e.target.value)}
                  placeholder="Enter greeting message for the recipient..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-300 bg-white focus:outline-none focus:border-[#881337]"
                />
              </div>
            )}
          </div>

          {/* Action CTA Buttons */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#881337] hover:bg-[#70102d] text-white active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatInr(currentPrice * quantity)})</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="py-3.5 px-4 rounded-xl font-semibold text-xs bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>1-Click Order on WhatsApp</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-500 text-center">
              🚚 Delivery to {pincodeInfo?.city || 'Your Area'} ({activePincode}): {pincodeInfo?.standardDays || '24-48 hrs'}
            </p>
          </div>
        </div>
      </div>

      {/* Product Deep Dive Tabs: Specifications, Craft Story, Customer Reviews */}
      <div className="bg-white rounded-3xl border border-amber-200/90 shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-amber-200 bg-amber-50/50">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'specs'
                ? 'border-b-2 border-[#881337] text-[#881337] bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Product Specifications & Nutrition
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'story'
                ? 'border-b-2 border-[#881337] text-[#881337] bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            The 1951 Craft Story
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-[#881337] text-[#881337] bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Reviews ({reviewsList.length + product.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ingredients & Storage */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-base font-bold text-stone-900 mb-3">
                    Ingredients List
                  </h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#881337] mt-1.5 flex-shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-base font-bold text-stone-900 mb-2">
                    Storage & Serving Instructions
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {product.storageInstructions}
                  </p>
                </div>
              </div>

              {/* Nutritional Table */}
              <div className="space-y-4">
                <h3 className="font-serif-luxury text-base font-bold text-stone-900">
                  Nutritional Values (Per 100g Serving)
                </h3>
                <div className="border border-amber-200 rounded-xl overflow-hidden divide-y divide-amber-100 text-xs">
                  <div className="flex justify-between p-2.5 bg-amber-50 font-semibold text-stone-900">
                    <span>Energy</span>
                    <span>{product.nutrition.caloriesPer100g} kcal</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-white text-stone-700">
                    <span>Pure Desi Ghee Content</span>
                    <span className="font-bold text-[#881337]">
                      {product.nutrition.pureDesiGheePercent}%
                    </span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-amber-50/50 text-stone-700">
                    <span>Protein</span>
                    <span>{product.nutrition.proteinG} g</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-white text-stone-700">
                    <span>Total Healthy Fats</span>
                    <span>{product.nutrition.fatG} g</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-amber-50/50 text-stone-700">
                    <span>Carbohydrates</span>
                    <span>{product.nutrition.carbsG} g</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-400">
                  * Values tested by NABL accredited food lab under FSSAI Standards.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                The Heritage of {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {product.heritageStory}
              </p>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Geographical Indication Registry Note:</strong> Bandar Laddu was awarded the prestigious GI status by the Government of India in recognition of the unique boondi-pounding technique created and maintained by the sweet artisans of Machilipatnam, Krishna District.
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                <h3 className="font-serif-luxury text-base font-bold text-stone-900">
                  Customer Testimonials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 bg-amber-50/40 rounded-xl border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-stone-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-stone-700 italic mb-2">"{rev.comment}"</p>
                      <div className="text-[11px] font-bold text-stone-900">
                        {rev.author} • <span className="text-stone-500 font-normal">{rev.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Submission Form */}
              <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-200 max-w-xl">
                <h4 className="font-serif-luxury text-base font-bold text-stone-900 mb-1">
                  Share Your Tasting Experience
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  Have you savored this sweet? Leave your feedback for fellow food lovers.
                </p>

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                    />
                    <input
                      type="text"
                      placeholder="City (e.g. Hyderabad)"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the ghee aroma, texture, and taste..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-200 bg-white"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#881337] hover:bg-[#70102d] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
