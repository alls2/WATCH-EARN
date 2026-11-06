import React from 'react';

interface WatchEarnLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
}

export const WatchEarnLogo: React.FC<WatchEarnLogoProps> = ({
  size = 'md',
  showSlogan = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const sloganSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
    xl: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Triangle Play Logo Icon matching official reference */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(0,229,155,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="weLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e59b" />
              <stop offset="50%" stopColor="#00ffa3" />
              <stop offset="100%" stopColor="#00c2ff" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer glowing triangular frame */}
          <path
            d="M 28 16 C 33 13 40 16 43 21 L 82 50 C 86 53 86 59 82 62 L 43 91 C 40 96 33 99 28 96 C 24 93 22 88 22 82 L 22 30 C 22 24 24 19 28 16 Z"
            stroke="url(#weLogoGradient)"
            strokeWidth="9"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="#060e18"
            fillOpacity="0.8"
          />

          {/* Inner subtle play facet */}
          <path
            d="M 38 34 L 66 56 L 38 78 Z"
            fill="url(#weLogoGradient)"
            fillOpacity="0.25"
          />
        </svg>
      </div>

      {/* Typography: Watch in white, Earn in Emerald */}
      <div className="flex flex-col text-left">
        <div className={`font-black tracking-tight ${textSizes[size]} leading-none flex items-center`}>
          <span className="text-white">Watch</span>
          <span className="text-[#00e59b] ml-0.5 drop-shadow-[0_0_8px_rgba(0,229,155,0.4)]">Earn</span>
        </div>
        {showSlogan && (
          <span
            className={`font-semibold tracking-[0.2em] text-slate-300 ${sloganSizes[size]} uppercase mt-1 opacity-90`}
          >
            WATCH. DISCOVER. EARN.
          </span>
        )}
      </div>
    </div>
  );
};
