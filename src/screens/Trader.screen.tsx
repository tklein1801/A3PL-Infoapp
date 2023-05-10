import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { TraderOffers } from '../components/TraderOffers';
import { PanthorService } from '../services';
import type { TServiceResponse } from '../services';
import { ShopCategory, ShopType } from '../types';

export type TraderScreenProps = {
  category: ShopCategory;
};

export const TraderScreen: React.FC<TraderScreenProps> = ({ category }) => {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentShop, setCurrentShop] = React.useState<ShopType['type'] | null>(null);
  const [shops, setShops] = React.useState<ShopType[]>([]);
  const [error, setError] = React.useState<Pick<TServiceResponse<any>, 'error' | 'errorReason'>>({
    error: null,
    errorReason: null,
  });

  const handler = {
    fetchData: async () => {
      const { data, error, errorReason } = await PanthorService.getShopTypes(category);
      setError({ error, errorReason });
      setShops(data);
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
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, [category]);

  return (
    <Layout
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}
    >
      {error.error || error.errorReason ? (
        <NoResults
          reason={
            error.errorReason
              ? error.errorReason
              : isReason(error.error.message)
              ? (error.error.message as Reason)
              : 'UNKNOWN_ERROR'
          }
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {loading ? (
        <Card elevation={1} style={{ padding: 16 }}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : shops.length > 0 ? (
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
      ) : (
        <NoResults message="Keine Händler gefunden" reason="NO_RESULTS" />
      )}
    </Layout>
  );
};
