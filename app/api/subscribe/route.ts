import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const BodySchema = z.object({
  email: z.string().email(),
  vo2max: z.number().min(5).max(100).optional(),
  age: z.number().min(10).max(120).optional(),
  sex: z.enum(['male', 'female']).optional(),
  method: z.string().max(100).optional(),
});

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/contacts';

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { email, vo2max, age, sex, method } = parsed.data;

  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;

  if (!apiKey || !listIdRaw) {
    // Dev-mode: accept silently so the form works without credentials.
    return NextResponse.json({ ok: true, dev: true });
  }

  const listId = Number(listIdRaw);
  if (!Number.isFinite(listId)) {
    return NextResponse.json({ error: 'Misconfigured BREVO_LIST_ID' }, { status: 500 });
  }

  const attributes: Record<string, unknown> = {};
  if (vo2max !== undefined) attributes.VO2_MAX = vo2max;
  if (age !== undefined) attributes.AGE = age;
  if (sex) attributes.SEX = sex;
  if (method) attributes.LAST_METHOD = method;
  attributes.SIGNUP_SOURCE = 'vo2max-calculator-result';

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes,
      }),
    });

    if (!res.ok && res.status !== 204) {
      // Brevo returns 400 when contact already exists in some plans — treat as success
      const text = await res.text();
      if (res.status !== 400 || !text.toLowerCase().includes('exist')) {
        console.error('Brevo subscribe failed', res.status, text);
        return NextResponse.json({ error: 'Subscribe failed' }, { status: 502 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Brevo subscribe error', err);
    return NextResponse.json({ error: 'Network error' }, { status: 502 });
  }
}
