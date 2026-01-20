
import React, { useState } from 'react';
import { GroupPrivacy } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateVoiceRoom: () => void;
  onCreateGroup: (name: string, privacy: GroupPrivacy) => void;
  onSearchGroup: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreateVoiceRoom, onCreateGroup, onSearchGroup }) => {
  const [step, setStep] = useState<'main' | 'group'>('main');
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState<GroupPrivacy>('private');

  if (!isOpen) return null;

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim()) {
      onCreateGroup(groupName, privacy);
      setGroupName('');
      setStep('main');
      onClose();
    }
  };

  const renderMain = () => (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-6">Create New</h2>
      
      <button 
        onClick={() => { onCreateVoiceRoom(); onClose(); }}
        className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10 transition-all"
      >
        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">Voice Room</div>
          <div className="text-[10px] text-white/40 uppercase tracking-tighter">Live Audio Session</div>
        </div>
      </button>

      <button 
        onClick={() => setStep('group')}
        className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10 transition-all"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">New Group</div>
          <div className="text-[10px] text-white/40 uppercase tracking-tighter">Private Chat Space</div>
        </div>
      </button>

      <button 
        onClick={() => { onSearchGroup(); onClose(); }}
        className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10 transition-all"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">Search Group</div>
          <div className="text-[10px] text-white/40 uppercase tracking-tighter">Find by Name</div>
        </div>
      </button>
    </div>
  );

  const renderGroupCreate = () => (
    <div className="space-y-5 animate-in slide-in-from-right-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setStep('main')} className="text-white/40 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-lg font-semibold">New Group</h2>
      </div>

      <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Group Name</label>
          <input 
            type="text"
            required
            autoFocus
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="e.g. Design Explorers"
            className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="text-xs">Public Group</div>
          <button 
            type="button"
            onClick={() => setPrivacy(privacy === 'public' ? 'private' : 'public')}
            className={`w-12 h-6 rounded-full relative transition-colors ${privacy === 'public' ? 'bg-orange-600' : 'bg-white/10'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacy === 'public' ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="p-4 bg-orange-600/5 border border-orange-500/10 rounded-2xl">
          <p className="text-[9px] text-orange-500/70 uppercase tracking-widest leading-relaxed">
            Limit: 100 Members • 1 Admin • 2 Moderators
          </p>
        </div>

        <button 
          type="submit"
          className="w-full h-12 bg-orange-600 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-white shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
        >
          Create Group
        </button>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xs glass-card rounded-[40px] p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-white/20 hover:text-white/40">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        {step === 'main' ? renderMain() : renderGroupCreate()}
      </div>
    </div>
  );
};
