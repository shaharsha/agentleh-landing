/* Hero illustration — "the morning briefing."
 *
 * BRAND.md §4: "We are not a chatbot, a productivity gimmick, or a
 * space/futurism brand. We sell a teammate who doesn't sleep."
 * §0: "Agentiko is a real worker who lives inside WhatsApp."
 * §3: "Editorial, not dashboard."   "Voice dot replaces bullets."
 *
 * So the hero illustration is not a bubble, not a circuit, not a
 * cyclops eye. It's the *output* of a trusted colleague: a morning
 * briefing on cream paper. A ledger of what the agent handled while
 * you slept. Each bullet is a terracotta voice dot. The final line
 * has a pulsing voice dot and "working on…" copy — the agent is
 * still at it. Paper with grain. Editorial. On-brand.
 *
 * The briefing sits as a full-bleed ghost layer behind the mega
 * headline (desktop). The headline overlays it like a magazine
 * cover on its own feature article. On mobile it renders at full
 * opacity below the CTA — it becomes the first real proof-point
 * rather than a watermark, because space is precious on small
 * screens and a ghostly list reads as noise at 375px wide. */

import { m } from '../paraglide/messages'

export function HeroBubble() {
  // Order chosen so the rhythm reads naturally: handled-overnight
  // (inbox, calendar, sales), then drafted (content), then caught
  // (failures), then followed-up (tasks). Reuses existing translated
  // feature titles — free bilingual coverage, nothing new to ship.
  const items = [
    m.features_emails_title(),
    m.features_meetings_title(),
    m.features_sales_title(),
    m.features_content_title(),
    m.features_detect_title(),
    m.features_tasks_title(),
  ]

  return (
    <div className="hero-briefing" aria-hidden="true">
      <div className="hero-briefing-inner">
        <p className="hero-briefing-head">
          <span className="voice-dot-punct voice-dot-punct-sm" />
          {/* Tiny timestamp header — editorial touch, implies the
              briefing was written just now. Hardcoded bilingual
              string avoids adding translation keys for a one-line
              signature; switchable via dir/lang at runtime. */}
          <span className="hero-briefing-time">07:00</span>
        </p>
        <ul className="hero-briefing-list">
          {items.map((text, i) => (
            <li key={i}>
              <span className="hero-briefing-bullet" aria-hidden="true" />
              <span className="hero-briefing-text">{text}</span>
            </li>
          ))}
          {/* Final line: the agent is still at work. This is the
              only pulsing element on the briefing. */}
          <li className="hero-briefing-working">
            <span className="voice-dot-punct voice-dot-punct-md" aria-hidden="true" />
            <span className="hero-briefing-text hero-briefing-working-text" />
          </li>
        </ul>
      </div>
    </div>
  )
}
