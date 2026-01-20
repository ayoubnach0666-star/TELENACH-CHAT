
import React from 'react';
import { User } from '../types';
import { StoryRing } from './StoryRing';

interface ProfilePanelProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onOpenStory: () => void;
  onSettingsClick: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ user, isOpen, onClose, onOpenStory, onSettingsClick }) => {
  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm glass-card transition-transform duration-500 ease-out border-l border-white/10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col px-8 py-10 relative overflow-hidden">
          {/* Subtle LED in panel */}
          <div className="absolute -right-20 top-20 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px]"></div>

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-sm font-semibold tracking-widest text-white/40 uppercase">My Identity</h2>
            <button onClick={onSettingsClick} className="p-2 -mr-2 text-white/30 hover:text-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </button>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="mb-6">
              <StoryRing user={user} size="xl" onClick={onOpenStory} />
            </div>
            <h3 className="text-2xl font-bold mb-1">{user.displayName}</h3>
            <p className="text-orange-500 font-medium tracking-wide">{user.username}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 border border-white/5 rounded-3xl p-5 text-center">
              <div className="text-lg font-bold">12</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">Groups</div>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-5 text-center">
              <div className="text-lg font-bold">4</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">Voice Rooms</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 px-2">
              <div className="w-8 h-8 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <div className="text-xs font-semibold">Joined 2024</div>
                <div className="text-[10px] text-white/30 uppercase tracking-tighter">Established Member</div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button 
              onClick={onClose}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl text-xs font-semibold uppercase tracking-[0.2em] active:bg-white/10 transition-colors"
            >
              Close Panel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
