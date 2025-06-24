// src/components/admin/AdminSidebar.tsx
'use client'; // Çıkış yap butonu için 'use client' gerekli

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Ana Panel', href: '/admin' },
  { name: 'Projeleri Yönet', href: '/admin/projects' },
  { name: 'Videoları Yönet', href: '/admin/videos' },
  { name: 'Ekibi Yönet', href: '/admin/team' },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 p-4">
      <div className="flex h-full flex-col justify-between">
        <nav>
          <h2 className="mb-4 text-xl font-bold">Asosyal Yönetim</h2>
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          onClick={() => {
            // Tüm olası NextAuth session cookie'lerini sil
            document.cookie = 'next-auth.session-token=; Max-Age=0; path=/;';
            document.cookie = 'next-auth.session-token.localhost=; Max-Age=0; path=/;';
            document.cookie = '__Secure-next-auth.session-token=; Max-Age=0; path=/;';
            document.cookie = '__Host-next-auth.session-token=; Max-Age=0; path=/;';
            window.location.href = '/auth/login';
          }}
          className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;