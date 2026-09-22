import '@/global.css';

import { Platform } from 'react-native';

export const Brand = {
  teal: '#08A4B3',
  tealDeep: '#067A86',
  tealSoft: '#D7F3F6',
  tealMist: '#EEF9FA',
  coral: '#FF6B4A',
  coralSoft: '#FFE4DC',
  amber: '#F5A623',
  amberSoft: '#FFF1D6',
  ink: '#12232A',
  inkMuted: '#5B6B73',
  inkFaint: '#8A9AA2',
  white: '#FFFFFF',
  line: '#DCE8EB',
  success: '#1FA971',
  danger: '#E5484D',
} as const;

export const Colors = {
  light: {
    text: Brand.ink,
    background: Brand.tealMist,
    backgroundElement: Brand.white,
    backgroundSelected: Brand.tealSoft,
    textSecondary: Brand.inkMuted,
    tint: Brand.teal,
    border: Brand.line,
    card: Brand.white,
    accent: Brand.coral,
  },
  dark: {
    text: '#F2F7F8',
    background: '#0A1417',
    backgroundElement: '#132227',
    backgroundSelected: '#1A3036',
    textSecondary: '#9BB0B7',
    tint: '#2EC4D4',
    border: '#243840',
    card: '#132227',
    accent: '#FF7D5F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 560;
