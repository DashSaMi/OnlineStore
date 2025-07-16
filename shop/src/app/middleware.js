// middleware.js (Port 3000)
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_FILE = /\.(.*)$/;
const WHITELISTED_API_ROUTES = [
  '/api/auth/',
  '/api/health',
  '/api/public/'
];

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  
  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Create response object with security headers
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CORS configuration - allow both ports in development
  const allowedOrigins = process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://localhost:3001']
    : [process.env.NEXT_PUBLIC_BASE_URL];
  
  const requestOrigin = request.headers.get('origin');
  if (allowedOrigins.includes(requestOrigin)) {
    response.headers.set('Access-Control-Allow-Origin', requestOrigin);
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { 
      headers: response.headers 
    });
  }

  // API routes handling
  if (pathname.startsWith('/api')) {
    // Skip auth for whitelisted API routes
    if (WHITELISTED_API_ROUTES.some(route => pathname.startsWith(route))) {
      return response;
    }

    // Handle admin API requests
    const authHeader = request.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SECRET;
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      // Validate admin token
      if (token === adminSecret) {
        return response;
      }
    }

    // For non-admin API requests, require regular auth
    const token = await getToken({ req: request });
    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return response;
  }

  // Frontend routes handling
  const token = await getToken({ req: request });
  
  // Redirect unauthenticated users from protected routes
  const protectedRoutes = ['/account', '/checkout', '/dashboard'];
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ['/login', '/register'];
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', origin));
  }

  return response;
}