import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '@/constants/theme';

export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView>
    </SafeAreaView>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

export function Title({ children, size = 34 }: { children: ReactNode; size?: number }) {
  return <Text style={[styles.title, { fontSize: size, lineHeight: size * 1.1 }]}>{children}</Text>;
}

export function Body({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return <Text style={[styles.body, muted && { color: colors.muted }]}>{children}</Text>;
}

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'accent' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = 'primary', disabled, style }: ButtonProps) {
  const bg =
    variant === 'accent' ? colors.accent : variant === 'primary' ? colors.ink : 'transparent';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.8 : 1 },
        variant === 'outline' && styles.outline,
        style,
      ]}>
      <Text style={[styles.buttonLabel, variant === 'outline' && { color: colors.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return <View style={styles.panel}>{children}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { padding: spacing.lg, paddingBottom: 120, gap: spacing.md },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: { fontFamily: fonts.serif, color: colors.ink, fontWeight: '700', letterSpacing: -0.8 },
  body: { color: colors.ink, fontSize: 16, lineHeight: 24 },
  button: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  outline: { borderWidth: 1, borderColor: colors.line },
  buttonLabel: { color: colors.white, fontWeight: '700', fontSize: 16 },
  panel: {
    backgroundColor: colors.cream,
    borderRadius: 22,
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
