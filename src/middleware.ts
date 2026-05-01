import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // Define what subdomains we expect to handle as admin
  // This supports both local dev (admin.localhost:3000) and production (admin.yourdomain.com)
  const isAdminSubdomain = hostname?.startsWith('admin.');

  // If it's an admin request and not already pointing to the /admin path, rewrite it
  if (isAdminSubdomain && !url.pathname.startsWith('/admin')) {
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Optional: Prevent public access to /admin directly on the main domain
  if (!isAdminSubdomain && url.pathname.startsWith('/admin')) {
    // You could redirect them to the admin subdomain or return 404
    // url.hostname = `admin.${hostname?.replace('www.', '')}`;
    // return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
