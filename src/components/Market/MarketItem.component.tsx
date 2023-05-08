import React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, List, Text } from 'react-native-paper';
import { formatter } from '../../services';
import { MarketItem as CMarketItem, CopBonus } from '../../types';

export type MarketItemProps = {
  item: CMarketItem;
  priceMultiplicator?: number;
  withDivider?: boolean;
};

export const MarketItem: React.FC<MarketItemProps> = ({ item, priceMultiplicator, withDivider }) => {
  return (
    <React.Fragment>
      {withDivider ? <Divider /> : null}
      <List.Item
        title={item.localized}
        left={() => (
          <Avatar.Image
            size={40}
            source={{ uri: item.getImageUrl() }}
            style={{ marginLeft: 16, backgroundColor: 'transparent' }}
          />
        )}
        right={() => (
          <View style={{ display: 'flex', justifyContent: 'center' }}>
            <Text>{formatter.format(item.price)}</Text>
            {priceMultiplicator ? (
              <Text variant="labelSmall" style={{ textAlign: 'right' }}>
                {formatter.format(CopBonus.calculatePrice(item.price, priceMultiplicator))}
              </Text>
            ) : null}
          </View>
        )}
      />
    </React.Fragment>
  );
};
