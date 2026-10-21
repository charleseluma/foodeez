import { experiences } from '@foodeez/shared';
import { StyleSheet, Text, View } from 'react-native';

import { ExperienceCard } from '@/components/experience-card';
import { Body, Button, Eyebrow, Panel, Screen, Title } from '@/components/ui';
import { colors, fonts, spacing } from '@/constants/theme';

// Chef mode preview. Uses sample data until chef accounts are connected to the database.
const SAMPLE_CHEF_SLUG = 'andre-williams';

export default function ChefScreen() {
  const mine = experiences.filter((e) => e.chefSlug === SAMPLE_CHEF_SLUG);
  const seatsLeft = mine.reduce((n, e) => n + e.seatsLeft, 0);

  return (
    <Screen>
      <Eyebrow>Chef mode · Preview</Eyebrow>
      <Title>Your kitchen</Title>
      <Body muted>Create experiences, see who's coming, and manage your table.</Body>

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

      <Panel>
        <Text style={styles.section}>Not a Foodeez chef yet?</Text>
        <Body muted>
          Chefs apply and are reviewed before they can sell seats, so guests can trust every table.
        </Body>
        <Button label="Apply to become a chef" variant="outline" disabled />
      </Panel>
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
