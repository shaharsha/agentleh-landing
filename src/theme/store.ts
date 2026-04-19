/**
 * Theme store — module-level source of truth for Auto / Light / Dark.
 *
 * Lives outside React for two reasons:
 *   1. `useSyncExternalStore` is the idiomatic hook for this shape of
 *      state (external to React, subscribe/snapshot pattern). It avoids
 *      React 19's `react-hooks/set-state-in-effect` lint error that
 *      trips the naïve "useState + useEffect to hydrate from
 *      localStorage" pattern.
 *   2. The pre-React `<script>` in index.html has already set
 *      data-theme before first paint; the React store just mirrors
 *      what's already on <html> so nothing flashes.
 *
 * Persistence: cookie `agentleh.theme` (scoped to `.agentiko.io`) is
 * the cross-origin source of truth, shared with the app. localStorage
 * mirrors it on the local origin for cross-tab sync via the `storage`
 * event and backward-compat for users who set a pick pre-cookie rollout.
 * Auto clears both — that's the default.
 */

import { THEME_COOKIE, clearCookie, readCookie, writeCookie } from '../lib/prefsCookie'

export type Theme = 'auto' | 'light' | 'dark'

export interface ThemeState {
  theme: Theme
  /** Effective mode actually rendered. Follows OS when `theme === 'auto'`. */
  resolved: 'light' | 'dark'
}

const LS_KEY = 'agentleh.theme'
const SSR_SNAPSHOT: ThemeState = { theme: 'auto', resolved: 'light' }

let currentState: ThemeState = SSR_SNAPSHOT
const listeners = new Set<() => void>()

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function computeResolved(theme: Theme): 'light' | 'dark' {
  return theme === 'auto' ? (systemPrefersDark() ? 'dark' : 'light') : theme
}

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'auto'
  // Cross-origin cookie wins — shared with the app.
  const cookie = readCookie(THEME_COOKIE)
  if (cookie === 'light' || cookie === 'dark') return cookie
  // localStorage fallback for users who set a pick pre-cookie rollout.
  // Seed the cookie so the next visit to the app picks it up.
  try {
    const v = window.localStorage.getItem(LS_KEY)
    if (v === 'light' || v === 'dark') {
      writeCookie(THEME_COOKIE, v)
      return v
    }
    if (v === 'auto') return v
  } catch {
    // localStorage disabled — fall through to default
  }
  return 'auto'
}

function applyAttribute(mode: 'light' | 'dark') {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', mode)
}

function notify() {
  listeners.forEach((cb) => cb())
}

// ─── Client-side initialisation ──────────────────────────────────────
//
// Hydrate the in-memory store from localStorage, then register
// listeners for (a) OS changes while on Auto, and (b) theme changes
// from other tabs via the `storage` event so a preference flip in one
// tab propagates to the rest without a reload. The pre-React script
// has already set data-theme before first paint; we reapply it here
// for the rare case localStorage changed between the pre-script and
// the module-evaluation.
if (typeof window !== 'undefined') {
  const theme = readStoredTheme()
  const resolved = computeResolved(theme)
  currentState = { theme, resolved }
  applyAttribute(resolved)

  // OS change listener — always registered, only propagates on Auto.
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentState.theme !== 'auto') return
    const next = computeResolved('auto')
    currentState = { theme: 'auto', resolved: next }
    applyAttribute(next)
    notify()
  })

  // Cross-tab sync. `storage` fires in every *other* tab of the same
  // origin when localStorage changes — never in the tab that did the
  // write, so there's no feedback loop. A `null` newValue means the
  // key was removed, which for us means "user switched back to Auto
  // in the other tab".
  window.addEventListener('storage', (e) => {
    if (e.key !== LS_KEY) return
    const next: Theme =
      e.newValue === 'light' || e.newValue === 'dark' ? e.newValue : 'auto'
    const resolved = computeResolved(next)
    currentState = { theme: next, resolved }
    applyAttribute(resolved)
    notify()
  })
}

export function setTheme(next: Theme) {
  const resolved = computeResolved(next)
  currentState = { theme: next, resolved }
  applyAttribute(resolved)
  try {
    if (next === 'auto') window.localStorage.removeItem(LS_KEY)
    else window.localStorage.setItem(LS_KEY, next)
  } catch {
    // localStorage disabled — in-memory state still updates
  }
  // Cross-origin share with the app.
  if (next === 'auto') clearCookie(THEME_COOKIE)
  else writeCookie(THEME_COOKIE, next)
  notify()
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function getSnapshot(): ThemeState {
  return currentState
}

export function getServerSnapshot(): ThemeState {
  return SSR_SNAPSHOT
}
