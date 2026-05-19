import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ModuleInput = ({ module, values, onChange }) => {
  const tdVal = values.td;
  const examVal = values.exam;

  const isValid = (val) => {
    if (val === '') return true;
    const num = Number(val);
    return !isNaN(num) && num >= 0 && num <= 20;
  };

  const isTdInvalid = !isValid(tdVal);
  const isExamInvalid = !isValid(examVal);
  const hasWarning = isTdInvalid || isExamInvalid;

  const handleInputChange = (e, type) => {
    let val = e.target.value;
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    if (val.length > 1 && val.startsWith('0') && val[1] !== '.') {
      val = val.substring(1);
    }
    onChange(module.id, type, val);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative p-4 mb-3 border bg-[var(--color-background)]/50 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group/mod ${
        hasWarning ? "border-red-500/50" : "border-[var(--color-border)] hover:border-[var(--color-neon-cyan)]/50"
      }`}
    >
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-white tracking-widest uppercase">{module.name}</h3>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest bg-[var(--color-neon-cyan)]/10 text-[var(--color-neon-cyan)] border border-[var(--color-neon-cyan)]/30">
            COEFF {module.coeff}
          </span>
        </div>
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:w-24 group/input">
          <label className="block text-[10px] text-[var(--color-muted-foreground)] mb-1 font-mono tracking-widest uppercase">TD / 20</label>
          <input
            type="text"
            value={tdVal}
            onChange={(e) => handleInputChange(e, 'td')}
            placeholder="0.00"
            className={`w-full px-3 py-2 bg-[var(--color-input)] border text-white font-mono text-sm placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-neon-cyan)] transition-all ${
              isTdInvalid ? "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-[var(--color-border)]"
            }`}
          />
        </div>

        <div className="relative flex-1 md:w-24 group/input">
          <label className="block text-[10px] text-[var(--color-muted-foreground)] mb-1 font-mono tracking-widest uppercase">EXAM / 20</label>
          <input
            type="text"
            value={examVal}
            onChange={(e) => handleInputChange(e, 'exam')}
            placeholder="0.00"
            className={`w-full px-3 py-2 bg-[var(--color-input)] border text-white font-mono text-sm placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-neon-cyan)] transition-all ${
              isExamInvalid ? "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-[var(--color-border)]"
            }`}
          />
        </div>
      </div>

      <AnimatePresence>
        {hasWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 -translate-y-1/2 -right-3 text-red-500 bg-[var(--color-background)] rounded-full animate-glitch"
          >
            <AlertCircle size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModuleInput;
