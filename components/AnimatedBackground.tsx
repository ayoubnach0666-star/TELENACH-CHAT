
import React, { useState, useEffect } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const id = Date.now();
    setRipples(prev => [...prev, { x: clientX, y: clientY, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-0 bg-[#050505] overflow-hidden"
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Wave LED Motion */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0)" />
            <stop offset="50%" stopColor="rgba(249, 115, 22, 0.15)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
          </linearGradient>
        </defs>
        
        {/* Horizontal slow waves */}
        <path d="M-100 300 C 200 100, 400 500, 800 300 S 1200 100, 1600 300" fill="none" stroke="url(#waveGrad)" strokeWidth="2">
          <animate attributeName="d" 
            values="M-100 300 C 200 100, 400 500, 800 300 S 1200 100, 1600 300;
                    M-100 350 C 150 150, 450 450, 850 350 S 1150 150, 1600 350;
                    M-100 300 C 200 100, 400 500, 800 300 S 1200 100, 1600 300"
            dur="20s" repeatCount="indefinite" />
        </path>
        
        <path d="M-200 600 C 100 400, 500 800, 900 600 S 1300 400, 1700 600" fill="none" stroke="url(#waveGrad)" strokeWidth="1" opacity="0.6">
          <animate attributeName="d" 
            values="M-200 600 C 100 400, 500 800, 900 600 S 1300 400, 1700 600;
                    M-200 550 C 150 450, 450 750, 850 550 S 1150 450, 1700 550;
                    M-200 600 C 100 400, 500 800, 900 600 S 1300 400, 1700 600"
            dur="25s" repeatCount="indefinite" />
        </path>

        {/* Diagonal slow waves */}
        <path d="M0 0 L 1000 1000" fill="none" stroke="url(#waveGrad)" strokeWidth="1" opacity="0.4" transform="rotate(-15, 500, 500)">
          <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="40s" repeatCount="indefinite" />
          <animate attributeName="stroke-dasharray" values="200 800; 100 900; 200 800" dur="15s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Ripples */}
      {ripples.map(ripple => (
        <div 
          key={ripple.id}
          className="absolute rounded-full border border-orange-500/20 pointer-events-none animate-[ripple_1.5s_ease-out_forwards]"
          style={{ 
            left: ripple.x, 
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Primary Ambient Glows */}
      <div className="absolute top-[5%] left-[15%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[140px] animate-led-slow"></div>
      <div className="absolute bottom-[15%] right-[5%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[160px] animate-led-slow" style={{ animationDelay: '-8s' }}></div>
      
      {/* Secondary Depth Layer */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
      <style>{`
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.6; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
