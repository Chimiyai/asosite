// Dosya Yolu: src/app/admin/videos/new/page.tsx
import VideoForm from '@/components/admin/VideoForm';
import { createVideo } from '@/actions/videoActions';

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Yeni Video Ekle</h1>
      <VideoForm formAction={createVideo} />
    </div>
  );
}