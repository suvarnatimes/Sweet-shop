import React, { useState, useRef, useCallback } from 'react';
import { Award, Sparkles, ChevronRight, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatInr } from '../utils/ecommerce';

interface SweetShowcase {
  id: string;
  slug: string;
  name: string;
  teluguName: string;
  tagline: string;
  desc: string;
  image: string;
  price250g: number;
  giTag: string;
  craftSecret: string;
  badge: string;
  accentColor: string;
}

const SWEET_SHOWCASES: SweetShowcase[] = [
  {
    id: 'laddu',
    slug: 'bandar-laddu',
    name: 'Original Bandar Laddu',
    teluguName: 'అసలైన బందరు లడ్డూ (తోక లడ్డూ)',
    tagline: '75-Yr Heritage Recipe • Protected GI Tag No. 438',
    desc: 'Crisp gram flour boondi pounded silky smooth on granite stone mortars, slow simmered in pure coastal cow ghee and hand-shaped into velvety, melt-in-mouth spheres.',
    image: '/images/sweets/bandar-laddu.jpg',
    price250g: 230,
    giTag: 'GI Registry No. 438',
    craftSecret: 'Stone-Mortar Pounded (రోలు బండ మర్దన)',
    badge: 'GI Tagged Masterpiece',
    accentColor: '#D97706',
  },
  {
    id: 'halwa',
    slug: 'bandar-halwa',
    name: 'Heritage Bandar Halwa',
    teluguName: 'రాచరికపు బందరు హల్వా',
    tagline: 'Simmered 6 Hours in Heavy Brass Uruli',
    desc: 'Hand-extracted milk of select wheat berries simmered continuously with pure desi ghee and caramelized sugar until translucent, chewy, and studded with roasted cashews.',
    image: '/images/sweets/bandar-halwa.jpg',
    price250g: 220,
    giTag: 'Royal Cauldron Recipe',
    craftSecret: '6-Hour Brass Simmer (ఇత్తడి బాండీ పాకం)',
    badge: 'Pure Desi Ghee Legend',
    accentColor: '#B45309',
  },
  {
    id: 'jalebi',
    slug: 'bellam-jalebi',
    name: 'Coastal Bellam Jalebi',
    teluguName: 'స్వచ్ఛమైన తీపి బెల్లం జిలేబీ',
    tagline: 'Crisp Coils in Pure Krishna Cane Jaggery',
    desc: 'Golden fried coils dipped in thick, cardamom-steeped organic jaggery syrup for an unforgettable crunch bursting with warm nectar.',
    image: '/images/sweets/bellam-jalebi.jpg',
    price250g: 190,
    giTag: 'Unrefined Cane Jaggery',
    craftSecret: 'Wood-Pressed Cane Jaggery (చెరకు బెల్లం)',
    badge: 'No White Sugar',
    accentColor: '#92400E',
  },
  {
    id: 'pakam',
    slug: 'jeedipappu-pakam',
    name: 'Shahi Jeedipappu Pakam',
    teluguName: 'ఘుమఘుమలాడే జీడిపప్పు పాకం',
    tagline: 'Whole Roasted Cashews in Caramelized Jaggery',
    desc: 'Select whole cashew nuts from the Godavari belt roasted in pure ghee and bound in sticky, aromatic cardamom-spiced jaggery caramel.',
    image: '/images/sweets/jeedipappu-pakam.jpg',
    price250g: 280,
    giTag: 'Gold Standard Andhra Sweet',
    craftSecret: 'Jumbo W240 Cashews in Jaggery',
    badge: 'Festival Special',
    accentColor: '#78350F',
  },
];

export const Hero3DThali: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotateX, setRotateX] = useState(8);
  const [rotateY, setRotateY] = useState(-6);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateTo, addToCart } = useCart();

  const activeSweet = SWEET_SHOWCASES[selectedIndex];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0 to width
    const y = e.clientY - rect.top; // 0 to height

    // Normalize -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Calculate subtle 3D tilt
    setRotateX(-normY * 14 + 6); // tilt down/up
    setRotateY(normX * 18); // tilt left/right
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(8);
    setRotateY(-6);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div className="w-full relative select-none">
      {/* 3D Visual Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-1000 py-4 px-2 sm:px-6 cursor-grab active:cursor-grabbing"
      >
        {/* Ambient Backlight Glow - Warm Temple Brass & Ghee Radiance */}
        <div
          className="absolute inset-0 m-auto w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60"
          style={{
            background: `radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.25) 45%, rgba(136, 19, 55, 0.15) 75%, transparent 100%)`,
            transform: `translate(${rotateY * 2}px, ${-rotateX * 2}px)`,
          }}
        />

        {/* 3D Angled Plinth & Brass Thali Presentation */}
        <div
          className="relative preserve-3d transition-transform duration-300 ease-out mx-auto max-w-lg"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          }}
        >
          {/* Floor Contact Deep Cast Shadow */}
          <div
            className="w-[85%] h-14 mx-auto rounded-full blur-xl bg-stone-950/40 pointer-events-none transition-all duration-300"
            style={{
              transform: `translateY(340px) scaleX(${1 + Math.abs(rotateY) * 0.01})`,
            }}
          />

          {/* Traditional Embossed Brass Thali (Plate) Presentation */}
          <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[420px] mx-auto flex items-center justify-center">
            {/* SVG Ornate Chased Brass Thali Base */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full drop-shadow-[0_20px_35px_rgba(40,10,5,0.45)] pointer-events-none z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Brass Plate Outer Rim Gradient */}
                <radialGradient id="brassOuterRim" cx="45%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="25%" stopColor="#E6B34A" />
                  <stop offset="55%" stopColor="#B67B18" />
                  <stop offset="85%" stopColor="#824E05" />
                  <stop offset="100%" stopColor="#4A2600" />
                </radialGradient>

                {/* Brass Inner Rim Groove */}
                <linearGradient id="brassGroove" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3E1E00" />
                  <stop offset="50%" stopColor="#875308" />
                  <stop offset="100%" stopColor="#2A1400" />
                </linearGradient>

                {/* Plate Center Polished Brass Sheen */}
                <radialGradient id="thaliCenter" cx="48%" cy="46%" r="50%">
                  <stop offset="0%" stopColor="#FFF9E0" />
                  <stop offset="35%" stopColor="#F5D076" />
                  <stop offset="70%" stopColor="#C48E28" />
                  <stop offset="95%" stopColor="#8A5A0A" />
                  <stop offset="100%" stopColor="#5E3802" />
                </radialGradient>

                {/* Traditional South Indian Kolam/Lotus Motif */}
                <pattern id="brassEngraving" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1.5" fill="#4A2600" opacity="0.35" />
                  <path d="M 10 20 Q 20 10 30 20 Q 20 30 10 20 Z" fill="none" stroke="#FDE68A" strokeWidth="0.75" opacity="0.25" />
                </pattern>
              </defs>

              {/* 1. Outer Beveled Brass Rim */}
              <circle cx="250" cy="250" r="240" fill="url(#brassOuterRim)" stroke="#4A2600" strokeWidth="3" />

              {/* 2. Traditional Chased Scallop Border (Floral Stamp) */}
              <circle cx="250" cy="250" r="230" fill="none" stroke="#FFF2B2" strokeWidth="2.5" strokeDasharray="6,4" />
              <circle cx="250" cy="250" r="222" fill="url(#brassGroove)" stroke="#92400E" strokeWidth="1.5" />

              {/* Decorative Temple Rim Dots */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 360) / 36;
                const rad = (angle * Math.PI) / 180;
                const cx = 250 + 226 * Math.cos(rad);
                const cy = 250 + 226 * Math.sin(rad);
                return <circle key={i} cx={cx} cy={cy} r="2.2" fill="#FFE58F" />;
              })}

              {/* 3. Deep Chased Stepped Inner Ridge */}
              <circle cx="250" cy="250" r="212" fill="url(#thaliCenter)" stroke="#683900" strokeWidth="4" />
              <circle cx="250" cy="250" r="208" fill="url(#brassEngraving)" opacity="0.4" />

              {/* 4. Banana Leaf Circle Liner inside Uruli */}
              <circle cx="250" cy="250" r="185" fill="#2E5A1C" stroke="#1D3E10" strokeWidth="2" opacity="0.9" />
              {/* Leaf veins */}
              <line x1="250" y1="70" x2="250" y2="430" stroke="#3D7526" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="120" y1="180" x2="380" y2="320" stroke="#3D7526" strokeWidth="1" strokeDasharray="3,5" opacity="0.6" />
              <line x1="120" y1="320" x2="380" y2="180" stroke="#3D7526" strokeWidth="1" strokeDasharray="3,5" opacity="0.6" />

              {/* Subtle metallic reflection streak across the brass plate */}
              <ellipse
                cx="200"
                cy="170"
                rx="140"
                ry="80"
                fill="#FFFFFF"
                opacity="0.12"
                transform="rotate(-25 200 170)"
              />
            </svg>

            {/* The Sweet Delicacy Centerpiece (Realistic Elevated 3D Element) */}
            <div
              className="relative z-10 w-[72%] h-[72%] rounded-full overflow-hidden shadow-[0_15px_30px_rgba(20,5,0,0.6)] border-4 border-amber-300/60 transition-transform duration-500 ease-out group"
              style={{
                transform: `translateZ(30px)`,
              }}
            >
              <img
                key={activeSweet.id}
                src={activeSweet.image}
                alt={activeSweet.name}
                className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110 filter brightness-[1.02] contrast-[1.05]"
              />

              {/* Dynamic Ghee Shimmer / Light Sheen */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `linear-gradient(${120 + rotateY * 2}deg, rgba(255, 255, 255, ${
                    isHovered ? 0.28 : 0.15
                  }) 0%, transparent 45%, rgba(136, 19, 55, 0.25) 100%)`,
                }}
              />

              {/* Central Badge Overlay on the Sweet (Subtle Royal Watermark) */}
              <div className="absolute top-3 left-3 bg-[#881337]/90 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-400/50 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{activeSweet.badge}</span>
              </div>
            </div>

            {/* Floating Parallax Garnish 1: Fragrant Green Cardamom Pod */}
            <div
              className="absolute -top-1 -right-2 z-20 transition-transform duration-300 pointer-events-none"
              style={{
                transform: `translate3d(${rotateY * -1.8}px, ${rotateX * -1.8}px, 60px)`,
              }}
            >
              <div className="bg-amber-950/85 text-amber-200 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/60 shadow-xl flex items-center gap-1.5">
                <span className="text-sm">🌿</span>
                <div className="text-[10px] leading-tight">
                  <div className="font-bold text-amber-100">Hill Cardamom</div>
                  <div className="text-amber-300/80 text-[9px]">ఏలకుల సువాసన</div>
                </div>
              </div>
            </div>

            {/* Floating Parallax Garnish 2: Roasted Cashew Highlight */}
            <div
              className="absolute -bottom-2 -left-3 z-20 transition-transform duration-300 pointer-events-none"
              style={{
                transform: `translate3d(${rotateY * -1.5}px, ${rotateX * -1.5}px, 50px)`,
              }}
            >
              <div className="bg-[#881337]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/60 shadow-xl flex items-center gap-1.5">
                <span className="text-sm">🧈</span>
                <div className="text-[10px] leading-tight">
                  <div className="font-bold text-amber-200">Pure Cow Ghee</div>
                  <div className="text-rose-200/90 text-[9px]">స్వచ్ఛమైన ఆవు నెయ్యి</div>
                </div>
              </div>
            </div>

            {/* Floating 3D Heritage Seal: GI Tag No. 438 */}
            <div
              className="absolute -bottom-5 right-2 z-20 transition-transform duration-300"
              style={{
                transform: `translate3d(${rotateY * -1.2}px, ${rotateX * -1.2}px, 70px)`,
              }}
            >
              <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 text-stone-900 px-3.5 py-2 rounded-2xl border-2 border-amber-500/80 shadow-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#881337] text-amber-300 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#881337] leading-none">
                    Estd. 1951 Machilipatnam
                  </div>
                  <div className="text-xs font-bold text-stone-900 mt-0.5">
                    {activeSweet.giTag}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sweet Information Strip & Direct Order Callout */}
      <div className="mt-4 bg-gradient-to-r from-stone-900 via-[#3B0A17] to-stone-900 text-white p-4 sm:p-5 rounded-2xl border border-amber-500/40 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded">
                {activeSweet.craftSecret}
              </span>
              <span className="text-xs text-amber-200 font-medium">{activeSweet.teluguName}</span>
            </div>
            <h4 className="font-serif-luxury text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>{activeSweet.name}</span>
              <span className="text-amber-400 font-sans text-base font-bold">
                {formatInr(activeSweet.price250g)}
                <span className="text-xs text-stone-400 font-normal"> / 250g</span>
              </span>
            </h4>
            <p className="text-xs text-stone-300 line-clamp-1 max-w-md">{activeSweet.desc}</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart(activeSweet.slug, '250g', 1);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Fresh Batch</span>
            </button>
            <button
              onClick={() => navigateTo('product', activeSweet.slug)}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-1"
              title="View full recipe and story"
            >
              <span>Story</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Traditional Brass Coin Sweet Selector */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Select Delicacy on Artisanal Brass Thali:
            </span>
            <span className="text-stone-400 text-[10px] hidden sm:inline">
              Move cursor over thali to rotate in 3D
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SWEET_SHOWCASES.map((sweet, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={sweet.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`text-left p-2 rounded-xl transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/25 to-[#881337]/40 border-amber-400 text-white shadow-md ring-1 ring-amber-400'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-stone-300 hover:text-white'
                  }`}
                >
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className={`w-9 h-9 rounded-lg object-cover border ${
                      isSelected ? 'border-amber-400 shadow-sm' : 'border-stone-700'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold truncate leading-tight">{sweet.name}</div>
                    <div className="text-[9px] text-amber-300/80 truncate">
                      {formatInr(sweet.price250g)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
