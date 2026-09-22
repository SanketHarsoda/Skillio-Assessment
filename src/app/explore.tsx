import { Ionicons } from '@expo/vector-icons';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { BottomTabInset, Brand, Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useHomeDemo } from '@/context/home-demo';
import { scenarioMeta } from '@/data/home-mock';
import { useTheme } from '@/hooks/use-theme';
import type { DemoScenario } from '@/types/home';

export default function DemoStatesScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { scenario, setScenario } = useHomeDemo();
  const topPad =
    Platform.OS === 'web' ? Spacing.six + Spacing.five : insets.top + Spacing.four;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: topPad,
          paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.rounded }]}>
          Demo states
        </Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>
          Flip through edge cases from the brief, then jump back to Home to see the UI respond.
        </Text>

        <View style={styles.list}>
          {scenarioMeta.map((item) => {
            const active = scenario === item.id;
            return (
              <PressableScale
                key={item.id}
                onPress={() => setScenario(item.id as DemoScenario)}
                style={[
                  styles.row,
                  {
                    backgroundColor: active ? Brand.tealSoft : theme.card,
                    borderColor: active ? Brand.teal : theme.border,
                  },
                ]}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={[styles.rowTitle, { color: theme.text }]}>{item.label}</Text>
                  <Text style={[styles.rowBlurb, { color: theme.textSecondary }]}>
                    {item.blurb}
                  </Text>
                </View>
                {active ? (
                  <Ionicons name="checkmark-circle" size={22} color={Brand.teal} />
                ) : (
                  <Ionicons name="ellipse-outline" size={22} color={theme.textSecondary} />
                )}
              </PressableScale>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.two,
  },
  list: {
    gap: 10,
  },
  row: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  rowBlurb: {
    fontSize: 13,
    lineHeight: 18,
  },
});
