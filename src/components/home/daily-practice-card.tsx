import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Brand, Fonts, Radius, Spacing } from '@/constants/theme';
import type { DailyPractice } from '@/types/home';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  dailyPractice: DailyPractice;
};

export function DailyPracticeCard({ dailyPractice }: Props) {
  const theme = useTheme();
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (!dailyPractice.completedToday) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.04, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else {
      pulse.value = 1;
    }
  }, [dailyPractice.completedToday, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  if (dailyPractice.completedToday) {
    return (
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.doneBadge}>
          <Ionicons name="checkmark-circle" size={18} color={Brand.success} />
          <Text style={styles.doneBadgeText}>Done for today</Text>
        </View>
        <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.rounded }]}>
          {dailyPractice.title}
        </Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>
          Nice work — {dailyPractice.scorePercent}% accuracy · {dailyPractice.wordsPracticed} words
        </Text>

        <View style={styles.resultsRow}>
          <View style={[styles.resultChip, { backgroundColor: Brand.tealSoft }]}>
            <Text style={styles.resultChipText}>+{dailyPractice.xpReward} XP</Text>
          </View>
          <View style={[styles.resultChip, { backgroundColor: theme.backgroundSelected }]}>
            <Text style={[styles.resultChipText, { color: theme.text }]}>
              {dailyPractice.focusSkill}
            </Text>
          </View>
        </View>

        <PressableScale
          onPress={() => Alert.alert('Results', 'Detailed practice results would open here.')}
          style={[styles.secondaryBtn, { borderColor: theme.border }]}>
          <Text style={[styles.secondaryText, { color: theme.text }]}>View results</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
        </PressableScale>
      </View>
    );
  }

  return (
    <Animated.View style={pulseStyle}>
      <LinearGradient
        colors={['#FF8A6B', Brand.coral]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <Text style={styles.kicker}>DAILY PRACTICE</Text>
        <Text style={[styles.titleLight, { fontFamily: Fonts.rounded }]}>
          {dailyPractice.title}
        </Text>
        <Text style={styles.subLight}>
          {dailyPractice.estimatedMinutes} min · {dailyPractice.focusSkill} · +
          {dailyPractice.xpReward} XP
        </Text>

        <PressableScale
          onPress={() => Alert.alert('Practice', 'Practice session would start here.')}
          style={styles.startBtn}>
          <Ionicons name="play" size={16} color={Brand.coral} />
          <Text style={styles.startText}>Start</Text>
        </PressableScale>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 10,
  },
  gradient: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 8,
  },
  kicker: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleLight: {
    color: Brand.white,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: 14,
    lineHeight: 20,
  },
  subLight: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 14,
    marginBottom: 8,
  },
  startBtn: {
    alignSelf: 'flex-start',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Brand.white,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: Radius.pill,
  },
  startText: {
    color: Brand.coral,
    fontWeight: '800',
    fontSize: 15,
  },
  doneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  doneBadgeText: {
    color: Brand.success,
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  resultsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  resultChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  resultChipText: {
    color: Brand.tealDeep,
    fontWeight: '800',
    fontSize: 12,
  },
  secondaryBtn: {
    marginTop: 6,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryText: {
    fontWeight: '700',
    fontSize: 14,
  },
});
