import { StyleSheet, Text, View } from 'react-native';

export const MarketScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Markt</Text>
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
