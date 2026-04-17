import { m } from '../paraglide/messages'
import { getLocale } from '../paraglide/runtime'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'

/**
 * Shared layout for the legal pages (terms + privacy). Direction and
 * language are driven entirely by the URL (via Paraglide's URL strategy)
 * - no local state toggle. The LanguageSwitcher in the corner navigates
 * between /terms ↔ /en/terms, which swaps the locale globally.
 */
export function LegalPageLayout({
  title,
  onBack,
  children,
}: {
  title: string
  onBack: () => void
  children: React.ReactNode
}) {
  const lang = getLocale()
  const isHe = lang === 'he'

  return (
    <div className="min-h-screen section-gradient-hero">
      <div className="max-w-[720px] mx-auto px-8 py-20">
        {/* Top bar: back + language toggle */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-[14px] text-brand font-medium hover:underline cursor-pointer flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isHe ? 'scaleX(-1)' : undefined }}>
              <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {m.legal_back()}
          </button>
          <LanguageSwitcher />
        </div>

        {/* Content card */}
        <div className="glass-card-elevated rounded-[22px] p-8 md:p-10">
          <h1 className="text-[28px] font-bold tracking-[-0.6px] mb-2">{title}</h1>
          <p className="text-[13px] text-text-muted mb-8">
            {m.legal_last_updated_prefix()} {m.legal_last_updated_value()}
          </p>

          {!isHe && (
            <div className="bg-brand-50 border border-brand-100 rounded-xl px-5 py-3 mb-8 text-[13.5px] text-text-secondary leading-relaxed">
              {m.legal_en_disclaimer()}
            </div>
          )}

          <div className="legal-content">{children}</div>
        </div>
      </div>
    </div>
  )
}
