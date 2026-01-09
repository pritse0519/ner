import React from 'react';
import { Sparkles } from 'lucide-react';

interface GachaMachineProps {
  onDraw: () => void;
  isSpinning: boolean;
  remainingDraws: number;
  disabled: boolean;
}

export const GachaMachine: React.FC<GachaMachineProps> = ({ onDraw, isSpinning, remainingDraws, disabled }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* The Machine Orb */}
      <div className="relative group perspective-1000">
        <button
          onClick={onDraw}
          disabled={disabled || isSpinning}
          className={`
            relative w-48 h-48 rounded-full shadow-2xl 
            flex items-center justify-center border-4 border-slate-700/50
            transition-all duration-300
            ${isSpinning ? 'animate-shake cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
            ${disabled ? 'opacity-50 grayscale' : 'bg-gradient-to-br from-indigo-600 to-violet-900'}
          `}
        >
          {/* Inner details */}
          <div className="absolute inset-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             {isSpinning && (
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[spin_1s_linear_infinite]" />
             )}
          </div>

          {/* Label / CTA */}
          <div className="z-10 text-center">
            {isSpinning ? (
              <span className="text-2xl font-bold text-white tracking-widest animate-pulse">...</span>
            ) : disabled ? (
              <span className="text-sm font-bold text-gray-400">EMPTY</span>
            ) : (
              <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 text-yellow-300 mb-1 drop-shadow-lg" />
                <span className="text-lg font-bold text-white drop-shadow-md">DRAW</span>
              </div>
            )}
          </div>
        </button>

        {/* Base/Stand Visual */}
        <div className="w-32 h-4 bg-slate-800 rounded-[100%] mx-auto mt-4 blur-sm opacity-60" />
      </div>

      <div className="mt-8 text-center space-y-1">
        <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Remaining Attempts</p>
        <p className={`text-4xl font-black ${remainingDraws === 0 ? 'text-red-500' : 'text-white'}`}>
          {remainingDraws}
        </p>
      </div>
    </div>
  );
};