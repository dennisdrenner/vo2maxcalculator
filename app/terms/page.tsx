import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    "Terms of service for VO2 Max Calculator. Educational content, medical disclaimer, affiliate disclosure, intellectual property, and limitation of liability.",
  path: '/terms/',
});

const EFFECTIVE = '2026-04-14';

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Terms of Service', url: `${SITE_URL}/terms/` },
        ]}
      />
      <ArticleSchema
        headline="Terms of Service"
        description="Terms governing use of VO2 Max Calculator."
        url={`${SITE_URL}/terms/`}
        datePublished={EFFECTIVE}
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Effective date: {EFFECTIVE}</p>

      <p className="mt-6 text-slate-700">
        These Terms of Service ("Terms") govern your use of{' '}
        <Link href="/" className="text-teal-700 underline">vo2maxcalculators.com</Link>{' '}
        (the "Site"), operated by VO2 Max Calculator ("we," "us," "our"). By accessing or using
        the Site, you agree to be bound by these Terms. If you do not agree, do not use the Site.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">1. Nature of the service</h2>
        <p className="mt-3 text-slate-700">
          The Site provides calculators, reference tables, and educational content related to
          VO2 max and cardiorespiratory fitness. All content is for general informational and
          educational purposes only.
        </p>
        <p className="mt-3 text-slate-700">
          <strong>The Site is not medical advice.</strong> VO2 max estimates from field tests
          are approximations, not diagnoses. They are not a substitute for professional medical
          examination, advice, or treatment. Always consult a qualified healthcare provider
          before beginning an exercise program, particularly if you have a cardiovascular
          condition, are pregnant, are recovering from surgery, or have any medical condition
          that could be affected by physical exertion. Maximal and near-maximal exercise tests
          carry real risk of cardiac events, injury, or death in susceptible individuals.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">2. Acceptable use</h2>
        <p className="mt-3 text-slate-700">You agree that you will not:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>Use the Site in any way that violates applicable laws or regulations.</li>
          <li>Attempt to interfere with, disrupt, or gain unauthorized access to the Site, its servers, or any connected systems.</li>
          <li>Scrape, crawl, or systematically extract content from the Site for commercial redistribution without our prior written permission.</li>
          <li>Misrepresent our content as your own or strip attribution from citations.</li>
          <li>Upload or transmit viruses, malware, or other harmful code through forms or API endpoints.</li>
          <li>Impersonate any person or misrepresent your affiliation with a person or entity.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">3. Intellectual property</h2>
        <p className="mt-3 text-slate-700">
          All original content on the Site — text, design, code, and media — is owned by VO2
          Max Calculator or its licensors and is protected by copyright, trademark, and other
          intellectual property laws. You may view and share content for personal,
          non-commercial purposes with attribution and a link back to the original page.
          Reposting full articles, republishing calculator content, or incorporating our
          content into a commercial product requires prior written permission.
        </p>
        <p className="mt-3 text-slate-700">
          Certain scientific data on the Site — VO2 max percentile norms — is sourced from The
          Cooper Institute and the American College of Sports Medicine. Those entities retain
          rights to their underlying data; see{' '}
          <Link href="/methodology/" className="text-teal-700 underline">
            Methodology
          </Link>{' '}
          for citations.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">4. Affiliate disclosure</h2>
        <p className="mt-3 text-slate-700">
          Some links on the Site are affiliate links, including Amazon Associates links. If you
          click an affiliate link and make a purchase, we may receive a small commission at no
          additional cost to you. We only link to products we believe are useful on their
          merits; affiliate status never influences our accuracy claims, rankings, or editorial
          content. As an Amazon Associate we earn from qualifying purchases.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">5. Third-party content and links</h2>
        <p className="mt-3 text-slate-700">
          The Site contains links to third-party websites and services (Amazon product pages,
          research papers, external organizations). We are not responsible for the content,
          practices, or accuracy of any third-party sites. Visiting third-party sites is at
          your own risk and subject to their terms and privacy policies.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">6. Accuracy disclaimer</h2>
        <p className="mt-3 text-slate-700">
          We implement published VO2 max estimation formulas as accurately as we can and cite
          their original sources. However, field-test VO2 max estimates have inherent error
          (typically ±3 to ±8 ml/kg/min depending on the test) and may not match values from
          laboratory gas-analysis testing. Percentile norms reflect historical cohort data and
          may not describe every individual precisely. The Site is provided "as is" without
          warranty of any kind. We do not guarantee that the content is error-free, up to date,
          or suitable for any particular purpose.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">7. Limitation of liability</h2>
        <p className="mt-3 text-slate-700">
          To the maximum extent permitted by law, VO2 Max Calculator and its contributors are
          not liable for any indirect, incidental, special, consequential, or punitive damages,
          or any loss of profits or revenues, arising from your use of the Site, including but
          not limited to injury, death, or medical complications arising from exercise
          undertaken based on Site content. Your sole and exclusive remedy for dissatisfaction
          with the Site is to stop using it.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">8. Indemnification</h2>
        <p className="mt-3 text-slate-700">
          You agree to indemnify and hold harmless VO2 Max Calculator, its officers, contributors,
          and agents from any claims, damages, losses, liabilities, and expenses (including
          reasonable legal fees) arising from your use of the Site, your violation of these
          Terms, or your violation of any rights of a third party.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">9. Changes to the Site and Terms</h2>
        <p className="mt-3 text-slate-700">
          We may modify, suspend, or discontinue any part of the Site at any time without
          notice. We may also update these Terms from time to time. When we do, we will revise
          the "Effective date" at the top. Continued use of the Site after changes constitutes
          acceptance of the updated Terms.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">10. Governing law and disputes</h2>
        <p className="mt-3 text-slate-700">
          These Terms are governed by the laws of the United States and the state in which we
          operate, without regard to conflict-of-laws principles. Any dispute arising from
          these Terms or your use of the Site will be resolved in the state or federal courts
          of that jurisdiction, and you consent to personal jurisdiction there.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900">11. Contact</h2>
        <p className="mt-3 text-slate-700">
          Questions about these Terms can be sent to{' '}
          <a href="mailto:legal@vo2maxcalculators.com" className="text-teal-700 underline">
            legal@vo2maxcalculators.com
          </a>
          .
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500">
        See also:{' '}
        <Link href="/privacy/" className="text-teal-700 underline">
          Privacy Policy
        </Link>
        .
      </p>
    </article>
  );
}
