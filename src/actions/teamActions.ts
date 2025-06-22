// Dosya Yolu: src/actions/teamActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Akıllı resim URL'si işleme fonksiyonu
function processImageUrl(url: string): string {
  if (url && !url.startsWith('http')) {
    let processedUrl = url.replace(/\\/g, '/');
    if (!processedUrl.startsWith('/')) {
      processedUrl = '/' + processedUrl;
    }
    return processedUrl;
  }
  return url;
}

export async function createTeamMember(prevState: { message: string }, formData: FormData) {
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const imageUrl = processImageUrl(formData.get('imageUrl') as string);
  // Sosyal medya linklerini de alalım (opsiyonel)
  const twitter = formData.get('twitter') as string;
  const instagram = formData.get('instagram') as string;
  const order = parseInt(formData.get('order') as string, 10) || 99;

  if (!name || !role || !imageUrl) {
    return { message: 'İsim, Rol ve Resim URL alanları zorunludur.' };
  }

  const socials = {
    ...(twitter && { twitter }),
    ...(instagram && { instagram }),
  };

  try {
    await prisma.teamMember.create({
      data: {
        name,
        role,
        imageUrl,
        socials: Object.keys(socials).length > 0 ? socials : undefined,
        order,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Veritabanına kayıt sırasında bir hata oluştu.' };
  }

  revalidatePath('/admin/team');
  revalidatePath('/'); // Anasayfayı da güncelle
  redirect('/admin/team');
}
export async function updateTeamMember(
  memberId: string,
  prevState: { message: string },
  formData: FormData
) {
  'use server';

  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const imageUrl = processImageUrl(formData.get('imageUrl') as string);
  const twitter = formData.get('twitter') as string;
  const instagram = formData.get('instagram') as string;
  const order = parseInt(formData.get('order') as string, 10) || 99;

  if (!name || !role || !imageUrl) {
    return { message: 'İsim, Rol ve Resim URL alanları zorunludur.' };
  }

  const socials = {
    ...(twitter && { twitter }),
    ...(instagram && { instagram }),
  };

  try {
    await prisma.teamMember.update({
      where: { id: memberId },
      data: {
        name,
        role,
        imageUrl,
        socials: Object.keys(socials).length > 0 ? socials : undefined,
        order,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Veritabanını güncellerken bir hata oluştu.' };
  }

  revalidatePath('/admin/team');
  revalidatePath('/');
  redirect('/admin/team');
}
export async function deleteTeamMember(memberId: string) {
  'use server';
  try {
    await prisma.teamMember.delete({
      where: { id: memberId },
    });
    revalidatePath('/admin/team');
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Ekip üyesi silinemedi.' };
  }
}
