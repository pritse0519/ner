import React from 'react';
import { LotteryItem, LOTTERY_CONFIG, Tier } from '../types';
import { Star, Sparkles, Crown, CircleDashed } from 'lucide-react';

interface ResultCardProps {
  item: LotteryItem;
  isReveal?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item, isReveal = false }) => {
  const config = LOTTERY_CONFIG[item.tier];

  const getIcon = () => {
    switch (item.tier) {
      case Tier.HIDDEN: return <Crown className="w-8 h-8 text-yellow-100" />;
      case Tier.EPIC: return <Sparkles className="w-8 h-8 text-purple-100" />;
      case Tier.RARE: return <Star className="w-8 h-8 text-blue-100" />;
      default: return <CircleDashed className="w-8 h-8 text-slate-300" />;
    }
  };

  return (
    <div 
      className={`
        relative flex flex-col items-center justify-center 
        rounded-xl border-2 p-4 transition-all duration-500
        ${config.bgGradient} ${config.borderColor} ${config.shadowColor}
        ${isReveal ? 'w-64 h-80 shadow-2xl scale-100' : 'w-24 h-24 sm:w-32 sm:h-32 shadow-md hover:scale-105'}
      `}
    >
      {isReveal && (
        <div className="absolute inset-0 bg-white/10 animate-pulse rounded-xl pointer-events-none" />
      )}
      
      <div className={`
        rounded-full p-3 mb-2 bg-white/20 backdrop-blur-sm
        ${isReveal ? 'scale-150 mb-8' : 'scale-75 sm:scale-100'}
      `}>
        {getIcon()}
      </div>

      {isReveal && (
        <div className="text-center space-y-2 z-10">
          <h3 className={`text-xl font-bold uppercase tracking-wider ${config.textColor} drop-shadow-md`}>
            {item.tier}
          </h3>
          <p className="text-white/80 text-sm font-mono">{item.id}</p>
        </div>
      )}
      
      {!isReveal && (
         <div className="text-xs font-semibold text-white/90 truncate max-w-full px-1">
           {item.tier}
         </div>
      )}
    </div>
  );
};