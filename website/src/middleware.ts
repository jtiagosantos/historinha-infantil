import { auth } from '@/auth';

export default auth((request) => {
  const isUnprotectedRoute = request.nextUrl.pathname === '/autenticar';
  const isProtectedRoute = !isUnprotectedRoute;

  if (isUnprotectedRoute && !!request.auth) {
    const url = new URL('/', request.nextUrl.origin);
    return Response.redirect(url);
  }

  if (isProtectedRoute && !request.auth) {
    const url = new URL('/autenticar', request.nextUrl.origin);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}