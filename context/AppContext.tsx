import type { PropsWithChildren } from 'react';
import type { AppStorage, AppStorageKeys } from '@/hooks/useAppStorage';
import { createContext, useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

DefaultTheme.colors.background = '#FFFFFF';

const AppContext = createContext<{
  appState: AppStorage | undefined;
  setAppState: (key: string, itemValue: any) => Promise<void>;
}>({
  appState: undefined,
  setAppState: Promise.resolve,
});

type Props = PropsWithChildren<{
  appState: AppStorage | undefined;
  setAppState: (key: string, itemValue: any) => Promise<void>;
}>;

const AppProvider = ({ appState, setAppState, children }: Props) => {
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {appState && (
        <ThemeProvider value={appState.appearance === 'dark' ? DarkTheme : DefaultTheme}>
          {children}
        </ThemeProvider>
      )}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext, type AppStorageKeys };