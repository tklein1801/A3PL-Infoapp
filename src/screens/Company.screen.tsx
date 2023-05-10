import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Company } from '../components/Company';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import type { TServiceResponse } from '../services';
import { Company as CCompany } from '../types';
import { MissingApiKey } from '../types/MissingApiKey.error';

export const CompanyScreen = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing } = React.useContext(StoreContext);
  const [companies, setCompanies] = React.useState<CCompany[]>([]);
  const [currentCompany, setCurrentCompany] = React.useState<CCompany['id'] | null>(null);
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
        setCompanies(data.company_owned);
      } catch (error) {
        console.error(error);
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentCompany(expandedId === currentCompany ? null : Number(expandedId));
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
      ) : (
        <React.Fragment>
          <List.Section>
            <List.AccordionGroup expandedId={currentCompany} onAccordionPress={handler.onAccordionPress}>
              {companies.length > 0 ? (
                companies.map((company, index, arr) => (
                  <Company
                    key={company.id}
                    company={company}
                    isFirst={index === 0}
                    isLast={index === arr.length - 1}
                    isExpanded={currentCompany === company.id}
                  />
                ))
              ) : (
                <NoResults message="Keine Firmen gefunden" reason="NO_RESULTS" />
              )}
            </List.AccordionGroup>
          </List.Section>
        </React.Fragment>
      )}
    </Layout>
  );
};
