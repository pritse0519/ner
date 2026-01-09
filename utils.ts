import { LOTTERY_CONFIG, Tier, LotteryItem } from './types';

/**
 * Calculates the tier based on weights provided in the prompt.
 * 50, 35, 25, 8 sum to 118. We use this total to normalize the probability.
 */
export const drawTier = (): Tier => {
  const totalWeight = Object.values(LOTTERY_CONFIG).reduce((sum, config) => sum + config.weight, 0);
  let random = Math.random() * totalWeight;

  // Check tiers from rarest to common to ensure correct probability brackets
  // Order of check: Hidden (8) -> Epic (25) -> Rare (35) -> Basic (50)
  
  const tiers = [Tier.HIDDEN, Tier.EPIC, Tier.RARE, Tier.BASIC];
  
  for (const tier of tiers) {
    const weight = LOTTERY_CONFIG[tier].weight;
    if (random < weight) {
      return tier;
    }
    random -= weight;
  }
  
  return Tier.BASIC;
};

export const generateItem = (tier: Tier): LotteryItem => {
  const id = Math.random().toString(36).substring(2, 9);
  return {
    id,
    tier,
    name: `${tier} Item #${id.toUpperCase()}`,
    timestamp: Date.now()
  };
};