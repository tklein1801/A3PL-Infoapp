import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomBottomTabBar } from '../components/CustomBottomTabBar';
import { ContactsScreen } from './Contacts.screen';
import { GarageScreen } from './Garage.screen';
import { HouseScreen } from './HouseScreen.screen';
import { PlayerProfile } from './PlayerProfile.screen';

const Tab = createBottomTabNavigator();

export const ProfileScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      initialRouteName="Player"
    >
      <Tab.Screen
        name="Player"
        component={PlayerProfile}
        options={{
          tabBarLabel: 'Spieler',
          tabBarIcon: ({ color, size }) => <Icon name="account-circle" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Garage"
        component={GarageScreen}
        options={{
          tabBarLabel: 'Fahrzeuge',
          tabBarIcon: ({ color, size }) => <Icon name="garage" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Houses"
        component={HouseScreen}
        options={{
          tabBarLabel: 'Häuser',
          tabBarIcon: ({ color, size }) => <Icon name="home-city" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Telefonbuch',
          tabBarIcon: ({ color, size }) => <Icon name="contacts" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
