
import React, { useState } from 'react';
import { Chat, User, GroupMember, GroupRole } from '../types';

interface GroupInfoProps {
  chat: Chat;
  currentUser: User;
  onBack: () => void;
  onUpdateMember: (memberId: string, updates: Partial<GroupMember>) => void;
  onRemoveMember: (memberId: string) => void;
  onDeleteGroup: () => void;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({ chat, currentUser, onBack, onUpdateMember, onRemoveMember, onDeleteGroup }) => {
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const myRole = chat.groupMembers?.find(m => m.id === currentUser.id)?.groupRole || 'member';

  const canManageMember = (member: GroupMember) => {
    if (member.id === currentUser.id) return false;
    if (myRole === 'admin') return true;
    if (myRole === 'moderator' && member.groupRole === 'member') return true;
    return false;
  };

  const getModeratorCount = () => chat.groupMembers?.filter(m => m.groupRole === 'moderator').length || 0;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-orange-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Group Info</h2>
      </div>

      {/* Group Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-24 h-24 rounded-[32px] bg-orange-600/20 flex items-center justify-center text-orange-500 mb-4 border border-orange-500/20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        </div>
        <h3 className="text-xl font-bold">{chat.groupName}</h3>
        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{chat.groupMembers?.length} Members</p>
      </div>

      {/* Member List */}
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-widest text-orange-500 font-bold ml-2">Members</h4>
        <div className="glass-card rounded-[32px] overflow-hidden">
          {chat.groupMembers?.map((member) => (
            <button 
              key={member.id}
              onClick={() => canManageMember(member) && setSelectedMember(member)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                  <img src={member.avatar} alt="p" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    {member.displayName}
                    {member.isMuted && <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-white/30">{member.groupRole}</div>
                </div>
              </div>
              {canManageMember(member) && (
                <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
              )}
            </button>
          ))}
        </div>

        {myRole === 'admin' && (
          <div className="pt-8">
            <button 
              onClick={() => window.confirm('Delete group?') && onDeleteGroup()}
              className="w-full h-14 rounded-2xl border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest active:bg-red-500 active:text-white transition-all"
            >
              Delete Group
            </button>
          </div>
        )}
      </div>

      {/* Member Action Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedMember(null)}></div>
          <div className="relative w-full max-w-sm glass-card rounded-[40px] p-8 border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <h3 className="text-lg font-bold mb-6 text-center">{selectedMember.displayName}</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => { onUpdateMember(selectedMember.id, { isMuted: !selectedMember.isMuted }); setSelectedMember(null); }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-sm">{selectedMember.isMuted ? 'Unmute Member' : 'Mute Member'}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedMember.isMuted ? 'bg-orange-600/20 text-orange-500' : 'bg-white/5 text-white/30'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                </div>
              </button>

              {myRole === 'admin' && (
                <button 
                  onClick={() => {
                    const newRole = selectedMember.groupRole === 'moderator' ? 'member' : 'moderator';
                    if (newRole === 'moderator' && getModeratorCount() >= 2) {
                      alert('Maximum 2 moderators allowed.');
                      return;
                    }
                    onUpdateMember(selectedMember.id, { groupRole: newRole });
                    setSelectedMember(null);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm">{selectedMember.groupRole === 'moderator' ? 'Remove Moderator' : 'Make Moderator'}</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                </button>
              )}

              <button 
                onClick={() => { onRemoveMember(selectedMember.id); setSelectedMember(null); }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-600/5 hover:bg-red-600/10 text-red-500 transition-colors"
              >
                <span className="text-sm">Remove from Group</span>
                <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => setSelectedMember(null)}
              className="w-full h-14 mt-6 bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/40"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
