import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/sign-in', '/sign-up'];
const protectedRoutes = ['/', '/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute =
    protectedRoutes.includes(pathname) || pathname.startsWith('/dashboard/');
  const sessionCookie = getSessionCookie(request.headers);

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
