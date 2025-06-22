// Dosya Yolu: src/app/admin/projects/[id]/edit/page.tsx

import ProjectForm from '@/components/admin/ProjectForm';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

// Server Action: Projeyi güncelle
async function updateProject(
  projectId: string,
  previousState: { message: string },
  formData: FormData
) {
  'use server';

  let coverImage = formData.get('coverImage') as string;
  // --- GÜNCELLENMİŞ AKILLI KOD (AYNISINI BURAYA DA KOYUYORUZ) ---
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

  if (!data.title || !data.description) {
    return { message: 'Lütfen başlık ve açıklama alanlarını doldurun.' };
  }

  try {
    // Veritabanındaki projeyi güncelle
    await prisma.project.update({
      where: {
        id: projectId, // ID'ye göre doğru projeyi bul
      },
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
    return { message: 'Veritabanını güncellerken bir hata oluştu.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}


// Düzenleme sayfası component'i
export default async function EditProjectPage({ params }: { params: { id: string } }) {
  // URL'den gelen proje ID'sini al
  const projectId = params.id;
  
  // ID'ye göre veritabanından proje bilgilerini çek
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  // Eğer proje bulunamazsa, 404 Not Found sayfası göster
  if (!project) {
    notFound();
  }

  // Server Action'ı proje ID'si ile "bağlama" (binding)
  // Bu, updateProject fonksiyonuna projectId'yi otomatik olarak ilk parametre olarak gönderir.
  const updateProjectWithId = updateProject.bind(null, projectId);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Projeyi Düzenle</h1>
      <ProjectForm
        formAction={updateProjectWithId}
        initialData={project} // Çektiğimiz proje verilerini forma başlangıç verisi olarak yolluyoruz
      />
    </div>
  );
}