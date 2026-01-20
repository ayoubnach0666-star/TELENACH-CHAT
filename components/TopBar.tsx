
import React, { useState } from 'react';
import { User } from '../types';

interface TopBarProps {
  user: User;
  onProfileClick: () => void;
  showTitle?: string;
  onBack?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ user, onProfileClick, showTitle = "TELENACH", onBack }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 h-16 bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-1 -ml-1 text-orange-500/80">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
        )}
        <h1 className="text-sm font-semibold tracking-widest text-white/90">
          <span className="text-orange-500">T</span>ELE<span className="text-orange-500">N</span>ACH
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className={`relative flex items-center transition-all duration-300 ${isSearchActive ? 'w-32' : 'w-10'}`}>
          <input
            type="text"
            placeholder="@username"
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
            className={`w-full h-8 pl-8 pr-2 text-xs bg-white/5 rounded-full border border-white/10 focus:outline-none focus:border-orange-500/50 transition-all ${isSearchActive ? 'opacity-100' : 'opacity-0'}`}
          />
          <button 
            onClick={() => setIsSearchActive(!isSearchActive)}
            className="absolute left-0 w-8 h-8 flex items-center justify-center text-white/40 hover:text-orange-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>
        
        <button 
          onClick={onProfileClick}
          className="w-8 h-8 rounded-full overflow-hidden border border-white/10 active:scale-95 transition-transform"
        >
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
};
