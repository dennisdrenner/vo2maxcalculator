/**
 * BetaList — submit vo2maxcalculators.com.
 *
 * BetaList is moderated; expect a multi-day approval queue.
 *
 * Run: npx tsx scripts/submissions/betalist.ts
 */
import { openBrowser, packet, prompt, log, ok } from './lib';

async function main() {
  const { browser, page } = await openBrowser();
  log(`Opening BetaList submission page...`);
  await page.goto('https://betalist.com/submit', { waitUntil: 'domcontentloaded' });

  await prompt(
    `Sign in / sign up if asked. Once on the submission form, hit Enter.`,
  );

  try {
    await page.fill('input[name="startup[name]"], input[name="name"]', packet.name);
    log(`Filled name.`);
  } catch {
    log(`Paste manually: ${packet.name}`);
  }

  try {
    await page.fill('input[name="startup[url]"], input[name="url"]', packet.url);
    log(`Filled URL.`);
  } catch {
    log(`Paste manually: ${packet.url}`);
  }

  try {
    await page.fill('input[name="startup[pitch]"], input[name="pitch"], #pitch', packet.tagline_short);
    log(`Filled pitch / tagline.`);
  } catch {
    log(`Paste manually: ${packet.tagline_short}`);
  }

  try {
    await page.fill('textarea[name="startup[description]"], textarea[name="description"]', packet.description_long);
    log(`Filled description.`);
  } catch {
    log(`Paste manually:\n\n${packet.description_long}\n`);
  }

  log(`\nReference values:`);
  log(`  Categories:    ${packet.categories.join(', ')}`);
  log(`  Logo URL:      ${packet.logo_url}`);
  log(`  Contact email: ${packet.contact_email}`);

  await prompt(`Finish any remaining fields, click Submit, hit Enter when done.`);

  ok(`BetaList submission complete (expect 1-2 weeks for review).`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
