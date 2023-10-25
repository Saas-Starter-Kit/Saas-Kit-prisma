import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import config from './lib/config/auth';
import * as context from 'next/headers';
import auth from './lib/API/Init/lucia';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  //const authRequest = auth.handleRequest(req.method, context);
  //return authRequest.validate();

  //const origin: string = req.nextUrl.origin;
  //const redirectUrl = `${origin}${config.redirects.toDashboard}`;
  //return NextResponse.redirect(redirectUrl);

  return res;
}
