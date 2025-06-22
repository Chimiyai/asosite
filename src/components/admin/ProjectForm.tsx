// src/components/admin/ProjectForm.tsx
'use client';

import { Status } from '@prisma/client';
// HOOK'U TEKRAR REACT-DOM'DAN ALIYORUZ
import { useFormState, useFormStatus } from 'react-dom';
import { translateStatus } from '@/lib/utils';

// Server Action'dan dönebilecek durumlar için tip tanımı
type FormState = {
  message: string;
};

// Formun alacağı propların tip tanımını GÜNCELLİYORUZ
type ProjectFormProps = {
  // formAction artık iki parametre alacak: önceki durum ve form verileri
  formAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialData?: {
    title: string;
    description: string;
    coverImage: string;
    status: Status;
    releaseDate: Date | null;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500"
    >
      {pending ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
    </button>
  );
}

export default function ProjectForm({ formAction, initialData }: ProjectFormProps) {
  // Hook'u 'useFormState' olarak kullanıyoruz
  const [state, action] = useFormState(formAction, { message: '' });

  return (
    <form action={action} className="space-y-6 rounded-lg bg-gray-800 p-8">
      {/* Hata mesajını göstermek için bir alan ekliyoruz */}
      {state.message && <p className="text-red-500">{state.message}</p>}
      {/* Proje Adı */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">Proje Adı</label>
        <input type="text" id="title" name="title" required defaultValue={initialData?.title} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>

      {/* Açıklama */}
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">Açıklama</label>
        <textarea id="description" name="description" rows={4} required defaultValue={initialData?.description} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>

      {/* Kapak Fotoğrafı URL'si */}
      <div>
        <label htmlFor="coverImage" className="mb-2 block text-sm font-medium">Kapak Fotoğrafı URL si</label>
        <input type="text" id="coverImage" name="coverImage" required defaultValue={initialData?.coverImage} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" placeholder="/images/projects/proje-adi.jpg" />
      </div>

      {/* Durum (Status) */}
      <div>
        <label htmlFor="status" className="mb-2 block text-sm font-medium">Durum</label>
        <select id="status" name="status" required defaultValue={initialData?.status} className="w-full rounded-md border-gray-600 bg-gray-700 p-2">
          {Object.values(Status).map((s) => (<option key={s} value={s}>{translateStatus(s)}</option>))}
        </select>
      </div>

      {/* Yayın Tarihi */}
      <div>
        <label htmlFor="releaseDate" className="mb-2 block text-sm font-medium">Yayın Tarihi (Opsiyonel)</label>
        <input type="date" id="releaseDate" name="releaseDate" defaultValue={initialData?.releaseDate ? initialData.releaseDate.toISOString().split('T')[0] : ''} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>
      
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}