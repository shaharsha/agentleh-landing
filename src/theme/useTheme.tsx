import { useSyncExternalStore } from 'react'
import {
  getServerSnapshot,
  getSnapshot,
  setTheme,
  subscribe,
  type Theme,
} from './store'

export type { Theme }

export interface ThemeContextValue {
  theme: Theme
  resolved: 'light' | 'dark'
  setTheme: (t: Theme) => void
}

/**
 * `useTheme` reads from a module-level store via useSyncExternalStore.
 * That hook is React's idiomatic way to sync with external mutable
 * state and handles SSR / hydration correctly — a server snapshot is
 * provided separately from the client snapshot so SSG pre-rendered
 * HTML and the client's first render agree, with no mismatch.
 *
 * No <ThemeProvider> wrapper is needed — state lives at module scope
 * (see ./store.ts). Importing this module anywhere in the tree is
 * enough.
 */
export function useTheme(): ThemeContextValue {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { theme: state.theme, resolved: state.resolved, setTheme }
}
