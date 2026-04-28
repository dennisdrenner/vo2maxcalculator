/**
 * SaaSHub — submit vo2maxcalculators.com.
 *
 * Run: npx tsx scripts/submissions/saashub.ts
 */
import { openBrowser, packet, prompt, log, ok } from './lib';

async function main() {
  const { browser, page } = await openBrowser();
  log(`Opening SaaSHub submission page...`);
  await page.goto('https://www.saashub.com/submit', { waitUntil: 'domcontentloaded' });

  await prompt(
    `Sign in if needed, then navigate to the submission form. Hit Enter when you're at the form.`,
  );

  // SaaSHub typically asks for: name, URL, short description, long description,
  // category, screenshot/logo, contact email.
  try {
    await page.fill('input[name="name"], #name', packet.name);
    log(`Filled name.`);
  } catch {
    log(`Name fill failed. Paste: ${packet.name}`);
  }

  try {
    await page.fill('input[type="url"], input[name="url"], #url', packet.url);
    log(`Filled URL.`);
  } catch {
    log(`URL fill failed. Paste: ${packet.url}`);
  }

  try {
    await page.fill('input[name="tagline"], #tagline', packet.tagline_short);
    log(`Filled tagline.`);
  } catch {
    log(`Tagline fill failed. Paste: ${packet.tagline_short}`);
  }

  try {
    await page.fill('textarea[name="description"], #description', packet.description_long);
    log(`Filled description.`);
  } catch {
    log(`Description fill failed. Paste:\n\n${packet.description_long}\n`);
  }

  log(`\nReference values:`);
  log(`  Categories:     ${packet.categories.join(', ')}`);
  log(`  Pricing:        ${packet.pricing}`);
  log(`  Logo URL:       ${packet.logo_url}`);
  log(`  Contact email:  ${packet.contact_email}`);

  await prompt(
    `Finish any remaining fields, solve captcha if any, click Submit. Hit Enter when done.`,
  );

  ok(`SaaSHub submission flow complete.`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
