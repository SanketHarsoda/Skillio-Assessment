import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Brand, Fonts, Radius, Spacing } from '@/constants/theme';
import type { ScheduledClass } from '@/types/home';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  scheduledClass: ScheduledClass | null;
  canBook: boolean;
};

export function ClassCard({ scheduledClass, canBook }: Props) {
  const theme = useTheme();

  if (!scheduledClass) {
    return (
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.emptyIcon}>
          <Ionicons name="calendar-outline" size={22} color={Brand.teal} />
        </View>
        <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.rounded }]}>
          No class on the calendar
        </Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>
          {canBook
            ? 'Book a live session and keep your speaking momentum going.'
            : 'Add lessons or a plan to unlock booking with a teacher.'}
        </Text>
        <PressableScale
          disabled={!canBook}
          onPress={() => Alert.alert('Book class', 'Booking flow would open here.')}
          style={[styles.cta, !canBook && styles.ctaDisabled]}>
          <Ionicons name="add-circle" size={18} color={Brand.white} />
          <Text style={styles.ctaText}>{canBook ? 'Book a class' : 'Unavailable'}</Text>
        </PressableScale>
      </View>
    );
  }

  return (
    <View style={[styles.card, styles.filled, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.liveRow}>
        <View style={styles.liveDot} />
        <Text style={styles.liveLabel}>Upcoming class</Text>
      </View>

      <Text style={[styles.subject, { color: theme.text, fontFamily: Fonts.rounded }]}>
        {scheduledClass.subject}
      </Text>
      <Text style={[styles.meta, { color: theme.textSecondary }]}>
        {scheduledClass.time} · {scheduledClass.durationMinutes} min
      </Text>

      <View style={[styles.teacherRow, { backgroundColor: theme.backgroundSelected }]}>
        <View style={styles.teacherAvatar}>
          <Text style={styles.teacherInitials}>
            {scheduledClass.teacher
              .split(' ')
              .map((p) => p[0])
              .join('')
              .slice(0, 2)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.teacherName, { color: theme.text }]}>{scheduledClass.teacher}</Text>
          <Text style={[styles.teacherHint, { color: theme.textSecondary }]}>Your coach</Text>
        </View>
      </View>

      <PressableScale
        onPress={() =>
          Alert.alert('Join class', `Joining meeting ${scheduledClass.meetingId}`)
        }
        style={styles.join}>
        <Ionicons name="videocam" size={18} color={Brand.white} />
        <Text style={styles.ctaText}>Join class</Text>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 10,
  },
  filled: {
    gap: 12,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Brand.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
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
  cta: {
    marginTop: 6,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Brand.teal,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radius.pill,
  },
  ctaDisabled: {
    opacity: 0.45,
  },
  ctaText: {
    color: Brand.white,
    fontWeight: '800',
    fontSize: 14,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Brand.coral,
  },
  liveLabel: {
    color: Brand.coral,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  subject: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  meta: {
    fontSize: 14,
    fontWeight: '600',
  },
  teacherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: Radius.md,
    padding: 12,
  },
  teacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Brand.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teacherInitials: {
    color: Brand.white,
    fontWeight: '800',
    fontSize: 13,
  },
  teacherName: {
    fontWeight: '700',
    fontSize: 14,
  },
  teacherHint: {
    fontSize: 12,
    marginTop: 2,
  },
  join: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Brand.coral,
    paddingVertical: 14,
    borderRadius: Radius.md,
  },
});
