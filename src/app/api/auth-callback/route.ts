import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../../../supabase/types';

import type { NextRequest } from 'next/server';
import config from '@/lib/config/auth';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin: string = request.nextUrl.origin;

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
  }

  const reDirectUrl = `${origin}${config.redirects.toDashboard}`;

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(reDirectUrl);
}
