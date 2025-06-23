'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions/authActions'; // Birazdan oluşturacağımız yeni action

// Form gönderilirken butonu yöneten component
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500"
    >
      {pending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
    </button>
  );
}

export default function LoginPage() {
  // `authenticate` action'ını useFormState (yeni adıyla useActionState) ile kullanıyoruz.
  // Bu, action'dan dönebilecek hata mesajlarını yakalamamızı sağlar.
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Asoyal Studios - Admin Paneli
        </h1>
        {/* Formun action'ı artık bizim sarmalayıcı fonksiyonumuz olacak */}
        <form action={dispatch} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Kullanıcı Adı
              </label>
              <input
                id="username"
                type="text"
                name="username" // `name` attribute'ü Server Action için zorunludur
                required
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                name="password" // `name` attribute'ü Server Action için zorunludur
                required
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>
          <LoginButton />
          {errorMessage && (
            <div className="flex items-center justify-center">
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}