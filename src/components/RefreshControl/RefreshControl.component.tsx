import React from 'react';
import { RefreshControl as NativeRefreshControl, RefreshControlProps } from 'react-native';
import { useTheme } from 'react-native-paper';

export const RefreshControl: React.FC<RefreshControlProps> = (props) => {
  const theme = useTheme();
  return (
    <NativeRefreshControl
      {...props}
      progressBackgroundColor={theme.colors.elevation.level1}
      colors={[theme.colors.primary]}
    />
  );
};
