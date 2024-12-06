import { useContext, useEffect } from 'react';
import { StyleSheet, Switch } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTheme } from '@react-navigation/native';

import { ScrollView } from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RowItem } from '@/components/RowItem';
import { Icon } from '@/components/Icon';

import { AppContext } from '@/context/AppContext';
import npmPackage from '@/package.json';
import i18n from '@/i18n';

export default function SettingsScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { appState, setAppState } = useContext(AppContext);


  useEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('settings'),
    });
  }, [appState]);

  if (!appState) {
    return null;
  }

  return (
    <ScrollView style={{paddingVertical: 16}} gap={16}>
      <ThemedText style={{paddingHorizontal: 16}}>{i18n.t('basic')}</ThemedText>
      <ThemedView borderTop borderBottom>
        <RowItem 
          borderBottom 
          label={i18n.t('appearance')}
          link={{
            pathname: '/form',
            params: {
              title: 'appearance',
              children: JSON.stringify([
                {
                  type: 'select',
                  storage_key: 'appearance',
                  options: ['dark', 'light'],
                }
              ])
            }
          }}>
          <ThemedText type="defaultSemiBold">
            {i18n.t(appState.appearance)}
          </ThemedText>
          <Icon.Ionicons
            name='chevron-forward-outline'
            size={20}
            color={theme.colors.text}
          />
        </RowItem>

        <RowItem
          borderBottom
          label={i18n.t('language')}
          link={{
            pathname: '/form',
            params: {
              title: 'language',
              children: JSON.stringify([
                {
                  type: 'select',
                  storage_key: 'language',
                  options: ['en', 'zh'],
                }
              ])
            }
          }}
          >
          <ThemedText type="defaultSemiBold">
            {i18n.t(appState.language)}
          </ThemedText>
          <Icon.Ionicons
            name='chevron-forward-outline'
            size={20}
            color={theme.colors.text}
          />
        </RowItem>

        {/* <RowItem borderBottom label={i18n.t('notifications')}>
          <Switch value={appState.notifications} onValueChange={(value) => setAppState('notifications', value)} />
        </RowItem> */}

        <RowItem
          label={i18n.t('polling_interval')}
          link={{
            pathname: '/form',
            params: {
              title: 'polling_interval',
              children: JSON.stringify([
                {
                  type: 'select',
                  storage_key: 'polling_interval',
                  settings: {
                    i18n: 'unit.s',
                  },
                  options: [5, 10, 30, 60, 300],
                }
              ])
            }
          }}
        >
          <ThemedText type="defaultSemiBold">
              {i18n.t('unit.s', { value: appState.polling_interval })}
            </ThemedText>
            <Icon.Ionicons
              name='chevron-forward-outline'
              size={20}
              color={theme.colors.text}
            />
        </RowItem>
      </ThemedView>

      <ThemedText style={{paddingHorizontal: 16}}>{i18n.t('data_management')}</ThemedText>
      <ThemedView borderTop borderBottom>
        <RowItem
          label={i18n.t('data_retention')}
          link={{
            pathname: '/form',
            params: {
              title: 'data_retention',
              children: JSON.stringify([
                {
                  type: 'select',
                  storage_key: 'data_retention',
                  settings: {
                    i18n: 'unit.d',
                  },
                  options: [14, 30, 100],
                }
              ])
            }
          }}
        >
          <ThemedText type="defaultSemiBold">
            {i18n.t('unit.d', { value: appState.data_retention })}
          </ThemedText>
          <Icon.Ionicons
            name='chevron-forward-outline'
            size={20}
            color={theme.colors.text}
          />
        </RowItem>
      </ThemedView>

      {/* <ThemedText style={{paddingHorizontal: 16}}>{i18n.t('advanced')}</ThemedText>
      <ThemedView borderTop borderBottom>
        <RowItem label={i18n.t('unlock_all_features')}></RowItem>
      </ThemedView> */}

      <ThemedText style={{paddingHorizontal: 16}}>{i18n.t('support')}</ThemedText>
      <ThemedView borderTop borderBottom>
        <RowItem borderBottom label={i18n.t('privacy_policy')}>
          <Icon.Ionicons
            name='chevron-forward-outline'
            size={20}
            color={theme.colors.text}
          />
        </RowItem>

        {/* <RowItem borderBottom label={i18n.t('feedback')}>
          <Icon.Ionicons
            name='chevron-forward-outline'
            size={20}
            color={theme.colors.text}
          />
        </RowItem> */}

        <RowItem label={i18n.t('version')}>
          <ThemedText type="defaultSemiBold">
            {npmPackage.version}
          </ThemedText>
        </RowItem>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
});
