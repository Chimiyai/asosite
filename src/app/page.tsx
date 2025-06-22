import prisma from '@/lib/prisma'; // Prisma client'ımızı import ediyoruz

import type { Project, TeamMember, Video } from '@prisma/client';

// Component'lerimizi import ediyoruz
import InteractiveHero from '@/components/home/InteractiveHero';
import ProjectCard from '@/components/shared/ProjectCard'; // Bunu oluşturman gerekecek
import VideoCard from '@/components/shared/VideoCard'; // Bunu oluşturman gerekecek
import TeamMemberCard from '@/components/shared/TeamMemberCard';

// Sunucu tarafında çalışacak ve veritabanından tüm gerekli verileri tek seferde çekecek asenkron fonksiyon
async function getPageData() {
  // Tüm sorguları aynı anda başlatmak için Promise.all kullanıyoruz, bu daha performanslıdır.
  const [projects, videos, teamMembers] = await Promise.all([
    prisma.project.findMany({
      orderBy: {
        // Tamamlanmış projeleri yayın tarihine göre, gelecek projeleri oluşturulma tarihine göre sırala
        releaseDate: 'desc',
      },
    }),
    prisma.video.findMany({
      orderBy: {
        publishedAt: 'desc', // En yeni videolar en üstte
      },
    }),
    prisma.teamMember.findMany({
      orderBy: {
        order: 'asc', // 'name' yerine 'order' a göre sırala (asc = artan)
      },
    }),
  ]);
  return { projects, videos, teamMembers };
}

// Ana sayfa component'imiz (Bu bir Server Component'tir)
export default async function HomePage() {
  // Verileri çekiyoruz
  const { projects, videos, teamMembers } = await getPageData();

  // Projeleri durumlarına göre ayırıyoruz
  const completedProjects = projects.filter(p => p.status === 'COMPLETED');
  const upcomingProjects = projects.filter(p => p.status !== 'COMPLETED');

  return (
    // Ana layout'un içindeki <main> etiketinin altındayız, bu yüzden ekstra bir <div>'e gerek yok
    <>
      {/* 1. INTERACTIVE HERO BÖLÜMÜ */}
      {/* Bu bölüme en yeni projeleri ve videoları prop olarak gönderiyoruz */}
      <InteractiveHero 
        projects={upcomingProjects} 
        videos={videos.slice(0, 5)} // Hero'da göstermek için sadece ilk 5 videoyu alalım
      />

      {/* 2. TAMAMLANMIŞ PROJELER BÖLÜMÜ */}
      <section id="projects" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tamamlanan Projeler</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Hayata geçirdiğimiz ve gurur duyduğumuz dublaj projelerimiz.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. VİDEOLAR BÖLÜMÜ */}
      <section id="videos" className="py-24 sm:py-32 bg-gray-900/50 rounded-lg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">YouTube İçeriklerimiz</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Stüdyo maceralarımızdan kamera arkası görüntülerine kadar en son videolarımız.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EKİP BÖLÜMÜ */}
      <section id="team" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ekibimiz</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Bu stüdyonun arkasındaki yetenekli ve tutkulu sesler.
            </p>
          </div>
          <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}