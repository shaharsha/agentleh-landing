import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Theme provider for the marketing landing — tri-state:
 *   - 'auto'  — follow prefers-color-scheme (no stored value)
 *   - 'light' — pinned light
 *   - 'dark'  — pinned dark
 *
 * Source of truth for the CSS is `html[data-theme="dark"]` — set by the
 * pre-React script in index.html synchronously (so first paint is the
 * right colors), then maintained here. `resolved` is exposed for
 * components that want the effective light/dark value for conditional
 * rendering.
 *
 * SSR / SSG note: vite-react-ssg pre-renders this file during the build
 * with `window` unavailable. The initial state is safely 'auto' + 'light'
 * (resolved) in that environment — the useEffect hooks below only run in
 * the browser, where they re-apply the attribute from localStorage.
 */
export type Theme = 'auto' | 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  resolved: 'light' | 'dark'
  setTheme: (t: Theme) => void
}

const LS_KEY = 'agentleh.theme'
const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'auto'
  try {
    const v = window.localStorage.getItem(LS_KEY)
    if (v === 'light' || v === 'dark' || v === 'auto') return v
  } catch {
    // ignore
  }
  return 'auto'
}

function resolve(theme: Theme): 'light' | 'dark' {
  if (theme === 'auto') {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto')
  const [resolved, setResolved] = useState<'light' | 'dark'>('light')

  // Hydrate from localStorage on mount (useState initializer would run
  // on the SSR pass too and poison the HTML). Set data-theme to the
  // resolved value so CSS stays in sync.
  useEffect(() => {
    const saved = readStoredTheme()
    const eff = resolve(saved)
    setThemeState(saved)
    setResolved(eff)
    document.documentElement.setAttribute('data-theme', eff)
  }, [])

  // Keep in sync with OS changes while theme === 'auto'.
  useEffect(() => {
    if (theme !== 'auto') return
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = mq.matches ? 'dark' : 'light'
      setResolved(next)
      document.documentElement.setAttribute('data-theme', next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    const eff = resolve(next)
    setResolved(eff)
    document.documentElement.setAttribute('data-theme', eff)
    try {
      if (next === 'auto') window.localStorage.removeItem(LS_KEY)
      else window.localStorage.setItem(LS_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
