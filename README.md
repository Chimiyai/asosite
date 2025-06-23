<p align="center">
  <img src="public/logo.png" alt="asosyal Studios Logo" width="120" />
</p>

<h1 align="center">🚀 asosyal Studios Admin Paneli</h1>

<p align="center">
  <b>Modern, güvenli ve hızlı bir Next.js 14 admin paneli</b><br/>
  <i>Projeler, ekip üyeleri ve videoları kolayca yönetin!</i>
</p>

---

## ✨ Kısa Özellikler

- ⚡️ <b>Hızlı ve Modern</b> — Next.js 14 App Router mimarisi
- 🔒 <b>Güvenli Admin Girişi</b> — NextAuth + .env ile tekil admin
- 🗂️ <b>Proje, Ekip ve Video Yönetimi</b>
- 🎨 <b>Responsive & Şık Arayüz</b> — Tailwind CSS
- 🐘 <b>PostgreSQL & Prisma ORM</b>
- 🐳 <b>Docker ile kolay veritabanı kurulumu</b>

---

## 🚦 Hızlı Başlangıç

```bash
# 1. Depoyu klonla
$ git clone https://github.com/Chimiyai/asosite.git
$ cd asosite

# 2. Bağımlılıkları yükle
$ npm install

# 3. .env dosyasını oluştur ve doldur
$ cp .env.example .env
# veya elle oluştur:
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=cokgizlisifre123
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=uzun-bir-string
# DATABASE_URL=postgresql://user:password@localhost:5432/asosite

# 4. (İsteğe bağlı) Docker ile PostgreSQL başlat
$ docker-compose up -d

# 5. Veritabanı migrasyon & seed
$ npx prisma migrate deploy
$ npx prisma db seed

# 6. Geliştirme sunucusunu başlat
$ npm run dev
```

> 💡 <b>Not:</b> Admin girişi için kullanıcı adı ve şifre `.env` dosyasından alınır. Sadece admin girişi desteklenir.

---

## 🖼️ Ekran Görüntüsü

<p align="center">
  <img src="public/images/projects/ekrangrnts.jpg" alt="asosyal Studios Admin Paneli" width="600" />
</p>

---

## 🛠️ Kullanılan Teknolojiler

- **Next.js 14** (App Router)
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth.js v5** (Credentials Provider)
- **Tailwind CSS**
- **Docker** (isteğe bağlı)

---

## ⚙️ Ortam Değişkenleri

```env
ADMIN_USERNAME=***
ADMIN_PASSWORD=***
NEXTAUTH_URL=***
NEXTAUTH_SECRET=***
DATABASE_URL=***
```

> 🔑 <b>Güvenlik:</b> `NEXTAUTH_SECRET` en az 32 karakter olmalı. Production için güçlü bir değer kullanın.

---

## ☁️ Vercel ile Deploy

1. Vercel panelinde yeni bir proje oluşturun.
2. Ortam değişkenlerini Vercel'de tanımlayın.
3. Production veritabanı olarak Neon, Supabase vb. kullanabilirsiniz.
4. Deploy edin ve keyfinize bakın!

---

## 🤝 Katkı & İletişim

- Pull request ve issue açarak katkıda bulunabilirsiniz.
- Soru ve öneriler için: [AsosyalHacker12@gmail.com](AsosyalHacker12@gmail.com)

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Ayrıntılar için [LICENSE](./LICENSE) dosyasına bakınız.