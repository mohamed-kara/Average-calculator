import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download, TerminalSquare } from 'lucide-react';
import { getPerformanceStatus } from '../utils/constants';

const CircularProgress = ({ value, colorClass, glowClass }) => {
  const [progress, setProgress] = useState(0);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const strokeDashoffset = circumference - (progress / 20) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${glowClass} rounded-full transition-shadow duration-1000 group`}>
      <svg className="w-64 h-64 transform -rotate-90">
        <circle
          className="text-[var(--color-background)]"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="128"
          cy="128"
        />
        <circle
          className={colorClass}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="128"
          cy="128"
          style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-6xl font-black text-white tracking-tighter animate-flicker"
        >
          {progress.toFixed(2)}
        </motion.span>
        <span className="text-xs font-mono text-[var(--color-muted-foreground)] mt-2 uppercase tracking-widest">Global Index</span>
      </div>
    </div>
  );
};

const ResultPage = ({ results, finalAverage, onReset }) => {
  const status = getPerformanceStatus(finalAverage);
  
  // Convert standard Tailwind colors to neon equivalents for this theme
  let neonColor = "text-[var(--color-neon-cyan)]";
  let neonGlow = "neon-text-cyan";
  let borderGlow = "neon-border-cyan";
  if (finalAverage < 10) {
    neonColor = "text-red-500";
    neonGlow = "neon-text-red";
    borderGlow = "shadow-[0_0_15px_rgba(239,68,68,0.3)]";
  } else if (finalAverage >= 14) {
    neonColor = "text-[var(--color-neon-purple)]";
    neonGlow = "neon-text-purple";
    borderGlow = "neon-border-purple";
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="w-full relative"
    >
      <div className="relative group">
        <div className={`absolute -inset-1 rounded-xl blur-lg opacity-20 pointer-events-none ${finalAverage >= 10 ? 'bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-purple)] to-[var(--color-neon-cyan)]' : 'bg-red-500'}`} />
        
        <div className="relative bg-[var(--color-card)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-xl p-6 md:p-10">
          
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-[var(--color-neon-purple)]/30 bg-[var(--color-neon-purple)]/5 text-[var(--color-neon-purple)] text-xs uppercase tracking-widest mb-4 font-mono"
              >
                <TerminalSquare size={14} className="animate-glitch" />
                Processing Complete
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-widest uppercase"
              >
                Output <br/> Terminal
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`inline-flex items-center px-4 py-2 border ${borderGlow} bg-[var(--color-background)]/50 font-mono text-sm`}
              >
                <span className="text-[var(--color-muted-foreground)] mr-2">System Status: </span>
                <span className={`font-bold ${neonColor} ${neonGlow} animate-pulse`}>{status.text.toUpperCase()}</span>
              </motion.div>
            </div>
            
            <div className="flex-shrink-0">
              <CircularProgress value={finalAverage} colorClass={neonColor} glowClass="" />
            </div>
          </div>

          {/* Detailed Breakdown */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 z-10 relative"
          >
            {results.map((res) => (
              <motion.div key={res.module.id} variants={item} className="p-4 bg-[var(--color-background)]/50 border border-[var(--color-border)] hover:border-[var(--color-neon-cyan)]/50 transition-all flex justify-between items-center group/mod">
                <div>
                  <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-2">{res.module.name}</h4>
                  <div className="flex gap-4 text-[10px] text-[var(--color-muted-foreground)] font-mono tracking-widest uppercase">
                    <span>TD: <span className="text-white">{res.td}</span></span>
                    <span>EXAM: <span className="text-white">{res.exam}</span></span>
                    <span className="text-[var(--color-neon-cyan)]">CF: {res.module.coeff}</span>
                  </div>
                </div>
                <div className={`text-xl font-bold ${Number(res.average) >= 10 ? 'text-[var(--color-neon-cyan)]' : 'text-red-500'} font-mono`}>
                  {res.average}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-end pt-8 border-t border-[var(--color-border)] z-10 relative"
          >
            <button 
              onClick={onReset}
              className="flex items-center justify-center gap-2 h-12 px-8 font-mono text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] bg-transparent hover:text-white transition-all border border-[var(--color-border)] hover:border-[var(--color-neon-purple)]"
            >
              <RotateCcw size={16} />
              Re-initialize
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 h-12 px-8 font-mono text-xs uppercase tracking-widest bg-transparent border-2 border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-[var(--color-background)] transition-all duration-300 neon-border-cyan"
            >
              <Download size={16} />
              Export Data
            </button>
          </motion.div>
        </div>

        {/* Decorative corner brackets */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--color-neon-cyan)] pointer-events-none" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--color-neon-purple)] pointer-events-none" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--color-neon-purple)] pointer-events-none" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--color-neon-cyan)] pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default ResultPage;
