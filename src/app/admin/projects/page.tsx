// src/app/admin/projects/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton'; // Yeni component'i import et
import { translateStatus } from '@/lib/utils';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projeleri Yönet</h1>
        <Link 
          href="/admin/projects/new" 
          className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Yeni Proje Ekle
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800">
        <table className="min-w-full text-left text-sm text-white">
          <thead className="bg-gray-700 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Proje Adı</th>
              <th scope="col" className="px-6 py-3">Durum</th>
              <th scope="col" className="px-6 py-3">Yayın Tarihi</th>
              <th scope="col" className="px-6 py-3 text-right">Eylemler</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4 font-medium">{project.title}</td>
                <td className="px-6 py-4">{translateStatus(project.status)}</td>
                <td className="px-6 py-4">
                  {project.releaseDate 
                    ? new Date(project.releaseDate).toLocaleDateString('tr-TR') 
                    : 'Belirtilmemiş'}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/projects/${project.id}/edit`} className="font-medium text-blue-500 hover:underline">
                    Düzenle
                  </Link>
                  {/* ESKİ SİL LİNKİNİ YENİ COMPONENT İLE DEĞİŞTİRİYORUZ */}
                  <DeleteProjectButton projectId={project.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}