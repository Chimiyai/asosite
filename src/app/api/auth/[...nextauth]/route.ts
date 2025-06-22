import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        // .env dosyasındaki admin kullanıcı adı ve şifresini kontrol ediyoruz.
        // Bu bilgiler yoksa veya yanlışsa giriş başarısız olacak.
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Kullanıcı doğruysa, kullanıcı objesini döndürüyoruz.
          return { id: "1", name: "Admin", email: "admin@asoyal.com" };
        }
        // Kimlik bilgileri yanlışsa null döndürerek girişi engelliyoruz.
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login', // Giriş yapma sayfamız bu olacak
    error: '/admin/login', // Hata durumunda da login sayfasına yönlendir
  },
  session: {
    strategy: 'jwt', // Oturum yönetimi için JWT kullanacağız
  },
  secret: process.env.NEXTAUTH_SECRET, // .env dosyasından secret'ı al
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };