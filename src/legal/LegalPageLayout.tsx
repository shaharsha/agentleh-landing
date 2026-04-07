import { useState } from 'react'

export function LegalPageLayout({ title, titleEn, lastUpdated, onBack, heContent, enContent }: {
  title: string
  titleEn: string
  lastUpdated: string
  onBack: () => void
  heContent: React.ReactNode
  enContent: React.ReactNode
}) {
  const [lang, setLang] = useState<'he' | 'en'>('he')
  const isHe = lang === 'he'

  return (
    <div className="min-h-screen section-gradient-hero" dir={isHe ? 'rtl' : 'ltr'}>
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
            {isHe ? 'חזרה' : 'Back'}
          </button>

          <div className="flex items-center gap-1 text-[13px] bg-white/50 backdrop-blur-sm rounded-full px-1 py-0.5 border border-border-light">
            <button
              onClick={() => setLang('he')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${isHe ? 'bg-brand text-white font-medium' : 'text-text-muted hover:text-text-secondary'}`}
            >
              עברית
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${!isHe ? 'bg-brand text-white font-medium' : 'text-text-muted hover:text-text-secondary'}`}
            >
              English
            </button>
          </div>
        </div>

        {/* Content card */}
        <div className="glass-card-elevated rounded-[22px] p-8 md:p-10">
          <h1 className="text-[28px] font-bold tracking-[-0.6px] mb-2">
            {isHe ? title : titleEn}
          </h1>
          <p className="text-[13px] text-text-muted mb-8">
            {isHe ? `עדכון אחרון: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
          </p>

          {!isHe && (
            <div className="bg-brand-50 border border-brand-100 rounded-xl px-5 py-3 mb-8 text-[13.5px] text-text-secondary leading-relaxed">
              This English version is provided for convenience only. The Hebrew version is the legally binding document. In case of any discrepancy, the Hebrew version shall prevail.
            </div>
          )}

          <div className="legal-content">
            {isHe ? heContent : enContent}
          </div>
        </div>
      </div>
    </div>
  )
}
