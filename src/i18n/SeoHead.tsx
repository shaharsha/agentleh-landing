import { Head } from 'vite-react-ssg'
import { getLocale, localizeHref, deLocalizeHref } from '../paraglide/runtime'
import { useLocation } from 'react-router-dom'

const SITE_ORIGIN = 'https://agentiko.io'

/**
 * Per-locale SEO <head> block: title, description, hreflang alternates,
 * and OpenGraph locale tag. Every page uses this so the prerendered
 * HTML ships correct SEO metadata without waiting for JS.
 *
 * hreflang alternates point each language at its counterpart URL so
 * Google indexes both versions separately and shows the right one per
 * user locale. `x-default` aliases the Hebrew URL (the canonical /).
 */
export function SeoHead({ title, description }: { title: string; description: string }) {
  const location = useLocation()
  const lang = getLocale()
  const ogLocale = lang === 'he' ? 'he_IL' : 'en_US'

  const canonicalPath = deLocalizeHref(location.pathname)
  const heUrl = SITE_ORIGIN + localizeHref(canonicalPath, { locale: 'he' })
  const enUrl = SITE_ORIGIN + localizeHref(canonicalPath, { locale: 'en' })
  const selfUrl = lang === 'he' ? heUrl : enUrl

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={selfUrl} />
      <link rel="alternate" hrefLang="he" href={heUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={heUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:url" content={selfUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
