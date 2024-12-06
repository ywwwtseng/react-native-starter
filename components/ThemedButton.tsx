import { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { Href } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useTheme } from '@react-navigation/native';

type ThemedButtonProps = PropsWithChildren<{
  color?: string;
  onTouchEnd?: () => void;
}>;

function ThemedButton({ color, onTouchEnd, children }: ThemedButtonProps) {
  const theme = useTheme();
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#151718' });

  const style = useMemo(() => {
    return {
      backgroundColor,
      borderColor: theme.colors.border,
    };
  }, [theme, backgroundColor]);

  return (
    <Pressable
      style={[styles.themedButton, style]}
      onTouchEnd={onTouchEnd}>
      <ThemedText type="subtitle" color={color}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  themedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 48,
    fontSize: 18,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 16,
  },
});

export { ThemedButton };
