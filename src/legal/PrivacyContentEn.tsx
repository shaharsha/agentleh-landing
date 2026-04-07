import { LegalSection } from './LegalSection'

export function PrivacyContentEn() {
  return (
    <>
      <LegalSection id="intro" title="1. Introduction">
        <p>This Privacy Policy describes how Agentiko (operated by Shahar Shavit — Software Development, a registered sole proprietor under Israeli law) collects, processes, stores, and protects your personal information when you use the Service.</p>
        <p>We are committed to full transparency regarding how your data is handled. This policy has been drafted in accordance with the Israeli Privacy Protection Law, 5741-1981 (including Amendment 13), the Privacy Protection Regulations (Data Security), 5777-2017, guidance from the Israeli Privacy Protection Authority, and the European GDPR where applicable.</p>
        <p><strong>Important disclosure:</strong> Messages you send to the Agent are processed by artificial intelligence systems. Messages are encrypted in transit (TLS) but are decrypted on our servers for AI processing. Your data is <strong>not</strong> end-to-end encrypted through the entire processing pipeline.</p>
      </LegalSection>

      <LegalSection id="data-collected" title="2. Information We Collect">
        <h3>Identification Data</h3>
        <ul>
          <li>Your WhatsApp phone number</li>
          <li>Your WhatsApp profile name</li>
          <li>Email address (during registration)</li>
        </ul>

        <h3>Message Content</h3>
        <ul>
          <li>Text messages you send to the Agent</li>
          <li>Images, videos, documents, and files you share</li>
          <li>Voice messages (transcribed to text)</li>
          <li>Locations, contacts, stickers, and reactions (emoji) you send</li>
        </ul>

        <h3>Voice Data</h3>
        <ul>
          <li>Voice recordings are sent to a transcription service (ivrit.ai) for conversion to text</li>
          <li>The transcribed text is retained; the original recording is deleted after transcription</li>
        </ul>

        <h3>Integration Data</h3>
        <ul>
          <li>Gmail: Email messages and metadata (subject, sender, date) — only when you connect Gmail</li>
          <li>Google Calendar: Events, meetings, and their details — only when you connect Calendar</li>
          <li>Future integrations: Will collect data according to service type, always subject to your explicit consent</li>
        </ul>

        <h3>Payment Data</h3>
        <ul>
          <li>Payment processing is handled by Grow by Greeninvoice. <strong>Agentiko does not store full credit card details.</strong></li>
          <li>We retain transaction details (amount, date, transaction ID) for accounting and reporting obligations.</li>
        </ul>

        <h3>Agent Memory</h3>
        <ul>
          <li>The Agent maintains personalized memory: preferences, context, daily summaries, and long-term memory</li>
          <li>This memory improves response quality and enables personalization</li>
          <li>You may request to view or delete the memory at any time</li>
        </ul>

        <h3>Technical and Usage Data</h3>
        <ul>
          <li>Message timestamps and technical metadata</li>
          <li>Usage data: token consumption, usage frequency, integration activity</li>
          <li>Server logs for operational and diagnostic purposes</li>
        </ul>
      </LegalSection>

      <LegalSection id="how-collected" title="3. How We Collect Information">
        <ul>
          <li><strong>Directly from you:</strong> Through WhatsApp messages you send to the Agent and registration details you provide.</li>
          <li><strong>From integrations:</strong> Information from Gmail, Calendar, and other services — only after your explicit authorization via OAuth.</li>
          <li><strong>Automatically:</strong> Technical metadata, server logs, and usage data collected during Service operation.</li>
          <li><strong>From the payment processor:</strong> Transaction confirmations from Grow by Greeninvoice.</li>
        </ul>
      </LegalSection>

      <LegalSection id="purposes" title="4. Purposes of Data Processing">
        <p>We process your information for the following purposes:</p>
        <ul>
          <li>Providing the AI assistant service — processing your messages and generating responses</li>
          <li>Maintaining Agent memory for a personalized experience</li>
          <li>Sending daily summaries and proactive alerts (subject to your consent, per the Israeli Anti-Spam Law)</li>
          <li>Voice transcription (audio → text) and text-to-speech generation (text → speech)</li>
          <li>Processing payments and managing subscriptions</li>
          <li>Service improvement (based on anonymized and aggregated data only)</li>
          <li>Compliance with legal obligations and regulatory requirements</li>
          <li>Service notifications and updates</li>
          <li>Security monitoring and fraud prevention</li>
        </ul>
      </LegalSection>

      <LegalSection id="ai-disclosure" title="5. Use of Artificial Intelligence — Transparency Disclosure">
        <p>This section details how your data is processed by AI systems. We are committed to full transparency on this matter, in accordance with the Israeli Privacy Protection Authority's guidance on AI.</p>

        <h3>Message Processing Flow</h3>
        <ul>
          <li>WhatsApp messages arrive at our bridge server encrypted in transit (TLS).</li>
          <li>At the bridge server, messages are <strong>decrypted</strong> and forwarded in plaintext to language model (LLM) providers for response generation.</li>
          <li>Transmission to AI providers occurs over encrypted connections (HTTPS/TLS), but the content itself is processed as plaintext on the provider's side.</li>
        </ul>

        <h3>AI Providers</h3>
        <ul>
          <li>Current providers include: OpenRouter (Qwen models). Providers may change.</li>
          <li>Voice transcription is performed by ivrit.ai (Hebrew-optimized Whisper model).</li>
          <li>Outgoing voice messages are generated by ElevenLabs.</li>
        </ul>

        <h3>Use of Data for Training</h3>
        <ul>
          <li><strong>Agentiko does not use user data to train AI models.</strong></li>
          <li>Third-party AI providers have their own data policies. We select providers that commit to not training models on API inputs where possible.</li>
          <li>We recommend reviewing the privacy policies of relevant providers for additional details.</li>
        </ul>

        <h3>Rights Regarding AI Processing</h3>
        <p>In accordance with the Israeli Privacy Protection Authority's guidance, you have rights regarding data processed by AI systems, including the right to correction of faulty Agent outputs. See the "User Rights" section below.</p>
      </LegalSection>

      <LegalSection id="third-parties" title="6. Sharing Information with Third Parties">
        <p>We share information with third parties only as necessary to provide the Service. Details below:</p>

        <div className="overflow-x-auto my-4">
          <table>
            <thead>
              <tr>
                <th>Third Party</th>
                <th>Data Type</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Meta (WhatsApp Cloud API)</td>
                <td>Phone numbers, messages, media</td>
                <td>Message delivery</td>
              </tr>
              <tr>
                <td>LLM providers (e.g., OpenRouter/Qwen)</td>
                <td>Message content</td>
                <td>AI response generation</td>
              </tr>
              <tr>
                <td>ElevenLabs</td>
                <td>Text for speech conversion</td>
                <td>Text-to-speech</td>
              </tr>
              <tr>
                <td>ivrit.ai</td>
                <td>Voice recordings</td>
                <td>Hebrew transcription</td>
              </tr>
              <tr>
                <td>Hetzner (Germany)</td>
                <td>All Agent data</td>
                <td>Server hosting</td>
              </tr>
              <tr>
                <td>Render (Frankfurt)</td>
                <td>Message routing data</td>
                <td>Bridge server hosting</td>
              </tr>
              <tr>
                <td>Better Stack</td>
                <td>Operational logs</td>
                <td>Monitoring and diagnostics</td>
              </tr>
              <tr>
                <td>Supabase</td>
                <td>Auth data (email, ID)</td>
                <td>User authentication</td>
              </tr>
              <tr>
                <td>Google</td>
                <td>Gmail/Calendar data (with consent)</td>
                <td>Integrations</td>
              </tr>
              <tr>
                <td>Grow by Greeninvoice</td>
                <td>Billing and payment data</td>
                <td>Payment processing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul>
          <li><strong>We do not sell personal information to third parties.</strong></li>
          <li>We do not share data for advertising purposes.</li>
          <li>Data is shared only as necessary for Service delivery or as required by law.</li>
        </ul>
      </LegalSection>

      <LegalSection id="integrations-privacy" title="7. Integrations (Gmail, Calendar, and More)">
        <ul>
          <li>Each integration requires your explicit authorization via OAuth with minimal permissions.</li>
          <li>Data retrieved from integrations is processed in the same manner as other User Content — i.e., sent to AI models for processing.</li>
          <li>You may revoke access to any integration at any time, either through the Agent or directly through the third-party service settings (e.g., Google Security settings).</li>
          <li>Revoking access stops future data collection but does not retroactively delete data that was already processed.</li>
          <li>Future integrations will follow the same explicit consent model.</li>
        </ul>
      </LegalSection>

      <LegalSection id="storage-security" title="8. Data Storage and Security">
        <h3>Storage Location</h3>
        <ul>
          <li>Data is stored on Hetzner servers in the EU (Frankfurt, Germany).</li>
          <li>Backups are stored on Hetzner Storage Box (EU).</li>
        </ul>

        <h3>Security Measures</h3>
        <ul>
          <li><strong>Isolation:</strong> Each Agent runs in an isolated container with gVisor sandboxing — Google's isolation technology. Your data is not accessible to other users.</li>
          <li><strong>Encryption in transit:</strong> All communications are encrypted using TLS.</li>
          <li><strong>Backups:</strong> Nightly backups to a separate storage server in the EU.</li>
          <li><strong>Access control:</strong> System access is restricted and monitored.</li>
          <li>In accordance with the Privacy Protection Regulations (Data Security), 5777-2017, we maintain security procedures that are appropriate and proportional to the sensitivity of the data processed.</li>
        </ul>
        <p>It is important to note: no computer system is entirely immune. We take reasonable measures to protect your data, but we cannot guarantee absolute security.</p>
      </LegalSection>

      <LegalSection id="international-transfer" title="9. International Data Transfers">
        <ul>
          <li><strong>Primary storage:</strong> European Union (Germany). Israel is recognized by the EU as a country providing adequate data protection (adequacy status) under the GDPR.</li>
          <li><strong>Providers outside the EU/Israel:</strong> Some service providers operate in the United States (OpenRouter, ElevenLabs, Supabase, Better Stack). These transfers are based on contractual commitments to data protection.</li>
          <li>We select providers committed to high standards of data protection.</li>
        </ul>
      </LegalSection>

      <LegalSection id="retention" title="10. Data Retention and Deletion">
        <ul>
          <li><strong>Active subscription:</strong> Data is retained for Service operation.</li>
          <li><strong>After cancellation:</strong> User data (Agent memory, conversation history, files) will be deleted within 30 days of cancellation.</li>
          <li><strong>Backups:</strong> May contain user data for up to 30 additional days after deletion, then overwritten.</li>
          <li><strong>Payment records:</strong> Retained as required by Israeli tax law (7 years for financial records).</li>
          <li><strong>Operational logs:</strong> Retained for up to 90 days for diagnostics, then deleted.</li>
          <li>You may request earlier deletion — see the "User Rights" section.</li>
          <li>Anonymized and aggregated data (without personal identifiers) may be retained indefinitely.</li>
        </ul>
      </LegalSection>

      <LegalSection id="user-rights" title="11. User Rights">
        <p>Under the Israeli Privacy Protection Law, 5741-1981 (including Amendment 13) and the GDPR where applicable, you have the following rights:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data. We will respond within 30 days.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate data, including correction of faulty Agent outputs (per the Israeli Privacy Protection Authority's AI guidance).</li>
          <li><strong>Deletion:</strong> Request deletion of your data. Processed within 30 days.</li>
          <li><strong>Portability:</strong> Request your data in a structured, commonly used format.</li>
          <li><strong>Objection:</strong> Object to specific processing activities.</li>
          <li><strong>Withdraw consent:</strong> Withdraw consent for integrations or marketing communications at any time.</li>
        </ul>
        <p><strong>How to exercise your rights:</strong> Email support@agentiko.co.il or send a message to your Agent via WhatsApp. We may verify your identity before processing your request. No fee is charged for reasonable requests.</p>
      </LegalSection>

      <LegalSection id="minors" title="12. Children's Privacy">
        <p>The Service is intended for users aged 18 and above only. We do not knowingly collect personal information from minors.</p>
        <p>If we discover that a minor is using the Service, we will terminate the account and delete the data promptly. A parent or guardian may contact us to request deletion.</p>
      </LegalSection>

      <LegalSection id="policy-changes" title="13. Changes to This Policy">
        <ul>
          <li>We may update this policy from time to time.</li>
          <li>Material changes: At least 30 days' advance notice via WhatsApp and/or email.</li>
          <li>The last updated date will appear at the top of the policy.</li>
          <li>Continued use after the notice period constitutes acceptance of the updated policy.</li>
          <li>Previous versions are available upon request.</li>
        </ul>
      </LegalSection>

      <LegalSection id="breach" title="14. Security Breach">
        <p>In accordance with the Privacy Protection Regulations (Data Security), 5777-2017:</p>
        <ul>
          <li>In the event of a severe security incident, we will report to the Privacy Protection Authority as required by law.</li>
          <li>If the breach is likely to cause you harm, we will notify you as soon as possible.</li>
          <li>Notification will include: the nature of the breach, types of data affected, steps taken, and recommended actions you can take.</li>
        </ul>
      </LegalSection>

      <LegalSection id="contact" title="15. Contact">
        <p>For any questions, requests, or inquiries regarding privacy:</p>
        <ul>
          <li><strong>Name:</strong> Shahar Shavit — Software Development</li>
          <li><strong>Email:</strong> support@agentiko.co.il</li>
          <li><strong>WhatsApp:</strong> Contact your Agent directly</li>
        </ul>
        <p>We commit to responding to privacy inquiries within 30 days.</p>
      </LegalSection>
    </>
  )
}
