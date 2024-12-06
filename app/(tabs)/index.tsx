import { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { ScrollView } from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Icon } from '@/components/Icon';
import { AppContext } from '@/context/AppContext';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function IndexScreen() {
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const theme = useTheme();
  const backgroundColor = useThemeColor({ light: 'rgba(200,200,200,0.8)', dark: 'rgba(100,100,100,0.8)' });

  if (!appState) {
    return null;
  }

  return (
    <ScrollView gap={16}>
      <ThemedView style={styles.serverList}>
        {appState.services && appState.services.map((service, index) => (
          <Pressable
            style={styles.serverItem}
            key={`${service.id}`}
            onTouchEnd={() => router.push({ pathname: '/service/[id]', params: { id: service.id } })}
          >
            <ThemedView style={[styles.serverItemIcon, { backgroundColor }]}>
              <Icon.FontAwesome name="server" color={theme.colors.text} style={{marginBottom: -2}} />
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={{fontSize: 10}}>{service.service_name}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  serverList: {
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serverItem: {
    width: '25%',
    alignItems: 'center',
  },
  serverItemIcon: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
