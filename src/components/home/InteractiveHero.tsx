// src/components/home/InteractiveHero.tsx
'use client';

import { translateCategory } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Prisma tiplerini import et
import type { Project, Video } from '@prisma/client';

// Component'in alacağı propları tanımla
type InteractiveHeroProps = {
  projects: Project[];
  videos: Video[];
};

export default function InteractiveHero({ projects, videos }: InteractiveHeroProps) {
  const [view, setView] = useState<'center' | 'projects' | 'videos'>('center');

  // Animasyonlar için Tailwind sınıflarını dinamik olarak ayarlayacağız
  const logoContainerClasses = `transition-all duration-700 ease-in-out ${view === 'projects' ? 'translate-x-[50%]' : ''} ${view === 'videos' ? '-translate-x-[50%]' : ''}`;
  const microphoneClasses = `transition-all duration-700 ease-in-out ${view === 'projects' ? '-rotate-12' : ''} ${view === 'videos' ? 'rotate-12' : ''}`;

  return (
    // Ekrani kaplayan bir hero alani
    <section id="home" className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Tıklama Alanı */}
      <div className="absolute left-0 top-0 h-full w-1/2 cursor-pointer group" onClick={() => setView(view === 'projects' ? 'center' : 'projects')}>
        {view === 'center' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-start text-white/80 pointer-events-none select-none">
            <span className="text-4xl animate-bounce">⟶</span>
            <span className="mt-2 bg-black/60 rounded px-2 py-1 text-sm">Gelecek Projeleri Gör</span>
          </div>
        )}
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2 cursor-pointer group" onClick={() => setView(view === 'videos' ? 'center' : 'videos')}>
        {view === 'center' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end text-white/80 pointer-events-none select-none">
            <span className="text-4xl animate-bounce">⟵</span>
            <span className="mt-2 bg-black/60 rounded px-2 py-1 text-sm">Videoları Gör</span>
          </div>
        )}
      </div>

      {/* -- Projeler Paneli -- */}
      <div className={`absolute left-0 top-0 h-full w-3/4 max-w-2xl bg-gray-950/80 backdrop-blur-sm p-8 transition-all duration-700 ease-in-out overflow-y-auto ${view === 'projects' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
        <h2 className="mb-6 text-3xl font-bold text-white">Gelecek Projeler</h2>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="flex items-start gap-4">
              <Image 
                src={project.coverImage} 
                alt={project.title} 
                width={160} 
                height={90} 
                className="h-[90px] w-[160px] flex-shrink-0 rounded-md object-cover" 
              />
              <div>
                <h3 className="font-bold text-white">{project.title}</h3>
                {/* YAYIN TARİHİ EKLEME BÖLÜMÜ */}
                {project.releaseDate && (
                  <time 
                    dateTime={project.releaseDate.toISOString()} 
                    className="mt-1 block text-xs font-semibold text-sky-400"
                  >
                    Yayın Tarihi: {new Date(project.releaseDate).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                <p className={`text-sm text-gray-300 line-clamp-2 ${project.releaseDate ? 'mt-1' : 'mt-2'}`}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -- Videolar Paneli (GÜNCELLENMİŞ) -- */}
      <div className={`absolute right-0 top-0 h-full w-3/4 max-w-2xl bg-gray-950/80 backdrop-blur-sm p-8 transition-all duration-700 ease-in-out overflow-y-auto ${view === 'videos' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <h2 className="mb-6 text-3xl font-bold text-white">Son Videolar</h2>
        <div className="space-y-6">
          {videos.map((video) => (
            <Link key={video.id} href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 transition-opacity hover:opacity-80">
              <Image 
                src={`https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                alt={video.title} 
                width={160} 
                height={90} 
                className="h-[90px] w-[160px] flex-shrink-0 rounded-md object-cover" 
              />
              <div>
                <h3 className="font-bold text-white">{video.title}</h3>
                <p className="text-sm text-gray-400">{translateCategory(video.category)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* -- Merkezdeki Logo ve Mikrofon -- */}
      <div className={`relative z-10 flex flex-col items-center ${logoContainerClasses}`}>
        <Image
          src="/logo.png"
          alt="Asosyal Studios Logo"
          // Boyutları artırıyoruz
          width={400} // Örn: 200'den 280'e
          height={400} // Örn: 200'den 280'e
          priority
          className="drop-shadow-lg" // Logoya hafif bir gölge ekleyerek daha belirgin hale getirelim
        />
        <Image
          src="/microphone.png" // Yeni PNG dosyamızın yolu
          alt="Mikrofon"
          width={300}
          height={300}
          className={`-mt-52 drop-shadow-md ${microphoneClasses} brightness-0 invert`}
        />
      </div>
    </section>
  );
}