import React from 'react';
import { useCart } from '../context/CartContext';
import { Award, Sparkles, ChefHat, Flame, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

export const AboutHeritageView: React.FC = () => {
  const { navigateTo } = useCart();

  const milestones = [
    {
      year: '1951',
      title: 'The Humble Hearth at Fort Road',
      telugu: '1951లో ప్రారంభమైన చారిత్రాత్మక ప్రస్థానం',
      desc: 'Sri Lakshmi Satyanarayana Thatha Rao began preparing small hand-stirred batches of Bandar Laddu in Godugupet, Machilipatnam, using pure cow ghee and stone-mortar pounded boondi.',
    },
    {
      year: '1968',
      title: 'The Brass Cauldron Master Halwa',
      telugu: 'సాంప్రదాయ బందరు హల్వా విశిష్టత',
      desc: 'Introduced the iconic Bandar Halwa—extracting the natural milk of wheat berries and slow-stirring for 6 continuous hours in heavy brass urulis over babool wood fires.',
    },
    {
      year: '1989',
      title: 'Pan-Andhra Devotee Pilgrimage',
      telugu: 'ఆంధ్ర నలుమూలలా విస్తరించిన ఖ్యాతి',
      desc: 'Travellers along the Krishna coast made it a pilgrimage custom to stop by Thatha Rao’s shop before boarding express trains to Hyderabad and Madras.',
    },
    {
      year: '2013',
      title: 'Official GI Tag Certification (No. 438)',
      telugu: 'భారత ప్రభుత్వ భౌగోళిక గుర్తింపు (GI Tag)',
      desc: 'Recognized by the Intellectual Property Office of India under the Geographical Indications Registry as the authentic cradle and standard-bearer of Bandar Laddu.',
    },
    {
      year: 'Today',
      title: 'Export Freshness & Pan-India Express',
      telugu: 'నేటి ఆధునిక ఎయిర్ కార్గో డెలివరీ',
      desc: '75 years later, the recipe remains 100% true to 1951—now paired with high-barrier nitrogen vacuum packaging delivering within 24 hours to doorsteps nationwide.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 pb-20">
      {/* 1. Grand 3D Heritage Archival Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#200D14] via-[#17090F] to-[#0E0308] text-white rounded-3xl border-2 border-amber-500/40 p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden">
          {/* Kolam Heritage Texture */}
          <div className="absolute inset-0 kolam-pattern opacity-10 pointer-events-none" />

          {/* Ambient Temple Backlights */}
          <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 rounded-full bg-[#881337]/40 blur-3xl pointer-events-none" />

          {/* Top Gold Leaf Filigree Border */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-950/40 to-transparent px-3.5 py-1.5 rounded-xl border border-amber-500/40 backdrop-blur-md">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-amber-200 text-xs font-bold tracking-wide">
                  Estd. 1951 • Machilipatnam, Krishna District • 75-Yr Dynasty
                </span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                75 Years of Sacred{' '}
                <span className="gold-metallic-text">Sweetmaking</span> in Bandar
              </h1>

              <p className="text-sm sm:text-base font-semibold text-amber-300">
                శ్రీ లక్ష్మీ సత్యనారాయణ తాతా రావు స్వీట్స్ • Krishna Delta's Living Culinary Legend
              </p>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal max-w-xl">
                On the fertile delta of the Krishna River, the ancient port town of Machilipatnam birthed a confectionery marvel that became a protected national treasure. Since 1951, Sri Thatha Rao’s hearth has preserved the sacred alchemy of stone-pounded boondi, pure country cow ghee, and unhurried coastal tradition.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono">
                <div className="bg-amber-950/70 border border-amber-500/40 px-3 py-1.5 rounded-lg text-amber-200">
                  🏛️ PROTECTED GI TAG NO. 438
                </div>
                <div className="bg-rose-950/70 border border-rose-500/40 px-3 py-1.5 rounded-lg text-rose-200">
                  🔥 Babool Wood Brass Vats
                </div>
              </div>
            </div>

            {/* Right Column: 3D Heritage Framed Vignette */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group perspective-1000">
                {/* Brass Platter Vignette */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-3 bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-200 border-4 border-amber-300/80 shadow-[0_25px_50px_rgba(0,0,0,0.7)] transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/images/sweets/bandar-halwa.jpg"
                    alt="Heritage Bandar Halwa in Brass Cauldron"
                    className="w-full h-full object-cover rounded-2xl filter contrast-[1.05]"
                  />
                  
                  {/* Floating Brass Seal */}
                  <div className="absolute -bottom-4 -left-4 bg-stone-950/95 text-white p-3 rounded-2xl border-2 border-amber-400 shadow-2xl flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#881337] text-amber-300 flex items-center justify-center font-black text-xs">
                      TR
                    </div>
                    <div>
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Original 1951 Kitchen</div>
                      <div className="text-xs font-black text-stone-100">Fort Road, Bandar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Makes Bandar Laddu Unique? (The Secret Revealed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#881337] bg-rose-100/70 px-3 py-1 rounded-full">
                The Anatomy of Perfection
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-stone-900 mt-2">
                Why Bandar Laddu Melts on the Tongue
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Most Indian laddus—like Motichoor or Tirupati Laddu—are made by binding intact fried boondi globules together. Bandar Laddu is fundamentally different.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-[#D97706] flex-shrink-0 mt-0.5">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Traditional Stone Mortar Pounding (రోలు బండ)
                  </h4>
                  <p className="text-stone-600 mt-1">
                    Once the gram flour boondi is fried golden in fresh cow ghee, it is transferred onto heavy granite mortars and rhythmically pounded until the beads break down completely into a silken, flour-fine velvet consistency.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-100 text-[#881337] flex-shrink-0 mt-0.5">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Simmering in Pure Boiling Ghee-Syrup
                  </h4>
                  <p className="text-stone-600 mt-1">
                    This velvety flour is then stirred into bubbling cardamom syrup and poured with generous streams of hot desi cow ghee until it emulsifies into a glistening, aroma-rich paste.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 flex-shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Hand-Shaped Warm by Master Artisans
                  </h4>
                  <p className="text-stone-600 mt-1">
                    While the sweet is still radiating warmth, our craftswomen roll each sphere by palm, garnishing with fried cashews and a hint of nutmeg.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-4 border-amber-200 shadow-2xl bg-amber-50">
              <img
                src="/images/sweets/bandar-laddu.jpg"
                alt="Authentic Bandar Laddu Sweet"
                className="w-full h-96 sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white space-y-2">
                <span className="bg-[#881337] text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-400">
                  Protected Geographical Indication (GI Tag 438)
                </span>
                <h3 className="font-serif-luxury text-xl font-bold">
                  The Gold Standard of Andhra Mithai
                </h3>
                <p className="text-xs text-amber-200">
                  Certified authentic under the Geographical Indications of Goods Act, 1999.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 75-Year Historical Timeline */}
      <section className="bg-[#29150B] text-amber-50 py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-600/40 px-3.5 py-1 rounded-full">
              Our Journey (1951 – 2026)
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white mt-3">
              Seven Decades of Sweet Devotion
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative pl-8 sm:pl-10 space-y-12 before:absolute before:left-3.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-600/50">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Node */}
                <div className="absolute -left-8 sm:-left-10 top-0 w-8 h-8 rounded-full bg-[#881337] border-2 border-amber-400 text-amber-200 flex items-center justify-center text-xs font-bold shadow-md">
                  {idx + 1}
                </div>

                <div className="bg-black/30 backdrop-blur-xs p-6 rounded-2xl border border-amber-700/40 hover:border-amber-400 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl sm:text-2xl font-black text-amber-400 font-royal">
                      {m.year}
                    </span>
                    <span className="text-xs text-amber-300 font-medium">
                      {m.telugu}
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
            >
              <span>Taste the 75-Year Legacy (Order Online)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
