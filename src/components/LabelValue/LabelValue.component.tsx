import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

export interface LabelValueProps {
  label: string;
  value: string | React.ReactNode | JSX.Element;
  withDivider?: boolean;
}

export const LabelValue: React.FC<LabelValueProps> = ({ label, value, withDivider = false }) => {
  return (
    <React.Fragment>
      {withDivider && <Divider />}
      <View style={{ marginVertical: 8 }}>
        <Text variant="labelMedium">{label}</Text>
        <Text>{value}</Text>
      </View>
    </React.Fragment>
  );
};
