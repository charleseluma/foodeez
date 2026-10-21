import { Platform } from 'react-native';

export { colors, radius } from '@foodeez/shared';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// Editorial serif for headlines, matching the website's Georgia wordmark.
export const fonts = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
};
