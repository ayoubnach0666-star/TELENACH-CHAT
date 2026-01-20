
import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col text-[#e5e5e5]">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};
