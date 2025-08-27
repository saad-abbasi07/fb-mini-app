import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
  console.log('🔥 MIDDLEWARE RUNNING:', request.nextUrl.pathname)
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl
  console.log('🔑 Token exists:', !!token)
  
  // If accessing login or register pages
  if (pathname === '/login' || pathname === '/register') {
    // If user has valid token, redirect to home
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key")
        return NextResponse.redirect(new URL('/', request.url))
      } catch (error) {
        // Token is invalid, clear it and let them access login/register
        const response = NextResponse.next()
        response.cookies.delete('auth-token')
        return response
      }
    }
    // No token, let them access login/register
    return NextResponse.next()
  }
  
  // If accessing home page (protected route)
  if (pathname === '/') {
    console.log('🏠 Accessing home page')
    // No token, redirect to login
    if (!token) {
      console.log('❌ No token, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Token exists, verify it
    try {
      jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-key")
      return NextResponse.next()
    } catch (error) {
      // Token is invalid, clear it and redirect to login
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
