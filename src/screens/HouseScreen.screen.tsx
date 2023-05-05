import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { House } from '../components/House/House.component';
import { Rental } from '../components/House/Rental.component';
import { Layout } from '../components/Layout/Layout.component';
import { NoResults } from '../components/NoResults/NoResults.component';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services/panthor.service';
import { House as HouseModel, Rental as RentalModel } from '../types';

export type HouseScreenProps = {};

export const HouseScreen: React.FC<HouseScreenProps> = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing } = React.useContext(StoreContext);
  const [currentHouse, setCurrentHouse] = React.useState<HouseModel['id'] | RentalModel['id'] | null>(null);
  const [houses, setHouses] = React.useState<{
    houses: HouseModel[];
    rental: RentalModel[];
  }>({
    houses: [],
    rental: [],
  });

  const handler = {
    fetchData: async () => {
      try {
        if (!apiKey) return;
        const result = await PanthorService.getProfile(apiKey);
        setHouses({
          houses: result.houses,
          rental: result.rentals,
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
          <List.AccordionGroup expandedId={currentHouse} onAccordionPress={handler.onAccordionPress}>
            <List.Section title="Häuser">
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
                <NoResults />
              )}
            </List.Section>

            <List.Section title="Appartments">
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
                <NoResults />
              )}
            </List.Section>
          </List.AccordionGroup>
        </React.Fragment>
      )}
    </Layout>
  );
};
