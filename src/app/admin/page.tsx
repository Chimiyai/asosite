import prisma from '@/lib/prisma';
import Link from 'next/link';

// Sunucu tarafında veritabanından istatistikleri çeken fonksiyon
async function getDashboardStats() {
  // Tüm sayım işlemlerini aynı anda başlatıp bekleyerek performansı artırıyoruz
  const [projectCount, videoCount, teamMemberCount] = await Promise.all([
    prisma.project.count(),
    prisma.video.count(),
    prisma.teamMember.count(),
  ]);

  return { projectCount, videoCount, teamMemberCount };
}

// İstatistik kartları için bir component
function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-gray-500">{icon}</div>
      </div>
    </div>
  );
}

// Yönetim linkleri için bir component
function ManagementCard({ title, description, href }: { title: string; description: string; href: string }) {
    return (
        <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-400">{description}</p>
            <Link href={href} className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                Yönet →
            </Link>
        </div>
    );
}


export default async function AdminDashboardPage() {
  const { projectCount, videoCount, teamMemberCount } = await getDashboardStats();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Admin Paneline Hoş Geldiniz!</h1>
        <p className="mt-2 text-gray-400">
          Aşağıda site içeriğinin genel bir özetini bulabilir ve yönetim panellerine hızlıca erişebilirsiniz.
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Toplam Proje"
          value={projectCount}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          }
        />
        <StatCard
          title="Toplam Video"
          value={videoCount}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          }
        />
        <StatCard
          title="Ekip Üyesi"
          value={teamMemberCount}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          }
        />
      </div>

      {/* Hızlı Erişim Kartları */}
      <div>
        <h2 className="text-2xl font-semibold">Yönetim Panelleri</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ManagementCard 
                title="Projeleri Yönet"
                description="Yeni dublaj projeleri ekleyin, mevcutları düzenleyin veya silin."
                href="/admin/projects"
            />
            <ManagementCard 
                title="Videoları Yönet"
                description="YouTube içeriklerinizi yönetin, yeni videolar ekleyin."
                href="/admin/videos"
            />
            <ManagementCard 
                title="Ekip Üyelerini Yönet"
                description="asosyal Studios ekibine yeni üyeler ekleyin ve sıralamayı düzenleyin."
                href="/admin/team"
            />
        </div>
      </div>
    </div>
  );
}