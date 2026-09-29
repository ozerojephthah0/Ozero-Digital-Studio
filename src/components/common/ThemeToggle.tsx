import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useStudio();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`p-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${className}`}
      title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-blue-600 animate-in fade-in zoom-in duration-200" />
      )}
    </button>
  );
};
