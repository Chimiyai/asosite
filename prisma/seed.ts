// prisma/seed.ts
import { PrismaClient, Status, Category } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  // Önceki verileri temizle
  await prisma.teamMember.deleteMany();
  await prisma.video.deleteMany();
  await prisma.project.deleteMany();

  // Ekip Üyeleri
  await prisma.teamMember.create({
    data: {
      name: 'Ekip Kaptanı',
      role: 'Proje Yöneticisi & Seslendirme Sanatçısı',
      imageUrl: '/images/team/kaptan.jpg', // resimleri public/images altına koyacağız
    },
  });

  // Projeler
  await prisma.project.create({
    data: {
      title: 'Gelecek Gizli Proje',
      description: 'Çok yakında duyurulacak heyecan verici bir dublaj projesi.',
      coverImage: '/images/projects/gizli-proje.jpg',
      status: Status.UPCOMING,
    },
  });
  await prisma.project.create({
    data: {
      title: 'Cyberpunk 2077 Türkçe Dublaj',
      description: 'Night City\'nin neon ışıkları altında geçen bu macerayı ana dilinde deneyimle.',
      coverImage: '/images/projects/cyberpunk.jpg',
      status: Status.COMPLETED,
      releaseDate: new Date('2023-10-05'),
    },
  });

  // Videolar
  await prisma.video.create({
    data: {
      title: 'İlk Stüdyo Vlogumuz!',
      youtubeId: 'dQw4w9WgXcQ', // Örnek bir video ID'si
      category: Category.NORMAL,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });