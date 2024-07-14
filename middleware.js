import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })


  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { role } = token
  const url = req.nextUrl.clone()

  if (url.pathname.startsWith('/admin') && role !== 'admin') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith('/user') && role !== 'conductor') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
}
