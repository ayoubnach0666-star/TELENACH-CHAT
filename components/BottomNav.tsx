import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onPlusClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, onPlusClick }) => {
  return (
    <div 
      className="bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-8 relative"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom)',
        height: 'calc(5rem + env(safe-area-inset-bottom))' 
      }}
    >
      <button 
        onClick={() => onNavigate('messages')}
        className={`flex flex-col items-center transition-colors ${currentScreen === 'messages' || currentScreen === 'chat' ? 'text-orange-500' : 'text-white/40'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        <span className="text-[10px] mt-1 font-medium">Chats</span>
      </button>

      <div className="relative">
        <button 
          onClick={onPlusClick}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/30 active:scale-95 transition-all z-20"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        </button>
      </div>

      <button 
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center transition-colors ${currentScreen === 'profile' ? 'text-orange-500' : 'text-white/40'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        <span className="text-[10px] mt-1 font-medium">Profile</span>
      </button>
    </div>
  );
};