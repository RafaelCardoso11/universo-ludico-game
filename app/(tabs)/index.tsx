import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Text, TextInput, Button, Card, IconButton } from 'react-native-paper';
import { useGame } from '@/contexts/GameContext';
import { useNavigation } from "@react-navigation/native";


const colors = ['#FFEB3B', '#F44336', '#2196F3', '#4CAF50']; 

const HomeScreen: React.FC = () => {
  const { setScreen, setPlayers, players } = useGame();
  const [playerName, setPlayerName] = useState('');
  
  const navigation = useNavigation();

  const addPlayer = () => {
    if (players.length >= 4) {
      Alert.alert('Limite atingido', 'O número máximo de jogadores é 4');
      return;
    }

    if (playerName.trim()) {
      const playerColor = colors[players.length];
      setPlayers((prevPlayers) => [...prevPlayers, { name: playerName.trim(), color: playerColor }]);
      setPlayerName('');
    }
  };

  const removePlayer = (playerName: string) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.name !== playerName));
  };

  const startGame = () => {
    if (players.length > 1) {
      navigation.navigate("rollDice");

    } else {
      alert('Adicione pelo menos dois jogadores!');
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/space-background.png')} style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>Universo Lúdico</Text>

        <Text style={styles.playersStatus}>Jogadores {players.length}/4</Text>

        <TextInput
          label="Nome do Jogador"
          value={playerName}
          onChangeText={setPlayerName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#1f8bfc', background: '#333' } }}
        />
        <Button
          mode="contained"
          onPress={addPlayer}
          style={styles.button}
          disabled={players.length >= 4}
        >
          Adicionar Jogador
        </Button>

        <ScrollView contentContainerStyle={styles.playersGrid}>
          {players.map((player, index) => (
            <Card key={index} style={[styles.card, { borderColor: player.color }]}>  
              <View style={styles.playerRow}>
                <Text style={[styles.cardText, { color: player.color }]}>{player.name}</Text>
                <IconButton
                  icon="close"
                  iconColor={player.color}
                  size={24}
                  onPress={() => removePlayer(player.name)}
                  style={styles.removeButton}
                />
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={startGame}
          style={[styles.button, styles.startButton]}
          disabled={players.length < 2}
        >
          Iniciar Jogo
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Orbitron',
    marginBottom: 20,
    textAlign: 'center',
  },
  playersStatus: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    color: '#fff',
  },
  button: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#1f8bfc',
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  card: {
    width: 150,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    borderWidth: 2,
    elevation: 2,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  removeButton: {
    backgroundColor: 'transparent',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default HomeScreen;