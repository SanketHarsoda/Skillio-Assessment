import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { homeScenarios } from '@/data/home-mock';
import type { DemoScenario, HomeData } from '@/types/home';

type HomeDemoContextValue = {
  scenario: DemoScenario;
  setScenario: (scenario: DemoScenario) => void;
  data: HomeData;
};

const HomeDemoContext = createContext<HomeDemoContextValue | null>(null);

export function HomeDemoProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<DemoScenario>('default');
  const value = useMemo(
    () => ({
      scenario,
      setScenario,
      data: homeScenarios[scenario],
    }),
    [scenario],
  );

  return <HomeDemoContext.Provider value={value}>{children}</HomeDemoContext.Provider>;
}

export function useHomeDemo() {
  const ctx = useContext(HomeDemoContext);
  if (!ctx) {
    throw new Error('useHomeDemo must be used within HomeDemoProvider');
  }
  return ctx;
}
