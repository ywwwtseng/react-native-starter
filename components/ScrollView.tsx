import type { PropsWithChildren } from 'react';
import { StyleSheet, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

import { useTheme } from '@react-navigation/native';

type ScrollViewProps = PropsWithChildren & ViewProps & { gap?: number };

function ScrollView({ style, gap = 0, children }: ScrollViewProps) {
  const theme = useTheme();

  return (
    <ThemedView style={[style, styles.container]}>
      <Animated.ScrollView style={{ backgroundColor: theme.colors.background }}>
        <ThemedView
          style={[
            styles.content,
            { backgroundColor: theme.colors.background, gap }
          ]}>
            {children}
          </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
});

export { ScrollView };
