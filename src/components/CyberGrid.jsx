import React from 'react';

export function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grid lines */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-neon-cyan) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Perspective grid floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50vh] opacity-30"
        style={{
          background: `
            linear-gradient(to top, transparent, transparent 50%),
            linear-gradient(90deg, var(--color-neon-purple) 1px, transparent 1px),
            linear-gradient(var(--color-neon-purple) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      
      {/* Scan line effect */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-neon-cyan/30 animate-[scan-line_4s_linear_infinite]"
        style={{
          boxShadow: '0 0 20px 10px var(--color-neon-cyan)',
        }}
      />
      
      {/* Corner decorations */}
      <svg className="absolute top-8 left-8 w-24 h-24 text-neon-cyan opacity-60" viewBox="0 0 100 100">
        <path
          d="M0 30 L0 0 L30 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-pulse-glow"
        />
        <path
          d="M0 20 L0 10 L10 10 L10 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
      
      <svg className="absolute top-8 right-8 w-24 h-24 text-neon-purple opacity-60" viewBox="0 0 100 100">
        <path
          d="M70 0 L100 0 L100 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-pulse-glow"
        />
        <path
          d="M90 0 L90 10 L100 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
      
      <svg className="absolute bottom-8 left-8 w-24 h-24 text-neon-purple opacity-60" viewBox="0 0 100 100">
        <path
          d="M0 70 L0 100 L30 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-pulse-glow"
        />
      </svg>
      
      <svg className="absolute bottom-8 right-8 w-24 h-24 text-neon-cyan opacity-60" viewBox="0 0 100 100">
        <path
          d="M70 100 L100 100 L100 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-pulse-glow"
        />
      </svg>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--color-neon-cyan)] animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
