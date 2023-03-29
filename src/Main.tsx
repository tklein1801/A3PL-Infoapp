import { NavigationContainer, useTheme } from '@react-navigation/native';
import React from 'react';
import { DrawerNavigator } from './navigator/DrawerNavigator.navigator';

export default function Main() {
  const theme = useTheme();

  React.useEffect(() => {
    console.log(new Date().toTimeString() + ' Main');
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
