import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AppProvider } from '@/context/AppContext';
import { useAppStateStorage } from '@/hooks/useAppStateStorage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { appState, setAppState } = useAppStateStorage();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded && appState) {
      SplashScreen.hideAsync();
    }
  }, [loaded, appState]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider appState={appState} setAppState={setAppState}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Back' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProvider>
  );
}
