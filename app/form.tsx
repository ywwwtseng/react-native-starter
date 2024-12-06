import { AppContext, type AppStorageKeys } from '@/context/AppContext';
import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Pressable } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { ScrollView } from '@/components/ScrollView';
import { ThemedView } from '@/components/ThemedView';
import { RowItem } from '@/components/RowItem';
import { Icon } from '@/components/Icon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { GoBack } from '@/components/GoBack';
import { Loading } from '@/components/Loading';
import i18n from '@/i18n';
import { uuid } from '@/utils/string';

export default function FormScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const children = JSON.parse(params.children as string);
  const [formState, setFormState] = useState(
    params.submitType
      ? children.reduce((acc: {[key: string]: any}, cur: any) => {
          acc[cur.label] = cur.value;
          return acc;
        }, {})
      : null
  );


  const { appState, setAppState } = useContext(AppContext);

  const renderItem = (item: any) => {
    if (item.type === 'select' && item.storage_key) {
      return item.options.map((option: string) => {
        return (
          <RowItem
            borderBottom
            onTouchEnd={() => {
              setAppState(item.storage_key, option);
            }}
            key={option}
            label={item.settings ? i18n.t(item.settings.i18n, { value: option }) : i18n.t(option)}>
            {appState && option === appState[item.storage_key as AppStorageKeys] && (
              <Icon.Ionicons name="checkmark" size={28} color="#2f81f7" />
            )}
          </RowItem>
        );
      })
    } else if (item.type === 'input') {
      return (
        <RowItem label={i18n.t(item.label)} borderBottom>
          <ThemedTextInput
            autoCapitalize="none"
            value={formState[item.label]}
            onChangeText={(value) => {
              setFormState((formState: any) => ({
                ...formState,
                [item.label]: value
              }));
            }} />
        </RowItem>
      )
    } else if (item.type === 'text') {
      return (
        <RowItem label={i18n.t(item.label)} borderBottom>
          <ThemedText type="defaultSemiBold" style={{textAlign: 'right', flex: 1}}>
            {i18n.t(item.value)}
          </ThemedText>
        </RowItem>
      )
    }

    return null;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.title ? i18n.t(params.title) : '',
      headerLeft: () => (<GoBack />),
      headerRight: () => {
        if (!params.submitType) {
          return null;
        }

        return (
          <Pressable onTouchEnd={async () => {
            if (!appState) {
              return
            }

            setLoading(true);

            const list = appState[params.dataKey as AppStorageKeys] as any || [];

            if (params.submitType == 'edit') {
              const index = list.findIndex((id) => params.id);
              list[index] = {
                ...list[index],
                ...formState,
              };
              await setAppState(
                params.dataKey as AppStorageKeys,
                list
              );
            } else {
              await setAppState(
                params.dataKey as AppStorageKeys,
                [
                  ...list,
                  {
                    id: uuid(),
                    ...formState,
                  },
                ]
              );
            }

            setLoading(false);

            router.back();
          }}>
            <ThemedText type="action">{i18n.t(params.submitType)}</ThemedText>
          </Pressable>
        )
      }
    });
  }, [navigation, appState, formState]);


  return [
    <ScrollView key="form-page">
      {children.map((item: any, index: number) => {
        return (
          <ThemedView key={`${params.title}.${index}`}>
            {renderItem(item)}
          </ThemedView>
        )
      })}
      {params.submitType === 'edit' && (
        <ThemedButton color="#FF3B30" onTouchEnd={async () => {
          if (!appState) {
            return
          }

          setLoading(true);

          const list = appState[params.dataKey as AppStorageKeys] as any || [];

          await setAppState(
            params.dataKey as AppStorageKeys,
            (appState[params.dataKey as AppStorageKeys] as any || []).filter(({ id }: any) => id !== params.id)
          );

          setLoading(false);

          router.push(params.callback);
        }}>
          {i18n.t('delete')}
        </ThemedButton>
      )}
      
    </ScrollView>,
    loading && (
      <Loading key="loading" />
    )
  ].filter(Boolean);
}
