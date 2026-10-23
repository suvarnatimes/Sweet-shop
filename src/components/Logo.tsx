import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  // Dimensions
  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Royal Circular Insignia */}
      <div className={`relative ${emblemSizes[size]} flex-shrink-0 drop-shadow-md select-none`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Royal Gold Gradient */}
            <linearGradient id="trGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            {/* Crimson Velvet Gradient */}
            <radialGradient id="trCrimsonGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A21CAF" />
              <stop offset="30%" stopColor="#881337" />
              <stop offset="85%" stopColor="#500724" />
              <stop offset="100%" stopColor="#290312" />
            </radialGradient>

            {/* Inner Ring Glow */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Sunburst Ray Beads (Traditional Kalash Pattern) */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="url(#trGoldGrad)" strokeWidth="3" strokeDasharray="6,4" />
          <circle cx="100" cy="100" r="89" fill="url(#trCrimsonGrad)" stroke="url(#trGoldGrad)" strokeWidth="3.5" />

          {/* Inner Golden Ornamental Filigree Border */}
          <circle cx="100" cy="100" r="82" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
          <circle cx="100" cy="100" r="76" fill="none" stroke="url(#trGoldGrad)" strokeWidth="1.5" />

          {/* Traditional Temple Kalash & Sacred Laddu Centerpiece */}
          {/* Sacred Diya / Kalash Base */}
          <path
            d="M 80 138 Q 100 146 120 138 L 115 152 Q 100 156 85 152 Z"
            fill="url(#trGoldGrad)"
          />
          {/* Kalash Pot Body */}
          <path
            d="M 75 115 Q 65 132 80 140 Q 100 145 120 140 Q 135 132 125 115 Q 115 106 100 106 Q 85 106 75 115 Z"
            fill="url(#trGoldGrad)"
          />
          
          {/* Golden Bandar Laddu Sphere resting gracefully atop the Kalash */}
          <circle cx="100" cy="85" r="24" fill="url(#trGoldGrad)" />
          {/* Laddu texture sparkles & roasted cashew flecks */}
          <circle cx="94" cy="78" r="3.5" fill="#FEF3C7" />
          <circle cx="106" cy="88" r="3" fill="#B45309" />
          <circle cx="101" cy="74" r="2.5" fill="#FEF3C7" />
          <circle cx="92" cy="90" r="2.5" fill="#B45309" />
          <circle cx="110" cy="78" r="3" fill="#FFFBEB" />

          {/* Sacred Flame / Auspicious Aura at Top */}
          <path
            d="M 100 50 Q 106 58 100 68 Q 94 58 100 50 Z"
            fill="#FEF3C7"
            filter="url(#goldGlow)"
          />

          {/* Arch Ribbon Banner: ESTD. 1951 */}
          <path
            d="M 52 148 Q 100 168 148 148 L 144 162 Q 100 180 56 162 Z"
            fill="url(#trGoldGrad)"
            stroke="#92400E"
            strokeWidth="0.8"
          />
          <text
            x="100"
            y="160"
            textAnchor="middle"
            fill="#450A0A"
            fontSize="10"
            fontFamily="'Cinzel', serif"
            fontWeight="bold"
            letterSpacing="1.8"
          >
            ESTD. 1951
          </text>

          {/* Arch Text: THATHA RAO SWEETS */}
          <path id="textArcTop" d="M 32 105 A 72 72 0 0 1 168 105" fill="none" />
          <text fill="url(#trGoldGrad)" fontSize="10.5" fontFamily="'Cinzel', serif" fontWeight="800" letterSpacing="2.2">
            <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
              THATHA RAO SWEETS
            </textPath>
          </text>

          {/* Bottom Arch Text: MACHILIPATNAM */}
          <path id="textArcBottom" d="M 155 125 A 72 72 0 0 1 45 125" fill="none" />
          <text fill="#FDE68A" fontSize="8" fontFamily="'Cinzel', serif" fontWeight="600" letterSpacing="1.8" opacity="0.95">
            <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
              MACHILIPATNAM
            </textPath>
          </text>
        </svg>
      </div>

      {/* Brand Typographic Identity */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight text-[#881337] group-hover:text-[#9A1750] transition-colors leading-none">
              Thatha Rao Sweets
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold border border-amber-300">
              Estd. 1951
            </span>
          </div>

          <div className="text-[11px] text-[#29150B]/80 flex items-center gap-1.5 mt-1">
            <span className="font-medium text-amber-900">శ్రీ లక్ష్మీ సత్యనారాయణ తాతారావు</span>
            <span className="text-amber-600 font-bold">•</span>
            <span className="text-xs text-[#881337] font-bold">బందరు లడ్డూ & హల్వా</span>
          </div>
        </div>
      )}
    </div>
  );
};
