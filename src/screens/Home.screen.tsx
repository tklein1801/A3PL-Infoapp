import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Layout } from '../components/Layout/Layout.component';
import { Playerlist } from '../components/Playerlist/Playerlist.component';
import { Server as ServerComponent, ServerProps } from '../components/Server/Server.component';
import { PanthorService } from '../services';
import { RpgServer, Server } from '../types';

export const HomeScreen = () => {
  const id = React.useId();
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [servers, setServers] = React.useState([]);
  const [selectedServer, setSelectedServer] = React.useState<RpgServer | Server | null>(null);

  const playerList = React.useMemo(() => {
    return selectedServer ? selectedServer.players : [];
  }, [selectedServer]);

  const handler = {
    fetchData: async () => {
      try {
        const result = await PanthorService.getServers();
        setServers(result);
        setSelectedServer(result[0] || null);
      } catch (error) {
        console.error(error);
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onCardPress: (server: ServerProps['server']) => {
      if (server.id === selectedServer.id) return;
      setSelectedServer(server);
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
      <View style={{ marginBottom: 16 }}>
        {loading ? (
          <Card elevation={1} style={{ padding: 16 }}>
            <ActivityIndicator animating={true} />
          </Card>
        ) : (
          servers.map((server, idx, arr) => (
            <ServerComponent
              key={id + '-server-' + server.id}
              server={server}
              onPress={arr.length > 1 ? handler.onCardPress : undefined}
            />
          ))
        )}
      </View>

      {selectedServer ? <Playerlist players={playerList} /> : null}
    </Layout>
  );
};
