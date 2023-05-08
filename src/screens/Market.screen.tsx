import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Layout } from '../components/Layout/Layout.component';
import { ItemBonus, Market, PriceCalculation, PriceCalculationProps } from '../components/Market';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
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

  const policeOnlineCount = React.useMemo(() => {
    return servers[0] instanceof RpgServer ? servers[0].cops : 0;
  }, [servers]);

  const handler = {
    fetchData: async () => {
      try {
        const [market, fetchedServers] = await Promise.all([PanthorService.getMarket(1), PanthorService.getServers()]);
        const [newer, older] = await market[0].getPriceBacklog(1, 2);
        setRefreshInterval({
          date: newer.createdAt,
          interval: differenceInSeconds(newer.createdAt, older.createdAt),
        });
        setItems(market);
        setServers(fetchedServers);
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
    PanthorService.getServers().then(setServers).catch(console.error);
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
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1, columnGap: 8, marginBottom: 8 }}>
        <ItemBonus copAmount={policeOnlineCount} />
        <PriceCalculation {...refreshInterval} />
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
