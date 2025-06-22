import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { updateVideo } from '@/actions/videoActions';
import VideoForm from '@/components/admin/VideoForm'; // Formu yeniden kullanacağız

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const video = await prisma.video.findUnique({
    where: { id: params.id },
  });

  if (!video) {
    notFound();
  }

  // Server action'ı video ID'si ile bağlama
  const updateVideoWithId = updateVideo.bind(null, video.id);

  // VideoForm'a göndermek için `initialData` oluştur
  const initialData = {
    title: video.title,
    // Formda YouTube ID'sini göstermek daha kullanıcı dostu
    youtubeUrlOrId: video.youtubeId,
    category: video.category,
    description: video.description ?? '',
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Videoyu Düzenle</h1>
      <VideoForm
        formAction={updateVideoWithId}
        initialData={initialData}
      />
    </div>
  );
}