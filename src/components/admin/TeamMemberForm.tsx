// Dosya Yolu: src/components/admin/TeamMemberForm.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';

type FormState = { message: string };
type TeamMemberFormProps = {
  formAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialData?: {
    name: string;
    role: string;
    imageUrl: string;
    socials?: { [key: string]: string } | null;
    order?: number;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500">{pending ? 'Kaydediliyor...' : 'Üyeyi Kaydet'}</button>; // Stilleri kopyala
}

export default function TeamMemberForm({ formAction, initialData }: TeamMemberFormProps) {
  const [state, action] = useFormState(formAction, { message: '' });

  return (
    <form action={action} className="space-y-6 rounded-lg bg-gray-800 p-8">
      {state.message && <p className="text-red-500">{state.message}</p>}
      
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">İsim</label>
        <input type="text" id="name" name="name" required defaultValue={initialData?.name} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>

      <div>
        <label htmlFor="role" className="mb-2 block text-sm font-medium">Rol</label>
        <input type="text" id="role" name="role" required defaultValue={initialData?.role} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>

      <div>
        <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">Profil Fotoğrafı URL si</label>
        <input type="text" id="imageUrl" name="imageUrl" required defaultValue={initialData?.imageUrl} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>
      <div>
        <label htmlFor="order" className="mb-2 block text-sm font-medium">Sıralama Numarası</label>
        <input 
          type="number" 
          id="order" 
          name="order" 
          defaultValue={initialData?.order ?? 99} // Başlangıç değeri
          className="w-full rounded-md border-gray-600 bg-gray-700 p-2"
          placeholder="Düşük numara daha önce görünür"
        />
      </div>

      <h3 className="border-t border-gray-700 pt-6 text-lg font-semibold">Sosyal Medya (Opsiyonel)</h3>
      
      <div>
        <label htmlFor="twitter" className="mb-2 block text-sm font-medium">Twitter URL</label>
        <input type="url" id="twitter" name="twitter" defaultValue={initialData?.socials?.twitter} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>
      
      <div>
        <label htmlFor="instagram" className="mb-2 block text-sm font-medium">Instagram URL</label>
        <input type="url" id="instagram" name="instagram" defaultValue={initialData?.socials?.instagram} className="w-full rounded-md border-gray-600 bg-gray-700 p-2" />
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}