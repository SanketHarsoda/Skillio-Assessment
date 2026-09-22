import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ClassCard } from '@/components/home/class-card';
import { DailyPracticeCard } from '@/components/home/daily-practice-card';
import { GreetingHeader } from '@/components/home/greeting-header';
import { ProgressCard } from '@/components/home/progress-card';
import { SkillSnapshot } from '@/components/home/skill-snapshot';
import { SubscriptionCard } from '@/components/home/subscription-card';
import { FadeIn } from '@/components/ui/fade-in';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useHomeDemo } from '@/context/home-demo';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export function HomeScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { data, scenario } = useHomeDemo();

  const canBook =
    Boolean(data.subscription.tier) && data.subscription.lessonsRemaining > 0;

  const topPad =
    Platform.OS === 'web' ? Spacing.six + Spacing.five : insets.top + Spacing.three;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView
        key={scenario}
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: topPad,
            paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <FadeIn index={0}>
            <GreetingHeader
              name={data.user.name}
              avatarUrl={data.user.avatarUrl}
              streakDays={data.streakDays}
              weeklyXp={data.weeklyXp}
              weeklyXpGoal={data.weeklyXpGoal}
            />
          </FadeIn>

          <FadeIn index={1}>
            <DailyPracticeCard dailyPractice={data.dailyPractice} />
          </FadeIn>

          <FadeIn index={2}>
            <ClassCard scheduledClass={data.scheduledClass} canBook={canBook} />
          </FadeIn>

          <FadeIn index={3}>
            <SubscriptionCard subscription={data.subscription} />
          </FadeIn>

          <FadeIn index={4}>
            <ProgressCard progress={data.progress} />
          </FadeIn>

          <FadeIn index={5}>
            <SkillSnapshot skillSnapshot={data.skillSnapshot} />
          </FadeIn>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
});
