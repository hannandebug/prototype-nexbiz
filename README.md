# AKSA — AI Business Passport for UMKM

**Smarter Decisions. Stronger Business.**

AKSA adalah aplikasi *prototype* berbasis web yang dirancang untuk membantu pemilik Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia memantau kesehatan bisnis mereka secara real-time. Dengan tampilan seperti aplikasi *mobile*, AKSA memberikan analisis data, rekomendasi cerdas, dan prediksi bisnis yang mudah dipahami.

---

## Fitur Utama

| Fitur | Keterangan |
|-------|------------|
| **Dashboard** | Gambaran singkat skor kesehatan bisnis, metrik utama, insight harian, dan rekomendasi prioritas |
| **Health Report** | Laporan detail skor kesehatan bisnis berdasarkan 5 kategori: Penjualan, Keuntungan, Arus Kas, Perputaran Stok, dan Pertumbuhan |
| **Analisis Bisnis** | Analisis otomatis dari data transaksi — tren omzet, laba, pelanggan, dan produk terlaris |
| **Business Passport** | Kartu identitas bisnis yang merangkum skor kesehatan, pertumbuhan, risiko, dan arus kas |
| **Rekomendasi** | Daftar rekomendasi prioritas yang bisa berubah sesuai data setiap bulan |
| **Prediksi** (Premium) | Prediksi berbasis AI untuk stok, permintaan produk, dan tren bisnis |
| **AI Assistant** (Premium) | Tanya jawab interaktif seputar kondisi bisnis Anda |
| **Filter Bulanan** | Lihat data per bulan (Januari, Februari, Maret, dan seterusnya) atau gabungan semua bulan |

---

## Cara Menggunakan

1. Buka `index.html` di browser (splash screen akan tampil, lalu otomatis pindah ke halaman login)
2. Masukkan email dan password (proses login bersifat simulasi)
3. Isi profil bisnis dan pilih sumber data
4. Mulai eksplorasi dashboard, health report, analisis, dan fitur lainnya
5. Gunakan **filter periode** di bagian atas halaman untuk melihat data per bulan
6. Aktifkan **Premium** di halaman Profile untuk membuka fitur Prediksi dan AI Assistant

---

## Teknologi

- **HTML5** — Struktur halaman
- **CSS3** — Tampilan dan animasi (single file: `css/style.css`)
- **JavaScript Vanilla** — Semua logika dalam satu file (`js/script.js`)
- **Font Awesome 6** — Ikon
- **LocalStorage** — Penyimpanan data preferensi pengguna

> **Catatan:** Ini adalah prototype frontend murni. Data transaksi, analisis, dan prediksi masih bersifat statis (contoh / *dummy data*). Belum ada backend atau database sungguhan.

---

## Struktur File

```
AKSA/
├── index.html                 # Splash screen
├── login.html                 # Halaman masuk
├── business-profile.html      # Isi profil bisnis
├── data-source.html           # Pilih sumber data
├── dashboard.html             # Dashboard utama
├── health-report.html         # Laporan kesehatan bisnis
├── analysis.html              # Analisis bisnis
├── passport.html              # Business Passport
├── recommendation.html        # Rekomendasi
├── forecast.html              # Prediksi AI (Premium)
├── assistant.html             # AI Assistant (Premium)
├── profile.html               # Profil & pengaturan Premium
├── revenue-detail.html        # Detail pendapatan
├── profit-detail.html         # Detail keuntungan
├── cashflow-detail.html       # Detail arus kas
├── growth-detail.html         # Detail pertumbuhan
├── css/
│   └── style.css              # Semua gaya tampilan
├── js/
│   └── script.js              # Semua logika JavaScript
└── assets/
    └── logo/
        └── aksa-logo.png      # Logo AKSA
```

---

## Data Per Bulan

AKSA mendukung tampilan data berdasarkan bulan. Saat ini tersedia data untuk:

| Bulan | Skor Kesehatan | Status |
|-------|:---:|--------|
| **Keseluruhan** | 92 | Sangat Sehat |
| **Januari** | 28 | Kritis |
| **Februari** | 62 | Perlu Perhatian |
| **Maret** | 78 | Sehat |

Setiap bulan memiliki data yang berbeda — mulai dari metrik keuangan, insight, rekomendasi, analisis, hingga prediksi. Pilih bulan melalui **filter periode** di bagian atas halaman.

---

## Tentang Proyek Ini

AKSA dibuat sebagai prototype untuk menunjukkan bagaimana teknologi AI dan analisis data dapat membantu pemilik UMKM mengambil keputusan bisnis yang lebih cerdas. Proyek ini dikembangkan dengan pendekatan *mobile-first* dan dirancang agar mudah digunakan oleh siapa saja — tanpa perlu latar belakang teknis.

---

Dibuat dengan ❤️ untuk UMKM Indonesia.
