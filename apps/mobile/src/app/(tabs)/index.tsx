import { experiences } from '@foodeez/shared';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { ExperienceCard } from '@/components/experience-card';
import { Body, Eyebrow, Screen, Title } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';

const filters = ['All', 'Private dinners', 'Tastings', 'Under $75'] as const;
type Filter = (typeof filters)[number];

function matches(filter: Filter, type: string, price: number) {
  if (filter === 'Private dinners') return type === 'PRIVATE DINNER';
  if (filter === 'Tastings') return type !== 'PRIVATE DINNER';
  if (filter === 'Under $75') return price < 75;
  return true;
}

export default function DiscoverScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = experiences.filter((e) => matches(filter, e.type, e.price));

  return (
    <Screen>
      <Eyebrow>Discover Foodeez</Eyebrow>
      <Title>What are you hungry to experience?</Title>
      <Body muted>Private dinners, tastings and chef's tables near you.</Body>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {filters.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, f === filter && styles.chipActive]}>
            <Text style={[styles.chipLabel, f === filter && styles.chipLabelActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {shown.map((e) => (
        <ExperienceCard key={e.slug} experience={e} />
      ))}
      {shown.length === 0 && <Body muted>Nothing matches yet. Try another filter.</Body>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { gap: spacing.sm, paddingVertical: spacing.xs },
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipLabel: { color: colors.ink, fontWeight: '600' },
  chipLabelActive: { color: colors.white },
});
