import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Changelog } from '../components/Changelog';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { PanthorService } from '../services';
import type { TServiceResponse } from '../services';
import { Changelog as ChangelogModel } from '../types';

export const ChangelogScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [changelogs, setChangelogs] = React.useState<ChangelogModel[]>([]);
  const [expandedChangelog, setExpandedChangelog] = React.useState<ChangelogModel['id'] | null>(null);
  const [error, setError] = React.useState<Pick<TServiceResponse<any>, 'error' | 'errorReason'>>(null);

  const handler = {
    fetchData: async () => {
      const { data, error, errorReason } = await PanthorService.getChangelogs();
      setError(error || errorReason ? { error, errorReason } : null);
      setChangelogs(data);
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onChangelogPress: (changelogId: ChangelogModel['id']) => {
      setExpandedChangelog(changelogId === expandedChangelog ? null : changelogId);
    },
  };

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
      {error && (error.error || error.errorReason) ? (
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
      ) : changelogs.length > 0 ? (
        <List.AccordionGroup expandedId={expandedChangelog} onAccordionPress={handler.onChangelogPress}>
          {changelogs.map((changelog, index, arr) => (
            <React.Fragment key={changelog.id}>
              <Changelog
                changelog={changelog}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={expandedChangelog === changelog.id}
              />
            </React.Fragment>
          ))}
        </List.AccordionGroup>
      ) : !error ? (
        <NoResults message="Keine Changelogs gefunden" reason="NO_RESULTS" />
      ) : null}
    </Layout>
  );
};
