import { addSeconds, format } from 'date-fns';
import React from 'react';
import { StatsCard } from '../Card';

export type PriceCalculationProps = {
  date: Date;
  interval: number;
};

export const PriceCalculation: React.FC<PriceCalculationProps> = ({ date, interval }) => {
  const nextCalculationDate = addSeconds(date, interval);
  return (
    <StatsCard icon="clock-in" title={format(nextCalculationDate, 'HH:mm:ss') + ' Uhr'} subtitle="Preisberechnung" />
  );
};
