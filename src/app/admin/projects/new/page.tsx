// Dosya yolu: src/app/admin/projects/new/page.tsx

import ProjectForm from '@/components/admin/ProjectForm';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Bu fonksiyon sunucuda çalışacak bir "Server Action"dır.
// Formdan gelen verileri alıp veritabanına kaydeder.
async function createProject(
  previousState: { message: string },
  formData: FormData
) {
  'use server';

  let coverImage = formData.get('coverImage') as string;
  // --- GÜNCELLENMİŞ AKILLI KOD ---
  if (coverImage && !coverImage.startsWith('http')) {
    // Eğer 'http' ile başlamıyorsa, bu yerel bir yoldur.
    coverImage = coverImage.replace(/\\/g, '/'); // Ters eğik çizgileri düzelt
    if (!coverImage.startsWith('/')) {
      coverImage = '/' + coverImage; // Başında / yoksa ekle
    }
  }
  // Eğer 'http' ile başlıyorsa, HİÇBİR ŞEY YAPMA.
  // --- GÜNCELLEME SONU ---

  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    coverImage: coverImage,
    status: formData.get('status') as 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED',
    releaseDate: formData.get('releaseDate') ? new Date(formData.get('releaseDate') as string) : null,
  };
  
  // Burada hata yönetimi de ekleyebiliriz (opsiyonel ama iyi bir pratik)
  if (!data.title || !data.description) {
    // Form component'inde gösterilecek hata mesajını döndür
    return { message: 'Lütfen başlık ve açıklama alanlarını doldurun.' };
  }

  try {
    // Veritabanına yeni projeyi oluştur. (Bu kısmı try-catch içine alalım)
    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        coverImage: data.coverImage,
        status: data.status,
        releaseDate: data.releaseDate,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Veritabanına kayıt sırasında bir hata oluştu.' };
  }
  
  revalidatePath('/');
  // Önbelleği Temizle
  revalidatePath('/admin/projects');

  // Yönlendir
  redirect('/admin/projects');
}


export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Yeni Proje Oluştur</h1>
      <ProjectForm formAction={createProject} />
    </div>
  );
}
