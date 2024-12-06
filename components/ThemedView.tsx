import { useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';



export type ThemedViewProps = ViewProps & {
  borderTop?: Boolean;
  borderBottom?: Boolean;
};


export function ThemedView({ borderTop, borderBottom, ...props }: ThemedViewProps) {
  const theme = useTheme()

  const style = useMemo(() => {
    return [props.style, {
      ...(borderTop ? { borderTopWidth: 1 }: {}),
      ...(borderBottom ? { borderBottomWidth: 1 }: {}),
      ...(borderTop || borderBottom ? { borderColor: theme.colors.border } : {})
    }]
  }, [theme, props.style])

  return <View {...props} style={style} />;
}
