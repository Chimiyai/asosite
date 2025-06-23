'use server';

import { signIn } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // signIn fonksiyonunu doğrudan çağırıyoruz.
    // Başarılı olursa, middleware bizi otomatik olarak yönlendirecek.
    await signIn('credentials', formData);
  } catch (error) {
    // signIn fonksiyonu, kimlik bilgileri yanlışsa bir hata fırlatır.
    if (error instanceof Error) {
      switch (error.message) {
        case 'CredentialsSignin':
          return 'Kullanıcı adı veya şifre yanlış.';
        default:
          return 'Bir şeyler ters gitti.';
      }
    }
    // Hata bir Error değilse, tekrar fırlat.
    throw error;
  }
}