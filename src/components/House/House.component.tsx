import { format } from 'date-fns';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { House as HouseModel } from '../../types';
import { Accordion, AccordionProps } from '../Accordion/Accordion.component';

export type HouseProps = {
  house: HouseModel;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const House: React.FC<HouseProps> = ({ house, isFirst, isLast, isExpanded }) => {
  return (
    <Accordion
      id={house.id}
      title={'Haus ' + house.id}
      description={<View>{house.disabled ? <Chip>Inaktiv</Chip> : <Chip>{house.payed_for / 24} Tage</Chip>}</View>}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider
    >
      <View style={style.row}>
        <View style={style.col}>
          <Text variant="labelMedium">Position</Text>
          <Button icon="map" onPress={() => Linking.openURL(house.location.getMapUrl())}>
            Karte aufrufen
          </Button>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">Gewartet bis zum</Text>
          <Text>{format(house.active_until, 'dd.MM.yy, HH:mm')} Uhr</Text>
        </View>
        <View style={[style.col, { minWidth: '100%' }]}>
          <Text variant="labelMedium">Mitbewohner</Text>
          {house.players.length > 0 &&
            house.players.map((player) => (
              <Chip key={player} style={{ marginRight: 8, marginBottom: 8 }}>
                {player}
              </Chip>
            ))}
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
