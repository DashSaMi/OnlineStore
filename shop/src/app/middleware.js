import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  try {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    const protectedRoutes = ['/cart', '/checkout', '/account', '/products/[id]'];
    const isProtected = protectedRoutes.some(route => 
      pathname.startsWith(route.replace('/[id]', '/'))
    );

    if (isProtected && !token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: ['/cart/:path*', '/checkout/:path*', '/account/:path*', '/products/:path*']
};