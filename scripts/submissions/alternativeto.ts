/**
 * AlternativeTo — submit vo2maxcalculators.com.
 *
 * Run: npx tsx scripts/submissions/alternativeto.ts
 *
 * The script opens a browser, navigates to AlternativeTo's submission page,
 * pre-fills what it can, and pauses for human steps (account creation,
 * captcha, final submit click). Just keep the browser visible and respond
 * when prompted.
 */
import { openBrowser, packet, prompt, log, ok } from './lib';

async function main() {
  const { browser, page } = await openBrowser();
  log(`Opening AlternativeTo submission page...`);
  await page.goto('https://alternativeto.net/software/new-software/', {
    waitUntil: 'domcontentloaded',
  });

  await prompt(
    `Sign in (or sign up) on the page that opened, then navigate back to "Submit a software" if needed. ` +
      `When you're on the submission form ready to fill, hit Enter.`,
  );

  // Try to fill the common fields. Selectors are best-effort — AlternativeTo
  // changes them periodically, so this script logs what it tried and lets
  // the human finish anything missed.
  try {
    await page.fill('input[name="name"]', packet.name);
    log(`Filled name: ${packet.name}`);
  } catch {
    log(`Could not auto-fill name. Paste manually: ${packet.name}`);
  }

  try {
    await page.fill('input[name="url"], input[name="websiteUrl"]', packet.url);
    log(`Filled URL: ${packet.url}`);
  } catch {
    log(`Could not auto-fill URL. Paste manually: ${packet.url}`);
  }

  try {
    await page.fill('textarea[name="description"]', packet.description_long);
    log(`Filled description.`);
  } catch {
    log(`Could not auto-fill description. Paste manually:\n\n${packet.description_long}\n`);
  }

  log(`\nReference values (paste anywhere needed):`);
  log(`  Tagline:        ${packet.tagline_short}`);
  log(`  Categories:     ${packet.categories.join(', ')}`);
  log(`  Keywords:       ${packet.keywords.slice(0, 5).join(', ')}`);
  log(`  Pricing:        ${packet.pricing}`);
  log(`  Platforms:      ${packet.platforms.join(', ')}`);
  log(`  Logo URL:       ${packet.logo_url}`);
  log(`  Contact email:  ${packet.contact_email}`);

  await prompt(
    `Finish any remaining fields, attach the logo if it asks, solve any captcha, and click Submit. ` +
      `When the success page or confirmation is shown, hit Enter to close.`,
  );

  ok(`AlternativeTo submission flow complete.`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
