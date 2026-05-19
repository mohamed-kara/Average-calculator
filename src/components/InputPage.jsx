import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';
import ModuleInput from './ModuleInput';
import { MODULES } from '../utils/constants';

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
      transition={{ duration: 0.5 }}
      className="w-full relative"
    >
      <div className="relative group">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-purple)] to-[var(--color-neon-cyan)] rounded-xl blur-lg opacity-20 transition-opacity duration-500 pointer-events-none" />
        
        {/* Main card */}
        <div className="relative bg-[var(--color-card)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-xl p-6 md:p-8">
          
          <div className="mb-8 border-b border-[var(--color-border)] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-[var(--color-neon-cyan)]/30 bg-[var(--color-neon-cyan)]/5 text-[var(--color-neon-cyan)] text-xs uppercase tracking-widest mb-4 font-mono">
              <Terminal size={14} className="animate-pulse" />
              Calculation Engine Ready
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider">
              Data Entry Terminal
            </h1>
            <p className="text-[var(--color-muted-foreground)] text-sm font-mono">
              Input academic parameters for performance processing.
            </p>
          </div>

          <div className="space-y-1 mb-8">
            {MODULES.map((module, idx) => (
              <ModuleInput
                key={module.id}
                module={module}
                values={values[module.id] || { td: '', exam: '' }}
                onChange={onValueChange}
              />
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
            <button
              onClick={onCalculate}
              disabled={!isFormValid}
              className={`h-12 px-8 bg-transparent border-2 border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-[var(--color-background)] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-3 group/btn ${
                isFormValid ? "neon-border-cyan" : "opacity-50 cursor-not-allowed border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-transparent hover:text-[var(--color-muted-foreground)]"
              }`}
            >
              <span>Execute Calculation</span>
              <ArrowRight className={`h-5 w-5 ${isFormValid ? "group-hover/btn:translate-x-1 transition-transform" : ""}`} />
            </button>
          </div>
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

export default InputPage;
