import { StyleSheet, Text, View } from 'react-native';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Einstellungen</Text>
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
