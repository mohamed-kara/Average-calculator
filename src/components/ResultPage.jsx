import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download } from 'lucide-react';
import { getPerformanceStatus, TOTAL_COEFF } from '../utils/constants';

const CircularProgress = ({ value, colorClass, glowClass }) => {
  const [progress, setProgress] = useState(0);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const strokeDashoffset = circumference - (progress / 20) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${glowClass} rounded-full transition-shadow duration-1000`}>
      <svg className="w-64 h-64 transform -rotate-90">
        {/* Background circle */}
        <circle
          className="text-slate-800/50"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="128"
          cy="128"
        />
        {/* Progress circle */}
        <circle
          className={colorClass}
          strokeWidth="12"
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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-6xl font-black text-white tracking-tighter"
        >
          {progress.toFixed(2)}
        </motion.span>
        <span className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">Out of 20</span>
      </div>
    </div>
  );
};

const ResultPage = ({ results, finalAverage, onReset }) => {
  const status = getPerformanceStatus(finalAverage);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-4xl mx-auto px-4 py-12"
    >
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        {/* Ambient background glow inside card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-cyan-400 font-semibold tracking-wider uppercase mb-2"
            >
              Final Result
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Semester <br/> Performance
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="inline-block px-6 py-2 rounded-full glass-input border-cyan-500/30"
            >
              <span className="text-slate-300">Status: </span>
              <span className={`font-bold ${status.color}`}>{status.text}</span>
            </motion.div>
          </div>
          
          <div className="flex-shrink-0">
            <CircularProgress value={finalAverage} colorClass={status.color} glowClass={status.glow} />
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
            <motion.div key={res.module.id} variants={item} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-700/50 hover:bg-slate-800/40 hover:border-cyan-500/30 transition-all flex justify-between items-center">
              <div>
                <h4 className="text-sm font-semibold text-slate-200 mb-1">{res.module.name}</h4>
                <div className="flex gap-3 text-xs text-slate-500 font-medium">
                  <span>TD: <span className="text-slate-300">{res.td}</span></span>
                  <span>Exam: <span className="text-slate-300">{res.exam}</span></span>
                  <span className="text-cyan-600">Coeff: {res.module.coeff}</span>
                </div>
              </div>
              <div className={`text-lg font-bold ${Number(res.average) >= 10 ? 'text-teal-400' : 'text-rose-400'}`}>
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-slate-800/50 z-10 relative"
        >
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
          >
            <RotateCcw size={18} />
            Recalculate
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            <Download size={18} />
            Export PDF
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultPage;
