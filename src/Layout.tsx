import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import {
  overwriteGetLocale,
  extractLocaleFromUrl,
  baseLocale,
  type Locale,
} from './paraglide/runtime'
import { ThemeProvider } from './theme/useTheme'

const SITE_ORIGIN = 'https://agentiko.io'

/**
 * Root layout. Resolves the locale from the route's pathname and makes
 * it the active `getLocale()` for every descendant's `m.*()` call.
 *
 * Why not rely on Paraglide's built-in URL strategy? Paraglide gates the
 * `url` strategy behind `!isServer`, so during SSG prerender in Node it
 * silently falls through to `baseLocale`. We bypass that by calling
 * `extractLocaleFromUrl` directly (it works server-side) and installing
 * the result via `overwriteGetLocale` before children render.
 *
 * On the client, `useLocation()` updates on navigation, this component
 * re-runs, and children re-render with the new language automatically.
 */
export function Layout() {
  const location = useLocation()
  const url = SITE_ORIGIN + location.pathname
  const lang = (extractLocaleFromUrl(url) ?? baseLocale) as Locale
  overwriteGetLocale(() => lang)
  const dir = lang === 'he' ? 'rtl' : 'ltr'

  return (
    <>
      <Head>
        <html lang={lang} dir={dir} />
      </Head>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </>
  )
}
