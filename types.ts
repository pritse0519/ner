export enum Tier {
  BASIC = '基础款',
  RARE = '稀有款',
  EPIC = '典藏款',
  HIDDEN = '隐藏款'
}

export interface LotteryItem {
  id: string;
  tier: Tier;
  name: string;
  timestamp: number;
}

export interface TierConfig {
  tier: Tier;
  weight: number;
  color: string;
  borderColor: string;
  shadowColor: string;
  textColor: string;
  bgGradient: string;
}

export const LOTTERY_CONFIG: Record<Tier, TierConfig> = {
  [Tier.BASIC]: {
    tier: Tier.BASIC,
    weight: 50,
    color: 'bg-slate-500',
    borderColor: 'border-slate-400',
    shadowColor: 'shadow-slate-500/50',
    textColor: 'text-slate-200',
    bgGradient: 'from-slate-700 to-slate-600'
  },
  [Tier.RARE]: {
    tier: Tier.RARE,
    weight: 35,
    color: 'bg-blue-500',
    borderColor: 'border-blue-400',
    shadowColor: 'shadow-blue-500/50',
    textColor: 'text-blue-200',
    bgGradient: 'from-blue-600 to-blue-500'
  },
  [Tier.EPIC]: {
    tier: Tier.EPIC,
    weight: 25,
    color: 'bg-purple-500',
    borderColor: 'border-purple-400',
    shadowColor: 'shadow-purple-500/50',
    textColor: 'text-purple-200',
    bgGradient: 'from-purple-600 to-purple-500'
  },
  [Tier.HIDDEN]: {
    tier: Tier.HIDDEN,
    weight: 8,
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-400',
    shadowColor: 'shadow-yellow-500/50',
    textColor: 'text-yellow-100',
    bgGradient: 'from-yellow-600 to-orange-500'
  }
};