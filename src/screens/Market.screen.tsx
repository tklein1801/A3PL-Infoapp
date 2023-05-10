import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Layout } from '../components/Layout';
import { ItemBonus, Market, PriceCalculation, PriceCalculationProps } from '../components/Market';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import type { TServiceResponse } from '../services';
import { MarketItem as CMarketItem, RpgServer } from '../types';

export const MarketScreen = () => {
  const { servers, setServers } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [items, setItems] = React.useState<CMarketItem[]>([]);
  const [refreshInterval, setRefreshInterval] = React.useState<PriceCalculationProps>({
    date: new Date(),
    interval: 0,
  });
  const [error, setError] = React.useState<Pick<TServiceResponse<any>, 'error' | 'errorReason'>>({
    error: null,
    errorReason: null,
  });

  const policeOnlineCount = React.useMemo(() => {
    return servers[0] instanceof RpgServer ? servers[0].cops : 0;
  }, [servers]);

  const handler = {
    fetchData: async () => {
      try {
        const [market, fetchedServers] = await Promise.all([PanthorService.getMarket(1), PanthorService.getServers()]);
        if (market.error || error.errorReason) {
          setError({ error: market.error, errorReason: market.errorReason });
        } else if (fetchedServers.error || fetchedServers.errorReason) {
          setError({ error: fetchedServers.error, errorReason: fetchedServers.errorReason });
        }

        if (market.data.length >= 1) {
          const [newer, older] = await market.data[0].getPriceBacklog(1, 2);
          setRefreshInterval({
            date: newer.createdAt,
            interval: differenceInSeconds(newer.createdAt, older.createdAt),
          });
        }

        setItems(market.data);
        setServers(fetchedServers.data);
      } catch (error) {
        console.error(error);
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
  };

  React.useEffect(() => {
    if (servers.length > 0) return;
    PanthorService.getServers()
      .then(({ data, error, errorReason }) => {
        setServers(data);
        setError({ error, errorReason });
      })
      .catch(console.error);
  }, [servers]);

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, []);

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

      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1, columnGap: 8, marginBottom: 8 }}>
        {!loading && <ItemBonus copAmount={policeOnlineCount} />}
        {!loading && refreshInterval.interval > 0 && <PriceCalculation {...refreshInterval} />}
      </View>

      {loading ? (
        <Card elevation={1} style={{ padding: 16 }}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : (
        <Card>
          <Market.Wrapper items={items} policeOnlineCount={policeOnlineCount} />
        </Card>
      )}
    </Layout>
  );
};
