import React from 'react';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { PhonebookWrapper } from '../components/Phonebook';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import type { TServiceResponse } from '../services';
import { MissingApiKey } from '../types/MissingApiKey.error';

export const ContactsScreen = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing, profile, setProfile } =
    React.useContext(StoreContext);
  const [error, setError] = React.useState<Pick<TServiceResponse<any>, 'error' | 'errorReason'>>({
    error: null,
    errorReason: null,
  });

  const handler = {
    fetchData: async () => {
      try {
        if (!apiKey) return setError({ error: new MissingApiKey() });
        const { data, error, errorReason } = await PanthorService.getProfile(apiKey);
        setError({ error, errorReason });
        setProfile(data);
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
    if (profile) return;
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, [apiKey]);

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
        <React.Fragment>
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

          <PhonebookWrapper phonebooks={profile.phonebooks} />
        </React.Fragment>
      )}
    </Layout>
  );
};
