import { NavigationContainer, useTheme } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { SnackbarProvider } from './context/Snackbar.context';
import { StoreProvider } from './context/Store.context';
import { DrawerNavigator } from './navigator/DrawerNavigator.navigator';

export default function Main() {
  const theme = useTheme();
  const [notification, setNotification] = React.useState<Notifications.Notification>();
  const [notificationResponse, setNotificationResponse] = React.useState<Notifications.NotificationResponse>();
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  React.useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      setNotificationResponse(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
