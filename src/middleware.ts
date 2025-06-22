// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // 1. NextAuth oturum token'ını gelen istekten alıyoruz.
  //    Bu token, kullanıcının giriş yapıp yapmadığını gösterir.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 2. Kullanıcının gitmek istediği yolu (pathname) alıyoruz.
  const { pathname } = req.nextUrl;

  // 3. KORUNAN YOLLAR İÇİN MANTIK
  // Kullanıcı /admin ile başlayan bir sayfaya gitmek istiyor,
  // AMA giriş yapmamış (token'ı yok).
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !token) {
    // O zaman onu giriş sayfasına yönlendir.
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4. GİRİŞ SAYFASI İÇİN MANTIK
  // Kullanıcı zaten giriş yapmış (token'ı var)
  // AMA tekrar giriş sayfasına gitmeye çalışıyor.
  if (pathname.startsWith('/admin/login') && token) {
    // O zaman onu direkt admin paneline yönlendir, tekrar giriş yapmasına gerek yok.
    const adminDashboardUrl = new URL('/admin', req.url);
    return NextResponse.redirect(adminDashboardUrl);
  }

  // Yukarıdaki koşulların hiçbiri sağlanmazsa, isteğin normal şekilde devam etmesine izin ver.
  return NextResponse.next();
}

// 5. MATCHER (EŞLEŞTİRİCİ)
// Bu middleware'in projedeki HANGİ yollarda çalışacağını belirtir.
// Bu, gereksiz yere her sayfada (anasayfa, resimler vs.) çalışmasını önleyerek performansı artırır.
export const config = {
  matcher: [
    '/admin/:path*', // /admin ve altındaki tüm yollar (/admin/projeler, /admin/kullanicilar vs.)
    '/admin/login',   // giriş sayfasının kendisi
  ],
};