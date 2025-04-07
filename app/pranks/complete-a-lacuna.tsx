import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGame } from "../../contexts/GameContext";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";

const frasesData = require("../../data/resposta_correta.json").data;

export default function CompleteALacunaScreen() {
  const { nextPlayer } = useGame();
  const navigation = useNavigation();

  const [resposta, setResposta] = useState("");
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [fraseAtual, setFraseAtual] = useState(
    () => frasesData[Math.floor(Math.random() * frasesData.length)]
  );

  const verificarResposta = () => {
    const correta = fraseAtual.lacuna.toLowerCase().trim();
    const tentativa = resposta.toLowerCase().trim();

    if (tentativa === "") {
      Alert.alert("Atenção", "Digite uma resposta.");
      return;
    }

    const resultado = tentativa === correta;
    setAcertou(resultado);
  };

  const proximaRodada = () => {
    if (!acertou) nextPlayer();
    setResposta("");
    setAcertou(null);
    setFraseAtual(frasesData[Math.floor(Math.random() * frasesData.length)]);
    navigation.navigate("rollDice");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/space-background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Complete a lacuna</Text>

        <Text style={styles.frase}>
          {fraseAtual.frase?.replace(
            "______",
            fraseAtual.lacuna.replace(/./g, "_")
          )}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua resposta aqui"
          value={resposta}
          onChangeText={setResposta}
          placeholderTextColor="#aaa"
        />

        {acertou === null ? (
          <TouchableOpacity style={styles.button} onPress={verificarResposta}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text
              style={[
                styles.feedback,
                { color: acertou ? "lightgreen" : "#f66" },
              ]}
            >
              {acertou ? "✅ Resposta correta!" : "❌ Resposta incorreta."}
            </Text>

            <TouchableOpacity style={styles.nextButton} onPress={proximaRodada}>
              <Text style={styles.nextButtonText}>
                {acertou ? "Ir para o Dado" : "Próximo Jogador"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 30,
  },
  frase: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 28,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  feedback: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#2196f3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
