import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@prisma/client';

// YouTube thumbnail URL'ini oluşturmak için bir yardımcı fonksiyon
const getYouTubeThumbnail = (youtubeId: string) => {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
};

export default function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = getYouTubeThumbnail(video.youtubeId);
  const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <article className="flex flex-col items-start">
      <Link href={videoUrl} target="_blank" rel="noopener noreferrer" className="w-full">
        <div className="relative w-full overflow-hidden rounded-2xl bg-gray-800 group">
          <Image
            src={thumbnailUrl}
            alt={video.title}
            width={1280}
            height={720}
            className="aspect-video w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          {/* Oynat ikonu */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/70 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex items-center gap-x-4 text-xs">
          <span className="relative z-10 rounded-full bg-blue-500 px-3 py-1.5 font-medium text-white">
            {video.category}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
          <Link href={videoUrl} target="_blank" rel="noopener noreferrer">
            {video.title}
          </Link>
        </h3>
        {video.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
            {video.description}
          </p>
        )}
      </div>
    </article>
  );
}