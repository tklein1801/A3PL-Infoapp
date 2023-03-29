import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Caption, Drawer, Title, useTheme } from 'react-native-paper';
import { DrawerScreens } from '../../constants/screens.constant';

export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const id = React.useId();
  const theme = useTheme();

  React.useEffect(() => {
    console.log(new Date().toTimeString() + ' DrawerContent');
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: theme.colors.surface,
      }}
    >
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
          <Title style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>Justus Bollmann</Title>
          <Caption style={{ fontSize: 14, lineHeight: 14, color: theme.colors.onSurface }}>76561198276412464</Caption>
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
