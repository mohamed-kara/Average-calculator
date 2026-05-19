import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import InputPage from './components/InputPage';
import ResultPage from './components/ResultPage';
import { MODULES, calculateModuleAverage, TOTAL_COEFF } from './utils/constants';

function App() {
  const [view, setView] = useState('input'); // 'input' | 'result'
  const [values, setValues] = useState({});
  const [results, setResults] = useState(null);
  const [finalAverage, setFinalAverage] = useState(0);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('semester-calc-data');
    if (saved) {
      try {
        setValues(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    }
  }, []);

  const handleValueChange = (moduleId, type, value) => {
    const newValues = {
      ...values,
      [moduleId]: {
        ...values[moduleId],
        [type]: value,
      }
    };
    setValues(newValues);
    localStorage.setItem('semester-calc-data', JSON.stringify(newValues));
  };

  const handleCalculate = () => {
    let totalScore = 0;
    const computedResults = MODULES.map(mod => {
      const td = values[mod.id]?.td || '0';
      const exam = values[mod.id]?.exam || '0';
      const avg = calculateModuleAverage(td, exam);
      const modTotal = avg * mod.coeff;
      totalScore += modTotal;
      
      return {
        module: mod,
        td,
        exam,
        average: avg.toFixed(2)
      };
    });

    const finalAvg = totalScore / TOTAL_COEFF;
    
    setResults(computedResults);
    setFinalAverage(finalAvg);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setView('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-200 antialiased selection:bg-cyan-500/30">
      <Background />
      
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center overflow-x-hidden pt-8 pb-20">
        <AnimatePresence mode="wait">
          {view === 'input' ? (
            <InputPage 
              key="input" 
              values={values} 
              onValueChange={handleValueChange}
              onCalculate={handleCalculate}
            />
          ) : (
            <ResultPage 
              key="result"
              results={results}
              finalAverage={finalAverage}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 w-full p-4 text-center text-xs font-medium text-slate-500 z-10 mix-blend-difference pointer-events-none">
        <p>Ultra-Premium Semester Calculator © 2026</p>
      </footer>
    </div>
  );
}

export default App;
