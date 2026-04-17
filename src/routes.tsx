import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './Layout'
import { Home } from './pages/Home'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'

/**
 * URL scheme:
 *   /             → Hebrew home    (base locale, canonical)
 *   /en           → English home
 *   /terms        → Hebrew terms
 *   /en/terms     → English terms
 *   /privacy      → Hebrew privacy
 *   /en/privacy   → English privacy
 *
 * Paraglide's URL strategy (configured in vite.config.ts) detects the
 * locale from the path: anything under /en/… is English; everything
 * else is Hebrew. Page components call `m.*()` and the correct locale's
 * string comes out without us passing anything explicitly.
 *
 * During SSG, vite-react-ssg renders each path into its own HTML file.
 * At render time, Paraglide reads the URL and resolves the locale —
 * so the prerendered `/en/terms/index.html` ships pre-translated
 * English content in the initial HTML payload (good for SEO).
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      {
        path: 'en',
        children: [
          { index: true, element: <Home /> },
          { path: 'terms', element: <Terms /> },
          { path: 'privacy', element: <Privacy /> },
        ],
      },
    ],
  },
]
