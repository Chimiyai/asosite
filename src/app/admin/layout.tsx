// src/app/admin/layout.tsx
import AdminSidebar from '@/components/admin/AdminSidebar';
import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Sunucu tarafında oturum kontrolü yapıyoruz.
  // Bu, middleware'e ek olarak bir güvenlik katmanı daha sağlar.
  const session = await auth();
  if (!session) {
    redirect('/auth/login'); // Eğer bir şekilde buraya gelinirse ve oturum yoksa, tekrar login'e yolla.
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