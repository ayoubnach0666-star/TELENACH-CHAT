
import React, { useState } from 'react';
import { VoiceRoom, User, ParticipantRole } from '../types';

interface InsideVoiceRoomProps {
  room: VoiceRoom;
  currentUser: User;
  onExit: () => void;
  onMessageUser?: (user: User) => void;
}

export const InsideVoiceRoom: React.FC<InsideVoiceRoomProps> = ({ room, currentUser, onExit, onMessageUser }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [role, setRole] = useState<ParticipantRole>(room.id === 'v_my' ? 'admin' : 'listener');
  const [requestStatus, setRequestStatus] = useState<'none' | 'pending' | 'accepted'>('none');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Mock requests for admin view
  const [speakerRequests, setSpeakerRequests] = useState<User[]>(
    room.id === 'v_my' ? [room.participants[1]] : []
  );

  const handleRequestToSpeak = () => {
    if (requestStatus === 'none') {
      setRequestStatus('pending');
      // Simulate admin acceptance for demo purposes
      if (role !== 'admin') {
        setTimeout(() => {
          setRequestStatus('accepted');
          setRole('speaker');
          setIsMuted(true);
        }, 4000);
      }
    }
  };

  const handleAdminResponse = (userId: string, approve: boolean) => {
    setSpeakerRequests(prev => prev.filter(u => u.id !== userId));
    // In a production app, this would involve a socket signal
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-8 animate-in fade-in duration-700">
        <h2 className="text-2xl font-bold mb-1 tracking-tight">{room.name}</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
          <p className="text-white/40 text-[9px] uppercase tracking-[0.3em]">On Air</p>
        </div>
      </div>

      {/* Role Badge */}
      <div className="flex justify-center mb-8">
        <div className={`px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 ${role === 'admin' ? 'text-amber-500' : role === 'speaker' ? 'text-orange-500' : 'text-white/40'}`}>
          {role === 'admin' && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>}
          {role}
        </div>
      </div>

      {/* Participant Grid */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 justify-items-center">
          {room.participants.concat(currentUser).map((p) => {
            const isMe = p.id === currentUser.id;
            const isSpeaking = !isMe && p.id === room.participants[0]?.id; // Mock speaking
            return (
              <button 
                key={p.id} 
                onClick={() => setSelectedUser(p)}
                className="flex flex-col items-center gap-3 animate-in zoom-in duration-500 group"
              >
                <div className={`relative transition-all duration-700 ${isSpeaking ? 'scale-110' : 'scale-100 group-active:scale-95'}`}>
                  {isSpeaking && (
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                  )}
                  <div className={`w-20 h-20 rounded-full overflow-hidden border-2 p-1 transition-colors ${isSpeaking ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-white/5 group-hover:border-white/20'}`}>
                    <img src={p.avatar} alt={p.displayName} className="w-full h-full rounded-full object-cover" />
                  </div>
                  {isMe && !isMuted && role === 'speaker' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-[#050505] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 005.93 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"/></svg>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider block ${isSpeaking ? 'text-orange-500' : 'text-white/60'}`}>
                    {p.displayName} {isMe && '(Me)'}
                  </span>
                  {p.id === room.participants[0]?.id && !isMe && (
                    <span className="text-[7px] uppercase tracking-widest text-white/20">Admin</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Speaker Requests Toast (Admin Only) */}
      {role === 'admin' && speakerRequests.length > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80%] z-50 animate-in slide-in-from-top-4">
          <div className="glass-card rounded-2xl p-4 border border-amber-500/20 shadow-xl shadow-black/40">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <img src={speakerRequests[0].avatar} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-white/90">Speaker Request</p>
                <p className="text-[9px] text-white/40">{speakerRequests[0].displayName} wants to talk</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAdminResponse(speakerRequests[0].id, false)}
                className="flex-1 h-9 rounded-xl bg-white/5 text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Reject
              </button>
              <button 
                onClick={() => handleAdminResponse(speakerRequests[0].id, true)}
                className="flex-1 h-9 rounded-xl bg-orange-600 text-[9px] font-bold uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Preview Overlay */}
      {selectedUser && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center px-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setSelectedUser(null)}></div>
          <div className="relative w-full max-w-[280px] glass-card rounded-[40px] p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-white/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-[28px] overflow-hidden border border-white/10 mb-5">
                <img src={selectedUser.avatar} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold mb-1">{selectedUser.displayName}</h3>
              <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-8">{selectedUser.username}</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={() => {
                    if (onMessageUser && selectedUser.id !== currentUser.id) {
                      onMessageUser(selectedUser);
                      setSelectedUser(null);
                    }
                  }}
                  className="w-full h-12 rounded-2xl bg-orange-600 text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-30"
                  disabled={selectedUser.id === currentUser.id}
                >
                  Message
                </button>
                <button 
                   onClick={() => setSelectedUser(null)}
                   className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-auto pt-8">
        <div className="glass-card rounded-[40px] p-6 flex items-center justify-between border border-white/5">
          <button 
            onClick={onExit}
            className="w-14 h-14 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>

          {role === 'listener' ? (
            <button 
              onClick={handleRequestToSpeak}
              disabled={requestStatus === 'pending'}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 shadow-lg border relative group ${
                requestStatus === 'pending'
                  ? 'border-amber-500/50 text-amber-500 bg-amber-500/5'
                  : 'border-orange-500/40 text-orange-500/80 bg-orange-500/5 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              {requestStatus === 'pending' && <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping"></div>}
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
              <span className="text-[8px] font-bold uppercase tracking-widest">
                {requestStatus === 'pending' ? 'Pending' : 'Request'}
              </span>
            </button>
          ) : (
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                isMuted 
                  ? 'bg-white/5 text-white/30 border border-white/10' 
                  : 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
              }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
            </button>
          )}

          <button className="w-14 h-14 rounded-full bg-white/5 text-white/30 flex items-center justify-center active:scale-95 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
