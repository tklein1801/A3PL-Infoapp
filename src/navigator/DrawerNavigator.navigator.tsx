import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { CustomAppBar } from '../components/CustomAppBar/CustomAppBar.component';
import { DrawerContent } from '../components/Drawer/DrawerContent.component';
import { DrawerScreens } from '../constants/screens.constant';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const id = React.useId();
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '75%',
        },
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      {DrawerScreens.map((screen) => (
        <Drawer.Screen
          key={id + 'drawer-screen-' + screen.name}
          name={screen.name}
          component={screen.component}
          initialParams={{
            titleOverride: screen.label,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};
