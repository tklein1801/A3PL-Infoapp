import { format } from 'date-fns';
import React from 'react';
import { ActivityIndicator, Avatar, Card, Text } from 'react-native-paper';
import { LabelValue } from '../components/LabelValue/LabelValue.component';
import { Layout } from '../components/Layout/Layout.component';
import { Progress } from '../components/Progress/Progress.component';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import { formatter } from '../services/CurrencyFormat.service';

export const PlayerProfile = () => {
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
          <Card style={{ marginBottom: 16, padding: 16 }}>
            <Avatar.Image
              source={{ uri: profile.avatar_full }}
              size={80}
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            />
            <Text variant="titleMedium" style={{ textAlign: 'center' }}>
              {profile.name}
            </Text>
            <Text variant="titleSmall" style={{ textAlign: 'center' }}>
              {profile.pid}
            </Text>
            <Progress currentLevel={profile.level} progress={profile.level_progress} withLabel />
          </Card>

          <Card style={{ padding: 16 }}>
            <LabelValue label="Name" value={profile.name} />
            <LabelValue label="PlayerId" value={profile.pid} withDivider />
            <LabelValue label="Bargeld" value={formatter.format(profile.cash)} withDivider />
            <LabelValue label="Kontostand (Hauptkonto)" value={formatter.format(profile.bankacc)} withDivider />
            <LabelValue label="XP" value={profile.exp.toLocaleString() + ' XP.'} withDivider />
            <LabelValue label="Skillpunkte" value={profile.skillpoint + ' Punkte'} withDivider />
            <LabelValue label="Spielzeit" value={(profile.play_time.active / 60).toFixed(0) + ' Stunden'} withDivider />
            <LabelValue
              label="Volle Spielzeit"
              value={(profile.play_time.total / 60).toFixed(0) + ' Stunden'}
              withDivider
            />
            <LabelValue
              label="Zuletzt gesehen"
              value={format(profile.last_seen.date, 'dd.MM.yy, HH:mm') + ' Uhr'}
              withDivider
            />
            <LabelValue label="Beigetreten" value={format(profile.joined_at, 'dd.MM.yy, HH:mm') + ' Uhr'} withDivider />
          </Card>
        </React.Fragment>
      )}
    </Layout>
  );
};
