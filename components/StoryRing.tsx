
import React from 'react';
import { User } from '../types';

interface StoryRingProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const StoryRing: React.FC<StoryRingProps> = ({ user, size = 'md', onClick }) => {
  const hasStories = user.stories && user.stories.length > 0;
  const allViewed = hasStories && user.stories?.every(s => s.viewed);

  const sizeClasses = {
    sm: 'w-8 h-8 p-[1.5px]',
    md: 'w-14 h-14 p-[2px]',
    lg: 'w-20 h-20 p-[3px]',
    xl: 'w-32 h-32 p-[4px]'
  };

  const ringColor = allViewed 
    ? 'border-orange-900/40' 
    : 'border-orange-500 animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_10px_rgba(249,115,22,0.3)]';

  return (
    <button 
      onClick={(e) => {
        if (hasStories && onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`relative rounded-full transition-transform active:scale-95 ${sizeClasses[size]} ${hasStories ? `border-2 ${ringColor}` : 'border border-white/10'}`}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-black/40">
        <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
      </div>
      {!allViewed && hasStories && (
        <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-ping pointer-events-none"></div>
      )}
    </button>
  );
};
