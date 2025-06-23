# Asoyal Studios Admin Paneli

Bu proje, Asoyal Studios için geliştirilmiş modern bir **Next.js 14** tabanlı admin panelidir. Proje yönetimi, ekip üyeleri ve video içeriklerinin yönetimi için kullanılır. Kimlik doğrulama, NextAuth ile environment değişkenlerinden alınan admin hesabı üzerinden yapılır. Veritabanı olarak PostgreSQL kullanılır ve Prisma ile yönetilir.

## Özellikler
- Proje ekleme, düzenleme, silme
- Ekip üyeleri yönetimi
- Video içerikleri yönetimi
- Sadece admin girişi (kullanıcı adı ve şifre .env dosyasından alınır)
- Responsive ve modern arayüz

## Teknolojiler
- [Next.js 14 (App Router)](https://nextjs.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js v5 (Credentials Provider)](https://authjs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Docker (isteğe bağlı, local DB için)

## Kurulum

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/Chimiyai/asosite.git
cd asosite
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
Proje köküne bir `.env` dosyası oluşturun ve aşağıdaki gibi doldurun:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=cokgizlisifre123
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=uzun-bir-string
DATABASE_URL=postgresql://user:password@localhost:5432/asosite
```

> **Not:** `ADMIN_USERNAME` ve `ADMIN_PASSWORD` ile admin girişi yapılır. Diğer kullanıcılar sisteme giriş yapamaz.

### 4. Veritabanı Kurulumu

#### a) Docker ile PostgreSQL (Önerilen)
```bash
docker-compose up -d
```

#### b) Neon, Supabase veya Railway gibi bulut PostgreSQL servisi de kullanabilirsiniz. `DATABASE_URL`'ü ona göre ayarlayın.

### 5. Prisma Migrate & Seed
```bash
npx prisma migrate deploy
npx prisma db seed
```

### 6. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Deployment (Vercel)
- Vercel'e deploy etmek için ortam değişkenlerini Vercel panelinden ekleyin.
- Production veritabanı olarak Neon, Supabase vb. kullanın.
- `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` değişkenlerini mutlaka tanımlayın.

## İletişim
Herhangi bir soru veya katkı için: [Asoyal Studios](mailto:asoyalstudios@gmail.com)

---

Bu proje MIT lisansı ile lisanslanmıştır. Ayrıntılar için [LICENSE](./LICENSE) dosyasına bakınız.
