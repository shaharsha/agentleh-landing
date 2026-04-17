import { useLocation, useNavigate } from 'react-router-dom'
import {
  getLocale,
  localizeHref,
  deLocalizeHref,
  type Locale,
} from '../paraglide/runtime'

/**
 * Compact two-state language toggle matching the app's design
 * (🌐 עב | EN, active option highlighted).
 *
 * Clicking navigates to the counterpart URL (/ ↔ /en, /terms ↔
 * /en/terms) using Paraglide's localizeHref. Since locale is
 * URL-driven, the next render reads the new URL and flips all m.*()
 * strings + <html lang dir> automatically.
 *
 * We also persist the choice to localStorage under the same key the app
 * uses ('PARAGLIDE_LOCALE' is Paraglide's default; the app reads its
 * own 'agentleh.lang' key — handoff between the two origins goes via a
 * ?lang= URL param on outbound app links, not localStorage).
 */
export function LanguageSwitcher() {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = getLocale()

  const go = (target: Locale) => {
    if (target === lang) return
    const canonical = deLocalizeHref(location.pathname + location.search)
    const next = localizeHref(canonical, { locale: target })
    navigate(next)
  }

  const btn = (target: Locale, label: string) => (
    <button
      onClick={() => go(target)}
      aria-pressed={lang === target}
      className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
        lang === target
          ? 'bg-gray-900 text-white'
          : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-1.5 py-0.5 bg-white/50">
      <GlobeIcon />
      {btn('he', 'עב')}
      {btn('en', 'EN')}
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
