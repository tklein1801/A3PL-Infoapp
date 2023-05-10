import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { House, Rental } from '../components/House';
import { Layout } from '../components/Layout';
import { NoResults, isReason } from '../components/NoResults';
import type { Reason } from '../components/NoResults';
import { StoreContext } from '../context/Store.context';
import { PanthorService, TServiceResponse } from '../services';
import { House as CHouse, Rental as CRental } from '../types';
import { MissingApiKey } from '../types/MissingApiKey.error';

export type HouseScreenProps = {};

export const HouseScreen: React.FC<HouseScreenProps> = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing } = React.useContext(StoreContext);
  const [currentHouse, setCurrentHouse] = React.useState<CHouse['id'] | CRental['id'] | null>(null);
  const [houses, setHouses] = React.useState<{
    houses: CHouse[];
    rental: CRental[];
  }>({
    houses: [],
    rental: [],
  });
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
        setHouses({
          houses: data.houses,
          rental: data.rentals,
        });
      } catch (error) {
        console.error(error);
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentHouse(expandedId === currentHouse ? null : Number(expandedId));
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
          <List.AccordionGroup expandedId={currentHouse} onAccordionPress={handler.onAccordionPress}>
            <List.Section>
              {houses.houses.length > 0 ? (
                houses.houses.map((house, index, arr) => (
                  <House
                    house={house}
                    isFirst={index === 0}
                    isLast={index === arr.length - 1}
                    isExpanded={currentHouse === house.id}
                  />
                ))
              ) : (
                <NoResults message="Es konnten keine Häuser gefunden werden" icon="home-search-outline" />
              )}
            </List.Section>

            <List.Section>
              {houses.rental.length > 0 ? (
                houses.rental.map((rental, index, arr) => (
                  <Rental
                    rental={rental}
                    isFirst={index === 0}
                    isLast={index === arr.length - 1}
                    isExpanded={currentHouse === rental.id}
                  />
                ))
              ) : (
                <NoResults message="Es wurde kein Appartment gefunden" icon="home-search-outline" />
              )}
            </List.Section>
          </List.AccordionGroup>
        </React.Fragment>
      )}
    </Layout>
  );
};
