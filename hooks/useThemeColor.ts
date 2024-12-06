/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

export function useThemeColor(
  props: { light: string; dark: string },
) {
  const { appState } = useContext(AppContext);
  const theme = appState?.appearance ?? 'dark';
  return props[theme];
}
