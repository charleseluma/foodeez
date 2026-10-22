import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';
import { SessionProvider } from '@/lib/session';

export default function RootLayout() {
  return (
    <SessionProvider>
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
        <Stack.Screen name="sign-in" options={{ title: '', presentation: 'modal' }} />
        <Stack.Screen name="sign-up" options={{ title: '', presentation: 'modal' }} />
        <Stack.Screen name="chef-apply" options={{ title: 'Chef application' }} />
      </Stack>
    </SessionProvider>
  );
}
