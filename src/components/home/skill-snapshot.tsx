import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { SkillMetric } from '@/components/home/animated-bar';
import { Brand, Fonts, Radius, Spacing } from '@/constants/theme';
import type { HomeData } from '@/types/home';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  skillSnapshot: HomeData['skillSnapshot'];
};

const SKILL_COLORS = {
  grammar: Brand.teal,
  vocabulary: '#3D9CF0',
  pronunciation: Brand.amber,
  speaking: Brand.coral,
} as const;

export function SkillSnapshot({ skillSnapshot }: Props) {
  const theme = useTheme();

  if (!skillSnapshot) {
    return (
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={[styles.emptyIcon, { backgroundColor: Brand.tealSoft }]}>
          <Ionicons name="stats-chart-outline" size={20} color={Brand.teal} />
        </View>
        <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.rounded }]}>
          Skill snapshot unlocks soon
        </Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>
          Finish a few practices and your first check-in will show grammar, vocab, pronunciation,
          and speaking.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.kicker, { color: Brand.tealDeep }]}>SKILL SNAPSHOT</Text>
          <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.rounded }]}>
            Where you stand
          </Text>
        </View>
        <View style={[styles.growth, { backgroundColor: Brand.tealSoft }]}>
          <Ionicons name="trending-up" size={14} color={Brand.tealDeep} />
          <Text style={styles.growthText}>+{skillSnapshot.growthPercent}%</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.stat, { backgroundColor: theme.backgroundSelected }]}>
          <Text style={[styles.statValue, { color: theme.text }]}>
            +{skillSnapshot.overallImprovementPercent}%
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>overall improve</Text>
        </View>
        <View style={[styles.stat, { backgroundColor: theme.backgroundSelected }]}>
          <Text style={[styles.statValue, { color: theme.text }]}>
            +{skillSnapshot.growthPercent}%
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>since last check-in</Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <SkillMetric label="Grammar" value={skillSnapshot.grammar} color={SKILL_COLORS.grammar} delay={80} />
        <SkillMetric
          label="Vocabulary"
          value={skillSnapshot.vocabulary}
          color={SKILL_COLORS.vocabulary}
          delay={140}
        />
        <SkillMetric
          label="Pronunciation"
          value={skillSnapshot.pronunciation}
          color={SKILL_COLORS.pronunciation}
          delay={200}
        />
        <SkillMetric
          label="Speaking"
          value={skillSnapshot.speaking}
          color={SKILL_COLORS.speaking}
          delay={260}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: 14,
    lineHeight: 20,
  },
  growth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  growthText: {
    color: Brand.tealDeep,
    fontWeight: '800',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    flex: 1,
    borderRadius: Radius.md,
    padding: 12,
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  metrics: {
    gap: 14,
  },
  emptyIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
