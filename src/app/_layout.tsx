import { ThemeProvider, DarkTheme, DefaultTheme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { Brand } from '@/constants/theme';
import { HomeDemoProvider } from '@/context/home-demo';

SplashScreen.preventAutoHideAsync();

const LightNav = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Brand.teal,
    background: Brand.tealMist,
    card: Brand.white,
    text: Brand.ink,
    border: Brand.line,
  },
};

const DarkNav = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#2EC4D4',
    background: '#0A1417',
    card: '#132227',
    text: '#F2F7F8',
    border: '#243840',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <HomeDemoProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkNav : LightNav}>
        <AppTabs />
      </ThemeProvider>
    </HomeDemoProvider>
  );
}
