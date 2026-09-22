import type { DemoScenario, HomeData } from '@/types/home';

const baseUser = {
  name: 'Maya',
  avatarUrl: 'https://i.pravatar.cc/150?u=skillio-maya',
};

const baseProgress = {
  currentCefrLevel: 'B1',
  nextCefrLevel: 'B2',
  overallProgressPercent: 68,
};

const baseSkills = {
  grammar: 74,
  vocabulary: 81,
  pronunciation: 62,
  speaking: 58,
  overallImprovementPercent: 14,
  growthPercent: 6,
};

const practiceOpen = {
  completedToday: false,
  title: 'Quick speaking warm-up',
  estimatedMinutes: 8,
  focusSkill: 'Speaking',
  xpReward: 40,
};

const practiceDone = {
  completedToday: true,
  title: 'Quick speaking warm-up',
  estimatedMinutes: 8,
  focusSkill: 'Speaking',
  xpReward: 40,
  scorePercent: 88,
  wordsPracticed: 26,
};

const scheduledClass = {
  time: 'Today · 4:30 PM',
  teacher: 'Alex Rivera',
  subject: 'Conversation Lab',
  durationMinutes: 45,
  meetingId: 'skl-4421',
};

export const homeScenarios: Record<DemoScenario, HomeData> = {
  default: {
    user: baseUser,
    subscription: { tier: 'plus', lessonsRemaining: 6, totalLessons: 12 },
    scheduledClass,
    progress: baseProgress,
    skillSnapshot: baseSkills,
    dailyPractice: practiceOpen,
    streakDays: 12,
    weeklyXp: 340,
    weeklyXpGoal: 500,
  },
  noClass: {
    user: baseUser,
    subscription: { tier: 'plus', lessonsRemaining: 6, totalLessons: 12 },
    scheduledClass: null,
    progress: baseProgress,
    skillSnapshot: baseSkills,
    dailyPractice: practiceOpen,
    streakDays: 12,
    weeklyXp: 340,
    weeklyXpGoal: 500,
  },
  practiceDone: {
    user: baseUser,
    subscription: { tier: 'plus', lessonsRemaining: 6, totalLessons: 12 },
    scheduledClass,
    progress: baseProgress,
    skillSnapshot: baseSkills,
    dailyPractice: practiceDone,
    streakDays: 12,
    weeklyXp: 380,
    weeklyXpGoal: 500,
  },
  noSkills: {
    user: baseUser,
    subscription: { tier: 'plus', lessonsRemaining: 8, totalLessons: 12 },
    scheduledClass: null,
    progress: {
      currentCefrLevel: 'A2',
      nextCefrLevel: 'B1',
      overallProgressPercent: 12,
    },
    skillSnapshot: null,
    dailyPractice: practiceOpen,
    streakDays: 1,
    weeklyXp: 40,
    weeklyXpGoal: 500,
  },
  noLessons: {
    user: baseUser,
    subscription: { tier: 'plus', lessonsRemaining: 0, totalLessons: 12 },
    scheduledClass: null,
    progress: baseProgress,
    skillSnapshot: baseSkills,
    dailyPractice: practiceOpen,
    streakDays: 12,
    weeklyXp: 340,
    weeklyXpGoal: 500,
  },
  noSubscription: {
    user: baseUser,
    subscription: { tier: null, lessonsRemaining: 0, totalLessons: 0 },
    scheduledClass: null,
    progress: {
      currentCefrLevel: 'A1',
      nextCefrLevel: 'A2',
      overallProgressPercent: 8,
    },
    skillSnapshot: null,
    dailyPractice: practiceOpen,
    streakDays: 0,
    weeklyXp: 0,
    weeklyXpGoal: 500,
  },
};

export const scenarioMeta: { id: DemoScenario; label: string; blurb: string }[] = [
  { id: 'default', label: 'Default', blurb: 'Class booked, practice waiting' },
  { id: 'noClass', label: 'No class', blurb: 'Empty state with book CTA' },
  { id: 'practiceDone', label: 'Practice done', blurb: 'Results + celebrate state' },
  { id: 'noSkills', label: 'New learner', blurb: 'No skill snapshot yet' },
  { id: 'noLessons', label: 'No lessons left', blurb: 'Subscription edge case' },
  { id: 'noSubscription', label: 'Free / none', blurb: 'No active plan' },
];
