import { NextResponse } from 'next/server';
import { getSession } from './lib/API/Services/auth/session';

export async function middleware() {
  const res = NextResponse.next();

  await getSession();

  return res;
}
