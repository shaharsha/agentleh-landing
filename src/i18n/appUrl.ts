import { getLocale } from '../paraglide/runtime'

const APP_URL = import.meta.env.VITE_APP_URL as string | undefined

/**
 * Returns the app URL with `?lang=he|en` appended so the logged-in app
 * starts in the same language the visitor picked on the landing page.
 *
 * localStorage doesn't cross origins (agentiko.io ≠ app.agentiko.io),
 * so the URL param is the explicit handoff. The app's pickInitialLang
 * reads the param, writes to its own localStorage, then strips the
 * param via history.replaceState so the URL stays clean.
 */
export function appUrlWithLang(): string {
  const base = APP_URL ?? ''
  if (!base) return ''
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}lang=${getLocale()}`
}
