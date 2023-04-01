import { NavigationContainer, useTheme } from '@react-navigation/native';
import React from 'react';
import { SnackbarProvider } from './context/Snackbar.context';
import { StoreProvider } from './context/Store.context';
import { DrawerNavigator } from './navigator/DrawerNavigator.navigator';

export default function Main() {
  const theme = useTheme();
  return (
    <StoreProvider>
      <SnackbarProvider>
        <NavigationContainer theme={theme}>
          <DrawerNavigator />
        </NavigationContainer>
      </SnackbarProvider>
    </StoreProvider>
  );
}
