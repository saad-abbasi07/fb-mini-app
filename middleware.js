import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value
  
  // If accessing login or register pages and user is authenticated, redirect to home
  if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key")
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      // Token is invalid, let them access login/register
      return NextResponse.next()
    }
  }
  
  // If accessing protected routes without token, redirect to login
  if (!token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If token exists for protected routes, verify it
  if (token && request.nextUrl.pathname === '/') {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key")
      return NextResponse.next()
    } catch (error) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register']
}
