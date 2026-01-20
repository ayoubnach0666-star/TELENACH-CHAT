
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinished, 600); // Wait for fade out animation
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex flex-col items-center">
        {/* Animated LED Lines in Splash */}
        <div className="absolute inset-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-hidden pointer-events-none opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent rotate-45 animate-pulse"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent -rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-[0.3em] text-white animate-in slide-in-from-bottom-4 duration-1000">
          <span className="text-orange-500">T</span>ELE<span className="text-orange-500">N</span>ACH
        </h1>
        <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-white/30 font-light animate-in fade-in zoom-in duration-1000 delay-300">
          Pure Connection
        </p>
      </div>
    </div>
  );
};
