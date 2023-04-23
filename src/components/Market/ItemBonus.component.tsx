import React from 'react';
import { CopBonus } from '../../types';
import { StatsCard } from '../Card';

export const ItemBonus: React.FC<{ copAmount: number }> = ({ copAmount }) => {
  const bonus = React.useMemo(() => {
    return new CopBonus(copAmount).determineMultiplicator();
  }, [copAmount]);

  return (
    <StatsCard
      icon="cash-plus"
      title={`${bonus > 1 ? '+' : ''} ${Math.round(bonus * 100 - 100)}%`}
      subtitle="Polizei Bonus"
    />
  );
};
