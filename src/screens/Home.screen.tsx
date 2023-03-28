import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export const HomeScreen = () => {
  const navigation = React.useContext(NavigationContext);

  React.useEffect(() => {
    console.log(new Date().toTimeString() + ' Home');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('Profile')}>Go to Profile</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
