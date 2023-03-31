import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Changelog } from '../components/Changelog/Changelog.component';
import { Layout } from '../components/Layout/Layout.component';
import { PanthorService } from '../services';
import { Changelog as ChangelogModel } from '../types';

export const ChangelogScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [changelogs, setChangelogs] = React.useState<ChangelogModel[]>([]);
  const [expandedChangelog, setExpandedChangelog] = React.useState<ChangelogModel['id'] | null>(null);

  const handler = {
    fetchData: async () => {
      try {
        const result = await PanthorService.getChangelogs();
        setChangelogs(result);
      } catch (error) {
        console.error(error);
      }
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
        <List.AccordionGroup expandedId={expandedChangelog} onAccordionPress={handler.onChangelogPress}>
          {changelogs.map((changelog, index, arr) => (
            <React.Fragment>
              <Changelog
                changelog={changelog}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={expandedChangelog === changelog.id}
              />
            </React.Fragment>
          ))}
        </List.AccordionGroup>
      )}
    </Layout>
  );
};
