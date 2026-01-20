
import React from 'react';
import { VoiceRoom } from '../types';

interface VoiceRoomListProps {
  rooms: VoiceRoom[];
  onRoomClick: (room: VoiceRoom) => void;
  onBack: () => void;
}

export const VoiceRoomList: React.FC<VoiceRoomListProps> = ({ rooms, onRoomClick, onBack }) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Voice Rooms</h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1 font-medium">Happening Now</p>
        </div>
      </div>

      <div className="space-y-4">
        {rooms.map(room => (
          <button 
            key={room.id}
            onClick={() => onRoomClick(room)}
            className="w-full glass-card rounded-[32px] p-6 text-left group active:scale-[0.98] transition-all relative overflow-hidden border border-white/5"
          >
            {room.isLive && (
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-600"></div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-lg font-semibold truncate flex items-center gap-2">
                  {room.name}
                  {room.isPrivate && (
                    <svg className="w-3.5 h-3.5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  )}
                </h3>
                <p className="text-[9px] text-white/30 uppercase tracking-widest mt-0.5">
                  {room.isPrivate ? 'Private Session' : 'Public Room'}
                </p>
              </div>
              {room.isLive && (
                <div className="px-2 py-0.5 rounded-full bg-orange-600/10 border border-orange-500/20">
                  <span className="text-[9px] font-bold text-orange-500 uppercase tracking-tighter">Live</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2.5">
                {room.participants.slice(0, 3).map((p, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#050505] overflow-hidden bg-white/5">
                    <img src={p.avatar} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
                {room.participants.length > 3 && (
                  <div className="w-9 h-9 rounded-full border-2 border-[#050505] bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white/40">
                    +{room.participants.length - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/30">
                <span className="text-[10px] font-medium uppercase tracking-widest">
                  {room.participants.length} Active
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
