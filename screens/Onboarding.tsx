
import React, { useState } from 'react';
import { User } from '../types';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    birthYear: '',
  });
  const [isWelcome, setIsWelcome] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.displayName && formData.username) {
      setIsWelcome(true);
      const userObj: User = {
        id: 'me',
        displayName: formData.displayName,
        username: formData.username.startsWith('@') ? formData.username : `@${formData.username}`,
        birthYear: formData.birthYear,
        avatar: `https://picsum.photos/seed/${formData.username}/200`
      };
      
      // Delay to show the welcome message
      setTimeout(() => {
        onComplete(userObj);
      }, 2500);
    }
  };

  if (isWelcome) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-in fade-in duration-1000">
        <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Registration Complete</h2>
        <p className="text-white/40 text-sm font-light text-center leading-relaxed">
          Welcome to <span className="text-orange-500 font-medium">TELENACH</span>.<br />
          Enjoy calm conversations.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 tracking-widest">
          TELENACH
        </h1>
        <p className="text-white/40 text-[10px] font-light uppercase tracking-[0.5em]">
          Pure Connection
        </p>
      </div>

      <div className="glass-card rounded-[40px] p-8 space-y-6 border border-white/5 relative overflow-hidden">
        {/* Subtle LED Edge */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-orange-500/70 font-bold px-1 ml-1">Display Name</label>
            <input 
              type="text"
              required
              value={formData.displayName}
              onChange={e => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-sm focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-orange-500/70 font-bold px-1 ml-1">Username</label>
            <input 
              type="text"
              required
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              placeholder="@unique"
              className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-sm focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-orange-500/70 font-bold px-1 ml-1">Birth Year</label>
            <input 
              type="number"
              value={formData.birthYear}
              onChange={e => setFormData({ ...formData, birthYear: e.target.value })}
              placeholder="YYYY"
              className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-sm focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
            />
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-orange-600 rounded-2xl font-semibold text-white mt-8 active:scale-[0.98] transition-all orange-glow shadow-lg shadow-orange-600/20 text-xs uppercase tracking-widest"
          >
            Enter Telenach
          </button>
        </form>
      </div>
    </div>
  );
};
