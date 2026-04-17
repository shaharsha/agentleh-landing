import { useNavigate } from 'react-router-dom'
import { m } from '../paraglide/messages'
import { getLocale, localizeHref } from '../paraglide/runtime'
import { LegalPageLayout } from '../legal/LegalPageLayout'
import { PrivacyContent } from '../legal/PrivacyContent'
import { PrivacyContentEn } from '../legal/PrivacyContentEn'
import { SeoHead } from '../i18n/SeoHead'

export function Privacy() {
  const navigate = useNavigate()
  const lang = getLocale()

  return (
    <>
      <SeoHead title={m.meta_privacy_title()} description={m.meta_privacy_description()} />
      <LegalPageLayout
        title={m.legal_privacy_title()}
        onBack={() => navigate(localizeHref('/'))}
      >
        {lang === 'he' ? <PrivacyContent /> : <PrivacyContentEn />}
      </LegalPageLayout>
    </>
  )
}
