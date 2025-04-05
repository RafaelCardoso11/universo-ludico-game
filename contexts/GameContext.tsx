import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Player {
  name: string;
  color: string;
}

interface GameContextType {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  currentPlayerIndex: number;
  nextPlayer: () => void;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [screen, setScreen] = useState<string>('home');

  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  return (
    <GameContext.Provider value={{ players, setPlayers, currentPlayerIndex, nextPlayer, screen, setScreen }}>
      {children}
    </GameContext.Provider>
  );
};
