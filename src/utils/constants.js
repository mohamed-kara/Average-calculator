export const MODULES = [
  { id: 'cl', name: 'Conception Logiciel (CL)', coeff: 4 },
  { id: 'comp', name: 'Compilation Design (COMP)', coeff: 4 },
  { id: 'ana', name: 'Analyse Numérique (ANA)', coeff: 4 },
  { id: 'web', name: 'Web', coeff: 3 },
  { id: 'sec', name: 'Security', coeff: 2 },
  { id: 'bdd', name: 'BDD', coeff: 3 },
];

export const TOTAL_COEFF = MODULES.reduce((sum, mod) => sum + mod.coeff, 0);

export const calculateModuleAverage = (td, exam) => {
  if (td === '' || exam === '') return null;
  return (Number(td) * 0.4) + (Number(exam) * 0.6);
};

export const getPerformanceStatus = (average) => {
  if (average >= 16) return { text: 'Excellent', color: 'text-cyan-400', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.5)]' };
  if (average >= 14) return { text: 'Very Good', color: 'text-teal-400', glow: 'shadow-[0_0_20px_rgba(45,212,191,0.5)]' };
  if (average >= 12) return { text: 'Good', color: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.5)]' };
  if (average >= 10) return { text: 'Pass', color: 'text-indigo-400', glow: 'shadow-[0_0_20px_rgba(129,140,248,0.5)]' };
  return { text: 'Failed', color: 'text-rose-400', glow: 'shadow-[0_0_20px_rgba(251,113,133,0.5)]' };
};
