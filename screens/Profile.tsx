
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-10">
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

        <button className="w-full h-16 rounded-3xl text-red-500/80 font-semibold uppercase tracking-widest text-[10px] flex items-center justify-center mt-10">
          Delete Account
        </button>
      </div>
    </div>
  );
};
