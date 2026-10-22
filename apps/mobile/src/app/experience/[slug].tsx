import { getExperience } from '@foodeez/shared';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Body, Button, Eyebrow, Panel, Title } from '@/components/ui';
import { colors, fonts, spacing } from '@/constants/theme';

export default function ExperienceScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const e = getExperience(slug);

  if (!e) {
    return (
      <View style={styles.missing}>
        <Body>This experience isn&apos;t available.</Body>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: e.title }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero} />
        <View style={styles.content}>
          <Eyebrow>
            {e.type} · {e.cuisine}
          </Eyebrow>
          <Title>{e.title}</Title>
          <Body>{e.description}</Body>
          <Body muted>
            Chef {e.chef} ✓ · ★ {e.rating} · {e.reviews} verified reviews
          </Body>

          <Text style={styles.section}>Your menu</Text>
          {e.menu.map((item, i) => (
            <View key={item} style={styles.menuRow}>
              <Text style={styles.menuItem}>{item}</Text>
              <Text style={styles.menuNum}>{String(i + 1).padStart(2, '0')}</Text>
            </View>
          ))}

          <Panel>
            <Text style={styles.price}>
              ${e.price} <Text style={styles.per}>/ person</Text>
            </Text>
            <Body>
              {e.date}
              {'\n'}
              {e.time}
              {'\n'}
              {e.location}
            </Body>
            <Body muted>{e.seatsLeft} seats remaining</Body>
            <Button label="Reserve" variant="accent" disabled />
            <Body muted>Booking opens once payments are connected.</Body>
          </Panel>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 60, backgroundColor: colors.paper },
  hero: { height: 220, backgroundColor: colors.accent },
  content: { padding: spacing.lg, gap: spacing.md },
  section: {
    fontFamily: fonts.serif,
    fontSize: 24,
    fontWeight: '700',
    color: colors.ink,
    marginTop: spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: 12,
  },
  menuItem: { fontSize: 17, color: colors.ink },
  menuNum: { color: colors.muted },
  price: { fontFamily: fonts.serif, fontSize: 30, fontWeight: '700', color: colors.ink },
  per: { fontSize: 15, color: colors.muted, fontWeight: '400' },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
