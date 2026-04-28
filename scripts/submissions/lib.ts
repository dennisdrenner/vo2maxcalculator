import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { chromium, type Browser, type Page } from 'playwright';

interface Packet {
  name: string;
  url: string;
  tagline_short: string;
  tagline_medium: string;
  description_long: string;
  description_one_paragraph: string;
  categories: string[];
  keywords: string[];
  founder: { name: string; bio_short: string; bio_long: string };
  contact_email: string;
  twitter: string;
  logo_url: string;
  screenshot_urls: string[];
  pricing: string;
  open_source: boolean;
  platforms: string[];
}

export const packet: Packet = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'packet.json'), 'utf8'),
);

export async function openBrowser(): Promise<{ browser: Browser; page: Page }> {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'],
  });
  const context = await browser.newContext({
    viewport: null,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  });
  const page = await context.newPage();
  return { browser, page };
}

export function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`\n>>> ${question}\n>>> Press Enter when done (or type 'skip' to abort): `, (a) => {
      rl.close();
      resolve(a.trim());
    });
  });
}

export function log(msg: string) {
  console.log(`\x1b[36m[submit]\x1b[0m ${msg}`);
}

export function warn(msg: string) {
  console.log(`\x1b[33m[warn]\x1b[0m ${msg}`);
}

export function ok(msg: string) {
  console.log(`\x1b[32m[ok]\x1b[0m ${msg}`);
}
