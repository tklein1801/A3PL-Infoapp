import { DrawerHeaderProps } from '@react-navigation/drawer';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

export const CustomAppBar: React.FC<DrawerHeaderProps> = ({ route, navigation }) => {
  const theme = useTheme();
  return (
    <Appbar.Header theme={theme} mode="center-aligned" elevated>
      <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} iconColor={theme.colors.onSurface} />
      <Appbar.Content
        title={route.params && 'titleOverride' in route.params ? (route.params.titleOverride as string) : route.name}
        titleStyle={theme.fonts.titleLarge}
      />
      <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
    </Appbar.Header>
  );
};
