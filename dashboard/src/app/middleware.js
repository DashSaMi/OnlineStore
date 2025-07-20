import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname.startsWith('/dashboard/login');
  const isDashboard = pathname.startsWith('/dashboard');
  const hasAuth = request.cookies.get('dashboard_auth')?.value === '1';

  if (isDashboard && !isLogin && !hasAuth) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/dashboard/login';
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard((?!/login).*)'],
}; 