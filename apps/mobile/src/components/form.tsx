import { Pressable, StyleSheet, Switch, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, spacing } from '@/constants/theme';

type FieldProps = TextInputProps & { label: string; error?: string; hint?: string };

export function Field({ label, error, hint, style, ...input }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, input.multiline && styles.multiline, error ? styles.inputError : null, style]}
        accessibilityLabel={label}
        {...input}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T | '';
  onChange: (v: T) => void;
  error?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pills}>
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <Pressable
              key={o.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onChange(o.value)}
              style={[styles.pill, selected && styles.pillSelected]}>
              <Text style={[styles.pillText, selected && { color: colors.white }]}>{o.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.toggle}>
      <Text style={[styles.hint, { flex: 1, color: colors.ink, fontSize: 15 }]}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.accent, false: colors.line }} />
    </View>
  );
}

export function FormMessage({ text, tone = 'error' }: { text: string; tone?: 'error' | 'success' }) {
  if (!text) return null;
  return <Text style={[styles.error, tone === 'success' && { color: colors.sage }]}>{text}</Text>;
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { color: colors.ink, fontWeight: '700', fontSize: 14 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
    backgroundColor: colors.white,
  },
  multiline: { minHeight: 130, textAlignVertical: 'top' },
  inputError: { borderColor: colors.accent },
  hint: { color: colors.muted, fontSize: 13 },
  error: { color: colors.accentDark, fontWeight: '700', fontSize: 13 },
  pills: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  pill: { borderWidth: 1, borderColor: colors.line, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 16 },
  pillSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  pillText: { color: colors.ink, fontWeight: '600' },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
