import React from 'react';
import { ActivityIndicator, Card, List } from 'react-native-paper';
import { Layout } from '../components/Layout';
import { NoResults } from '../components/NoResults';
import { Vehicle } from '../components/Vehicle';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services';
import { Vehicle as CVehicle } from '../types';

export const GarageScreen = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing } = React.useContext(StoreContext);
  const [vehicles, setVehicles] = React.useState<CVehicle[]>([]);
  const [currentVehicle, setCurrentVehicle] = React.useState<CVehicle['id'] | null>(null);

  const activeVehicles = React.useMemo(() => {
    return vehicles
      .filter((vehicle) => !vehicle.disabled && vehicle.alive)
      .sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
  }, [vehicles]);

  // const disabledVehicles = React.useMemo(() => {
  //   return vehicles
  //     .filter((vehicle) => !vehicle.alive)
  //     .sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
  // }, [vehicles]);

  const handler = {
    fetchData: async () => {
      try {
        if (!apiKey) return;
        const result = await PanthorService.getVehicles(apiKey);
        setVehicles(result);
      } catch (error) {
        console.error(error);
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentVehicle(expandedId === currentVehicle ? null : Number(expandedId));
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
          <List.AccordionGroup expandedId={currentVehicle} onAccordionPress={handler.onAccordionPress}>
            {activeVehicles.length > 0 ? (
              activeVehicles.map((vehicle, index, arr) => (
                <Vehicle
                  key={vehicle.id}
                  vehicle={vehicle}
                  isFirst={index === 0}
                  isLast={index === arr.length - 1}
                  isExpanded={currentVehicle === vehicle.id}
                />
              ))
            ) : (
              <NoResults />
            )}
          </List.AccordionGroup>
        </React.Fragment>
      )}
    </Layout>
  );
};
