
import React, { useEffect, useState } from 'react';
import { User, Story } from '../types';

interface StoryViewerProps {
  user: User;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ user, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const stories = user.stories || [];
  const story = stories[currentIdx];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIdx < stories.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        onClose();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIdx, stories, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      <div className="absolute inset-0 z-0">
        <img src={story.imageUrl} alt="story" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        {/* LED Glow matching accent */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 p-6 flex-1 flex flex-col">
        {/* Progress Bars */}
        <div className="flex gap-1 mb-6">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-orange-500 transition-all ease-linear ${i === currentIdx ? 'w-full duration-[5000ms]' : i < currentIdx ? 'w-full' : 'w-0'}`}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold">{user.displayName}</div>
              <div className="text-[10px] text-white/50">{story.timestamp}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content Overlay */}
        <div className="flex-1 flex flex-col justify-end pb-12">
          {story.text && (
            <p className="text-xl font-light text-center px-4 leading-relaxed tracking-tight text-white/90">
              {story.text}
            </p>
          )}
        </div>
      </div>

      {/* Tap Zones */}
      <div className="absolute inset-0 z-20 flex">
        <div className="flex-1" onClick={() => currentIdx > 0 && setCurrentIdx(prev => prev - 1)}></div>
        <div className="flex-1" onClick={() => currentIdx < stories.length - 1 ? setCurrentIdx(prev => prev + 1) : onClose()}></div>
      </div>
    </div>
  );
};
