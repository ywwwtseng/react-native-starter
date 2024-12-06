import { useRef, useEffect, useLayoutEffect, useContext, useMemo, useState, useCallback } from 'react';
import { StyleSheet, Platform, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';

import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { ScrollView } from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GoBack } from '@/components/GoBack';
import { FadeIn } from '@/components/FadeIn';
import { Loading } from '@/components/Loading';
import { AppContext } from '@/context/AppContext';
import i18n from '@/i18n';

import { useFadeIn } from '@/hooks/useFadeIn';
import { useInterval } from '@/hooks/useInterval';



import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@react-navigation/native';

export default function ServiceScreen() {
  const startLineIndex = useRef(0);
  const [systemUsage, setSystemUsage] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [webviewLoaded, setWebviewLoaded] = useState(false);
  const data = useRef(null);
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { appState } = useContext(AppContext);
 
  const webViewRef = useRef<any>(null);
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#151718' });
  const theme = useTheme();

  const service = useMemo(() => {
    return appState ? appState.services.find((service) => service.id === params.id) : null
  }, [appState, params]);

  const updateChart = useCallback(() => {
    if (!service || !service.url) {
      return;
    }

    fetch(`${service.url}/system/usage?start_line_index=${startLineIndex.current}`)
      .then((res) => res.json())
      .then(({ data }) => {
        startLineIndex.current += data.length;

        const message = {
          event: 'data',
          data,
        };

        if (data) {
          setSystemUsage(data[data.length - 1]);
        }

        webViewRef.current.injectJavaScript(`
          (function() {
            document.dispatchEvent(new MessageEvent('message', {
              data: ${JSON.stringify(message)}
            }));
          })();
        `);
      });
  }, [service]);

  useLayoutEffect(() => {
    if (service) {
      navigation.setOptions({
        title: service.service_name,
        headerLeft: () => (<GoBack />),
        headerRight: () => (
          <Pressable
            onTouchEnd={() => router.push({
              pathname: '/form',
              params: {
                title: 'service',
                dataKey: 'services',
                id: service.id,
                callback: '(tabs)',
                submitType: 'edit',
                children: JSON.stringify([
                  { type: 'input', label: 'service_name', value: service.service_name },
                  { type: 'input', label: 'url', value: service.url },
                ]),
              },
            })}
          >
             <ThemedText type="action">{i18n.t('edit')}</ThemedText>
          </Pressable>
        )
      });
    }
  }, [service]);

  useInterval(updateChart, !showLoading && (appState.polling_interval || 5) * 1000);

  useEffect(() => {
    if (service && webviewLoaded && webViewRef.current) {
      updateChart();
    }
  }, [service, webviewLoaded]);

  useEffect(() => {
    return () => {
      data.current = null;
    };
  }, []);

  return (
    <ScrollView style={{padding: 16}} gap={16}>
      <ThemedView style={styles.stepContainer}>
        <FadeIn>
          <ThemedView>
            <WebView
              domStorageEnabled
              javaScriptEnabled
              originWhitelist={['*']}
              style={{width: 'auto', height: 200, borderRadius: 4, backgroundColor}}
              ref={webViewRef}
              source={{ uri: `http://localhost:1234?theme=${theme.dark ? 'dark' : 'light'}` }}
              onMessage={(event) => {
                const data = JSON.parse(event.nativeEvent.data);

                if (data.status === 'received') {
                  setShowLoading(false);
                }
                // console.log('Received message from WebView:', data, 'data');
              }}
              onLoad={() => {
                setWebviewLoaded(true);
              }}
            />

            {showLoading && (
              <Loading />
            )}
          </ThemedView>
          
        </FadeIn>

        <ThemedView style={styles.systemInfo}>
          <ThemedView style={styles.systemInfoItem}>
            <ThemedText type="defaultSemiBold" color="#2DBC85">CPU</ThemedText>
            <ThemedText type="defaultSemiBold">{systemUsage?.cpu || '-'}%</ThemedText>
          </ThemedView>

          <ThemedView style={styles.systemInfoItem}>
            <ThemedText type="defaultSemiBold" color="#FCD435">Memory</ThemedText>
            <ThemedText type="defaultSemiBold">{systemUsage?.memory || '-'}%</ThemedText>
          </ThemedView>

          <ThemedView style={styles.systemInfoItem}>
            <ThemedText type="defaultSemiBold" color="#F6465D">Socket</ThemedText>
            <ThemedText type="defaultSemiBold">{systemUsage?.socket_count || '-'}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  systemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  systemInfoItem: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
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
