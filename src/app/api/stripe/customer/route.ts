import { NextResponse } from 'next/server';
import { UpdateStripeCustomerEmail } from '@/lib/API/Services/stripe/customer';
import type { NextRequest } from 'next/server';
import { CustomerPropsT, CustomerReqPropsT } from '@/lib/types/stripe';

export async function POST(request: NextRequest) {
  const req: CustomerReqPropsT = await request.json();
  const { email, customer } = req;

  try {
    const props: CustomerPropsT = { customer, email };
    const res = await UpdateStripeCustomerEmail(props);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
