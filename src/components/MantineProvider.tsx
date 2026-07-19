'use client';
import { MantineProvider as MantineThemeProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineThemeProvider defaultColorScheme="light" forceColorScheme="light" withCssVariables={false}>
      {children}
    </MantineThemeProvider>
  );
}
