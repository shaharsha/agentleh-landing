import { useEffect, useRef, useState } from 'react'
import { m } from '../paraglide/messages'
import { useTheme, type Theme } from './useTheme'

/**
 * Theme switcher — single icon button that opens a dropdown with Auto
 * / Light / Dark. Icon reflects the user's *preference* (monitor for
 * auto, sun for light, moon for dark) so at a glance it's clear
 * whether they're pinned or following the OS — same pattern Linear
 * and GitHub use.
 *
 * Styled to match the LanguageSwitcher's visual language so they read
 * as one consistent cluster in the nav.
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const options: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
    { value: 'auto', label: m.theme_auto(), icon: <MonitorIcon /> },
    { value: 'light', label: m.theme_light(), icon: <SunIcon /> },
    { value: 'dark', label: m.theme_dark(), icon: <MoonIcon /> },
  ]
  const active = options.find((o) => o.value === theme) ?? options[0]
  const triggerLabel = m.theme_aria() + ': ' + active.label

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerLabel}
        title={triggerLabel}
        className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
      >
        {active.icon}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 w-[min(11rem,calc(100vw-1.5rem))] glass-card-elevated rounded-xl overflow-hidden z-30 animate-in-dropdown"
        >
          {options.map((opt) => {
            const selected = opt.value === theme
            return (
              <button
                key={opt.value}
                type="button"
                role="menuitem"
                aria-current={selected ? 'true' : undefined}
                onClick={() => {
                  setTheme(opt.value)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-3 min-h-[44px] text-sm text-start transition-colors cursor-pointer ${
                  selected
                    ? 'text-brand'
                    : 'text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span className={selected ? 'text-brand' : 'text-text-secondary'}>
                  {opt.icon}
                </span>
                <span className="flex-1">{opt.label}</span>
                {selected && <CheckIcon />}
              </button>
            )
          })}
        </div>
      )}
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-brand">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
