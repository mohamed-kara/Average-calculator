import React from 'react';

export function NeonLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Mathematical Hexagonal Logo */}
      <div className="relative">
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          className="animate-pulse-glow"
        >
          {/* Outer hexagon */}
          <polygon
            points="24,2 44,13 44,35 24,46 4,35 4,13"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="2"
          />
          {/* Inner math brackets and nodes */}
          <path
            d="M 14,18 L 10,24 L 14,30 M 34,18 L 38,24 L 34,30"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="2"
          />
          {/* Center glowing node/function */}
          <path
            d="M 18,32 L 32,16 M 16,16 L 30,32"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="2"
            opacity="0.8"
          />
          <circle cx="24" cy="24" r="4" fill="var(--color-neon-cyan)" opacity="0.9" />
          
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-neon-cyan)" />
              <stop offset="100%" stopColor="var(--color-neon-purple)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 blur-md opacity-50 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--color-neon-cyan) 0%, transparent 70%)',
          }}
        />
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-wider text-white neon-text-cyan animate-flicker">
          LOOH
        </span>
        <span className="text-xs tracking-[0.3em] text-[var(--color-neon-purple)] uppercase">
          CALC
        </span>
      </div>
    </div>
  )
}
