import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DrawerNavigator } from './navigator/DrawerNavigator.navigator';

export default function Main() {
  React.useEffect(() => {
    console.log(new Date().toTimeString() + ' Main');
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
