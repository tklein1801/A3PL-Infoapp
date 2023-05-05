import React from 'react';
import { ActivityIndicator, Card } from 'react-native-paper';
import { HorizontalCardList } from '../components/Card/HorizontalCardList.component';
import { Layout } from '../components/Layout/Layout.component';
import { Playerlist } from '../components/Playerlist/Playerlist.component';
import { Server as ServerComponent, ServerProps } from '../components/Server/Server.component';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services/panthor.service';
import { RpgServer, Server } from '../types';

export const HomeScreen = () => {
  const id = React.useId();
  const { servers, setServers } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
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
      {loading ? (
        <Card elevation={1} style={{ padding: 16 }}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : (
        <HorizontalCardList
          // Maybe we don't wanna change the displayed player-list on every card-scroll
          // onScroll={(curIdx) => handler.onCardPress(servers[curIdx])}
          cards={servers.map((server, idx, arr) => (
            <ServerComponent
              key={id + '-server-' + server.id}
              server={server}
              onPress={arr.length > 1 ? handler.onCardPress : undefined}
            />
          ))}
        />
      )}

      {selectedServer ? <Playerlist players={playerList} /> : null}
    </Layout>
  );
};
