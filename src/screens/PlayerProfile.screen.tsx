import { format } from 'date-fns';
import React from 'react';
import { ActivityIndicator, Avatar, Card, Text } from 'react-native-paper';
import { LabelValue } from '../components/LabelValue';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { Progress } from '../components/Progress';
import { StoreContext } from '../context/Store.context';
import { PanthorService, formatter } from '../services';
import type { TServiceResponse } from '../services';
import { MissingApiKey } from '../types/MissingApiKey.error';

export const PlayerProfile = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing, profile, setProfile } =
    React.useContext(StoreContext);
  const [error, setError] = React.useState<Pick<TServiceResponse<any>, 'error' | 'errorReason'>>({
    error: null,
    errorReason: null,
  });

  const handler = {
    fetchData: async () => {
      if (!apiKey) return setError({ error: new MissingApiKey() });
      const { data, error, errorReason } = await PanthorService.getProfile(apiKey);
      setError({ error, errorReason });
      setProfile(data);
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
  };

  React.useEffect(() => {
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

      {loading ? (
        <Card elevation={1} style={{ padding: 16 }}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : profile !== null ? (
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
      ) : (
        <NoResults icon="account-circle-outline" message="Dein Profil konnte nicht geladen werden" />
      )}
    </Layout>
  );
};
