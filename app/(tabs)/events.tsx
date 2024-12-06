import { useRef, useEffect } from 'react';
import { ScrollView } from '@/components/ScrollView';
import { ThemedView } from '@/components/ThemedView';

export default function ServerScreen() {
  const webViewRef = useRef<any>(null);

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({ key: 'value' }), '*');
    }
  }, []);

  return (
    <ScrollView style={{paddingVertical: 16}} gap={16}>
      <ThemedView></ThemedView>
    </ScrollView>
  );
}
