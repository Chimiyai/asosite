import { Status, Category } from '@prisma/client';

// Status (Proje Durumu) enum'unu Türkçeye çeviren nesne
const statusTranslations: Record<Status, string> = {
  UPCOMING: 'Gelecek Proje',
  IN_PROGRESS: 'Yapım Aşamasında',
  COMPLETED: 'Tamamlandı',
};

// Category (Video Kategorisi) enum'unu Türkçeye çeviren nesne
const categoryTranslations: Record<Category, string> = {
  NORMAL: 'Video',
  SHORT: 'Shorts',
  TRAILER: 'Fragman',
  BEHIND_THE_SCENES: 'Kamera Arkası',
};

// Verilen bir Status değerini alıp Türkçe karşılığını döndüren fonksiyon
export function translateStatus(status: Status): string {
  return statusTranslations[status] || status;
}

// Verilen bir Category değerini alıp Türkçe karşılığını döndüren fonksiyon
export function translateCategory(category: Category): string {
  return categoryTranslations[category] || category;
}