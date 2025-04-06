import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GameProvider } from "@/contexts/GameContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GameProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title: "Cadastro de jogadores" }} />
          <Stack.Screen name="rollDice" options={{ title: "Jogar o Dado" }} />
          <Stack.Screen name="colorSelection" options={{ title: "Selecione a cor" }} />
          <Stack.Screen name="pranks" options={{ title: "Selecione a cor" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GameProvider>
  );
}
