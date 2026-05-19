import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CyberGrid } from './components/CyberGrid';
import { LoginPage } from './components/LoginPage';
import InputPage from './components/InputPage';
import ResultPage from './components/ResultPage';
import { MODULES, calculateModuleAverage, TOTAL_COEFF } from './utils/constants';
import { NeonLogo } from './components/NeonLogo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('input'); // 'input' | 'result'
  const [values, setValues] = useState({});
  const [results, setResults] = useState(null);
  const [finalAverage, setFinalAverage] = useState(0);

  // Load from LocalStorage
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('cybercalc-auth');
    if (savedAuth === 'true') setIsAuthenticated(true);

    const saved = localStorage.getItem('semester-calc-data');
    if (saved) {
      try {
        setValues(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('cybercalc-auth', 'true');
  };

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cybercalc-auth');
  };

  return (
    <div className="min-h-screen relative font-sans text-[var(--color-foreground)] antialiased bg-[var(--color-background)] overflow-hidden selection:bg-[var(--color-neon-cyan)]/30">
      
      {/* Global Cyber Background */}
      <CyberGrid />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/10 via-transparent to-[var(--color-neon-cyan)]/10 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-neon-purple)]/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center overflow-x-hidden pt-4 pb-20">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="w-full flex-1 flex flex-col"
            >
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-4xl px-4 flex flex-col"
            >
              <header className="w-full py-6 flex justify-between items-center border-b border-[var(--color-border)]/50 mb-8">
                <NeonLogo />
                <button 
                  onClick={handleLogout}
                  className="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-neon-purple)] uppercase tracking-widest transition-colors"
                >
                  Terminate Session
                </button>
              </header>

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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {isAuthenticated && (
        <footer className="fixed bottom-0 w-full p-4 border-t border-[var(--color-neon-cyan)]/20 bg-[var(--color-background)]/80 backdrop-blur-md flex justify-between items-center text-[10px] font-mono text-[var(--color-neon-cyan)] z-50 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-cyan)] animate-pulse" />
            System Online
          </div>
          <div>CYBERCALC v1.0.42 // ENCRYPTION ACTIVE</div>
        </footer>
      )}
    </div>
  );
}

export default App;
