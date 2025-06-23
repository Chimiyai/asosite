Asoyal Studios - Resmi Web Sitesi
Bu depo, Asoyal Studios'un resmi web sitesinin kaynak kodlarını içermektedir. Site, stüdyonun dublaj projelerini, videolarını ve ekip üyelerini sergilemek amacıyla geliştirilmiştir.
✨ Özellikler
Dinamik Anasayfa: Ziyaretçileri interaktif bir animasyon ile karşılayan, projeleri ve videoları dinamik olarak gösteren bir karşılama ekranı.
Proje Vitrini: Tamamlanmış ve gelecek dublaj projelerinin listelendiği bölüm.
Video Galerisi: YouTube'dan normal ve shorts formatındaki videoların kategorize edilerek gösterildiği alan.
Ekip Tanıtımı: Stüdyo ekibinin üyelerinin ve rollerinin tanıtıldığı bölüm.
Tam Fonksiyonel Admin Paneli:
Güvenli giriş sistemi.
Projeler, videolar ve ekip üyeleri için tam CRUD (Oluştur, Oku, Güncelle, Sil) işlemleri.
Ekip üyeleri için sürükle-bırak benzeri sıralama özelliği.
🛠️ Kullanılan Teknolojiler
Bu proje, modern ve performans odaklı bir web deneyimi sunmak için aşağıdaki teknolojilerle inşa edilmiştir:
Framework: Next.js (App Router ile)
UI Kütüphanesi: React
Dil: TypeScript
Stil: Tailwind CSS
Veritabanı: PostgreSQL
ORM: Prisma
Kimlik Doğrulama (Authentication): NextAuth.js (Auth.js)
Hosting / Deploy: Vercel
🚀 Projeyi Yerel Ortamda Çalıştırma
Projeyi kendi bilgisayarınızda kurmak ve çalıştırmak için aşağıdaki adımları izleyin.
Ön Koşullar
Node.js (v18 veya üstü)
npm (veya yarn/pnpm)
Docker (PostgreSQL veritabanı için)
Kurulum
Depoyu Klonlayın:
Generated bash
git clone https://github.com/KULLANICI_ADINIZ/PROJE_ADINIZ.git
cd PROJE_ADINIZ
Use code with caution.
Bash
Bağımlılıkları Yükleyin:
Generated bash
npm install
Use code with caution.
Bash
Çevre Değişkenlerini Ayarlayın:
Projenin ana dizininde .env.local adında bir dosya oluşturun ve .env.example (eğer varsa) dosyasını kopyalayarak veya aşağıdaki şablonu kullanarak doldurun.
Generated env
# PostgreSQL veritabanı bağlantı adresi (Docker için)
DATABASE_URL="postgresql://asosyal_user:mysecretpassword@localhost:5432/asosyalsite"

# NextAuth için gizli anahtar
# Üretmek için: openssl rand -base64 32
NEXTAUTH_SECRET="BURAYA_GIZLI_ANAHTARINIZI_YAPISTIRIN"
NEXTAUTH_URL="http://localhost:3000"

# Admin paneli giriş bilgileri
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="guclu_bir_sifre_belirleyin"
Use code with caution.
Env
Veritabanını Başlatın:
Docker'ın çalıştığından emin olun ve aşağıdaki komutu çalıştırarak PostgreSQL konteynerini başlatın.
Generated bash
docker-compose up -d
Use code with caution.
Bash
Veritabanı Şemasını Uygulayın (Migration):
Bu komut, Prisma şemasına göre veritabanı tablolarını oluşturur.
Generated bash
npx prisma migrate dev
Use code with caution.
Bash
Veritabanını Örnek Verilerle Doldurun (Seed):
Siteyi test etmek için örnek projeler, videolar ve ekip üyeleri ekler.
Generated bash
npx prisma db seed
Use code with caution.
Bash
Geliştirme Sunucusunu Başlatın:
Generated bash
npm run dev
Use code with caution.
Bash
Artık tarayıcınızda http://localhost:3000 adresine giderek siteyi, http://localhost:3000/admin adresine giderek de admin panelini görebilirsiniz.
⚙️ Admin Paneli
URL: /admin
Kullanıcı Adı: .env.local dosyasında belirlediğiniz ADMIN_USERNAME
Şifre: .env.local dosyasında belirlediğiniz ADMIN_PASSWORD
Admin panelinden siteye yeni içerik ekleyebilir, mevcutları düzenleyebilir veya silebilirsiniz.