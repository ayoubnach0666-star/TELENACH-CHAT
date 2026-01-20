
import React from 'react';
import { Chat, VoiceRoom, User } from '../types';
import { StoryRing } from '../components/StoryRing';

interface ChatListProps {
  chats: Chat[];
  activeVoiceRooms: VoiceRoom[];
  onChatClick: (chat: Chat) => void;
  onVoiceRoomPillClick: () => void;
  onStoryClick: (user: User) => void;
  onCreateGroupShortcut: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, activeVoiceRooms, onChatClick, onVoiceRoomPillClick, onStoryClick, onCreateGroupShortcut }) => {
  const liveCount = activeVoiceRooms.filter(r => r.isLive).length;
  const groups = chats.filter(c => c.isGroup);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1">
      {/* Discreet Voice Room Access */}
      {liveCount > 0 && (
        <button 
          onClick={onVoiceRoomPillClick}
          className="mx-2 mb-4 p-3 glass-card rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full relative"></div>
            </div>
            <span className="text-xs font-semibold tracking-wide text-white/80">Voice Rooms Live</span>
          </div>
          <div className="flex -space-x-2">
            {activeVoiceRooms[0].participants.slice(0, 3).map((p, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] overflow-hidden">
                <img src={p.avatar} alt="p" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </button>
      )}

      {/* Group Placeholder Shortcut if none exist */}
      {groups.length === 0 && (
        <button 
          onClick={onCreateGroupShortcut}
          className="mx-2 mb-6 p-5 glass-card rounded-[32px] flex items-center gap-5 group active:scale-[0.98] transition-all border border-orange-500/5"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-white/80">Start a Group</h4>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Private calm space</p>
          </div>
        </button>
      )}

      {/* Message List */}
      <div className="space-y-1">
        {chats.map(chat => (
          <div 
            key={chat.id}
            className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => onChatClick(chat)}
          >
            {chat.isGroup ? (
              <div className="relative w-14 h-14 flex-shrink-0">
                <div className="absolute top-0 right-0 w-10 h-10 rounded-2xl overflow-hidden border-2 border-[#050505] z-10 bg-orange-600/10">
                  <img src={chat.participants[0]?.avatar || 'https://picsum.photos/seed/group/200'} className="w-full h-full object-cover opacity-80" alt="p1" />
                </div>
                <div className="absolute bottom-0 left-0 w-10 h-10 rounded-2xl overflow-hidden border-2 border-[#050505] bg-orange-900/40 flex items-center justify-center">
                   <span className="text-[10px] font-bold text-orange-500">
                     {chat.groupMembers?.length || chat.participants.length}
                   </span>
                </div>
              </div>
            ) : (
              <StoryRing user={chat.participants[0]} onClick={() => onStoryClick(chat.participants[0])} />
            )}
            
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-white/90 truncate">
                  {chat.isGroup ? chat.groupName : chat.participants[0].displayName}
                </h3>
                <span className="text-[10px] text-white/30 uppercase">{chat.lastMessage.timestamp}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-white/40 truncate pr-4">
                  {chat.isGroup && <span className="text-orange-500/50 mr-1">@someone:</span>}
                  {chat.lastMessage.text}
                </p>
                {chat.unreadCount > 0 && (
                  <div className="min-w-[18px] h-[18px] bg-orange-600 rounded-full flex items-center justify-center text-[10px] font-bold px-1">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
