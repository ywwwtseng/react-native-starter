import { Pressable } from 'react-native';
import { Icon } from '@/components/Icon';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import i18n from '@/i18n';

function GoBack() {
  const router = useRouter();
  return (
    <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onTouchEnd={() => router.back()}>
      <Icon.Ionicons
        name='chevron-back-outline'
        size={24}
        color="#2f81f7"
      />
      <ThemedText type="action">{i18n.t('back')}</ThemedText>
    </Pressable>
  );
}

export { GoBack };
