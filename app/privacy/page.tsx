import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    "How VO2 Max Calculator collects and uses data. Email, analytics, advertising, affiliate links, cookies, and your rights under GDPR and CCPA.",
  path: '/privacy/',
});

const EFFECTIVE = '2026-04-14';

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Privacy Policy', url: `${SITE_URL}/privacy/` },
        ]}
      />
      <ArticleSchema
        headline="Privacy Policy"
        description="How we collect, use, and protect information on VO2 Max Calculator."
        url={`${SITE_URL}/privacy/`}
        datePublished={EFFECTIVE}
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Effective date: {EFFECTIVE}</p>

      <p className="mt-6 text-slate-700">
        VO2 Max Calculator ("we," "us," "our") operates{' '}
        <Link href="/" className="text-teal-700 underline">vo2maxcalculators.com</Link> (the
        "Site"). This Privacy Policy explains what information we collect, how we use it, and the
        choices you have. By using the Site, you agree to the practices described here.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">1. Information we collect</h2>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Calculator inputs</h3>
        <p className="mt-2 text-slate-700">
          When you use the VO2 max calculator, you enter values like age, sex, weight, heart
          rate, test time, and similar fields. <strong>These inputs are processed in your
          browser.</strong> They are not transmitted to our servers or stored anywhere unless you
          voluntarily submit them to us (for example, by opting in to email your result to
          yourself).
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Email addresses</h3>
        <p className="mt-2 text-slate-700">
          If you opt in to receive your calculator result by email or subscribe to site updates,
          we collect your email address and the calculator result values associated with that
          submission (VO2 max, age, sex, and test method). We use{' '}
          <a
            href="https://www.brevo.com/legal/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            Brevo
          </a>{' '}
          (Sendinblue SAS) to send these emails and manage the subscriber list. Data is stored on
          Brevo's infrastructure in the European Union.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Analytics data</h3>
        <p className="mt-2 text-slate-700">
          We use Google Analytics 4 (GA4) to understand how visitors use the Site in aggregate.
          GA4 collects standard web-analytics data — page views, referring URL, approximate
          location (country and region), device type, browser, and anonymized interaction events
          (e.g., which calculator method you used, which affiliate links you clicked). GA4 may set
          cookies. See{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            Google's privacy policy
          </a>{' '}
          for details.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Advertising data</h3>
        <p className="mt-2 text-slate-700">
          When Google AdSense is enabled, Google and its partners may use cookies and similar
          technologies to serve ads based on your visits to this Site and other sites. You can
          control personalized advertising through{' '}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            Google Ads Settings
          </a>{' '}
          and opt out of third-party cookies via{' '}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            aboutads.info
          </a>
          .
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Server logs</h3>
        <p className="mt-2 text-slate-700">
          Our hosting provider (Railway) records basic request metadata — IP address, user
          agent, request path, timestamp, and response status — for security monitoring and
          abuse prevention. These logs are retained for a limited period and are not used for
          marketing.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">2. How we use information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>To provide and maintain the calculator and reference content.</li>
          <li>To send you emails you requested (your result, occasional site updates). You can unsubscribe at any time.</li>
          <li>To measure Site usage in aggregate and improve content and features.</li>
          <li>To serve relevant advertising via Google AdSense (when enabled).</li>
          <li>To prevent abuse, fraud, and security incidents.</li>
        </ul>
        <p className="mt-3 text-slate-700">
          We do not sell, rent, or trade your personal information. We do not share individual
          user data with third parties except as needed to provide the services above (e.g.,
          passing your email to Brevo to send you email).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">3. Third-party services</h2>
        <p className="mt-3 text-slate-700">
          The Site relies on the following third-party services. Each has its own privacy policy.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Brevo (Sendinblue SAS)</strong> — email delivery and list management.{' '}
            <a
              href="https://www.brevo.com/legal/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics 4</strong> — usage analytics.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Google AdSense</strong> — display advertising.{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              How Google uses advertising data
            </a>
            .
          </li>
          <li>
            <strong>Amazon Associates</strong> — affiliate links to wearables and training
            equipment. Clicking an affiliate link redirects you to Amazon, which may set its own
            cookies. See{' '}
            <a
              href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Amazon's privacy notice
            </a>
            .
          </li>
          <li>
            <strong>Railway</strong> — hosting provider.{' '}
            <a
              href="https://railway.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Bunny.net</strong> — content delivery network (hero images).{' '}
            <a
              href="https://bunny.net/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Privacy policy
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">4. Cookies and similar technologies</h2>
        <p className="mt-3 text-slate-700">
          The Site uses cookies and similar technologies for analytics (GA4), advertising
          (AdSense, when enabled), and saving user preferences (e.g., your imperial/metric unit
          toggle is stored in your browser's local storage). You can block or delete cookies via
          your browser settings; some features may not work correctly without them.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">5. Your rights</h2>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">GDPR (European Economic Area, UK)</h3>
        <p className="mt-2 text-slate-700">
          If you are in the EEA or UK, you have the right to access, correct, delete, restrict,
          and port your personal data, and to object to its processing. To exercise these rights,
          contact us at the address in Section 9. The legal bases for our processing are consent
          (email list, advertising cookies) and legitimate interests (anti-abuse monitoring).
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">CCPA (California)</h3>
        <p className="mt-2 text-slate-700">
          California residents have the right to know what personal information we collect, to
          request deletion, and to opt out of the "sale" or "sharing" of personal information. We
          do not sell personal information as defined by the CCPA. To make a request, contact us
          at the address in Section 9.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">Email opt-out</h3>
        <p className="mt-2 text-slate-700">
          Every email we send includes a one-click unsubscribe link. You can also request removal
          from our list by contacting us directly.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">6. Children's privacy</h2>
        <p className="mt-3 text-slate-700">
          The Site is not directed to children under 13 (or under 16 in the EEA/UK). We do not
          knowingly collect personal information from children. If you believe a child has given
          us personal information, please contact us and we will delete it.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">7. Data retention</h2>
        <p className="mt-3 text-slate-700">
          Email addresses on our Brevo list are retained until you unsubscribe. Aggregate
          analytics data is retained per Google's default GA4 settings (14 months for
          user-level data, indefinitely for aggregated reports). Server logs are retained for
          up to 30 days.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">8. Security</h2>
        <p className="mt-3 text-slate-700">
          We use reasonable technical and organizational measures to protect your information,
          including HTTPS for all traffic and access controls on vendor platforms. No system is
          perfectly secure; you use the Site at your own risk.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">9. Contact</h2>
        <p className="mt-3 text-slate-700">
          Questions, requests, or complaints about this Privacy Policy can be sent to{' '}
          <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
            dennis@smartravenai.com
          </a>
          . We aim to respond within 30 days.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">10. Changes to this policy</h2>
        <p className="mt-3 text-slate-700">
          We may update this Privacy Policy from time to time. When we do, we will revise the
          "Effective date" at the top. Material changes will be announced on the Site and, where
          required, by email.
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500">
        See also:{' '}
        <Link href="/terms/" className="text-teal-700 underline">
          Terms of Service
        </Link>
        .
      </p>
    </article>
  );
}
