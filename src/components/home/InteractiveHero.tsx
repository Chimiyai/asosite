// src/components/home/InteractiveHero.tsx
'use client';

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
      <div className="absolute left-0 top-0 h-full w-1/2 cursor-pointer" onClick={() => setView(view === 'projects' ? 'center' : 'projects')}></div>
      <div className="absolute right-0 top-0 h-full w-1/2 cursor-pointer" onClick={() => setView(view === 'videos' ? 'center' : 'videos')}></div>

      {/* -- Projeler Paneli -- */}
      <div className={`absolute left-0 top-0 h-full w-3/4 max-w-2xl bg-gray-950/80 backdrop-blur-sm p-8 transition-all duration-700 ease-in-out overflow-y-auto ${view === 'projects' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
        <h2 className="text-3xl font-bold text-white mb-6">Gelecek Projeler</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="text-gray-300 hover:text-white transition-colors">
                <p className="font-bold">{project.title}</p>
                <p className="text-sm text-gray-400">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* -- Videolar Paneli -- */}
      <div className={`absolute right-0 top-0 h-full w-3/4 max-w-2xl bg-gray-950/80 backdrop-blur-sm p-8 transition-all duration-700 ease-in-out overflow-y-auto ${view === 'videos' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <h2 className="text-3xl font-bold text-white mb-6">Son Videolar</h2>
        <ul className="space-y-4">
          {videos.map((video) => (
            <li key={video.id}>
              <Link href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                {video.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* -- Merkezdeki Logo ve Mikrofon -- */}
      <div className={`relative z-10 flex flex-col items-center ${logoContainerClasses}`}>
        <Image
          src="/logo.png"
          alt="Asoyal Studios Logo"
          // Boyutları artırıyoruz
          width={280} // Örn: 200'den 280'e
          height={280} // Örn: 200'den 280'e
          priority
          className="drop-shadow-lg" // Logoya hafif bir gölge ekleyerek daha belirgin hale getirelim
        />
        <Image
          src="/microphone.svg"
          alt="Mikrofon"
          // Boyutları artırıyoruz
          width={250} // Örn: 100'den 150'ye
          height={250} // Örn: 100'den 150'ye
          // Negatif margin ile yukarı çekiyoruz ve animasyon sınıflarını ekliyoruz
          className={`-mt-40 drop-shadow-md ${microphoneClasses}`} // -mt-12 mikrofonu 3rem (48px) yukarı taşır
        />
      </div>
    </section>
  );
}