
import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-3 text-slate-700">
        <LogoIcon className="w-10 h-10" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Photo Restoration</h1>
      </div>
      <p className="text-slate-500 mt-2 text-lg">Bring old memories back to life</p>
    </header>
  );
};
