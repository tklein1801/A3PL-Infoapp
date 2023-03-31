import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Divider, List, Text } from 'react-native-paper';
import { formatter } from '../../services/CurrencyFormat.service';
import { ShopCar, ShopItem, ShopType } from '../../types';
import { Accordion, AccordionProps } from '../Accordion/Accordion.component';

export type TraderOffersProps = {
  shop: ShopType;
} & Pick<AccordionProps, 'isExpanded' | 'isLast' | 'isFirst'>;

export const TraderOffers: React.FC<TraderOffersProps> = ({ shop, isFirst, isExpanded, isLast }) => {
  const id = React.useId();
  const [offers, setOffers] = React.useState<ShopCar[] | ShopItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isExpanded) return;
    shop
      .getOffers()
      .then(setOffers)
      .catch(console.error) // TODO: Report to analytics
      .finally(() => setLoading(false));
  }, [shop, isExpanded]);

  return (
    <Accordion
      id={shop.type}
      title={shop.name}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      surfaceStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
    >
      {loading ? (
        <View style={{ padding: 16 }}>
          <ActivityIndicator animating />
        </View>
      ) : (
        <List.Section>
          {offers.map((offer, index) => (
            <React.Fragment key={id + '-market-' + offer.id}>
              {index !== 0 && <Divider />}
              <List.Item
                title={offer.name}
                description={
                  offer instanceof ShopCar
                    ? `Kofferraum: ${offer.vSpace} Kg.\nLevel: ${offer.level}`
                    : `Level: ${offer.level}`
                }
                right={() => (
                  <View style={{ display: 'flex', justifyContent: 'center' }}>
                    <Text>{formatter.format(offer.price)}</Text>
                  </View>
                )}
              />
            </React.Fragment>
          ))}
        </List.Section>
      )}
    </Accordion>
  );
};
