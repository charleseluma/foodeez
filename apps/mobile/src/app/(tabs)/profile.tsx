import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Body, Button, Eyebrow, Panel, Screen, Title } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useSession } from '@/lib/session';

export default function ProfileScreen() {
  const { configured, loading, session, fullName, application, signOut } = useSession();

  if (!configured) {
    return (
      <Screen>
        <Eyebrow>Your Foodeez</Eyebrow>
        <Title>Food is better experienced together.</Title>
        <Panel>
          <Body muted>Accounts aren&apos;t switched on in this build yet. For now, explore the preview.</Body>
        </Panel>
      </Screen>
    );
  }

  if (loading) {
    return (
      <Screen>
        <Body muted>Loading…</Body>
      </Screen>
    );
  }

  if (!session) {
    return (
      <Screen>
        <Eyebrow>Your Foodeez</Eyebrow>
        <Title>Food is better experienced together.</Title>
        <Body muted>Sign in to save experiences, book seats, follow chefs and apply to cook.</Body>
        <Button label="Sign in" onPress={() => router.push('/sign-in')} />
        <Button label="Create an account" variant="outline" onPress={() => router.push('/sign-up')} />
      </Screen>
    );
  }

  const status = application?.status;
  return (
    <Screen>
      <Eyebrow>Your Foodeez</Eyebrow>
      <Title>Hi{fullName ? `, ${fullName.split(' ')[0]}` : ''}.</Title>
      <Panel>
        <Row label="Name" value={fullName || '—'} />
        <Row label="Email" value={session.user.email ?? '—'} />
        <Row label="Chef status" value={status ? status[0].toUpperCase() + status.slice(1) : 'Not a chef yet'} />
      </Panel>
      {!application && (
        <Button label="Apply to become a chef" variant="accent" onPress={() => router.push('/chef-apply')} />
      )}
      <Button label="Sign out" variant="outline" onPress={signOut} />
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, paddingVertical: 4 },
  rowLabel: { color: colors.muted, fontSize: 15 },
  rowValue: { color: colors.ink, fontSize: 15, fontWeight: '600', flexShrink: 1 },
});
