import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getLocale,
  localizeHref,
  deLocalizeHref,
  type Locale,
} from '../paraglide/runtime'

/**
 * Compact language switcher — single globe-icon button that opens a
 * dropdown listing both language names in their native script. Matches
 * the ThemeSwitcher's visual language (icon trigger + glass-card menu +
 * brand accent on the current selection) so the nav toolbar reads as a
 * single, consistent cluster instead of four unrelated controls.
 *
 * Clicking an option navigates to the counterpart URL (/ ↔ /en, /terms
 * ↔ /en/terms) via Paraglide's localizeHref. Locale is URL-driven, so
 * the next render flips all m.*() strings + <html lang dir>
 * automatically — no flicker, no extra localStorage write.
 */
export function LanguageSwitcher() {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = getLocale()
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

  const go = (target: Locale) => {
    setOpen(false)
    if (target === lang) return
    const canonical = deLocalizeHref(location.pathname + location.search)
    const next = localizeHref(canonical, { locale: target })
    navigate(next)
  }

  const options: Array<{ value: Locale; label: string }> = [
    { value: 'he', label: 'עברית' },
    { value: 'en', label: 'English' },
  ]
  const triggerLabel =
    (lang === 'he' ? 'שפה' : 'Language') +
    ': ' +
    (options.find((o) => o.value === lang)?.label ?? '')

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
        <GlobeIcon />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 w-[min(10rem,calc(100vw-1.5rem))] glass-card-elevated rounded-xl overflow-hidden z-30 animate-in-dropdown"
        >
          {options.map((opt) => {
            const selected = opt.value === lang
            return (
              <button
                key={opt.value}
                type="button"
                role="menuitem"
                aria-current={selected ? 'true' : undefined}
                dir={opt.value === 'he' ? 'rtl' : 'ltr'}
                onClick={() => go(opt.value)}
                className={`w-full flex items-center gap-2.5 px-3 py-3 min-h-[44px] text-sm text-start transition-colors cursor-pointer ${
                  selected
                    ? 'text-brand'
                    : 'text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
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

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
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
