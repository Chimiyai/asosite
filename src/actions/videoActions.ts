// Dosya Yolu: src/actions/videoActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Category } from '@prisma/client';


export async function createVideo(prevState: { message: string }, formData: FormData) {
  const title = formData.get('title') as string;
  const youtubeUrlOrId = formData.get('youtubeUrlOrId') as string;
  const category = formData.get('category') as Category;
  const description = formData.get('description') as string | null;
  
  const youtubeId = extractYouTubeId(youtubeUrlOrId);

  if (!title || !youtubeUrlOrId || !category) {
    return { message: 'Lütfen tüm zorunlu alanları doldurun.' };
  }
  
  if (!youtubeId) {
    return { message: 'Geçersiz YouTube URL veya ID. Lütfen kontrol edin.' };
  }

  try {
    await prisma.video.create({
      data: {
        title,
        youtubeId,
        category,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: 'Veritabanına kayıt sırasında bir hata oluştu.' };
  }

  revalidatePath('/admin/videos');
  revalidatePath('/'); // Anasayfayı da güncelle
  redirect('/admin/videos');
}

// YouTube URL'sinden video ID'sini çıkaran bir fonksiyon
function extractYouTubeId(url: string): string | null {

    // Eğer giriş boşsa veya string değilse, baştan null döndür.
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const urlObj = new URL(url);
    // Standart link (youtube.com/watch?v=...)
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      return urlObj.searchParams.get('v');
    }
    // Kısa link (youtu.be/...)
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    // Shorts linki (youtube.com/shorts/...)
    if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname.startsWith('/shorts/')) {
        return urlObj.pathname.split('/shorts/')[1];
    }
    return null;
  } catch (e) {
    // Hatayı konsola yazdırarak 'e' değişkenini kullanmış oluruz.
    // console.error('URL parse error, falling back to ID check:', e); // Detaylı log
    // veya sadece
    console.error(e); 

    if (url.length === 11 && !url.includes(' ')) {
      return url;
    }
    return null;
  }
}


export async function updateVideo(
  videoId: string,
  prevState: { message: string },
  formData: FormData
) {
  'use server';
  
  const title = formData.get('title') as string;
  const youtubeUrlOrId = formData.get('youtubeUrlOrId') as string;
  const category = formData.get('category') as Category;
  const description = formData.get('description') as string | null;
  
  const youtubeId = extractYouTubeId(youtubeUrlOrId);

  if (!title || !youtubeUrlOrId || !category) {
    return { message: 'Lütfen tüm zorunlu alanları doldurun.' };
  }
  
  if (!youtubeId) {
    return { message: 'Geçersiz YouTube URL veya ID. Lütfen kontrol edin.' };
  }

  try {
    await prisma.video.update({
      where: { id: videoId },
      data: {
        title,
        youtubeId,
        category,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: 'Veritabanını güncellerken bir hata oluştu.' };
  }

  revalidatePath('/admin/videos');
  revalidatePath('/');
  redirect('/admin/videos');
}

export async function deleteVideo(videoId: string) {
  'use server';
  try {
    await prisma.video.delete({
      where: { id: videoId },
    });
    revalidatePath('/admin/videos');
    revalidatePath('/');
    return { success: true };
  } catch (e) { // 'error' yerine 'e' gibi kısa bir isim kullanabiliriz
    console.error("Video güncelleme hatası:", e); // Hatayı konsola yazdırarak değişkeni kullanmış oluruz.
    return { message: 'Veritabanını güncellerken bir hata oluştu.' };
  }
}
