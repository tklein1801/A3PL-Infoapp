import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Avatar, Card, Divider, List, Text } from 'react-native-paper';
import { Layout } from '../components/Layout/Layout.component';
import { ItemBonus, PriceCalculation, PriceCalculationProps } from '../components/Market';
import { StoreContext } from '../context/Store.context';
import { formatter } from '../services/CurrencyFormat.service';
import { PanthorService } from '../services/panthor.service';
import { MarketItem, RpgServer } from '../types';

export const MarketScreen = () => {
  const id = React.useId();
  const { servers, setServers } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [items, setItems] = React.useState<MarketItem[]>([]);
  const [refreshInterval, setRefreshInterval] = React.useState<PriceCalculationProps>({
    date: new Date(),
    interval: 0,
  });

  const handler = {
    fetchData: async () => {
      try {
        Promise.all([PanthorService.getMarket(1), PanthorService.getServers()])
          .then(async ([market, fetchedServers]) => {
            const [newer, older] = await market[0].getPriceBacklog(1, 2);
            setRefreshInterval({
              date: newer.createdAt,
              interval: differenceInSeconds(newer.createdAt, older.createdAt),
            });
            setItems(market);
            setServers(fetchedServers);
          })
          .catch(console.error);
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
        <ItemBonus copAmount={servers[0] instanceof RpgServer ? servers[0].cops : 0} />
        <PriceCalculation {...refreshInterval} />
      </View>

      {loading ? (
        <Card elevation={1} style={{ padding: 16 }}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : (
        <Card>
          <List.Section>
            {items.map((item, index) => (
              <React.Fragment key={id + '-market-' + item.item}>
                {index !== 0 && <Divider />}
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
                    </View>
                  )}
                />
              </React.Fragment>
            ))}
          </List.Section>
        </Card>
      )}
    </Layout>
  );
};
