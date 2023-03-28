import { StyleSheet, Text, View } from 'react-native';

export const CompanyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Firmen</Text>
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
