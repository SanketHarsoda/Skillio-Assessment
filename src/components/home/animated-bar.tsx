import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { Brand, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  value: number;
  color?: string;
  delay?: number;
  height?: number;
};

export function AnimatedBar({ value, color = Brand.teal, delay = 0, height = 8 }: Props) {
  const theme = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(
      delay,
      withTiming(Math.min(Math.max(value, 0), 100), { duration: 780 }),
    );
  }, [delay, value, width]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={[styles.track, { backgroundColor: theme.border, height, borderRadius: height }]}>
      <Animated.View
        style={[styles.fill, { backgroundColor: color, height, borderRadius: height }, fillStyle]}
      />
    </View>
  );
}

type MetricProps = {
  label: string;
  value: number;
  color: string;
  delay?: number;
};

export function SkillMetric({ label, value, color, delay = 0 }: MetricProps) {
  const theme = useTheme();

  return (
    <View style={styles.metric}>
      <View style={styles.metricRow}>
        <Text style={[styles.metricLabel, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.metricValue, { color: theme.textSecondary }]}>{value}%</Text>
      </View>
      <AnimatedBar value={value} color={color} delay={delay} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    borderRadius: Radius.pill,
  },
  metric: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
});
