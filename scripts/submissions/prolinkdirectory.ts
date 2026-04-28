/**
 * ProLinkDirectory — submit to Health & Fitness > Fitness category.
 *
 * Run: npx tsx scripts/submissions/prolinkdirectory.ts
 */
import { openBrowser, packet, prompt, log, ok } from './lib';

async function main() {
  const { browser, page } = await openBrowser();
  log(`Opening ProLinkDirectory submission...`);
  await page.goto('https://www.prolinkdirectory.com/submit.php', {
    waitUntil: 'domcontentloaded',
  });

  await prompt(`On the submission form, choose the FREE listing tier if asked. Hit Enter when ready.`);

  try {
    await page.fill('input[name="title"], #title', packet.name);
    log(`Filled title.`);
  } catch {
    log(`Paste title: ${packet.name}`);
  }

  try {
    await page.fill('input[name="url"], #url', packet.url);
    log(`Filled URL.`);
  } catch {
    log(`Paste URL: ${packet.url}`);
  }

  try {
    await page.fill('textarea[name="description"], #description', packet.description_one_paragraph);
    log(`Filled description.`);
  } catch {
    log(`Paste description:\n${packet.description_one_paragraph}`);
  }

  try {
    await page.fill('input[name="email"], #email', packet.contact_email);
    log(`Filled email.`);
  } catch {
    log(`Paste email: ${packet.contact_email}`);
  }

  log(`\nNavigate to: Health & Fitness > Fitness category`);
  log(`Keywords: ${packet.keywords.slice(0, 5).join(', ')}`);

  await prompt(`Pick the right category, fill any missing fields, solve captcha, submit. Enter when done.`);

  ok(`ProLinkDirectory submission complete.`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
