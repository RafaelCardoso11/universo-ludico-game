import { View, Text, StyleSheet } from 'react-native';

export default function CompleteALacunaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete a lacuna</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
    