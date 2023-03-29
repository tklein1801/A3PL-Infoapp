import { DrawerHeaderProps } from '@react-navigation/drawer';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

export const CustomAppBar: React.FC<DrawerHeaderProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const title = route.name;

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
      <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} iconColor={theme.colors.onSurface} />
      <Appbar.Content title={title} titleStyle={theme.fonts.titleLarge} />
    </Appbar.Header>
  );
};
