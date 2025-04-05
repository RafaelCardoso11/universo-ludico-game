import { useGame } from "@/contexts/GameContext";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const size = width * 0.8; // 80% da largura da tela

const colors = [
  { name: "AMARELO", color: "#FFD700" },
  { name: "VERMELHO", color: "#FF0000" },
  { name: "ROXO", color: "#800080" },
  { name: "BURACO NEGRO", color: "#000000" },
];

const ColorSelectionScreen: React.FC = () => {
  const { players, currentPlayerIndex } = useGame();

  const selectColor = (color: string) => {
    console.log(`Cor escolhida: ${color}`);
  };

  const selectNone = () => {
    console.log("Nenhuma das opções acima selecionada");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {players[currentPlayerIndex]?.name.charAt(0).toUpperCase() +
          players[currentPlayerIndex]?.name.slice(1)}
        ,{"\n"}
        Selecione a opção que você ficou no{"\n"}
        tabuleiro
      </Text>

      <View style={styles.circle}>
        {colors.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.quarterCircle,
              { backgroundColor: item.color },
              getPosition(index),
            ]}
            onPress={() => selectColor(item.name)}
          >
            <Text
              style={[
                styles.colorText,
                { color: item.color === "#000000" ? "#FFF" : "#000" },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão "Nenhuma das opções acima" abaixo do círculo */}
      <TouchableOpacity style={styles.noneButton} onPress={selectNone}>
        <Text style={styles.noneButtonText}>Nenhuma das opções acima</Text>
      </TouchableOpacity>
    </View>
  );
};

// Função para posicionar os quadrantes corretamente
const getPosition = (index: number) => {
  const positions = [
    { top: 0, left: 0, borderTopLeftRadius: size / 2 }, // AMARELO
    { top: 0, right: 0, borderTopRightRadius: size / 2 }, // VERMELHO
    { bottom: 0, left: 0, borderBottomLeftRadius: size / 2 }, // ROXO
    { bottom: 0, right: 0, borderBottomRightRadius: size / 2 }, // BURACO NEGRO
  ];
  return positions[index];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  circle: {
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: "hidden",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  quarterCircle: {
    width: size / 2,
    height: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  colorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  noneButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#444", // Cor neutra
    borderRadius: 10,
  },
  noneButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ColorSelectionScreen;
