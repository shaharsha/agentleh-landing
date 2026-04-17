import { m } from '../paraglide/messages'
import { useTheme, type Theme } from './useTheme'

/**
 * Tri-state theme toggle — Auto / Light / Dark. Renders as a compact
 * 3-button pill matching the LanguageSwitcher's look. `Auto` follows the
 * OS via prefers-color-scheme; the other two pin explicitly.
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const btn = (target: Theme, icon: React.ReactNode, label: string) => (
    <button
      key={target}
      type="button"
      onClick={() => setTheme(target)}
      aria-pressed={theme === target}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md transition-colors cursor-pointer ${
        theme === target
          ? 'bg-gray-900 text-white dark:bg-white/15 dark:text-text-primary'
          : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      {icon}
    </button>
  )

  return (
    <div
      role="radiogroup"
      aria-label={m.theme_aria()}
      className="flex items-center gap-0.5 border border-border-light rounded-lg p-0.5 bg-surface/60"
    >
      {btn('auto', <MonitorIcon />, m.theme_auto())}
      {btn('light', <SunIcon />, m.theme_light())}
      {btn('dark', <MoonIcon />, m.theme_dark())}
    </div>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}
