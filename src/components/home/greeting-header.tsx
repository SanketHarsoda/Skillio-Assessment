import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Brand, Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  name: string;
  avatarUrl: string;
  streakDays: number;
  weeklyXp: number;
  weeklyXpGoal: number;
};

function greetingForHour(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function GreetingHeader({ name, avatarUrl, streakDays, weeklyXp, weeklyXpGoal }: Props) {
  const theme = useTheme();
  const greeting = greetingForHour(new Date().getHours());
  const xpPct = Math.min(100, Math.round((weeklyXp / Math.max(weeklyXpGoal, 1)) * 100));

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.identity}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} contentFit="cover" />
          <View style={styles.copy}>
            <Text style={[styles.hello, { color: theme.textSecondary }]}>{greeting}</Text>
            <Text style={[styles.name, { color: theme.text, fontFamily: Fonts.rounded }]}>
              {name}
            </Text>
          </View>
        </View>

        <View style={[styles.streak, { backgroundColor: Brand.coralSoft }]}>
          <Ionicons name="flame" size={16} color={Brand.coral} />
          <Text style={styles.streakText}>{streakDays}</Text>
        </View>
      </View>

      <View style={[styles.xpCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.xpRow}>
          <Text style={[styles.xpLabel, { color: theme.text }]}>This week</Text>
          <Text style={[styles.xpValue, { color: theme.textSecondary }]}>
            {weeklyXp}/{weeklyXpGoal} XP
          </Text>
        </View>
        <View style={[styles.xpTrack, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.xpFill,
              { width: `${xpPct}%`, backgroundColor: Brand.teal },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: Brand.tealSoft,
  },
  copy: {
    gap: 2,
    flexShrink: 1,
  },
  hello: {
    fontSize: 13,
    fontWeight: '600',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  streakText: {
    color: Brand.coral,
    fontWeight: '800',
    fontSize: 14,
  },
  xpCard: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: 14,
    gap: 10,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  xpValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  xpTrack: {
    height: 8,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: Radius.pill,
  },
});
