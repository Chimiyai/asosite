// Dosya Yolu: src/app/admin/videos/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image'; // Thumbnail göstermek için
import DeleteVideoButton from '@/components/admin/DeleteVideoButton';
import { translateCategory } from '@/lib/utils';

// YouTube thumbnail URL'ini oluşturan yardımcı fonksiyon
const getYouTubeThumbnail = (youtubeId: string) => {
  return `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`;
};

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({
    orderBy: {
      publishedAt: 'desc',
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Videoları Yönet</h1>
        <Link
          href="/admin/videos/new"
          className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Yeni Video Ekle
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800">
        <table className="min-w-full text-left text-sm text-white">
          <thead className="bg-gray-700 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Thumbnail</th>
              <th scope="col" className="px-6 py-3">Video Başlığı</th>
              <th scope="col" className="px-6 py-3">Kategori</th>
              <th scope="col" className="px-6 py-3">YouTube ID</th>
              <th scope="col" className="px-6 py-3 text-right">Eylemler</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className="border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">
                  <Image
                    src={getYouTubeThumbnail(video.youtubeId)}
                    alt={video.title}
                    width={120}
                    height={90}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{video.title}</td>
                <td className="px-6 py-4">{translateCategory(video.category)}</td>
                <td className="px-6 py-4 font-mono text-xs">{video.youtubeId}</td>
                <td className="px-6 py-4 text-right">
  <Link href={`/admin/videos/${video.id}/edit`} className="font-medium text-blue-500 hover:underline">
    Düzenle
  </Link>
  <DeleteVideoButton videoId={video.id} />
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}