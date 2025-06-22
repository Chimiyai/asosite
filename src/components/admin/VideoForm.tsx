// Dosya Yolu: src/components/admin/VideoForm.tsx
'use client';

import { Category } from '@prisma/client';
// HOOK'U KARARLI OLAN 'useFormState' OLARAK GÜNCELLİYORUZ
import { useFormState, useFormStatus } from 'react-dom';
import { translateCategory } from '@/lib/utils';

type FormState = { message: string };

type VideoFormProps = {
  // İmzanın useFormState ile uyumlu olduğundan emin oluyoruz
  formAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialData?: {
    title: string;
    youtubeUrlOrId: string;
    category: Category;
    description: string;
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
      {pending ? 'Kaydediliyor...' : 'Videoyu Kaydet'}
    </button>
  );
}

export default function VideoForm({ formAction, initialData }: VideoFormProps) {
  // HOOK'U 'useFormState' OLARAK KULLANIYORUZ
  const [state, action] = useFormState(formAction, { message: '' });

  return (
    <form action={action} className="space-y-6 rounded-lg bg-gray-800 p-8">
      {state.message && <p className="text-red-500">{state.message}</p>}
      {/* ... formun geri kalanı stilleriyle birlikte ... */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">Video Başlığı</label>
        <input type="text" id="title" name="title" required defaultValue={initialData?.title} className="w-full rounded-md border-gray-600 bg-gray-700 p-2"/>
      </div>
      <div>
        <label htmlFor="youtubeUrlOrId" className="mb-2 block text-sm font-medium">YouTube URL veya ID</label>
        <input type="text" id="youtubeUrlOrId" name="youtubeUrlOrId" required defaultValue={initialData?.youtubeUrlOrId} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" placeholder="https://www.youtube.com/watch?v=... veya sadece ID"/>
      </div>
      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium">Kategori</label>
        <select id="category" name="category" required defaultValue={initialData?.category} className="w-full rounded-md border-gray-600 bg-gray-700 p-2">
          {Object.values(Category).map((c) => (
            <option key={c} value={c}>
              {translateCategory(c)} 
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">Açıklama (Opsiyonel)</label>
        <textarea id="description" name="description" rows={3} defaultValue={initialData?.description} className="w-full rounded-md border-gray-600 bg-gray-700 p-2"></textarea>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}