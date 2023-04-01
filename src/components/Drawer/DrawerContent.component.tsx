import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Drawer, Text, useTheme } from 'react-native-paper';
import { DrawerScreens } from '../../constants/screens.constant';
import { StoreContext } from '../../context/Store.context';

export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const id = React.useId();
  const theme = useTheme();
  const { profile } = React.useContext(StoreContext);

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
        {profile !== null && (
          <React.Fragment>
            <Avatar.Image
              source={{
                uri: profile.avatar_full,
              }}
              size={50}
              style={{ marginRight: 16 }}
            />
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text variant="titleMedium">{profile.name}</Text>
              <Text variant="labelSmall">{profile.pid}</Text>
            </View>
          </React.Fragment>
        )}
      </View>

      <View>
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
