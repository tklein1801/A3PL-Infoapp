import React from 'react';
import { List } from 'react-native-paper';
import { MarketItem as CMarketItem, CopBonus } from '../../types';
import { MarketItem } from './MarketItem.component';

export type MarketWrapperProps = {
  items: CMarketItem[];
  policeOnlineCount?: number;
};

export const MarketWrapper: React.FC<MarketWrapperProps> = ({ items, policeOnlineCount = undefined }) => {
  const priceMultiplier = React.useMemo(() => {
    if (policeOnlineCount === undefined) return undefined;
    return new CopBonus(policeOnlineCount).determineMultiplicator();
  }, [policeOnlineCount]);

  return (
    <List.Section>
      {items.map((item, index) => (
        <MarketItem
          key={item.item}
          item={item}
          priceMultiplicator={item.isIllegal() ? priceMultiplier : undefined}
          withDivider={index !== 0}
        />
      ))}
    </List.Section>
  );
};
