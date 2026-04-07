import { useEffect, useRef, useState } from 'react'

const APP_URL = import.meta.env.VITE_APP_URL

export default function App() {
  const [page, setPage] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPage(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function navigate(path: string) {
    history.pushState(null, '', path)
    setPage(path)
    window.scrollTo(0, 0)
  }

  if (page === '/terms') return <LegalPage title="תנאי שימוש" onBack={() => navigate('/')} />
  if (page === '/privacy') return <LegalPage title="מדיניות פרטיות" onBack={() => navigate('/')} />

  return (
    <div className="min-h-screen">
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
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-2.5">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.3px] text-text-primary no-underline">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          Agentiko
        </a>
        <a href={APP_URL} className="btn-brand btn-sm">
          התחל עכשיו
        </a>
      </div>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────── */

function Hero() {
  return (
    <section className="pt-[140px] pb-16 section-gradient-hero relative overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-right md:text-right text-center">
            <div className="glass-pill inline-flex items-center gap-1.5 text-brand px-3.5 py-1.5 rounded-full text-[13px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              100 מקומות ראשונים בלבד
            </div>
            <h1 className="text-[clamp(32px,5.5vw,50px)] font-extrabold leading-[1.12] tracking-[-1px] mb-5">
              העוזר האישי שלך<br />
              <span className="relative inline-block">
                בוואטסאפ
                <span className="absolute bottom-1 -right-1 -left-1 h-3.5 bg-gradient-to-l from-brand/20 to-brand/5 rounded -z-10" />
              </span>
            </h1>
            <p className="text-[17px] text-text-secondary leading-relaxed mb-7">
              מסכם מיילים, קובע פגישות, כותב תכנים, מנתח מידע, מזהה כשלים ועושה סדר בכל הבלאגן. מחובר לכל הכלים שלך. מותקן ב3 דקות.
            </p>
            <div className="flex flex-col items-start md:items-start items-center gap-2.5">
              <a href={APP_URL} className="btn-brand">אני רוצה סוכן שעובד בשבילי</a>
              <span className="text-[13px] text-text-muted">₪249/חודש. ביטול בכל רגע.</span>
            </div>
          </div>
          <div>
            <img src="/hero.jpg" alt="Agentiko" className="w-full rounded-[22px] shadow-[0_24px_64px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.06)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500" />
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
      { text: '<b>בוקר טוב! הנה הסיכום שלך להיום:</b>', delay: 800 },
      { text: '3 מיילים חדשים שדורשים תשובה. אחד מהם מלקוח שלא חזרת אליו יומיים.', delay: 1500 },
      { text: 'היומן שלך היום: 10:00 שיחה עם נועם, 14:00 פגישת צוות. הכנתי לך סיכום מהפגישה הקודמת.', delay: 2200 },
      { text: 'זיהיתי חשבונית מספק שלא טופלה 5 ימים. רוצה שאזכיר לך אחר הצהריים?', delay: 2900 },
    ]

    const el = chatRef.current
    if (!el) return
    const typing = el.querySelector('.typing-dots')

    messages.forEach((msg, i) => {
      setTimeout(() => {
        const div = document.createElement('div')
        div.className = 'bg-[#DCF8C6] p-2 px-2.5 rounded-tl-none rounded-[7px] text-[12.5px] leading-[1.55] text-[#111] shadow-[0_1px_1px_rgba(0,0,0,0.06)] mb-1.5 max-w-[94%]'
        div.innerHTML = msg.text + '<div class="text-[9px] text-[#999] text-left mt-0.5">07:0' + i + '</div>'
        el.insertBefore(div, typing)
      }, msg.delay)
    })

    setTimeout(() => typing?.remove(), 3500)
  }, [])

  return (
    <Section title="ככה זה נראה כל בוקר ב7:00" subtitle="הסוכן שלך כבר סרק את המיילים, בדק את היומן, זיהה כשלים. הכל מוכן בוואטסאפ לפני שקמת." bg="gradient-alt">
      <div className="max-w-[380px] mx-auto">
        <div className="phone-glass rounded-[28px] overflow-hidden">
          <div className="h-6 bg-white/40 flex items-center justify-center">
            <span className="w-[60px] h-1 bg-black/10 rounded-full" />
          </div>
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2 text-white">
            <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-[12px] font-bold">A</div>
            <div><div className="text-[13px] font-semibold">Agentiko</div><div className="text-[10px] opacity-70">מקליד...</div></div>
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
        לא עושה כלום בלי אישור שלך. אתה בשליטה מלאה.
      </p>
    </Section>
  )
}

/* ── Features ─────────────────────────────── */

const FEATURES = [
  { icon: '📧', title: 'סיכום מיילים וזיהוי כשלים', desc: 'עובר על כל המיילים, מסנן ספאם, מזהה מיילים שנפלו בין הכיסאות.', tag: 'מונע נזקים' },
  { icon: '📊', title: 'סיכום מכירות וניתוח מידע', desc: 'מרכז נתונים מהמייל, מה-CRM, מהשיטס. מזהה מגמות ומציג ביצועים.', tag: 'ראש גדול' },
  { icon: '📅', title: 'קובע פגישות ומנהל יומן', desc: 'מציע זמנים, מתאם עם אנשים, מציג את הפגישות עם כל ההקשר.', tag: 'חוסך 30 דק\'/יום' },
  { icon: '✏️', title: 'כותב תכנים ודרפטים', desc: 'טיוטות מיילים, פוסטים, הצעות מחיר, סיכומי פגישות. אתה רק עורך.', tag: 'יוצר תוכן' },
  { icon: '🔍', title: 'מזהה כשלים בעסק', desc: 'לקוח שלא ענית? משימה שעברה דדליין? חשבונית שלא נשלחה?', tag: 'שומר עליך' },
  { icon: '✅', title: 'ניהול משימות ופולואפ', desc: 'מפרק פרויקטים למשימות, עוקב אחרי דדליינים, מזכיר אוטומטית.', tag: 'מנהל ת\'סדר' },
]

function Features() {
  return (
    <Section title="לא סתם עוזר. עובד אמיתי." subtitle="הנה מה שהסוכן שלך עושה כל יום, בלי שתבקש" bg="gradient">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
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

const PERSONAS = [
  { emoji: '⚖️', role: 'עורכת דין', need: 'מעקב לקוחות ותיקים' },
  { emoji: '💻', role: 'מנהל פרויקטים', need: 'תיעדוף וסדר ביומן' },
  { emoji: '🏫', role: 'מורה ואמא', need: 'ניהול בית + עבודה' },
  { emoji: '📈', role: 'רואה חשבון', need: 'ריכוז חשבוניות ומיילים' },
  { emoji: '💪', role: 'מאמנת', need: 'שיווק, פולואפ, תוכן' },
  { emoji: '💼', role: 'עצמאי', need: 'סדר בכל הבלאגן' },
  { emoji: '👩‍💻', role: 'מנהלת בארגון', need: 'תיאום פגישות ודוחות' },
  { emoji: '💊', role: 'רופאה', need: 'סקירת מחקרים' },
  { emoji: '✈️', role: 'סוכן נסיעות', need: 'מעקב טיסות ולקוחות' },
  { emoji: '🎨', role: 'מעצב', need: 'ניהול צוות ומשימות' },
  { emoji: '🏠', role: 'נדלניסט', need: 'מעקב עסקאות ולידים' },
  { emoji: '📚', role: 'סטודנט', need: 'ארגון לימודים ומטלות' },
]

function Personas() {
  return (
    <Section title="לכל מי שצריך עוזר אישי" subtitle="לא משנה מה התפקיד שלך. אם יש לך מיילים, יומן ומשימות — יש לך סוכן." bg="gradient-alt">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {PERSONAS.map((p) => (
          <div key={p.role} className="glass-card glass-card-hover rounded-[14px] p-5 text-center cursor-default">
            <div className="text-[32px] mb-2">{p.emoji}</div>
            <div className="text-[14px] font-bold mb-0.5">{p.role}</div>
            <div className="text-[12px] text-text-muted">{p.need}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── How It Works ─────────────────────────── */

const STEPS = [
  { num: '1', title: 'משלמים ומקבלים הודעה', desc: 'תוך 3 דקות הסוכן שלך שולח לך הודעה ראשונה בוואטסאפ.' },
  { num: '2', title: 'מחברים את הכלים בקליק', desc: 'Gmail, Calendar, CRM, Slack — קליק אחד ליצור חיבור.' },
  { num: '3', title: 'מחר בבוקר הוא כבר עובד', desc: 'הסוכן מתחיל לסרוק, ללמוד, ולשלוח לך עדכונים.' },
]

function HowItWorks() {
  return (
    <Section title="3 צעדים. 3 דקות. אפס טכנולוגיה." subtitle="" bg="gradient">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
        {STEPS.map((s) => (
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
  return (
    <Section title="עוזר אישי ב₪8 ליום" subtitle="" bg="gradient-alt">
      <div className="pricing-glass rounded-[22px] p-8 max-w-[480px] mx-auto text-center">
        <div className="text-[48px] font-extrabold tracking-[-2px] text-text-primary mb-1">
          ₪249<span className="text-[20px] font-normal text-text-muted mr-1">/חודש</span>
        </div>
        <p className="text-[15px] text-text-secondary mb-6">הכל כלול. בלי הפתעות. ביטול בכל רגע.</p>
        <ul className="space-y-3 text-right mb-8">
          {['סוכן AI אישי בוואטסאפ', 'חיבור ל-Gmail, Calendar, CRM', 'זיכרון מלא — זוכר הכל', 'סיכומים יומיים אוטומטיים', 'זיהוי כשלים והתראות', 'תמיכה בעברית טבעית'].map((f) => (
            <li key={f} className="flex items-center gap-2 text-[14px] text-text-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <a href={APP_URL} className="btn-brand w-full">אני רוצה סוכן אישי</a>
      </div>
    </Section>
  )
}

/* ── Final CTA ────────────────────────────── */

function FinalCTA() {
  return (
    <section className="py-20 section-gradient-hero text-center px-8">
      <div className="max-w-[560px] mx-auto">
        <h2 className="text-[clamp(28px,4.5vw,38px)] font-bold tracking-[-0.6px] mb-3">
          מחר בבוקר יש לך עובד חדש
        </h2>
        <p className="text-[17px] text-text-secondary mb-8 leading-relaxed">
          הוא לא ישן, לא שוכח, לא מפספס. מחובר לכל הכלים שלך ומדבר עברית מושלמת.
        </p>
        <a href={APP_URL} className="btn-brand">אני רוצה להיות מה100 הראשונים</a>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────── */

function Footer() {
  return (
    <footer className="py-6 text-center text-[13px] text-text-muted border-t border-border-light bg-surface">
      <div className="flex items-center justify-center gap-4 mb-1">
        <a href="/terms" onClick={(e) => { e.preventDefault(); history.pushState(null, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="hover:text-text-secondary transition-colors">תנאי שימוש</a>
        <span>·</span>
        <a href="/privacy" onClick={(e) => { e.preventDefault(); history.pushState(null, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="hover:text-text-secondary transition-colors">מדיניות פרטיות</a>
      </div>
      &copy; 2026 Agentiko. כל הזכויות שמורות.
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
    <section className={`py-20 px-8 ${bgClass}`}>
      <div className="max-w-[1080px] mx-auto">
        <h2 className="text-[clamp(28px,4.5vw,38px)] font-bold text-center tracking-[-0.6px] mb-3">{title}</h2>
        {subtitle && <p className="text-center text-[17px] text-text-secondary mb-12 max-w-[520px] mx-auto">{subtitle}</p>}
        {!subtitle && <div className="mb-12" />}
        {children}
      </div>
    </section>
  )
}

/* ── Legal Page ───────────────────────────── */

function LegalPage({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="min-h-screen section-gradient-hero">
      <div className="max-w-[640px] mx-auto px-8 py-20">
        <button onClick={onBack} className="text-[14px] text-brand font-medium hover:underline cursor-pointer mb-8 flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          חזרה
        </button>
        <div className="glass-card-elevated rounded-[22px] p-8">
          <h1 className="text-[28px] font-bold tracking-[-0.6px] mb-6">{title}</h1>
          <div className="text-[15px] text-text-secondary leading-relaxed space-y-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
          </div>
          <p className="text-[13px] text-text-muted mt-8">עדכון אחרון: אפריל 2026</p>
        </div>
      </div>
    </div>
  )
}
