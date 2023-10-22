import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import config from './lib/config/auth';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { error } = await supabase.auth.getSession();
  if (error) {
    const origin: string = req.nextUrl.origin;
    const redirectUrl = `${origin}${config.redirects.toDashboard}`;
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
