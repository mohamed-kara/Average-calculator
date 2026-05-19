import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import ModuleInput from './ModuleInput';
import { MODULES } from '../utils/constants';
import clsx from 'clsx';

const InputPage = ({ values, onValueChange, onCalculate }) => {
  const isFormValid = MODULES.every(mod => {
    const td = values[mod.id]?.td;
    const exam = values[mod.id]?.exam;
    if (td === undefined || exam === undefined) return false;
    if (td === '' || exam === '') return false;
    const tdNum = Number(td);
    const examNum = Number(exam);
    return tdNum >= 0 && tdNum <= 20 && examNum >= 0 && examNum <= 20;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
        >
          <Calculator className="w-8 h-8 text-cyan-400" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight mb-3">
          Semester Average
        </h1>
        <p className="text-slate-400 font-medium">Enter your marks to calculate your final performance.</p>
      </div>

      <div className="space-y-4 mb-8 relative">
        {/* Glow effect behind modules */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-blue-600/5 blur-3xl pointer-events-none rounded-[3rem] -z-10" />
        
        {MODULES.map((module, idx) => (
          <ModuleInput
            key={module.id}
            module={module}
            values={values[module.id] || { td: '', exam: '' }}
            onChange={onValueChange}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={onCalculate}
          disabled={!isFormValid}
          className={clsx(
            "relative group px-10 py-4 rounded-2xl font-bold text-lg tracking-wide transition-all duration-500 overflow-hidden",
            isFormValid 
              ? "bg-white text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-[1.02]" 
              : "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50"
          )}
        >
          <div className="relative z-10 flex items-center gap-2">
            Calculate Results
          </div>
          {isFormValid && (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default InputPage;
