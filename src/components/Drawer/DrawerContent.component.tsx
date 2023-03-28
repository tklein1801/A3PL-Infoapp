import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, View } from 'react-native';
import { Avatar, Caption, Drawer, Text, Title, useTheme } from 'react-native-paper';
import { DrawerScreens } from '../../constants/screens.constant';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const id = React.useId();
  const theme = useTheme();

  React.useEffect(() => {
    console.log(new Date().toTimeString() + ' DrawerContent');
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 16,
          paddingLeft: 20,
          alignItems: 'center',
        }}
      >
        <Avatar.Image
          source={{
            uri: 'https://files.dulliag.de/share/msedge_M0K1eIhsC8.png',
          }}
          size={50}
          style={{ marginRight: 16 }}
        />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Title style={{ fontWeight: 'bold' }}>Justus Bollmann</Title>
          <Caption style={{ fontSize: 14, lineHeight: 14 }}>76561198276412464</Caption>
        </View>
      </View>

      <View style={{}}>
        {DrawerScreens.map((screen) => (
          <Drawer.Item
            key={id + 'drawer-item-' + screen.name}
            active={
              props.navigation.getState().index === DrawerScreens.findIndex((entry) => entry.name === screen.name)
            }
            icon={screen.icon}
            label={screen.label}
            onPress={() => props.navigation.navigate(screen.name)}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
};
