import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/API/Services/stripe/session';
import type { NextRequest } from 'next/server';
import { CreateCheckoutSessionPropsT, CheckoutSessionReqPropsT } from '@/lib/types/stripe';

export async function POST(request: NextRequest) {
  const req: CheckoutSessionReqPropsT = await request.json();
  const { price, customer_email, user_id } = req;

  const origin = request.nextUrl.origin;

  try {
    const props: CreateCheckoutSessionPropsT = { price, customer_email, user_id, origin };
    const session = await createCheckoutSession(props);

    return NextResponse.json(session);
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
