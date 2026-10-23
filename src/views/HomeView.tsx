import React, { useState } from 'react';
import { PRODUCTS, GLOBAL_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PincodeChecker } from '../components/PincodeChecker';
import { useCart } from '../context/CartContext';
import { WHATSAPP_PHONE } from '../utils/ecommerce';
import {
  Award,
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
  Flame,
  ChefHat,
  Package,
  Heart,
  ChevronRight,
  PhoneCall,
  Zap,
  Activity,
  Gauge,
  Compass,
} from 'lucide-react';
import { Hero3DThali } from '../components/Hero3DThali';

export const HomeView: React.FC = () => {
  const { navigateTo } = useCart();

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const purityPillars = [
    {
      index: '01',
      code: 'FAT // 99.8% PURE',
      title: '100% Desi Cow Ghee',
      telugu: 'స్వచ్ఛమైన తీర ప్రాంత ఆవు నెయ్యి',
      desc: 'Sourced fresh each morning from coastal Andhra farmsteads. Melted in heirloom brass pans. Strictly 0% dalda, 0% palm oil, 0% industrial blends.',
      statLabel: 'FAT PURITY',
      statValue: '100% COW GHEE',
      subStat: '0% PALM OIL / DALDA',
      accent: 'amber',
      icon: Sparkles,
    },
    {
      index: '02',
      code: 'PURITY // 0.0% CHEMICALS',
      title: 'Zero Chemical Preservatives',
      telugu: 'ఎటువంటి రసాయనాలు లేని పవిత్రత',
      desc: 'Preserved exclusively through ancient culinary science: slow caramelization, moisture evaporation, and sterile hot-ghee seal.',
      statLabel: 'SHELF LIFE',
      statValue: '21 - 45 DAYS',
      subStat: 'NATURAL GHEE SEAL',
      accent: 'rose',
      icon: Shield,
    },
    {
      index: '03',
      code: 'CRAFT // GRANITE MORTAR',
      title: 'Stone Mortar Pounded',
      telugu: 'సాంప్రదాయ రోలు బండ మర్దన రహస్యం',
      desc: 'Bandar Laddu’s world-famous velvet texture is achieved only by crushing golden boondi on heavy granite mortars into micro-fine flour.',
      statLabel: 'GRIND METHOD',
      statValue: 'GRANITE STONE',
      subStat: '75-YEAR ALCHEMY',
      accent: 'gold',
      icon: ChefHat,
    },
    {
      index: '04',
      code: 'LOGISTICS // PRIORITY AIR',
      title: '24-Hr Express Transit',
      telugu: 'సూర్యాస్తమయానికి ముందే డిస్పాచ్',
      desc: 'Dispatched same evening in multi-barrier nitrogen-flushed packs. Doorstep delivery across Hyderabad, Vijayawada, Bangalore & Chennai.',
      statLabel: 'DELIVERY SPEED',
      statValue: '< 24 HOURS',
      subStat: 'AP, TELANGANA & METROS',
      accent: 'emerald',
      icon: Zap,
    },
  ];

  const timelineSteps = [
    {
      step: '01',
      title: 'Gram Flour Boondi Roasting',
      telugu: 'స్వచ్ఛమైన శనగపిండి బూంది',
      desc: 'Pure Bengal gram flour batter is dripped through brass perforated ladles into boiling country ghee, producing crisp golden pearls.',
      icon: Flame,
    },
    {
      step: '02',
      title: 'Stone Mortar Pounding (Secret)',
      telugu: 'రోలు బండతో మెత్తటి పిండి మర్దన',
      desc: 'The unique secret of Bandar Laddu: the golden boondi is pounded in traditional stone mortars until it turns into a fine, velvet-soft flour powder.',
      icon: ChefHat,
    },
    {
      step: '03',
      title: 'Ghee & Sugar Simmering',
      telugu: 'నెయ్యి మరియు పాకంలో నిదానంగా ఉడకడం',
      desc: 'Blended with bubbling cardamom-infused sugar syrup and hot pure cow ghee in heavy brass vats until molten perfection is reached.',
      icon: Sparkles,
    },
    {
      step: '04',
      title: 'Hand Rolling & Vacuum Sealing',
      telugu: 'చేతితో గుండ్రంగా చుట్టి ప్యాకింగ్',
      desc: 'Rolled by experienced artisans while warm, garnished with golden fried cashews, and immediately sealed in oxygen-barrier export pouches.',
      icon: Package,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Grand 3D Indian Heritage Hero Section */}
      <section className="relative bg-gradient-to-b from-[#220E15] via-[#1A0A0F] to-[#12050A] text-white pt-8 pb-12 sm:pt-14 sm:pb-24 border-b-2 border-amber-500/40 overflow-hidden shadow-2xl">
        {/* Ornate Indian Temple Architectural Toranam / Arch Watermark */}
        <div className="absolute inset-0 kolam-pattern opacity-10 pointer-events-none" />
        
        {/* Radiant Ambient Temple Backlights */}
        <div className="absolute top-0 right-1/4 -mt-24 w-[500px] h-[500px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 -mb-20 w-[450px] h-[450px] rounded-full bg-[#881337]/35 blur-[120px] pointer-events-none" />

        {/* Top Temple Arch Filigree Motif */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* 3D Artisanal Brass Thali Centerpiece with Bandar Laddu - Placed ON TOP in Mobile View */}
            <div className="order-1 lg:order-2 lg:col-span-6 w-full">
              <Hero3DThali />
            </div>

            {/* Left Content Column - Displayed below 3D Laddu in mobile view, Left column in desktop */}
            <div className="order-2 lg:order-1 lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              {/* Royal Heritage Insignia Ribbon */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-gradient-to-r from-amber-500/20 via-rose-950/40 to-transparent p-1.5 pr-4 rounded-xl border border-amber-500/40 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 font-black text-[11px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  <span>Estd. 1951</span>
                </div>
                <span className="text-amber-200 text-xs font-bold tracking-wide">
                  75-Year Master Heritage • Krishna Delta
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <span className="text-amber-300/90 text-xs font-semibold hidden sm:inline-block">
                  GI Tag No. 438
                </span>
              </div>

              {/* Grand Regally Styled Headings */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <span className="w-8 h-px bg-amber-400/60 hidden sm:inline-block" />
                  <span>Sacred Confectionery of Andhra</span>
                  <span className="w-8 h-px bg-amber-400/60 hidden sm:inline-block" />
                </div>

                <h1 className="font-serif-luxury text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                  The Living Heritage of{' '}
                  <span className="gold-metallic-text drop-shadow-[0_4px_12px_rgba(217,119,6,0.3)]">
                    Bandar Sweets
                  </span>
                </h1>

                <p className="text-xs sm:text-base font-semibold text-amber-300 leading-snug">
                  శ్రీ లక్ష్మీ సత్యనారాయణ తాతా రావు స్వీట్స్ • 75 ఏళ్ల నిఖార్సయిన రుచి & స్వచ్ఛత
                </p>
              </div>

              {/* Editorial Description */}
              <p className="text-xs sm:text-base text-stone-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Crafted daily at our historic Fort Road kitchen in Machilipatnam. Hand-pounded boondi on ancient stone mortars, simmered in 100% pure coastal cow ghee and fresh Krishna sugarcane jaggery. Prepared by master artisans with zero chemicals.
              </p>

              {/* Action Buttons with 3D Tactile Finish */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 border border-amber-300 group"
                >
                  <span>Order Bandar Laddu Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => navigateTo('about')}
                  className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-amber-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore 1951 Story</span>
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Namaste Thatha Rao Sweets! I would like to order fresh Bandar Laddu & Halwa directly from Machilipatnam.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-400/40"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </a>
              </div>

              {/* Traditional Trust Verification Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300">
                    ✓
                  </div>
                  <span className="font-medium text-stone-200">Express 24-hr Air Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300">
                    ✓
                  </div>
                  <span className="font-medium text-stone-200">Govt. GI Registry No. 438</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9★</span>
                  <span className="text-stone-400 font-normal">(3,800+ Devotees)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Modern Aerodynamic & Luxury Purity Pillars ("Why Generations Trust Sri Thatha Rao") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Sleek Automotive-Grade Detailing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono font-bold tracking-widest uppercase text-[#881337]">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>THE 1951 STANDARD // ZERO SHORTCUTS</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Why Generations Trust Sri Thatha Rao
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              Engineered with sacred artisanal rigor. Every batch of our Bandar sweets is cooked strictly under 75-year ancestral protocols.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-stone-100 p-2 rounded-xl border border-stone-200 text-xs font-mono">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="text-stone-700 font-semibold">DAILY KITCHEN AUDIT:</span>
            <span className="text-emerald-700 font-bold">100% COMPLIANT</span>
          </div>
        </div>

        {/* Trendy Luxury / Aerodynamic Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {purityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.index}
                className="group relative bg-gradient-to-b from-[#211612] via-[#1A100C] to-[#120A07] text-white rounded-2xl p-6 sm:p-7 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.35)] flex flex-col justify-between overflow-hidden"
              >
                {/* Top Specular Hairline Highlight (automotive rim sheen) */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Subtle Radial Glow in Card Corner */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 blur-2xl transition-all pointer-events-none" />

                {/* Card Header with Tech/Craft Index Badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] font-bold tracking-wider text-amber-400/80 bg-stone-900/90 px-2.5 py-1 rounded-md border border-amber-500/30">
                      {pillar.code}
                    </span>

                    {/* Sculpted Icon Hub */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-[#881337]/30 border border-amber-400/50 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:border-amber-300 transition-transform shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Telugu Label */}
                  <h3 className="font-serif-luxury text-xl font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs text-amber-400/90 font-medium mb-3">
                    {pillar.telugu}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-300 leading-relaxed mb-6 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                {/* Precision Telemetry Spec Gauge Footer */}
                <div className="pt-4 border-t border-stone-800/80 bg-stone-950/40 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-4 sm:p-5 rounded-b-2xl">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-stone-400 font-semibold">{pillar.statLabel}</span>
                    <span className="text-amber-400 font-bold">{pillar.statValue}</span>
                  </div>
                  <div className="w-full bg-stone-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full w-full" />
                  </div>
                  <div className="text-[10px] text-stone-400 mt-2 font-mono flex items-center justify-between">
                    <span>{pillar.subStat}</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#881337]">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Most Celebrated Delicacies</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Thatha Rao Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Select weight variant, calculate instant price, and order direct online or on WhatsApp.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#881337] hover:text-[#70102d] uppercase tracking-wider group"
          >
            <span>View Complete Menu ({PRODUCTS.length} Delicacies)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Heritage Story ("The Legacy of Bandar") */}
      <section className="bg-gradient-to-r from-[#29150B] via-[#3D1E0F] to-[#29150B] text-amber-50 py-16 sm:py-20 relative overflow-hidden">
        {/* Subtle decorative ornaments */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-600/40 px-3.5 py-1 rounded-full">
              The Legend of Bandar • Estd. 1951
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white mt-3">
              The Secret Behind Machilipatnam's Velvet Laddu
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-2 leading-relaxed">
              Unlike regular laddus where whole boondi is compressed, Sri Thatha Rao's legendary craft involves an intricate slow-pounding ritual that transforms boondi into silk.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {timelineSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-black/30 backdrop-blur-xs p-6 rounded-2xl border border-amber-700/40 flex flex-col justify-between hover:border-amber-400/70 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-amber-500/40 font-royal">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-serif-luxury text-base font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium mb-2.5">
                      {item.telugu}
                    </p>
                    <p className="text-xs text-amber-100/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('about')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <span>Read the Full 1951 History & View GI Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Real-Time Pincode Checker Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PincodeChecker />
      </section>

      {/* 6. Google Reviews Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337]">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Customer Love & Google Ratings</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Trusted by 50,000+ Sweet Lovers Pan-India
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Over 2,750+ 5-star Google reviews from customers in Hyderabad, Bangalore, Chennai, USA, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GLOBAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-2xl border border-amber-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{rev.author}</h4>
                  <span className="text-[11px] text-stone-500">{rev.location}</span>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Order
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
