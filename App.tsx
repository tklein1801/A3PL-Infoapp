import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './src/Main';

export default function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}
