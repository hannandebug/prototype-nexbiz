# AKSA — AI Business Passport for UMKM

**Smarter Decisions. Stronger Business.**

AKSA adalah aplikasi *prototype* berbasis web yang dirancang untuk membantu pemilik Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia memantau kesehatan bisnis mereka secara real-time. Dengan tampilan seperti aplikasi *mobile*, AKSA memberikan analisis data, rekomendasi cerdas, dan prediksi bisnis yang mudah dipahami.

---

## Fitur Utama

| Fitur | Keterangan |
|-------|------------|
| **Onboarding** | Alur perkenalan 5 langkah yang ditampilkan saat pertama kali menggunakan aplikasi |
| **Dashboard** | Gambaran singkat skor kesehatan bisnis, metrik utama, insight harian, rekomendasi prioritas, dan status integrasi data |
| **Health Report** | Laporan detail skor kesehatan bisnis berdasarkan 5 kategori: Penjualan, Keuntungan, Arus Kas, Perputaran Stok, dan Pertumbuhan |
| **Analisis Bisnis** | Analisis otomatis dari data transaksi — tren omzet, laba, pelanggan, dan produk terlaris. Setiap analisis dilengkapi **Mengapa**, **Urgensi**, dan **Confidence Score** |
| **Business Passport** | Kartu identitas bisnis dengan detail: Health Score, Business Stage, Risk Level, Cash Flow, Growth Rate, Last Updated, dan **AI Verification Badge** |
| **Rekomendasi** | Daftar rekomendasi prioritas dengan penjelasan **Mengapa**, **Urgensi**, dan **Confidence Score** per item |
| **Prediksi** (Premium) | Prediksi berbasis AI untuk stok, permintaan produk, dan tren bisnis — dilengkapi Explainable AI |
| **AI Assistant** (Premium) | Tanya jawab interaktif dengan respons terstruktur: Penyebab, Rekomendasi, Urgensi, Confidence, dan tautan Analisis Terkait. Chat tersimpan lintas halaman |
| **Integrasi Data** | Status koneksi Kasir Pintar, waktu sinkronisasi real-time, total transaksi, dan detail data yang digunakan AI |
| **Filter Bulanan** | Lihat data per bulan (Januari, Februari, Maret, dan seterusnya) atau gabungan semua bulan |

---

## Cara Menggunakan

1. Buka `index.html` di browser (splash screen akan tampil, lalu otomatis pindah ke halaman login)
2. Masukkan email dan password (proses login bersifat simulasi)
3. Isi profil bisnis dan pilih sumber data (Kasir Pintar, Excel, CSV, atau Input Manual)
4. **Onboarding** akan tampil — ikuti 5 langkah perkenalan fitur AKSA
5. Mulai eksplorasi dashboard, health report, analisis, dan fitur lainnya
6. Gunakan **filter periode** di bagian atas halaman untuk melihat data per bulan
7. Aktifkan **Premium** di halaman Profile untuk membuka fitur Prediksi dan AI Assistant
8. Lihat status integrasi data di **Profile > Integrasi Data**

---

## Explainable AI

Setiap analisis, rekomendasi, dan prediksi di AKSA dilengkapi penjelasan transparan:

- **Mengapa** — Alasan di balik analisis atau rekomendasi
- **Urgensi** — Level prioritas (Sangat Mendesak / Penting / Normal)
- **Confidence Score** — Tingkat kepastian model AI (dengan visualisasi bar)

---

## Teknologi

- **HTML5** — Struktur halaman
- **CSS3** — Tampilan dan animasi (single file: `css/style.css`)
- **JavaScript Vanilla** — Semua logika dalam satu file (`js/script.js`)
- **Font Awesome 6** — Ikon
- **LocalStorage** — Penyimpanan data preferensi pengguna, riwayat chat AI, waktu integrasi, dan status onboarding

> **Catatan:** Ini adalah prototype frontend murni. Data transaksi, analisis, dan prediksi masih bersifat statis (contoh / *dummy data*). Belum ada backend atau database sungguhan.

---

## Struktur File

```
AKSA/
├── index.html                 # Splash screen
├── login.html                 # Halaman masuk
├── business-profile.html      # Isi profil bisnis
├── data-source.html           # Pilih sumber data (Kasir Pintar, Excel, CSV, Manual)
├── onboarding.html            # Onboarding 5 langkah
├── dashboard.html             # Dashboard utama
├── health-report.html         # Laporan kesehatan bisnis
├── analysis.html              # Analisis bisnis (Explainable AI)
├── passport.html              # Business Passport (AI Verification Badge)
├── recommendation.html        # Rekomendasi (Explainable AI)
├── forecast.html              # Prediksi AI (Premium + Explainable AI)
├── assistant.html             # AI Assistant (Premium, chat persisten)
├── profile.html               # Profil, Integrasi Data, & pengaturan Premium
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

## LocalStorage Keys

| Key | Fungsi |
|-----|--------|
| `aksapremium` | Status langganan Premium (`true` / `false`) |
| `aksaOnboarded` | Status onboarding sudah diselesaikan |
| `aksaDataSource` | Metode sumber data yang dipilih |
| `aksaSyncTime` | Waktu integrasi data (ISO timestamp) |
| `aksaChatHistory` | Riwayat chat AI Assistant (JSON array) |
| `aksaManualData` | Data transaksi manual (jika input manual) |

---

## Tentang Proyek Ini

AKSA dibuat sebagai prototype untuk menunjukkan bagaimana teknologi AI dan analisis data dapat membantu pemilik UMKM mengambil keputusan bisnis yang lebih cerdas. Proyek ini dikembangkan dengan pendekatan *mobile-first* dan dirancang agar mudah digunakan oleh siapa saja — tanpa perlu latar belakang teknis.

---

Dibuat dengan ❤️ untuk UMKM Indonesia.
