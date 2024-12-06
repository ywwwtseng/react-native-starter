import { useLayoutEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage, getDeviceLanguage } from '@/i18n';
import npmPackage from '@/package.json';

export type AppState = {
  appearance: 'dark' | 'light';
  language: 'en' | 'zh';
  notifications: Boolean;
  polling_interval: number;
  data_retention: number;
  services: any[];

}

export type AppStateKeys = keyof AppState;


export function useAppStateStorage() {
  const colorScheme = useColorScheme();
  const [appState, setStorage] = useState<AppState | undefined>(undefined);

  const setAppState = async (key: string, itemValue: any) => {
    if (!appState) {
      return
    }

    if (key === 'language' && (itemValue !== 'en' && itemValue !== 'zh')) {
      return;
    }

    const value: AppState = {
      ...appState,
      [key]: itemValue
    };

    await AsyncStorage.setItem(npmPackage.name, JSON.stringify(value));

    if (key === 'language') {
      changeLanguage(itemValue);
    }

    setStorage(value);
  }

  useLayoutEffect(() => {
    const init = async () => {
      try {
        const value = await AsyncStorage.getItem(npmPackage.name);
        if (value !== null) {
          const appState = JSON.parse(value);
          setStorage(appState);
          changeLanguage(appState.language);
          // value previously stored
        } else {
          const language = getDeviceLanguage();
          const value: AppState = {
            appearance: colorScheme || 'dark',
            language,
            notifications: false,
            polling_interval: 5,
            data_retention: 14,
            services: [],
          };
          await AsyncStorage.setItem(npmPackage.name, JSON.stringify(value));
          changeLanguage(language);
          setStorage(value);
        }
      } catch (e) {
        // error reading value
      }
    };

    init();
  }, []);

  return { appState, setAppState };
}
