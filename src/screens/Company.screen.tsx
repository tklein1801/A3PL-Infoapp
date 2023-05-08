import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Company } from '../components/Company/Company.component';
import { Layout } from '../components/Layout/Layout.component';
import { NoResults } from '../components/NoResults/NoResults.component';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import { Company as CompanyModel } from '../types';

export const CompanyScreen = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing } = React.useContext(StoreContext);
  const [companies, setCompanies] = React.useState<CompanyModel[]>([]);
  const [currentCompany, setCurrentCompany] = React.useState<CompanyModel['id'] | null>(null);

  const handler = {
    fetchData: async () => {
      try {
        if (!apiKey) return;
        const result = await PanthorService.getProfile(apiKey);
        setCompanies(result.company_owned);
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
    if (!apiKey) return;
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
              <NoResults message="Keine Firmen gefunden" />
            )}
          </List.AccordionGroup>
        </React.Fragment>
      )}
    </Layout>
  );
};
