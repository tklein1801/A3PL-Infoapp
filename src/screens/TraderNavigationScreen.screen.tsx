import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomBottomTabBar } from '../components/CustomBottomTabBar/CustomBottomTabBar.component';
import { TraderScreen } from './Trader.screen';

const Tab = createBottomTabNavigator();

export const TraderNavigationScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      initialRouteName="VehicleTrader"
    >
      <Tab.Screen
        name="VehicleTrader"
        options={{
          tabBarLabel: 'Fahrzeughändler',
          tabBarIcon: ({ color, size }) => <Icon name="car-info" size={size} color={color} />,
        }}
      >
        {(props) => <TraderScreen {...props} category="vehicles" />}
      </Tab.Screen>

      <Tab.Screen
        name="ItemTrader"
        options={{
          tabBarLabel: 'Märkte',
          tabBarIcon: ({ color, size }) => <Icon name="information" size={size} color={color} />,
        }}
      >
        {(props) => <TraderScreen {...props} category="items" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
