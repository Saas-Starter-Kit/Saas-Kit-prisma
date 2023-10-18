import { NextResponse } from 'next/server';
import { createPortalSession } from '@/lib/API/Services/stripe/session';
import { NextRequest } from 'next/server';
import { PortalSessionReqPropsT, CreatePortalSessionPropsT } from '@/lib/types/stripe';

export async function POST(request: NextRequest) {
  const req: PortalSessionReqPropsT = await request.json();
  const { customer } = req;
  const origin: string = request.nextUrl.origin;

  try {
    const props: CreatePortalSessionPropsT = { customer, origin };
    const portalSession = await createPortalSession(props);
    return NextResponse.json(portalSession);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
