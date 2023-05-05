import React from 'react';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Layout } from '../components/Layout/Layout.component';
import { PhonebookWrapper } from '../components/Phonebook/Phonebook.component';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services/panthor.service';

export const ContactsScreen = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing, profile, setProfile } =
    React.useContext(StoreContext);

  const handler = {
    fetchData: async () => {
      try {
        if (!apiKey) return;
        const result = await PanthorService.getProfile(apiKey);
        setProfile(result);
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
    if (!apiKey || profile) return;
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
          <PhonebookWrapper phonebooks={profile.phonebooks} />
        </React.Fragment>
      )}
    </Layout>
  );
};
