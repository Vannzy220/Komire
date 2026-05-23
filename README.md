# 🎨 Komire - Website Manhwa Terjemahan Indonesia

Website sederhana untuk membaca dan menjelajahi koleksi manhwa yang telah diterjemahkan ke bahasa Indonesia.

## ✨ Fitur Utama

- 🏠 **Home** - Halaman depan dengan pengenalan website
- 📚 **Daftar Manhwa** - Koleksi manhwa dengan thumbnail/cover
- 🏷️ **Filter Genre** - Filter by Action, Romance, Fantasy
- 📱 **Responsive Design** - Berfungsi optimal di desktop, tablet, dan mobile
- ⚡ **Simple & Fast** - Desain minimalis dan loading cepat
- 🎯 **Navigation Menu** - Menu navigasi yang mudah digunakan

## 🎯 Struktur File

```
Komire/
├── index.html      # File HTML utama
├── styles.css      # Styling dan responsive design
├── script.js       # Fungsionalitas interaktif
└── README.md       # Dokumentasi
```

## 🚀 Cara Menggunakan

### 1. Clone Repository
```bash
git clone https://github.com/Vannzy220/Komire.git
cd Komire
```

### 2. Buka di Browser
Cukup buka file `index.html` di browser Anda, atau gunakan live server:
- VS Code: Klik kanan pada `index.html` → "Open with Live Server"
- Python: `python -m http.server 8000`
- Node.js: `npx http-server`

### 3. Akses Website
Buka `http://localhost:8000` atau sesuai dengan port yang ditampilkan

## 📝 Cara Menambah Manhwa

Edit file `script.js` dan tambahkan data manhwa baru ke array `manhwaData`:

```javascript
{
    id: 9,
    title: "Nama Manhwa",
    genre: "action",  // action, romance, fantasy
    description: "Deskripsi singkat manhwa...",
    cover: "URL_COVER_IMAGE",
    link: "URL_BACA_CHAPTER"
}
```

## 🎨 Customisasi

### Mengubah Warna
Edit variabel CSS di `styles.css`:
```css
:root {
    --primary-color: #ff6b6b;      /* Merah muda */
    --secondary-color: #4ecdc4;    /* Biru tosca */
    --dark-color: #1a1a1a;         /* Hitam */
    --light-color: #f5f5f5;        /* Abu-abu terang */
}
```

### Mengubah Font
Ubah `font-family` di `styles.css`

### Menambah Halaman Baru
1. Tambahkan section baru di `index.html`
2. Tambahkan link di navigation menu
3. Style dengan CSS di `styles.css`
4. Tambahkan fungsi di `script.js` jika diperlukan

## 🌐 Hosting

### Opsi Hosting Gratis:
1. **GitHub Pages** (recommended)
   - Push ke GitHub
   - Aktifkan GitHub Pages di Settings
   
2. **Netlify**
   - Drag & drop folder ke Netlify.com
   - Automatic deployment dari GitHub
   
3. **Vercel**
   - Import project dari GitHub
   - Automatic deployment

4. **Firebase Hosting**
   - Setup dengan Firebase CLI
   - Deploy dengan `firebase deploy`

## 📸 Tangkapan Layar

Website memiliki:
- ✅ Hero section dengan CTA button
- ✅ Grid layout untuk display manhwa
- ✅ Filter buttons untuk genre
- ✅ Mobile responsive
- ✅ Smooth animations
- ✅ Contact form
- ✅ Navigation sticky header

## 💡 Tips Pengembangan

1. **Cover Images**: Gunakan URL dari:
   - Komik Toko Online
   - Manga/Manhwa Database (AniList, MyAnimeList)
   - Imgur, Imgur, atau CDN lainnya

2. **Menambah Fitur**:
   - Rating system
   - Comment section
   - User accounts
   - Search functionality
   - Chapter list view

3. **SEO Optimization**:
   - Tambahkan meta tags
   - Optimize images
   - Add schema markup

## 🛠️ Tech Stack

- **HTML5** - Struktur markup
- **CSS3** - Styling & responsive design
- **JavaScript (Vanilla)** - Interaktivitas tanpa dependencies
- **No External Dependencies** - Pure vanilla code

## 📧 Kontak & Support

Untuk pertanyaan atau saran, silakan buka issue atau hubungi melalui form kontak di website.

## 📄 License

Open source - Bebas digunakan dan dimodifikasi

---

**Made with ❤️ for Manhwa Lovers**
