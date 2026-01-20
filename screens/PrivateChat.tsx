
import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message, User, GroupMember } from '../types';

interface PrivateChatProps {
  chat: Chat;
  currentUser: User;
  onBack: () => void;
  onInfoClick?: () => void;
}

export const PrivateChat: React.FC<PrivateChatProps> = ({ chat, currentUser, onBack, onInfoClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [cancelSlide, setCancelSlide] = useState(0);
  const [recordedAudioReady, setRecordedAudioReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordTimer = useRef<number | null>(null);

  useEffect(() => {
    // Initial messages logic
    setMessages([
      { id: '1', senderId: chat.participants[0]?.id || '1', text: "Hey! How's your day going?", type: 'text', timestamp: '14:20', status: 'read' },
      { id: '2', senderId: currentUser.id, text: "Pretty good! Just finishing up some work. You?", type: 'text', timestamp: '14:22', status: 'read' },
      { id: '3', senderId: chat.participants[0]?.id || '1', voiceDuration: '0:08', type: 'voice', timestamp: '14:25', status: 'read' },
    ]);
  }, [chat, currentUser.id]);

  const myGroupProfile = chat.groupMembers?.find(m => m.id === currentUser.id);
  const isMuted = myGroupProfile?.isMuted || false;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      recordTimer.current = window.setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (recordTimer.current) clearInterval(recordTimer.current);
    }
    return () => { if (recordTimer.current) clearInterval(recordTimer.current); };
  }, [isRecording]);

  const handleSend = () => {
    if (!input.trim() || isMuted) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: input,
      type: 'text',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const startRecording = () => {
    if (!isMuted) {
      setIsRecording(true);
      setRecordDuration(0);
      setRecordedAudioReady(false);
    }
  };

  const stopRecording = (shouldReady: boolean) => {
    setIsRecording(false);
    if (shouldReady && recordDuration > 0) {
      setRecordedAudioReady(true);
    } else {
      setRecordDuration(0);
    }
  };

  const sendVoiceMessage = () => {
    if (recordDuration > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        voiceDuration: `0:${recordDuration.toString().padStart(2, '0')}`,
        type: 'voice',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
    }
    setRecordedAudioReady(false);
    setRecordDuration(0);
  };

  const handleMicTouch = (e: React.TouchEvent) => {
    if (e.type === 'touchstart') startRecording();
    if (e.type === 'touchend') stopRecording(cancelSlide > -100);
  };

  const handleMicMove = (e: React.TouchEvent) => {
    if (!isRecording) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const deltaX = touch.clientX - rect.left;
    if (deltaX < 0) {
      setCancelSlide(Math.max(deltaX, -150));
    }
  };

  const Waveform = ({ active }: { active?: boolean }) => (
    <div className="flex items-center gap-1 h-6">
      {[4, 8, 5, 10, 6, 8, 4, 7, 9, 5].map((h, i) => (
        <div 
          key={i} 
          className={`w-0.5 rounded-full ${active ? 'bg-white' : 'bg-orange-500/60'}`} 
          style={{ height: `${h * 2}px` }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Group Header Info */}
      {chat.isGroup && (
        <div 
          onClick={onInfoClick}
          className="px-6 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between active:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
             </div>
             <div>
               <p className="text-xs font-semibold">{chat.groupName}</p>
               <p className="text-[8px] uppercase tracking-widest text-white/30">{chat.groupMembers?.length || chat.participants.length} members</p>
             </div>
          </div>
          <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 relative z-10" ref={scrollRef}>
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          const sender = chat.groupMembers?.find(m => m.id === msg.senderId);
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-[28px] px-5 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                isMe 
                  ? 'bg-orange-600 text-white rounded-tr-sm shadow-xl shadow-orange-900/20' 
                  : 'glass-card text-white/90 rounded-tl-sm border border-white/5'
              }`}>
                {!isMe && chat.isGroup && (
                  <p className="text-[9px] font-bold text-orange-500 mb-1.5 uppercase tracking-widest opacity-80">
                    {sender?.displayName || '@someone'}
                  </p>
                )}
                {msg.type === 'text' ? (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="flex items-center gap-4 min-w-[140px]">
                    <button className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${isMe ? 'bg-white/20' : 'bg-orange-600/20 text-orange-500'}`}>
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    </button>
                    <div className="flex-1">
                      <Waveform active={isMe} />
                    </div>
                    <span className="text-[10px] font-bold opacity-60 font-mono">{msg.voiceDuration}</span>
                  </div>
                )}
                <div className={`text-[9px] mt-2 text-right opacity-50 flex items-center justify-end gap-1 ${isMe ? 'text-white/80' : 'text-white/40'}`}>
                  {msg.timestamp}
                  {isMe && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-4 bg-black/40 backdrop-blur-xl border-t border-white/5 relative z-10 h-24 flex items-center">
        {isMuted ? (
           <div className="flex-1 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 gap-3">
             <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Muted in this group</span>
           </div>
        ) : recordedAudioReady ? (
           <div className="flex-1 flex items-center justify-between animate-in slide-in-from-bottom-2">
             <div className="flex items-center gap-4 bg-white/5 px-4 h-12 rounded-2xl border border-white/10 flex-1 mr-3">
               <button onClick={() => setRecordedAudioReady(false)} className="text-white/30 hover:text-red-500">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
               </button>
               <div className="flex-1 flex justify-center">
                 <Waveform />
               </div>
               <span className="text-[10px] font-mono text-orange-500">0:{recordDuration.toString().padStart(2, '0')}</span>
             </div>
             <button 
              onClick={sendVoiceMessage}
              className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/30 active:scale-95"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
             </button>
           </div>
        ) : isRecording ? (
          <div className="flex-1 flex items-center justify-between animate-in slide-in-from-right-4">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-xs font-mono tabular-nums">0:{recordDuration.toString().padStart(2, '0')}</span>
             </div>
             <div className="text-white/30 text-[10px] uppercase tracking-widest flex items-center gap-2">
               <svg className="w-3 h-3 animate-[slideLeft_2s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
               Slide to cancel
             </div>
             <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/40 relative">
               <div className="absolute inset-0 bg-orange-500/20 rounded-2xl animate-ping"></div>
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/5 text-white/30 hover:text-orange-500 hover:bg-white/10 transition-all active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
            
            <div className="flex-1">
              <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Message..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>

            {input.trim() ? (
              <button 
                onClick={handleSend}
                className="w-11 h-11 rounded-2xl flex items-center justify-center bg-orange-600 text-white shadow-lg shadow-orange-600/30 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </button>
            ) : (
              <button 
                onTouchStart={handleMicTouch}
                onTouchEnd={handleMicTouch}
                onTouchMove={handleMicMove}
                className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/5 text-white/30 hover:text-orange-500 hover:bg-white/10 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
