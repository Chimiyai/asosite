// Dosya Yolu: src/actions/projectActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteProject(projectId: string) {
  if (!projectId) {
    throw new Error('Proje ID\'si gerekli.');
  }

  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    // Proje listesini ve anasayfayı güncel tutmak için önbelleği temizle
    revalidatePath('/admin/projects');
    revalidatePath('/');
    
    return { success: true };

  } catch (error) {
    console.error('Proje silinirken hata oluştu:', error);
    return { success: false, message: 'Proje silinemedi.' };
  }
}