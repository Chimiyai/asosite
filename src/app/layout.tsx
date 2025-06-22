// src/app/layout.tsx (içeriğini düzenle)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header'; // Doğru yolu belirttiğinden emin ol
import Footer from '@/components/layout/Footer'; // Doğru yolu belirttiğinden emin ol

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asoyal Studios',
  description: 'Profesyonel oyun dublaj stüdyosu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-gray-950 text-gray-100`}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}