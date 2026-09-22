import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Brand, Fonts, Radius, Spacing } from '@/constants/theme';
import type { HomeData } from '@/types/home';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  subscription: HomeData['subscription'];
};

export function SubscriptionCard({ subscription }: Props) {
  const theme = useTheme();
  const { tier, lessonsRemaining, totalLessons } = subscription;

  if (!tier) {
    return (
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.row}>
          <View style={[styles.iconWrap, { backgroundColor: Brand.amberSoft }]}>
            <Ionicons name="sparkles" size={18} color={Brand.amber} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.title, { color: theme.text }]}>Unlock live classes</Text>
            <Text style={[styles.sub, { color: theme.textSecondary }]}>
              Start a plan to book teachers and keep your streak sharp.
            </Text>
          </View>
        </View>
        <PressableScale
          onPress={() => Alert.alert('Plans', 'Subscription flow would open here.')}
          style={styles.ctaGhost}>
          <Text style={styles.ctaGhostText}>See plans</Text>
        </PressableScale>
      </View>
    );
  }

  const depleted = lessonsRemaining <= 0;
  const used = Math.max(totalLessons - lessonsRemaining, 0);
  const ratio = totalLessons > 0 ? used / totalLessons : 0;

  return (
    <LinearGradient
      colors={depleted ? ['#2A1A16', '#3A221C'] : [Brand.tealDeep, Brand.teal]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <View style={styles.top}>
        <View>
          <Text style={styles.planLabel}>{tier.toUpperCase()} PLAN</Text>
          <Text style={[styles.planTitle, { fontFamily: Fonts.rounded }]}>
            {depleted ? 'Lessons used up' : `${lessonsRemaining} lessons left`}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {used}/{totalLessons}
          </Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(ratio, 1) * 100}%` }]} />
      </View>

      <Text style={styles.hint}>
        {depleted
          ? 'Top up to keep booking 1:1 sessions this month.'
          : 'Live sessions refresh with your billing cycle.'}
      </Text>

      {depleted ? (
        <PressableScale
          onPress={() => Alert.alert('Top up', 'Lesson pack purchase would open here.')}
          style={styles.ctaLight}>
          <Text style={styles.ctaLightText}>Add more lessons</Text>
        </PressableScale>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 12,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  planTitle: {
    color: Brand.white,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  badgeText: {
    color: Brand.white,
    fontWeight: '700',
    fontSize: 12,
  },
  track: {
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Brand.white,
    borderRadius: Radius.pill,
  },
  hint: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 18,
  },
  ctaLight: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: Brand.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.pill,
  },
  ctaLightText: {
    color: Brand.coral,
    fontWeight: '800',
    fontSize: 13,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  sub: {
    fontSize: 13,
    lineHeight: 18,
  },
  ctaGhost: {
    alignSelf: 'flex-start',
    backgroundColor: Brand.tealSoft,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.pill,
  },
  ctaGhostText: {
    color: Brand.tealDeep,
    fontWeight: '800',
    fontSize: 13,
  },
});
