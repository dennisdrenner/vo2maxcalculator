/**
 * SoMuch.com — free directory submission.
 *
 * Run: npx tsx scripts/submissions/somuch.ts
 */
import { openBrowser, packet, prompt, log, ok } from './lib';

async function main() {
  const { browser, page } = await openBrowser();
  log(`Opening SoMuch submission...`);
  await page.goto('https://somuch.com/free-submission/', { waitUntil: 'domcontentloaded' });

  await prompt(`Find and click the FREE submission link/button. Hit Enter when on the form.`);

  try { await page.fill('input[name="title"], #title', packet.name); log(`Filled title.`); } catch {}
  try { await page.fill('input[name="url"], #url', packet.url); log(`Filled URL.`); } catch {}
  try { await page.fill('textarea[name="description"], #description', packet.description_one_paragraph); log(`Filled description.`); } catch {}
  try { await page.fill('input[name="email"], #email', packet.contact_email); log(`Filled email.`); } catch {}

  log(`\nCategory: Health > Fitness (or closest match)`);
  log(`Keywords: ${packet.keywords.slice(0, 5).join(', ')}`);

  await prompt(`Pick category, solve captcha if any, submit. Enter when done.`);

  ok(`SoMuch submission complete.`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
