import Link from 'next/link';
// react-icons kütüphanesinden, Simple Icons (si) setini import ediyoruz
import { SiInstagram, SiYoutube, SiTiktok, SiDiscord } from 'react-icons/si';

// Sosyal medya linklerini tek bir yerde yönetmek için nesnemiz aynı kalıyor.
const socialLinks = {
  instagram: 'https://www.instagram.com/asosyal_studios/',
  youtube: 'https://www.youtube.com/@TheAsosyalStudios',
  tiktok: 'https://www.tiktok.com/@theasosyalstudios',
  discord: 'https://discord.gg/KN8Xc2QDyS',
};


export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link href="#home" className="text-xl font-bold text-white">
            Asoyal Studios
          </Link>
          <p className="max-w-md mx-auto mt-4 text-gray-400">
            Profesyonel dublaj sanatçılarından oluşan bir topluluk.
          </p>
          
          {/* Sosyal Medya İkonları */}
          <div className="mt-8 flex justify-center space-x-6">
            {/* Instagram */}
            <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 transition-colors duration-300 hover:text-pink-500">
              <SiInstagram size={24} />
            </Link>
            {/* YouTube */}
            <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 transition-colors duration-300 hover:text-red-600">
              <SiYoutube size={24} />
            </Link>
            {/* TikTok */}
            <Link href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 transition-colors duration-300 hover:text-white">
              <SiTiktok size={24} />
            </Link>
            {/* Discord */}
            <Link href={socialLinks.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-gray-400 transition-colors duration-300 hover:text-indigo-500">
              <SiDiscord size={24} />
            </Link>
          </div>
        </div>

        <hr className="my-8 h-px border-none bg-gray-700" />

        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} Asoyal Studios. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            <span><a
              href="https://guns.lol/chimiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
            >
              Chimiya
            </a> tarafından geliştirildi</span>
            
          </p>
        </div>
      </div>
    </footer>
  );
}