import { getLocale } from '../paraglide/runtime'

const APP_URL = import.meta.env.VITE_APP_URL as string | undefined

/**
 * The app sets this cookie on `.agentiko.io` after any Supabase SIGNED_IN
 * event and never clears it. Its presence means "this browser has an
 * account" — enough to swap the landing CTA from signup to login.
 */
export function hasAccount(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').includes('agentleh_has_account=1')
}

/**
 * Returns the app URL with `?lang=he|en` appended so the logged-in app
 * starts in the same language the visitor picked on the landing page.
 *
 * When `kind='signup'` (the default for new visitors) the `/signup` path
 * is included; returning visitors go to `/` (login).
 *
 * localStorage doesn't cross origins (agentiko.io ≠ app.agentiko.io),
 * so the URL param is the explicit handoff. The app's pickInitialLang
 * reads the param, writes to its own localStorage, then strips the
 * param via history.replaceState so the URL stays clean.
 */
export function appUrlWithLang(kind: 'signup' | 'login' = 'signup'): string {
  const base = APP_URL ?? ''
  if (!base) return ''
  const path = kind === 'signup' ? '/signup' : '/'
  const joined = base.endsWith('/') ? base.slice(0, -1) + path : base + path
  const sep = joined.includes('?') ? '&' : '?'
  return `${joined}${sep}lang=${getLocale()}`
}

/**
 * CTA href that flips between signup and login based on the cookie.
 * Use at every landing CTA so returning users land on login instead of
 * the signup form.
 */
export function ctaHref(): string {
  return appUrlWithLang(hasAccount() ? 'login' : 'signup')
}
