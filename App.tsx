import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './src/Main';
import { Theme } from './src/theme/theme';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  React.useEffect(() => {
    console.log(new Date().toTimeString() + " App")
  }, [])

  return (
    <PaperProvider theme={Theme}>
      {/* Sets the color of the status bar text. Default value is "auto" which picks the appropriate value according to the active color scheme, eg: if your app is dark mode, the style will be "light". */}
      <StatusBar style={Theme.dark ? "light" : "dark"} />
      <Main />
    </PaperProvider>
  );
}

registerRootComponent(App);