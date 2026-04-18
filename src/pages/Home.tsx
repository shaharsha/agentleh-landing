import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { m } from '../paraglide/messages'
import { localizeHref } from '../paraglide/runtime'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'
import { ThemeSwitcher } from '../theme/ThemeSwitcher'
import { SeoHead } from '../i18n/SeoHead'
import { ctaHref, hasAccount } from '../i18n/appUrl'

export function Home() {
  return (
    <div className="min-h-screen">
      <SeoHead title={m.meta_home_title()} description={m.meta_home_description()} />
      <Nav />
      <Hero />
      <WhatsAppDemo />
      <Features />
      <Personas />
      <HowItWorks />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  )
}

/* ── Nav ─────────────────────────────────── */

function Nav() {
  return (
    <nav className="glass-nav sticky top-0 z-50 safe-px safe-pt py-2.5">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between gap-2">
        <a href="#" className="flex items-center gap-2 text-[17px] sm:text-[18px] font-bold tracking-[-0.3px] text-text-primary no-underline shrink-0">
          <img src="/brand/logo-icon.svg" alt="" aria-hidden="true" className="w-7 h-7 sm:w-8 sm:h-8 block dark:hidden" />
          <img src="/brand/logo-icon-dark.svg" alt="" aria-hidden="true" className="w-7 h-7 sm:w-8 sm:h-8 hidden dark:block" />
          Agentiko
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <a href={ctaHref()} className="btn-brand btn-sm">
            {hasAccount() ? m.nav_cta_login() : m.nav_cta()}
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────── */

function Hero() {
  return (
    <section className="pt-12 sm:pt-16 md:pt-24 pb-16 section-gradient-hero relative overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="text-center md:text-start">
            <div className="glass-pill inline-flex items-center gap-1.5 text-brand px-3.5 py-1.5 rounded-full text-[13px] font-semibold mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {m.hero_badge()}
            </div>
            <h1 className="text-[clamp(28px,7.5vw,50px)] font-extrabold leading-[1.12] tracking-[-1px] mb-5 break-words">
              {m.hero_headline_line1()}<br />
              <span className="relative inline-block">
                {m.hero_headline_line2()}
                <span className="absolute bottom-1 inset-x-[-0.25rem] h-3.5 rounded -z-10 bg-gradient-to-r rtl:bg-gradient-to-l from-brand/20 to-brand/5" />
              </span>
            </h1>
            <p className="text-[clamp(15px,3.6vw,17px)] text-text-secondary leading-relaxed mb-7">
              {m.hero_description()}
            </p>
            <div className="flex flex-col items-center md:items-start gap-2.5">
              <a href={ctaHref()} className="btn-brand">{hasAccount() ? m.hero_cta_login() : m.hero_cta()}</a>
              <span className="text-[13px] text-text-muted">{m.hero_price_note()}</span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <div className="relative w-full" style={{ aspectRatio: '16 / 11' }}>
              <img
                src="/hero.jpg"
                alt={m.hero_img_alt()}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 540px"
                className="absolute inset-0 w-full h-full object-cover rounded-[22px] shadow-[0_24px_64px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.06)] md:hover:scale-[1.02] md:hover:-translate-y-1 md:transition-all md:duration-500 block dark:hidden"
              />
              <img
                src="/hero-dark.jpg"
                alt={m.hero_img_alt()}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 540px"
                className="absolute inset-0 w-full h-full object-cover rounded-[22px] shadow-[0_24px_64px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.06)] md:hover:scale-[1.02] md:hover:-translate-y-1 md:transition-all md:duration-500 hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── WhatsApp Demo ────────────────────────── */

function WhatsAppDemo() {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const messages = [
      { text: m.demo_msg_1_html(), delay: 800 },
      { text: m.demo_msg_2(), delay: 1500 },
      { text: m.demo_msg_3(), delay: 2200 },
      { text: m.demo_msg_4(), delay: 2900 },
    ]

    const el = chatRef.current
    if (!el) return
    const typing = el.querySelector('.typing-dots')

    messages.forEach((msg, i) => {
      setTimeout(() => {
        const div = document.createElement('div')
        div.className = 'bg-[#DCF8C6] p-2 px-2.5 rounded-tl-none rounded-[7px] text-[12.5px] leading-[1.55] text-[#111] shadow-[0_1px_1px_rgba(0,0,0,0.06)] mb-1.5 max-w-[94%]'
        div.innerHTML = msg.text + '<div class="text-[9px] text-[#999] text-end mt-0.5">07:0' + i + '</div>'
        el.insertBefore(div, typing)
      }, msg.delay)
    })

    setTimeout(() => typing?.remove(), 3500)
  }, [])

  return (
    <Section title={m.demo_title()} subtitle={m.demo_subtitle()} bg="gradient-alt">
      <div className="w-full max-w-[380px] mx-auto">
        <div className="phone-glass rounded-[28px] overflow-hidden">
          <div className="h-6 bg-white/40 flex items-center justify-center">
            <span className="w-[60px] h-1 bg-black/10 rounded-full" />
          </div>
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2 text-white">
            <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-[12px] font-bold">A</div>
            <div><div className="text-[13px] font-semibold">Agentiko</div><div className="text-[10px] opacity-70">{m.demo_typing()}</div></div>
          </div>
          <div ref={chatRef} className="p-2.5 bg-[#ECE5DD] min-h-[220px]">
            <div className="typing-dots inline-flex gap-[3px] p-1.5 px-2.5 bg-white rounded-[7px] mb-1.5">
              <span className="w-[5px] h-[5px] rounded-full bg-[#aaa] animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-[5px] h-[5px] rounded-full bg-[#aaa] animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-[5px] h-[5px] rounded-full bg-[#aaa] animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 text-[14px] text-brand font-semibold">
        {m.demo_footer()}
      </p>
    </Section>
  )
}

/* ── Features ─────────────────────────────── */

function Features() {
  const items = [
    { icon: '📧', title: m.features_emails_title(), desc: m.features_emails_desc(), tag: m.features_emails_tag() },
    { icon: '📊', title: m.features_sales_title(), desc: m.features_sales_desc(), tag: m.features_sales_tag() },
    { icon: '📅', title: m.features_meetings_title(), desc: m.features_meetings_desc(), tag: m.features_meetings_tag() },
    { icon: '✏️', title: m.features_content_title(), desc: m.features_content_desc(), tag: m.features_content_tag() },
    { icon: '🔍', title: m.features_detect_title(), desc: m.features_detect_desc(), tag: m.features_detect_tag() },
    { icon: '✅', title: m.features_tasks_title(), desc: m.features_tasks_desc(), tag: m.features_tasks_tag() },
  ]

  return (
    <Section title={m.features_title()} subtitle={m.features_subtitle()} bg="gradient">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((f) => (
          <div key={f.title} className="glass-card glass-card-hover rounded-[14px] p-6 cursor-default">
            <div className="text-[28px] mb-3">{f.icon}</div>
            <h3 className="text-[16px] font-bold mb-1.5">{f.title}</h3>
            <p className="text-[13.5px] text-text-secondary leading-relaxed">{f.desc}</p>
            <span className="inline-block mt-2.5 text-[11px] text-brand bg-brand-50 px-2.5 py-0.5 rounded-full font-semibold">{f.tag}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── Personas ─────────────────────────────── */

function Personas() {
  const items = [
    { emoji: '⚖️', role: m.persona_lawyer_role(), need: m.persona_lawyer_need() },
    { emoji: '💻', role: m.persona_pm_role(), need: m.persona_pm_need() },
    { emoji: '🏫', role: m.persona_teacher_role(), need: m.persona_teacher_need() },
    { emoji: '📈', role: m.persona_accountant_role(), need: m.persona_accountant_need() },
    { emoji: '💪', role: m.persona_coach_role(), need: m.persona_coach_need() },
    { emoji: '💼', role: m.persona_freelancer_role(), need: m.persona_freelancer_need() },
    { emoji: '👩‍💻', role: m.persona_manager_role(), need: m.persona_manager_need() },
    { emoji: '💊', role: m.persona_doctor_role(), need: m.persona_doctor_need() },
    { emoji: '✈️', role: m.persona_travel_role(), need: m.persona_travel_need() },
    { emoji: '🎨', role: m.persona_designer_role(), need: m.persona_designer_need() },
    { emoji: '🏠', role: m.persona_realtor_role(), need: m.persona_realtor_need() },
    { emoji: '📚', role: m.persona_student_role(), need: m.persona_student_need() },
  ]

  return (
    <Section title={m.personas_title()} subtitle={m.personas_subtitle()} bg="gradient-alt">
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
        {items.map((p) => (
          <div key={p.role} className="glass-card glass-card-hover rounded-[14px] p-3.5 sm:p-5 text-center cursor-default">
            <div className="text-[28px] sm:text-[32px] mb-1.5 sm:mb-2">{p.emoji}</div>
            <div className="text-[13px] sm:text-[14px] font-bold mb-0.5 leading-tight">{p.role}</div>
            <div className="text-[11.5px] sm:text-[12px] text-text-muted leading-tight">{p.need}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── How It Works ─────────────────────────── */

function HowItWorks() {
  const steps = [
    { num: '1', title: m.step_1_title(), desc: m.step_1_desc() },
    { num: '2', title: m.step_2_title(), desc: m.step_2_desc() },
    { num: '3', title: m.step_3_title(), desc: m.step_3_desc() },
  ]

  return (
    <Section title={m.how_it_works_title()} subtitle="" bg="gradient">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
        {steps.map((s) => (
          <div key={s.num} className="glass-card rounded-[22px] p-6 text-center">
            <div className="step-num w-12 h-12 rounded-full text-white text-[20px] font-bold flex items-center justify-center mx-auto mb-4">
              {s.num}
            </div>
            <h3 className="text-[16px] font-bold mb-2">{s.title}</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── Pricing ──────────────────────────────── */

function Pricing() {
  const features = [
    m.pricing_feature_1(),
    m.pricing_feature_2(),
    m.pricing_feature_3(),
    m.pricing_feature_4(),
    m.pricing_feature_5(),
    m.pricing_feature_6(),
  ]

  return (
    <Section title={m.pricing_title()} subtitle="" bg="gradient-alt">
      <div className="pricing-glass rounded-[22px] p-6 sm:p-8 max-w-[480px] mx-auto text-center">
        <div className="text-[48px] font-extrabold tracking-[-2px] text-text-primary mb-1">
          {m.pricing_amount()}<span className="text-[20px] font-normal text-text-muted ms-1">{m.pricing_period_suffix()}</span>
        </div>
        <p className="text-[15px] text-text-secondary mb-6">{m.pricing_note()}</p>
        <ul className="space-y-3 text-start mb-8">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[14px] text-text-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <a href={ctaHref()} className="btn-brand w-full">{hasAccount() ? m.pricing_cta_login() : m.pricing_cta()}</a>
      </div>
    </Section>
  )
}

/* ── Final CTA ────────────────────────────── */

function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 section-gradient-hero text-center px-4 sm:px-6 md:px-8">
      <div className="max-w-[560px] mx-auto">
        <h2 className="text-[clamp(24px,5.5vw,38px)] font-bold tracking-[-0.6px] mb-3 break-words">
          {m.final_cta_title()}
        </h2>
        <p className="text-[clamp(15px,3.6vw,17px)] text-text-secondary mb-8 leading-relaxed">
          {m.final_cta_desc()}
        </p>
        <a href={ctaHref()} className="btn-brand">{hasAccount() ? m.final_cta_btn_login() : m.final_cta_btn()}</a>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────── */

function Footer() {
  return (
    <footer className="py-6 text-center text-[13px] text-text-muted border-t border-border-light bg-surface safe-pb safe-px">
      <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1 mb-1">
        <Link
          to={localizeHref('/terms')}
          className="inline-flex items-center min-h-[36px] px-1 hover:text-text-secondary transition-colors"
        >
          {m.footer_terms()}
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          to={localizeHref('/privacy')}
          className="inline-flex items-center min-h-[36px] px-1 hover:text-text-secondary transition-colors"
        >
          {m.footer_privacy()}
        </Link>
      </div>
      {m.footer_copyright()}
    </footer>
  )
}

/* ── Shared Section ───────────────────────── */

function Section({ title, subtitle, children, bg }: {
  title: string
  subtitle: string
  children: React.ReactNode
  bg?: 'gradient' | 'gradient-alt'
}) {
  const bgClass = bg === 'gradient' ? 'section-gradient' : bg === 'gradient-alt' ? 'section-gradient-alt' : 'bg-surface'
  return (
    <section className={`py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 ${bgClass}`}>
      <div className="max-w-[1080px] mx-auto">
        <h2 className="text-[clamp(24px,5.5vw,38px)] font-bold text-center tracking-[-0.6px] mb-3 break-words">{title}</h2>
        {subtitle && <p className="text-center text-[clamp(15px,3.6vw,17px)] text-text-secondary mb-10 sm:mb-12 max-w-[520px] mx-auto">{subtitle}</p>}
        {!subtitle && <div className="mb-10 sm:mb-12" />}
        {children}
      </div>
    </section>
  )
}
