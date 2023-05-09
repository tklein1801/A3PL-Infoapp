import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { hexToRgba } from '../../theme/hexToRgba';
import { rgbStringToHex } from '../../theme/rgbToHex';

export type IconProps = {
  icon: string;
  size?: IconSize;
  style?: StyleProp<ViewStyle>;
};

export enum IconSize {
  large = 46,
  medium = 38,
  small = 32,
}

export const Icon: React.FC<IconProps> = ({ icon, size = IconSize.medium, style }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: hexToRgba(rgbStringToHex(theme.colors.primary), 0.2),
          borderRadius: theme.roundness,
        },
        style,
      ]}
    >
      <List.Icon icon={icon} color={theme.colors.primary} />
    </View>
  );
};
