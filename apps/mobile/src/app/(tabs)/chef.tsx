import { STATUS_COPY, experiences } from '@foodeez/shared';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ExperienceCard } from '@/components/experience-card';
import { Body, Button, Eyebrow, Screen, Title } from '@/components/ui';
import { colors, fonts, spacing } from '@/constants/theme';
import { useSession } from '@/lib/session';

// Chef mode. Approved chefs see their kitchen; experiences are still sample data
// until the Create Experience step (build plan step 3) is connected to the database.
const SAMPLE_CHEF_SLUG = 'andre-williams';

export default function ChefScreen() {
  const { configured, loading, session, application } = useSession();

  // Live accounts: show the right step until the person is an approved chef.
  if (configured && !loading && application?.status !== 'approved') {
    if (!session) {
      return (
        <Screen>
          <Eyebrow>Chef mode</Eyebrow>
          <Title>Cook for Foodeez.</Title>
          <Body muted>
            Host private dinners and tastings for guests in DC, Maryland and Virginia. Create an
            account to apply.
          </Body>
          <Button label="Create an account" variant="accent" onPress={() => router.push('/sign-up')} />
          <Button label="Sign in" variant="outline" onPress={() => router.push('/sign-in')} />
        </Screen>
      );
    }
    if (!application) {
      return (
        <Screen>
          <Eyebrow>Chef mode</Eyebrow>
          <Title>Cook for Foodeez.</Title>
          <Body muted>
            Chefs apply and are reviewed before they can sell seats, so guests can trust every table.
          </Body>
          <Button label="Apply to become a chef" variant="accent" onPress={() => router.push('/chef-apply')} />
        </Screen>
      );
    }
    const copy = STATUS_COPY[application.status];
    return (
      <Screen>
        <Eyebrow>Chef mode</Eyebrow>
        <Title>{copy.title}</Title>
        <Body muted>{copy.body}</Body>
        {application.status === 'pending' && (
          <Button label="Edit application" variant="outline" onPress={() => router.push('/chef-apply')} />
        )}
      </Screen>
    );
  }

  const live = configured && application?.status === 'approved';
  const mine = experiences.filter((e) => e.chefSlug === SAMPLE_CHEF_SLUG);
  const seatsLeft = mine.reduce((n, e) => n + e.seatsLeft, 0);

  return (
    <Screen>
      <Eyebrow>{live ? 'Chef mode' : 'Chef mode · Preview'}</Eyebrow>
      <Title>Your kitchen</Title>
      <Body muted>Create experiences, see who&apos;s coming, and manage your table.</Body>

      <View style={styles.stats}>
        <Stat value={String(mine.length)} label="Upcoming" />
        <Stat value={String(seatsLeft)} label="Seats open" />
        <Stat value="—" label="Earnings" />
      </View>

      <Button label="+ Create experience" variant="accent" disabled />
      <Body muted>Creating experiences is the next feature being built.</Body>

      <Text style={styles.section}>Upcoming experiences</Text>
      {mine.map((e) => (
        <ExperienceCard key={e.slug} experience={e} />
      ))}

    </Screen>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.cream,
    borderRadius: 18,
    padding: spacing.md,
    gap: 2,
  },
  statValue: { fontFamily: fonts.serif, fontSize: 28, fontWeight: '700', color: colors.ink },
  statLabel: { color: colors.muted, fontSize: 13 },
  section: { fontFamily: fonts.serif, fontSize: 22, fontWeight: '700', color: colors.ink },
});
