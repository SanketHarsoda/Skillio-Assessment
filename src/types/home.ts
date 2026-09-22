export type SubscriptionTier = 'free' | 'plus' | 'pro' | null;

export type SkillScores = {
  grammar: number;
  vocabulary: number;
  pronunciation: number;
  speaking: number;
};

export type ScheduledClass = {
  time: string;
  teacher: string;
  subject: string;
  durationMinutes: number;
  meetingId: string;
};

export type DailyPractice = {
  completedToday: boolean;
  title: string;
  estimatedMinutes: number;
  focusSkill: string;
  xpReward: number;
  scorePercent?: number;
  wordsPracticed?: number;
};

export type HomeData = {
  user: {
    name: string;
    avatarUrl: string;
  };
  subscription: {
    tier: SubscriptionTier;
    lessonsRemaining: number;
    totalLessons: number;
  };
  scheduledClass: ScheduledClass | null;
  progress: {
    currentCefrLevel: string;
    nextCefrLevel: string;
    overallProgressPercent: number;
  };
  skillSnapshot: {
    grammar: number;
    vocabulary: number;
    pronunciation: number;
    speaking: number;
    overallImprovementPercent: number;
    growthPercent: number;
  } | null;
  dailyPractice: DailyPractice;
  streakDays: number;
  weeklyXp: number;
  weeklyXpGoal: number;
};

export type DemoScenario =
  | 'default'
  | 'noClass'
  | 'practiceDone'
  | 'noSkills'
  | 'noLessons'
  | 'noSubscription';
