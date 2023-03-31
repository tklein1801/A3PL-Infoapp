import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Avatar, Card, Divider, List, Text } from 'react-native-paper';
import { Layout } from '../components/Layout/Layout.component';
import { PanthorService } from '../services';
import { formatter } from '../services/CurrencyFormat.service';
import { MarketItem } from '../types';

export const MarketScreen = () => {
  const id = React.useId();
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [items, setItems] = React.useState<MarketItem[]>([]);

  const handler = {
    fetchData: async () => {
      try {
        const result = await PanthorService.getMarket(1);
        setItems(result);
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
    handler.fetchData().finally(() => setLoading(false));
  }, []);

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
