import { useNavigate } from 'react-router-dom'
import { m } from '../paraglide/messages'
import { getLocale, localizeHref } from '../paraglide/runtime'
import { LegalPageLayout } from '../legal/LegalPageLayout'
import { TermsContent } from '../legal/TermsContent'
import { TermsContentEn } from '../legal/TermsContentEn'
import { SeoHead } from '../i18n/SeoHead'

export function Terms() {
  const navigate = useNavigate()
  const lang = getLocale()

  return (
    <>
      <SeoHead title={m.meta_terms_title()} description={m.meta_terms_description()} />
      <LegalPageLayout
        title={m.legal_terms_title()}
        onBack={() => navigate(localizeHref('/'))}
      >
        {lang === 'he' ? <TermsContent /> : <TermsContentEn />}
      </LegalPageLayout>
    </>
  )
}
