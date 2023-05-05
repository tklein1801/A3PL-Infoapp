import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { Rental as RentalModel } from '../../types';
import { Accordion, AccordionProps } from '../Accordion/Accordion.component';

export type RentalProps = {
  rental: RentalModel;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Rental: React.FC<RentalProps> = ({ rental, isFirst, isLast, isExpanded }) => {
  return (
    <Accordion
      id={rental.id}
      title={'Haus ' + rental.id}
      description={
        <View>
          {rental.disabled ? <Chip compact>Inaktiv</Chip> : <Chip compact>{rental.payed_for / 24} Tage</Chip>}
        </View>
      }
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider
    >
      <View style={style.col}>
        <Text variant="labelMedium">Gemietet bis zum</Text>
        <Text>{format(rental.active_until, 'dd.MM.yy, HH:mm')} Uhr</Text>
      </View>
    </Accordion>
  );
};

const style = StyleSheet.create({
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
