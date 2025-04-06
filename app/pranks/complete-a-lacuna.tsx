import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
const frasesData = require("../../data/resposta_correta.json").data;

export default function CompleteALacunaScreen() {
  const navigation = useNavigation();
  const [resposta, setResposta] = useState("");
  const [acertou, setAcertou] = useState<boolean | null>(null);

  const [fraseAtual] = useState(
    frasesData[Math.floor(Math.random() * frasesData.length)]
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

  return (
    <View style={styles.container}>
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
      />
      {acertou === null && (
        <TouchableOpacity style={styles.button} onPress={verificarResposta}>
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      )}

      {acertou !== null && (
        <>
          <Text style={[styles.feedback, { color: acertou ? "green" : "red" }]}>
            {acertou ? "✅ Resposta correta!" : "❌ Resposta incorreta."}
          </Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              navigation.navigate(acertou ? "../rollDice" : "../(tabs)/index")
            }
          >
            <Text style={styles.nextButtonText}>
              {acertou ? "Ir para o Dado" : "Próximo Jogador"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  frase: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
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
