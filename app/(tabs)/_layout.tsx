import { Tabs, useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Pressable } from 'react-native';
// import * as TaskManager from 'expo-task-manager';
// import * as BackgroundFetch from 'expo-background-fetch';

import { Icon } from '@/components/Icon';
import Logo from '@/components/Logo';
import { useTheme } from '@react-navigation/native';
import i18n from '@/i18n';
import { AppContext } from '@/context/AppContext';

// // Configure the background fetch
// TaskManager.defineTask('background-task', async () => {
//   try {
//     // 在这里进行你的后台任务
//     // 可以使用 fetch 请求从服务器获取数据
//     const response = await fetch('https://your-server-url.com');
//     const data = await response.json();
//     console.log('Background fetch data:', data);
//   } catch (error) {
//     console.error('Background task error:', error);
//   }
//   return BackgroundFetch.Result.NewData;
// });

// BackgroundFetch.registerTaskAsync('background-task', {
//   minimumInterval: 15, // 以分钟为单位的最小轮询间隔
//   stopOnTerminate: false,
//   startOnBoot: true,
// });

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  useContext(AppContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.text,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('services'),
          tabBarIcon: ({ color }) => (
            <Icon.FontAwesome name="server" style={{ marginBottom: -3 }} color={color} />
          ),
          headerLeft: () => (
            <Logo style={{marginHorizontal: 12}} />
          ),
          headerRight: () => (
            <Pressable
              style={{paddingHorizontal: 12}}
              onTouchEnd={() => router.push({
                pathname: '/form',
                params: {
                  title: 'service',
                  dataKey: 'services',
                  submitType: 'create',
                  children: JSON.stringify([
                    { type: 'input', label: 'service_name', value: '' },
                    { type: 'input', label: 'url', value: '' },
                  ]),
                },
              })}
              >
              <Icon.AntDesign name="plus" size={28} color={theme.colors.text} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: i18n.t('events'),
          tabBarIcon: ({ color }) => (
            <Icon.Material name="event" style={{ marginBottom: -3 }} color={color} />
            
          ),
          headerLeft: () => (
            <Logo style={{marginHorizontal: 12}} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('settings'),
          tabBarIcon: ({ color, focused }) => (
            <Icon.Ionicons name={focused ? 'settings' : 'settings-outline'} style={{ marginBottom: -3 }} color={color} />
          ),
          headerLeft: () => (
            <Logo style={{marginHorizontal: 12}} />
          ),
        }}
      />
    </Tabs>
  );
}
