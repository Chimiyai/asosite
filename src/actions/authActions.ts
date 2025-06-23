'use server';

import { signIn } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  // Her zaman undefined döndür, hata mesajı göstermeyeceğiz
  await signIn('credentials', {
    username: formData.get('username'),
    password: formData.get('password'),
    redirect: false,
  });
  return undefined;
}