import { StyleSheet, Text, View } from 'react-native';

export const ChangelogScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Changelogs</Text>
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
