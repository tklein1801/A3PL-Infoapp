import React from 'react';
import { ActivityIndicator, Card } from 'react-native-paper';
import { HorizontalCardList } from '../components/Card';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { Playerlist } from '../components/Playerlist';
import { Server as ServerComponent, ServerProps } from '../components/Server';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import type { TServiceResponse } from '../services';
import { RpgServer, Server } from '../types';

export const HomeScreen = () => {
  const id = React.useId();
  const { servers, setServers } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedServer, setSelectedServer] = React.useState<RpgServer | Server | null>(null);
  const [error, setError] = React.useState<Pick<TServiceResponse<any>, 'error' | 'errorReason'>>(null);

  const playerList = React.useMemo(() => {
    return selectedServer ? selectedServer.players : [];
  }, [selectedServer]);

  const handler = {
    fetchData: async () => {
      const { data, error, errorReason } = await PanthorService.getServers();
      setError(error || errorReason ? { error, errorReason } : null);
      setServers(data);
      setSelectedServer(data[0] || null);
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
      ) : servers.length > 0 && !error ? (
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
      ) : (
        <NoResults
          message={error !== null ? undefined : 'Keine Server online'}
          reason={
            error !== null
              ? error.errorReason
                ? error.errorReason
                : isReason(error.error.message)
                ? (error.error.message as Reason)
                : 'UNKNOWN_ERROR'
              : 'NO_RESULTS'
          }
        />
      )}

      {servers.length > 0 && !error && selectedServer ? <Playerlist players={playerList} /> : null}
    </Layout>
  );
};
