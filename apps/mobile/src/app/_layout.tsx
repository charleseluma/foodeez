import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: colors.ink,
          headerStyle: { backgroundColor: colors.paper },
          contentStyle: { backgroundColor: colors.paper },
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="experience/[slug]" options={{ title: '' }} />
      </Stack>
    </>
  );
}
