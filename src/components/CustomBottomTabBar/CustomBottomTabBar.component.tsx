import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

export const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, state, descriptors, insets }) => {
  const theme = useTheme();
  return (
    <BottomNavigation.Bar
      theme={theme}
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route }) => navigation.navigate(route.name)}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        return options.tabBarIcon ? options.tabBarIcon({ focused, color, size: 24 }) : null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        const tabBarLabel = options.tabBarLabel;
        return tabBarLabel && typeof tabBarLabel === 'string' ? tabBarLabel : route.name;
      }}
    />
  );
};
