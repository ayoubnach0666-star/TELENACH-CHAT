
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout, onDeleteAccount }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-10 relative">
      <div className="flex flex-col items-center mb-10">
        <div className="w-32 h-32 rounded-[40px] overflow-hidden border-2 border-white/10 mb-6 p-1">
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-[36px]" />
        </div>
        <h2 className="text-2xl font-bold">{user.displayName}</h2>
        <p className="text-orange-500 font-medium">{user.username}</p>
      </div>

      <div className="space-y-4">
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40">Birth Year</span>
            <span className="font-semibold">{user.birthYear}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
            <span className="text-white/40">Bio</span>
            <span className="font-semibold text-right">Designing silence.</span>
          </div>
        </div>

        <button className="w-full glass-card rounded-3xl p-6 flex items-center justify-between text-white/90 hover:bg-white/5 transition-colors">
          <span className="font-medium">Account Security</span>
          <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <button className="w-full glass-card rounded-3xl p-6 flex items-center justify-between text-white/90 hover:bg-white/5 transition-colors">
          <span className="font-medium">Data Privacy</span>
          <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div className="pt-8 space-y-3">
          <button 
            onClick={onLogout}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white active:bg-white/10 transition-all active:scale-95 group"
          >
            <svg className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Logout</span>
          </button>

          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full h-14 bg-red-600/5 border border-red-500/10 rounded-2xl flex items-center justify-center gap-3 text-red-500/60 active:bg-red-600 active:text-white transition-all active:scale-95 group"
          >
            <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setShowDeleteConfirm(false)} 
          />
          <div className="relative w-full max-w-xs glass-card rounded-[40px] p-8 border border-red-500/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Delete Account?</h3>
            <p className="text-xs text-white/40 text-center leading-relaxed mb-8">
              This action cannot be undone. All your messages, groups, and voice room history will be permanently erased.
            </p>
            <div className="space-y-3">
              <button 
                onClick={onDeleteAccount}
                className="w-full h-12 bg-red-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-600/30 active:scale-95 transition-all"
              >
                Permanently Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/60 active:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
