import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'

export default defineConfig({
  // vite-react-ssg options — `nested` dirStyle emits /en/index.html
  // instead of /en.html, so nginx's default `try_files $uri $uri/`
  // resolves both `/en` and `/en/` to the right file without extra rules.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...{ ssgOptions: { dirStyle: 'nested' } } as any,
  plugins: [
    react(),
    tailwindcss(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['url', 'localStorage', 'preferredLanguage', 'baseLocale'],
      // Passing urlPatterns explicitly (identical to Paraglide's default for
      // our locale set) forces the urlpattern-polyfill to be bundled. Without
      // this, the generated runtime.js stubs `URLPattern` to `{}`, which
      // breaks URL-based locale detection during SSG prerender in Node.
      urlPatterns: [
        {
          pattern: ':protocol://:domain(.*)::port?/:path(.*)?',
          localized: [
            ['en', ':protocol://:domain(.*)::port?/en/:path(.*)?'],
            ['he', ':protocol://:domain(.*)::port?/:path(.*)?'],
          ],
        },
      ],
    }),
  ],
})
