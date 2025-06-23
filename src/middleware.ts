// Dosya Yolu: src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

// Middleware'i geçici olarak devre dışı bırakıyoruz
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Login sayfasını kontrol etme
  if (pathname === '/auth/login') {
    return NextResponse.next()
  }

  const session = await auth()
  
  // Sadece /admin ve altındaki sayfalar için (login hariç)
  if (!session && pathname.startsWith('/admin')) {
    const url = new URL('/auth/login', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Sadece /admin altındaki sayfalarda çalış
export const config = {
  matcher: [
    '/admin',
    '/admin/((?!login).)*'
  ],
}