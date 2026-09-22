import { StyleSheet, Text, View } from 'react-native';

import { ProgressRing } from '@/components/home/progress-ring';
import { Brand, Fonts, Radius, Spacing } from '@/constants/theme';
import type { HomeData } from '@/types/home';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  progress: HomeData['progress'];
};

export function ProgressCard({ progress }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.copy}>
        <Text style={[styles.kicker, { color: Brand.tealDeep }]}>CEFR PATH</Text>
        <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.rounded }]}>
          Leveling to {progress.nextCefrLevel}
        </Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>
          You&apos;re at {progress.currentCefrLevel}. Keep stacking practice and live classes.
        </Text>

        <View style={styles.levels}>
          <View style={[styles.pill, { backgroundColor: Brand.tealSoft }]}>
            <Text style={styles.pillText}>{progress.currentCefrLevel}</Text>
          </View>
          <Text style={{ color: theme.textSecondary, fontWeight: '700' }}>→</Text>
          <View style={[styles.pill, { backgroundColor: theme.backgroundSelected }]}>
            <Text style={[styles.pillText, { color: theme.text }]}>{progress.nextCefrLevel}</Text>
          </View>
        </View>
      </View>

      <ProgressRing
        percent={progress.overallProgressPercent}
        label={`${progress.overallProgressPercent}%`}
        sublabel="overall"
        accent={Brand.teal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  copy: {
    flex: 1,
    gap: 8,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: 13,
    lineHeight: 18,
  },
  levels: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  pillText: {
    color: Brand.tealDeep,
    fontWeight: '800',
    fontSize: 12,
  },
});
