// src/components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    // sticky: sayfa kaydırılınca yukarıya yapışır
    // top-0: en tepeye yapışır
    // z-50: diğer elemanların üzerinde kalmasını sağlar
    // backdrop-blur-sm: hafif bir arkaplan bulanıklığı efekti (şık durur)
    <header className="sticky top-0 z-50 w-full bg-gray-950/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/logo.png" // public klasöründeki dosya yolu
            alt="Asoyal Studios Logo"
            width={40}
            height={40}
            className="rounded-full" // Eğer logo kare ise ve dairesel göstermek istersen
          />
          <span className="hidden sm:inline-block font-bold text-lg">
            Asoyal Studios
          </span>
        </Link>

        {/* Navigasyon Linkleri */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="#projects" className="transition-colors hover:text-white">
            Projeler
          </Link>
          <Link href="#videos" className="transition-colors hover:text-white">
            Videolar
          </Link>
          <Link href="#team" className="transition-colors hover:text-white">
            Ekip
          </Link>
        </nav>
      </div>
    </header>
  );
}