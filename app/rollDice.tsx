import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useGame } from "@/contexts/GameContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const diceFaces = [1, 2, 3, 4, 5, 6, "Perdeu a vez"];

const RollDiceScreen: React.FC = () => {
  const { players, currentPlayerIndex, nextPlayer } = useGame();
  const navigation = useNavigation();
  const [diceResult, setDiceResult] = useState<number | string>("");
  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(Array(players.length).fill(false));
  const rotation = new Animated.Value(0);

  const rollDice = () => {
    if (hasRolled[currentPlayerIndex]) return;

    setRolling(true);
    Animated.timing(rotation, {
      toValue: 360,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      const result = diceFaces[Math.floor(Math.random() * diceFaces.length)];
      setDiceResult(result);
      setRolling(false);
      setHasRolled((prev) => {
        const newRolled = [...prev];
        newRolled[currentPlayerIndex] = true;
        return newRolled;
      });
    });
  };

  const goToColorSelection = () => {
    // Navega para a tela de escolha de cor
    navigation.navigate("colorSelection");
  };

  const renderDiceFace = () => {
    if (rolling) return <Text style={styles.diceText}>?</Text>;
    if (diceResult === "Perdeu a vez") {
      return <FontAwesome name="ban" size={60} color="red" />;
    }
    return (
      <View style={styles.diceFaceContainer}>
        {[...Array(diceResult as number)].map((_, i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.playerText}>
        Vez de: {players[currentPlayerIndex]?.name}
      </Text>
      <Animated.View
        style={[
          styles.dice,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      >
        {renderDiceFace()}
      </Animated.View>
      
      {!rolling && !hasRolled[currentPlayerIndex] && (
        <TouchableOpacity style={styles.button} onPress={rollDice}>
          <Text style={styles.buttonText}>Lançar Dado</Text>
        </TouchableOpacity>
      )}

      {/* Mostrar a opção de avançar apenas se "Perdeu a vez" */}
      {!rolling && diceResult === "Perdeu a vez" && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            nextPlayer(); // Avança para o próximo jogador
            setDiceResult(""); // Reseta o resultado do dado
          }}
        >
          <Text style={styles.buttonText}>Avançar para o próximo jogador</Text>
        </TouchableOpacity>
      )}

      {!rolling && diceResult !== "" && diceResult !== "Perdeu a vez" && (
        <TouchableOpacity
          style={styles.button}
          onPress={goToColorSelection} // Avança para a tela de escolha de cor
        >
          <Text style={styles.buttonText}>Avançar para escolha da brincadeira</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  playerText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  dice: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  diceText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  diceFaceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "black",
    margin: 5,
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#1f8bfc",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default RollDiceScreen;
