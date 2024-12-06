import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

export type ThemedTextProps = TextInputProps & {};

export function ThemedTextInput({ style, ...props }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <TextInput
      style={[styles.default, { 
        color: theme.colors.text
      }]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    height: 48,
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 2,
    textAlign: 'right',
  },
});
