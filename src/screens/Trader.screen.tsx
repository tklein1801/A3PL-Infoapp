import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Layout } from '../components/Layout/Layout.component';
import { TraderOffers } from '../components/TraderOffers/TraderOffers.component';
import { PanthorService } from '../services/panthor.service';
import { ShopCategory, ShopType } from '../types';

export type TraderScreenProps = {
  category: ShopCategory;
};

export const TraderScreen: React.FC<TraderScreenProps> = ({ category }) => {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentShop, setCurrentShop] = React.useState<ShopType['type'] | null>(null);
  const [shops, setShops] = React.useState<ShopType[]>([]);

  const handler = {
    fetchData: async () => {
      try {
        const result = await PanthorService.getShopTypes(category);
        setShops(result);
      } catch (error) {
        console.error(error);
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentShop(expandedId === currentShop ? null : String(expandedId));
    },
  };

  React.useEffect(() => {
    handler.fetchData().finally(() => setLoading(false));
  }, [category]);

  return (
    <Layout
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}
    >
      {loading ? (
        <Card elevation={1} style={{ padding: 16 }}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : (
        <List.AccordionGroup expandedId={currentShop} onAccordionPress={handler.onAccordionPress}>
          {shops.map((shop, index, arr) => (
            <React.Fragment key={shop.type}>
              <TraderOffers
                shop={shop}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={currentShop === shop.type}
              />
            </React.Fragment>
          ))}
        </List.AccordionGroup>
      )}
    </Layout>
  );
};
