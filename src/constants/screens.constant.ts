import { ChangelogScreen } from '../screens/Changelog.screen';
import { CompanyScreen } from '../screens/Company.screen';
import { HomeScreen } from '../screens/Home.screen';
import { MarketScreen } from '../screens/Market.screen';
import { ProfileScreen } from '../screens/Profile.screen';
import { SettingsScreen } from '../screens/Settings.screen';
import { TraderNavigationScreen } from '../screens/TraderNavigationScreen.screen';

export type ScreenConfig = {
  name: string;
  label: string;
  component: () => JSX.Element;
  icon?: string;
}[];

export const DrawerScreens: ScreenConfig = [
  { name: 'Home', label: 'Serverliste', icon: 'home', component: HomeScreen },
  { name: 'Profile', label: 'Profil', icon: 'account-circle', component: ProfileScreen },
  { name: 'Market', label: 'Markt', icon: 'finance', component: MarketScreen },
  { name: 'Company', label: 'Firmen', icon: 'domain', component: CompanyScreen },
  { name: 'Trader', label: 'Händler', icon: 'store', component: TraderNavigationScreen },
  { name: 'Changelog', label: 'Changelogs', icon: 'text-box-multiple', component: ChangelogScreen },
  { name: 'Settings', label: 'Einstellungen', icon: 'cog', component: SettingsScreen },
];
