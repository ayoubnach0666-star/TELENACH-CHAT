
import React, { useState } from 'react';
import { User } from '../types';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthYear: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simple hashing simulation using btoa (Base64) + a secret salt for the demo
  const hashPassword = (pass: string) => {
    return btoa(`SALT_TELENACH_${pass}_END`);
  };

  const validate = () => {
    if (mode === 'signup') {
      if (!formData.displayName) return "Display Name is required";
      if (!formData.username) return "Username is required";
      if (formData.password.length < 8) return "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    } else {
      if (!formData.username) return "Username is required";
      if (!formData.password) return "Password is required";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('telenach_users') || '[]');
    const username = formData.username.startsWith('@') ? formData.username : `@${formData.username}`;

    if (mode === 'signup') {
      const exists = storedUsers.find((u: any) => u.username.toLowerCase() === username.toLowerCase());
      if (exists) {
        setError("Username already taken");
        return;
      }

      const newUser: User = {
        id: `u_${Date.now()}`,
        displayName: formData.displayName,
        username: username,
        password: hashPassword(formData.password),
        birthYear: formData.birthYear,
        avatar: `https://picsum.photos/seed/${formData.username}/200`,
        stories: []
      };

      storedUsers.push(newUser);
      localStorage.setItem('telenach_users', JSON.stringify(storedUsers));
      setIsSuccess(true);
      setTimeout(() => onComplete(newUser), 1500);
    } else {
      const user = storedUsers.find((u: any) => 
        u.username.toLowerCase() === username.toLowerCase() && 
        u.password === hashPassword(formData.password)
      );

      if (user) {
        setIsSuccess(true);
        setTimeout(() => onComplete(user), 1500);
      } else {
        setError("Invalid username or password");
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-in fade-in duration-1000">
        <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(234,88,12,0.2)]">
          <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">{mode === 'signup' ? 'Registered' : 'Logged In'}</h2>
        <p className="text-white/40 text-sm font-light text-center leading-relaxed">
          Welcome back to <span className="text-orange-500 font-medium">TELENACH</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 overflow-y-auto">
      <div className="mb-10 text-center animate-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-bold mb-2 tracking-[0.2em]">
          TELENACH
        </h1>
        <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.6em]">
          Elegance • Silence • Pure
        </p>
      </div>

      <div className="glass-card rounded-[40px] p-8 space-y-6 border border-white/5 relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        
        <div className="flex p-1 bg-white/5 rounded-2xl mb-2">
          <button 
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40'}`}
          >
            Login
          </button>
          <button 
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40'}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] p-3 rounded-xl text-center animate-in shake-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-widest text-white/30 ml-2">Display Name</label>
              <input 
                type="text"
                required
                value={formData.displayName}
                onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="Name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[8px] uppercase tracking-widest text-white/30 ml-2">Username</label>
            <input 
              type="text"
              required
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              placeholder="@username"
              className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[8px] uppercase tracking-widest text-white/30 ml-2">Password</label>
            <input 
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>

          {mode === 'signup' && (
            <>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-white/30 ml-2">Confirm Password</label>
                <input 
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-white/30 ml-2">Birth Year</label>
                <input 
                  type="number"
                  value={formData.birthYear}
                  onChange={e => setFormData({ ...formData, birthYear: e.target.value })}
                  placeholder="1995"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                />
              </div>
            </>
          )}

          <button 
            type="submit"
            className="w-full h-12 bg-orange-600 rounded-2xl font-bold text-white mt-4 active:scale-95 transition-all orange-glow shadow-lg shadow-orange-600/30 text-[10px] uppercase tracking-widest"
          >
            {mode === 'login' ? 'Access Account' : 'Create Identity'}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-[8px] text-white/20 uppercase tracking-[0.3em] font-light">
        Protected by TELENACH Cryptography
      </div>
    </div>
  );
};
