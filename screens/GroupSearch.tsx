
import React, { useState } from 'react';
import { Chat, MessageType } from '../types';

interface GroupSearchProps {
  onBack: () => void;
  onSelectGroup: (group: Chat) => void;
}

export const GroupSearch: React.FC<GroupSearchProps> = ({ onBack, onSelectGroup }) => {
  const [query, setQuery] = useState('');

  // Mock search results
  // Fix: Added explicit type casting for 'type' and 'status' to resolve union type assignment errors
  const mockResults: Chat[] = query.trim() ? [
    {
      id: 'search1',
      isGroup: true,
      groupName: 'Night Owls',
      participants: [],
      lastMessage: { 
        id: 'sm1', 
        senderId: 'sys', 
        text: 'Public group for night thinking.', 
        type: 'text' as MessageType, 
        timestamp: 'Today', 
        status: 'read' as 'sent' | 'delivered' | 'read'
      },
      unreadCount: 0
    },
    {
      id: 'search2',
      isGroup: true,
      groupName: 'Creative Lounge',
      participants: [],
      lastMessage: { 
        id: 'sm2', 
        senderId: 'sys', 
        text: 'Where art meets conversation.', 
        type: 'text' as MessageType, 
        timestamp: 'Yesterday', 
        status: 'read' as 'sent' | 'delivered' | 'read'
      },
      unreadCount: 0
    }
  ].filter(g => g.groupName?.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-6 py-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-orange-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Search Groups</h2>
      </div>

      <div className="relative mb-8">
        <input 
          type="text"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Group name..."
          className="w-full bg-white/5 border border-white/10 rounded-3xl h-14 px-12 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {mockResults.length > 0 ? (
          mockResults.map(group => (
            <button 
              key={group.id}
              onClick={() => onSelectGroup(group)}
              className="w-full glass-card rounded-[32px] p-5 flex items-center justify-between group active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white/90">{group.groupName}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{group.lastMessage.text}</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-white/10 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          ))
        ) : query ? (
          <div className="text-center py-20 opacity-30">
            <p className="text-sm">No groups found with that name.</p>
          </div>
        ) : (
          <div className="text-center py-20 opacity-20">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
            <p className="text-[10px] uppercase tracking-[0.2em]">Enter a name to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};
