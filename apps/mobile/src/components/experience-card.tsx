import type { Experience } from '@foodeez/shared';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link href={{ pathname: '/experience/[slug]', params: { slug: experience.slug } }} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}>
        <View style={styles.image}>
          <Text style={styles.tag}>{experience.type}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{experience.title}</Text>
          <Text style={styles.meta}>
            Chef {experience.chef} ✓{'\n'}
            {experience.date} · {experience.time.split(' – ')[0]}
            {'\n'}
            {experience.location}
          </Text>
          <View style={styles.foot}>
            <Text style={styles.meta}>
              <Text style={styles.strong}>★ {experience.rating}</Text> · {experience.seatsLeft} seats
              left
            </Text>
            <Text style={styles.price}>${experience.price}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  image: {
    height: 170,
    backgroundColor: colors.accent,
    padding: spacing.md,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tag: {
    backgroundColor: colors.paper,
    color: colors.ink,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  body: { padding: spacing.md, gap: spacing.sm },
  title: { fontFamily: fonts.serif, fontSize: 24, fontWeight: '700', color: colors.ink },
  meta: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  strong: { color: colors.ink, fontWeight: '700' },
  foot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontFamily: fonts.serif, fontSize: 22, fontWeight: '700', color: colors.ink },
});
