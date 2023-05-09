import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { Vehicle as CVehicle } from '../../types';
import { Accordion, AccordionProps } from '../Accordion';
import { Progress } from '../Progress/Progress.component';

export type VehicleProps = {
  vehicle: CVehicle;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Vehicle: React.FC<VehicleProps> = ({ vehicle, isFirst, isLast, isExpanded }) => {
  return (
    <Accordion
      id={vehicle.id}
      title={vehicle.vehicle_data.name}
      description={vehicle.getVehicleTypeLabel()}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider
    >
      <View style={style.row}>
        <View style={style.col}>
          <Text variant="labelMedium">Fraktion</Text>
          <Chip compact>{vehicle.side.getLabel()}</Chip>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">Kennzeichen</Text>
          <Chip compact>{vehicle.plate}</Chip>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">Kilometerstand</Text>
          <Chip compact>{vehicle.kilometer_total} Km.</Chip>
        </View>
        <View style={[style.col, { minWidth: '100%' }]}>
          <Text variant="labelMedium">Tank</Text>
          <Progress progress={vehicle.fuel * 100} />
        </View>
      </View>
    </Accordion>
  );
};

const style = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 16,
  },
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
