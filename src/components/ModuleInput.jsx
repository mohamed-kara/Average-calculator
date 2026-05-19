import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

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
    // Only allow numbers and decimal point
    let val = e.target.value;
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    
    // Prevent starting with multiple zeros
    if (val.length > 1 && val.startsWith('0') && val[1] !== '.') {
      val = val.substring(1);
    }
    
    // Max value check happens visually
    onChange(module.id, type, val);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={clsx(
        "relative p-4 rounded-2xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors duration-300",
        hasWarning ? "border-rose-500/50" : "hover:border-cyan-400/30"
      )}
    >
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium text-white tracking-wide">{module.name}</h3>
          <span className="px-2 py-1 text-xs font-semibold rounded-md bg-cyan-950/50 text-cyan-400 border border-cyan-800/30">
            Coeff {module.coeff}
          </span>
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-28">
          <label className="block text-xs text-slate-400 mb-1 ml-1 font-medium tracking-wider uppercase">TD / 20</label>
          <input
            type="text"
            value={tdVal}
            onChange={(e) => handleInputChange(e, 'td')}
            placeholder="0.00"
            className={clsx(
              "w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold tracking-wide placeholder:text-slate-600",
              isTdInvalid && "!border-rose-500/50 !shadow-[0_0_10px_rgba(244,63,94,0.2)]"
            )}
          />
        </div>

        <div className="relative flex-1 md:w-28">
          <label className="block text-xs text-slate-400 mb-1 ml-1 font-medium tracking-wider uppercase">Exam / 20</label>
          <input
            type="text"
            value={examVal}
            onChange={(e) => handleInputChange(e, 'exam')}
            placeholder="0.00"
            className={clsx(
              "w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold tracking-wide placeholder:text-slate-600",
              isExamInvalid && "!border-rose-500/50 !shadow-[0_0_10px_rgba(244,63,94,0.2)]"
            )}
          />
        </div>
      </div>

      <AnimatePresence>
        {hasWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
          >
            <AlertCircle size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModuleInput;
