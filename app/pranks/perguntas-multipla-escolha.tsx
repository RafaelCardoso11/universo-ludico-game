import { StyleSheet, View, Text } from "react-native";

export default function PerguntasMultiplaEscolhaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QuemEuSouScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
