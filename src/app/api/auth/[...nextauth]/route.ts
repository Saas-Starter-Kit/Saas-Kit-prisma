import NextAuth from 'next-auth';
import { authOptions } from '@/lib/API/Services/init/nextauth';

//http://localhost:3000/api/auth/callback/google

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
