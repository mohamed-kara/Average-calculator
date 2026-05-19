import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, ArrowRight, Fingerprint, Network } from 'lucide-react';
import { CyberGrid } from './CyberGrid';
import { NeonLogo } from './NeonLogo';

export function LoginPage({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const cleanedEmail = email.trim().toLowerCase();
    if (!cleanedEmail.endsWith('@constantine2.dz') && !cleanedEmail.endsWith('@gmail.com') && !cleanedEmail.endsWith('@univ-constantine2.dz')) {
      setErrorMsg('ACCESS DENIED — UNAUTHORIZED DOMAIN');
      setIsLoading(false);
      return;
    }

    setSuccessMsg('ACADEMIC ACCESS VERIFIED');
    
    // Simulate loading system before redirecting
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] overflow-hidden font-sans">
      <CyberGrid />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/10 via-transparent to-[var(--color-neon-cyan)]/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-neon-purple)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-neon-cyan)]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-8">
          <NeonLogo />
        </header>
        
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Card wrapper */}
            <div className="relative group">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-purple)] to-[var(--color-neon-cyan)] rounded-xl blur-lg opacity-30 transition-opacity duration-500 group-hover:opacity-60" />
              
              {/* Main card */}
              <div className="relative bg-[var(--color-card)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-xl p-8 md:p-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-neon-cyan)]/30 bg-[var(--color-neon-cyan)]/5 text-[var(--color-neon-cyan)] text-xs uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-cyan)] animate-pulse" />
                    Secure Portal
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    System Access
                  </h1>
                  <p className="text-[var(--color-muted-foreground)] text-sm">
                    Enter academic credentials to initialize
                  </p>
                </div>
                
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider block">
                      Full Name
                    </label>
                    <div className="relative group/input">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] group-focus-within/input:text-[var(--color-neon-cyan)] transition-colors" />
                      <input
                        type="text"
                        placeholder="Agent Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-11 pr-4 h-12 bg-[var(--color-input)] border border-[var(--color-border)] rounded-md text-white placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-neon-cyan)] transition-all"
                        required
                      />
                      <div className="absolute inset-0 -z-10 opacity-0 group-focus-within/input:opacity-100 transition-opacity blur-sm bg-[var(--color-neon-cyan)]/10 rounded-lg pointer-events-none" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider block">
                      University Email
                    </label>
                    <div className="relative group/input">
                      <Network className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] group-focus-within/input:text-[var(--color-neon-cyan)] transition-colors" />
                      <input
                        type="email"
                        placeholder="name@univ-constantine2.dz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 h-12 bg-[var(--color-input)] border border-[var(--color-border)] rounded-md text-white placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-neon-cyan)] transition-all"
                        required
                      />
                      <div className="absolute inset-0 -z-10 opacity-0 group-focus-within/input:opacity-100 transition-opacity blur-sm bg-[var(--color-neon-cyan)]/10 rounded-lg pointer-events-none" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider block">
                      Access Key
                    </label>
                    <div className="relative group/input">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] group-focus-within/input:text-[var(--color-neon-cyan)] transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 h-12 bg-[var(--color-input)] border border-[var(--color-border)] rounded-md text-white placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-neon-cyan)] transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-neon-cyan)] transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <div className="absolute inset-0 -z-10 opacity-0 group-focus-within/input:opacity-100 transition-opacity blur-sm bg-[var(--color-neon-cyan)]/10 rounded-lg pointer-events-none" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm font-bold text-center neon-text-red animate-glitch"
                      >
                        {errorMsg}
                      </motion.div>
                    )}
                    {successMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[var(--color-neon-cyan)] text-sm font-bold text-center neon-text-cyan animate-pulse"
                      >
                        {successMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isLoading || successMsg}
                    className="w-full h-12 rounded-md bg-transparent border-2 border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-[var(--color-background)] font-semibold uppercase tracking-wider transition-all duration-300 neon-border-cyan disabled:opacity-50 disabled:cursor-not-allowed group/btn flex items-center justify-center relative overflow-hidden"
                  >
                    {isLoading && !successMsg ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Authenticating...</span>
                      </div>
                    ) : successMsg ? (
                      <div className="flex items-center gap-2 text-[var(--color-background)]">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>System Loading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Initialize Access</span>
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Decorative corner brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--color-neon-cyan)] pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--color-neon-purple)] pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--color-neon-purple)] pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--color-neon-cyan)] pointer-events-none" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
