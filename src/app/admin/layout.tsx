// src/app/admin/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';
import { ReactNode } from 'react';

// Bu, NextAuth'un sunucu tarafında oturum bilgisini almanın en güncel yoludur.
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Sunucu tarafında oturum kontrolü yapıyoruz.
  // Bu, middleware'e ek olarak bir güvenlik katmanı daha sağlar.
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login'); // Eğer bir şekilde buraya gelinirse ve oturum yoksa, tekrar login'e yolla.
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children} {/* Buraya aktif sayfanın içeriği gelecek (page.tsx) */}
      </main>
    </div>
  );
}