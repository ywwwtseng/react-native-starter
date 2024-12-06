import { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { Href } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useTheme } from '@react-navigation/native';

type RowItemProps = PropsWithChildren<{
  link?: Href;
  onTouchEnd?: () => void;
  borderTop?: Boolean;
  borderBottom?: Boolean;
  label: string;
}>;

function RowItem({ link, onTouchEnd, borderTop, borderBottom, label, children }: RowItemProps) {
  const theme = useTheme();
  const router = useRouter();
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#151718' });

  const style = useMemo(() => {
    return {
      backgroundColor,
      ...styles.rowItem,
      ...(borderTop ? { borderTopWidth: 1 }: {}),
      ...(borderBottom ? { borderBottomWidth: 1 }: {}),
      ...(borderTop || borderBottom ? { borderColor: theme.colors.border } : {})
    };
  }, [theme, borderTop, borderBottom, backgroundColor]);

  return (
    <Pressable 
      onTouchEnd={() => {
        if (link) {
          router.push(link);
        } else if (onTouchEnd) {
          onTouchEnd();
        }
      }}>
      <ThemedView style={style}>
        <ThemedText style={styles.rowItemText} type="subtitle">
          {label}
        </ThemedText>
        <ThemedView style={styles.rowItemSlot}>
          {children}
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 48,
  },
  rowItemText: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  rowItemSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export { RowItem };
