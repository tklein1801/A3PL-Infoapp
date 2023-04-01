import React from 'react';
import { Card, CardProps, Text } from 'react-native-paper';

export type NoResultsProps = {
  message?: string;
} & Pick<CardProps, 'style'>;

export const NoResults: React.FC<NoResultsProps> = (props) => {
  return (
    <Card style={props.style}>
      <Text style={{ textAlign: 'center', padding: 16 }}>{props.message || 'Keine Treffer'}</Text>
    </Card>
  );
};
