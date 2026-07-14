// Auth Guard - redirect to login if not authenticated
(function() {
  const publicPages = ['index.html', 'login.html', 'business-profile.html', 'onboarding.html', 'data-source.html', ''];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (!publicPages.includes(currentPage) && !localStorage.getItem('aksaLoggedIn')) {
    window.location.href = 'login.html';
  }
})();

/* ==========================================
   AKSA - AI Business Passport for UMKM
   Main JavaScript
   ========================================== */

/* ----- Format Rupiah ----- */
function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

/* ----- Animate Counter (Health Score, etc.) ----- */
function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + (suffix || '');
  }, 30);
}

/* ----- Animate Confidence Bar ----- */
function animateConfidence(element, target) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (element) {
    element.style.width = '0%';
    setTimeout(() => {
      element.style.width = target + '%';
    }, 300);
  }
}

/* ==========================================
   MONTHLY BUSINESS DATA
   ========================================== */

const monthKeys = ['keseluruhan','januari','februari','maret','april','mei','juni','juli','agustus','september','oktober','november','desember'];
const monthLabels = {
  keseluruhan:'Keseluruhan', januari:'Januari', februari:'Februari', maret:'Maret',
  april:'April', mei:'Mei', juni:'Juni', juli:'Juli',
  agustus:'Agustus', september:'September', oktober:'Oktober', november:'November', desember:'Desember'
};

const monthData = {
  keseluruhan: {
    healthScore: 92,
    healthStatus: 'Sangat Sehat',
    categories: {
      penjualan: { score: 95, color: 'green' },
      keuntungan: { score: 90, color: 'green' },
      arusKas: { score: 91, color: 'green' },
      perputaranStok: { score: 85, color: 'orange' },
      pertumbuhan: { score: 94, color: 'green' }
    },
    passport: {
      healthScore: 92,
      healthLabel: 'Sangat Sehat',
      growth: '+15%',
      risk: 'Rendah',
      riskColor: 'var(--secondary)',
      verified: true,
      stats: [
        { label: 'Total Transaksi', value: '1.284' },
        { label: 'Rata-rata/Hari', value: 'Rp 189K' },
        { label: 'Produk Terlaris', value: 'Kopi Susu' },
        { label: 'Rating Pelanggan', value: '4.8 ★' }
      ],
      details: [
        { icon: 'fa-chart-line', label: 'Pendapatan', value: 'Rp 3.250.000', change: '+12%', changeDir: 'up' },
        { icon: 'fa-wallet', label: 'Keuntungan', value: 'Rp 975.000', change: '+8%', changeDir: 'up' },
        { icon: 'fa-exchange-alt', label: 'Arus Kas', value: 'Positif', change: 'Stabil', changeDir: 'up' },
        { icon: 'fa-chart-bar', label: 'Pertumbuhan', value: '+15%', change: 'Bulan ini', changeDir: 'up' }
      ]
    },
    dashboard: {
      revenue: {
        value: 'Rp 3.250.000', change: '+12%', label: 'hari ini',
        summary: 'Pendapatan hari ini mencapai <strong>Rp 3.250.000</strong>, naik 12% dibandingkan kemarin (Rp 2.900.000). Produk <strong>Kopi Susu</strong> menjadi kontributor utama dengan penjualan 45 porsi. Tren pendapatan terus meningkat dalam 7 hari terakhir.',
        insight: 'Pendapatan meningkat 12% karena penjualan <strong>Kopi Susu</strong> naik 25% selama akhir pekan. Cuaca dingin mendorong pelanggan memilih minuman hangat. Disarankan mempertahankan stok bahan baku untuk mengantisipasi tren ini.',
        chartTitle: 'Perkembangan Pendapatan Keseluruhan',
        chartY: [95, 80, 85, 60, 40, 45, 25, 15],
        chartInsight: 'Pendapatan meningkat <strong>12%</strong> dalam 7 hari terakhir. Tren naik didorong oleh penjualan <strong>Kopi Susu</strong> yang naik 25% selama akhir pekan karena cuaca dingin.'
      },
      profit: {
        value: 'Rp 980.000', change: '+8%', label: 'minggu ini',
        summary: 'Keuntungan minggu ini mencapai <strong>Rp 980.000</strong>, naik 8% dibandingkan minggu lalu. Meskipun omzet naik 12%, margin keuntungan sedikit tertekan oleh kenaikan harga bahan baku sebesar 8% (susu dan gula).',
        insight: 'Keuntungan naik 8% karena efisiensi operasional dan peningkatan penjualan produk dengan margin tinggi seperti <strong>Kopi Susu</strong>. Namun kenaikan harga bahan baku menggerus margin. Disarankan evaluasi harga jual atau cari supplier alternatif.',
        chartTitle: 'Perkembangan Keuntungan Keseluruhan',
        chartY: [60, 35, 55, 30, 50, 38, 48, 30],
        chartInsight: 'Keuntungan fluktuatif karena dipengaruhi <strong>biaya operasional</strong> yang bervariasi — kenaikan harga bahan baku (susu & gula) mendorong penurunan di pertengahan minggu.'
      },
      cashflow: {
        value: 'Rp 1.750.000', status: 'Stabil', change: '', label: 'saat ini',
        summary: 'Arus kas dalam kondisi <strong>stabil</strong> dengan saldo Rp 1.750.000. Pemasukan harian rata-rata Rp 3.250.000 dan pengeluaran Rp 2.270.000, sehingga terdapat surplus sekitar Rp 980.000 per hari.',
        insight: 'Arus kas dalam kondisi sehat karena pemasukan lebih besar 25% dibandingkan pengeluaran. Disarankan menyisihkan <strong>20% dari surplus</strong> untuk dana cadangan darurat dan sisanya dapat diinvestasikan untuk pengembangan usaha.',
        chartTitle: 'Perkembangan Arus Kas Keseluruhan',
        chartBars: [
          { val: '1.6M', pct: 78 }, { val: '1.7M', pct: 82 }, { val: '1.65M', pct: 80 },
          { val: '1.55M', pct: 76 }, { val: '1.72M', pct: 83 }, { val: '1.75M', pct: 85 }, { val: '1.68M', pct: 81 }
        ],
        chartInsight: 'Arus kas <strong>stabil</strong> selama 7 hari terakhir dengan rata-rata saldo Rp 1,68 juta. Pemasukan harian konsisten dari penjualan rutin, sedangkan pengeluaran terkontrol untuk bahan baku.'
      },
      growth: {
        value: '+15%', change: 'Meningkat', label: 'Bulan ini',
        summary: 'Bisnis tumbuh <strong>15%</strong> bulan ini — tertinggi dalam 6 bulan terakhir. Pertumbuhan didorong oleh peningkatan pelanggan baru (8%) dan strategi promo bundling yang efektif.',
        insight: 'Pertumbuhan 15% merupakan capaian positif yang didorong oleh peningkatan penjualan produk unggulan dan efektivitas promo. Untuk mempertahankan tren ini, AKSA merekomendasikan untuk terus berinovasi pada menu dan mempertahankan kualitas layanan.',
        chartTitle: 'Perkembangan Pertumbuhan Keseluruhan',
        chartBlocks: [
          { value: '-8%', month: 'Jan', arrow: 'down', label: 'Kritis', color: 'danger' },
          { value: '+7%', month: 'Feb', arrow: 'up', label: 'Pemulihan', color: 'warning' },
          { value: '+10%', month: 'Mar', arrow: 'up', label: 'Sehat', color: 'secondary' }
        ],
        chartInsight: 'Pertumbuhan menunjukkan tren <strong>recovery</strong> yang konsisten: dari kontraksi -8% di Januari, pulih ke +7% di Februari, dan mencapai +10% di Maret.'
      }
    },
    aiAnalysis: 'Skor bisnis Anda mencapai <strong>92</strong> karena penjualan stabil (95), keuntungan meningkat (90), arus kas sehat (91), dan pertumbuhan bisnis kuat (94). Namun <strong>perputaran stok</strong> (85) perlu perhatian — beberapa bahan baku seperti teh masih menumpuk di gudang. Disarankan untuk menyesuaikan jumlah pembelian dengan permintaan aktual agar tidak terjadi pemborosan.',
    insight: 'Omzet hari ini naik 12% dibandingkan kemarin. Produk <strong>Kopi Susu</strong> menjadi kontributor utama dengan penjualan 45 porsi. Cuaca dingin meningkatkan permintaan minuman hangat.',
    priorityText: '🔥 Restock <strong>gula</strong> dalam 2 hari — stok tersisa 8 kg dengan konsumsi 2 kg/hari. Persiapkan juga <strong>susu</strong> untuk antisipasi lonjakan akhir pekan.',
    aiPreviewText: 'Berdasarkan data 7 hari terakhir, AKSA merekomendasikan untuk menambah stok <strong>gula</strong> dan <strong>susu</strong>. Permintaan diprediksi naik 25% menjelang akhir pekan. Segera lakukan pemesanan untuk menghindari kehabisan stok.',
    recommendations: [
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Tambah Stok Gula', desc: 'Stok gula diperkirakan habis dalam 2 hari dengan tingkat konsumsi saat ini (rata-rata 2 kg/hari). Segera lakukan pemesanan untuk menghindari gangguan operasional.', reason: 'Konsumsi harian gula rata-rata 2 kg dengan stok tersisa 8 kg, habis dalam 4 hari.', confidence: 92 },
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Promo Bundling Jam Sepi', desc: 'Buat promo bundling Kopi Susu + Roti Bakar pada pukul 14.00-16.00. Data menunjukkan hanya 3-4 pelanggan per jam. Promo dapat meningkatkan kunjungan hingga 40%.', reason: 'Data menunjukkan jam 14.00-16.00 memiliki rata-rata kunjungan terendah.', confidence: 89 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Kurangi Stok Teh', desc: 'Stok teh tersisa 30% di atas rata-rata permintaan. Permintaan Es Teh turun 15% saat cuaca dingin. Alihkan dana untuk bahan baku yang lebih dibutuhkan.', reason: 'Permintaan Es Teh turun 15% saat musim hujan, stok menumpuk.', confidence: 87 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Evaluasi Harga Menu', desc: 'Harga bahan baku naik 8% (susu dan gula). Margin keuntungan menipis 3%. Pertimbangkan penyesuaian harga jual sebesar 5-10% untuk mempertahankan profitabilitas.', reason: 'Kenaikan harga bahan baku dari supplier mengikis margin keuntungan.', confidence: 91 },
      { urgency: 'optional', badge: 'Opsional', icon: '💡', title: 'Tambah Varian Minuman Hangat', desc: 'Musim hujan meningkatkan permintaan minuman hangat. Pertimbangkan menambah varian seperti Kopi Aren, Matcha Latte, atau Cokelat Hangat.', reason: 'Pola musiman menunjukkan permintaan minuman hangat naik 25% saat hujan.', confidence: 84 }
    ],
    analysis: [
      { icon: 'up', title: 'Omzet Naik 12%', desc: 'Penjualan <strong>Kopi Susu</strong> meningkat 25% dan <strong>Roti Bakar</strong> naik 15%. Cuaca dingin dalam 3 hari terakhir mendorong pelanggan memilih minuman hangat. Ini pola musiman yang positif.', reason: 'Pola cuaca dingin meningkatkan permintaan minuman hangat secara signifikan.', urgency: 'normal', confidence: 95 },
      { icon: 'down', title: 'Laba Turun 3%', desc: 'Harga bahan baku seperti <strong>susu</strong> dan <strong>gula</strong> naik 8% dalam sebulan terakhir. Akibatnya margin keuntungan menipis meskipun omzet naik. Disarankan evaluasi harga jual atau cari supplier alternatif.', reason: 'Kenaikan harga bahan baku supplier tidak diimbangi dengan penyesuaian harga jual.', urgency: 'important', confidence: 91 },
      { icon: 'down', title: 'Pelanggan Berkurang di Jam Sepi', desc: 'Terjadi penurunan pengunjung pada pukul 14.00-16.00. Rata-rata hanya 3-4 pelanggan per jam. Ini adalah jam sepi yang konsisten setiap hari. Disarankan membuat promo <strong>bundling</strong> atau diskon khusus di jam tersebut.', reason: 'Pola perilaku pelanggan menunjukkan penurunan aktivitas di jam istirahat siang.', urgency: 'important', confidence: 88 },
      { icon: 'up', title: 'Produk Terlaris: Kopi Susu', desc: '<strong>Kopi Susu</strong> menyumbang 40% dari total penjualan dengan rata-rata 45 porsi per hari. Disusul <strong>Es Teh</strong> (25%) dan <strong>Roti Bakar</strong> (20%). Fokus promosi pada produk terlaris untuk hasil maksimal.', reason: 'Kopi Susu memiliki nilai jual tertinggi dan paling konsisten diminati pelanggan.', urgency: 'normal', confidence: 96 }
    ],
    analysisScore: 92,
    forecast: [
      { icon: 'fa-cube', title: 'Stok Gula Habis dalam 4 Hari', desc: 'Berdasarkan rata-rata konsumsi 2 kg per hari, stok gula Anda saat ini (8 kg) diperkirakan habis pada hari Sabtu. Segera lakukan pemesanan ulang untuk mengantisipasi lonjakan akhir pekan.', confidence: 92, color: 'orange', reason: 'Konsumsi harian rata-rata 2 kg dengan stok tersisa 8 kg = 4 hari habis.', urgency: 'urgent' },
      { icon: 'fa-mug-hot', title: 'Permintaan Kopi Susu Naik 25%', desc: 'Akhir pekan ini diprediksi permintaan Kopi Susu meningkat 25% disebabkan cuaca dingin dan hari libur. Pastikan stok susu, gula, dan biji kopi mencukupi.', confidence: 88, color: '', reason: 'Pola musiman menunjukkan lonjakan permintaan saat cuaca dingin dan weekend.', urgency: 'important' },
      { icon: 'fa-snowflake', title: 'Es Teh Turun 15% saat Hujan', desc: 'BMKG memprediksi hujan di akhir pekan. Permintaan Es Teh diperkirakan turun 15%. Disarankan mengurangi stok es dan mempromosikan minuman hangat.', confidence: 85, color: 'green', reason: 'Cuaca hujan menurunkan permintaan minuman dingin secara konsisten.', urgency: 'normal' }
    ]
  },
  januari: {
    healthScore: 28,
    healthStatus: 'Kritis',
    categories: {
      penjualan: { score: 30, color: 'red' },
      keuntungan: { score: 22, color: 'red' },
      arusKas: { score: 25, color: 'red' },
      perputaranStok: { score: 40, color: 'orange' },
      pertumbuhan: { score: 18, color: 'red' }
    },
    passport: {
      healthScore: 28,
      healthLabel: 'Kritis',
      growth: '-10%',
      risk: 'Tinggi',
      riskColor: 'var(--danger)',
      verified: false,
      stats: [
        { label: 'Total Transaksi', value: '342' },
        { label: 'Rata-rata/Hari', value: 'Rp 45K' },
        { label: 'Produk Terlaris', value: 'Es Teh' },
        { label: 'Rating Pelanggan', value: '3.2 ★' }
      ],
      details: [
        { icon: 'fa-chart-line', label: 'Pendapatan', value: 'Rp 850.000', change: '-15%', changeDir: 'down' },
        { icon: 'fa-wallet', label: 'Keuntungan', value: 'Rp 75.000', change: '-40%', changeDir: 'down' },
        { icon: 'fa-exchange-alt', label: 'Arus Kas', value: 'Negatif', change: 'Kritis', changeDir: 'down' },
        { icon: 'fa-chart-bar', label: 'Pertumbuhan', value: '-10%', change: 'Bulan ini', changeDir: 'down' }
      ]
    },
    dashboard: {
      revenue: {
        value: 'Rp 850.000', change: '-15%', label: 'hari ini',
        summary: 'Pendapatan bulan ini sangat rendah, hanya <strong>Rp 850.000</strong> — turun 15% dibanding periode sebelumnya. Produk <strong>Kopi Susu</strong> hanya terjual 12 porsi per hari. Volume penjualan anjlok secara signifikan.',
        insight: 'Omzet anjlok 35% karena kombinasi harga tidak kompetitif dan munculnya pesaing baru di sekitar lokasi. Disarankan segera lakukan evaluasi harga, buat promosi agresif, dan survei pelanggan untuk memahami akar masalah.',
        chartTitle: 'Perkembangan Pendapatan Januari 2026',
        chartY: [105, 108, 112, 115, 118, 116, 114, 118],
        chartInsight: 'Pendapatan <strong>sangat rendah</strong> dan cenderung menurun sepanjang minggu. Omzet anjlok 35% karena pesaing baru dan harga tidak kompetitif.'
      },
      profit: {
        value: 'Rp 75.000', change: '-40%', label: 'minggu ini',
        summary: 'Keuntungan hampir nol, hanya <strong>Rp 75.000</strong> dengan margin sangat tipis. Biaya operasional tetap (sewa, gaji) lebih besar dari pendapatan. Bisnis mengalami <strong>kerugian</strong> bersih setiap hari.',
        insight: 'Keuntungan turun 40% karena biaya operasional tetap tidak berkurang meskipun pendapatan menurun drastis. Kenaikan harga bahan baku memperparah kondisi. Segera audit pengeluaran dan negosiasi ulang dengan supplier.',
        chartTitle: 'Perkembangan Keuntungan Januari 2026',
        chartY: [100, 105, 108, 110, 107, 112, 115, 118],
        chartInsight: 'Keuntungan <strong>hampir nol</strong> sepanjang minggu. Biaya operasional tetap melebihi pendapatan, menyebabkan kerugian bersih setiap hari.'
      },
      cashflow: {
        value: 'Rp 200.000', status: 'Negatif', change: '', label: 'sangat terbatas',
        summary: 'Arus kas dalam kondisi <strong>kritis</strong> dengan saldo hanya Rp 200.000. Arus kas negatif karena pendapatan harian tidak mencukupi biaya operasional. <strong>Butuh injeksi dana segera.</strong>',
        insight: 'Arus kas negatif dengan saldo sangat terbatas. Dengan pengeluaran harian rata-rata Rp 150.000, kas diperkirakan habis dalam 7 hari. Segera cari solusi pendanaan darurat atau kurangi pengeluaran secara agresif.',
        chartTitle: 'Perkembangan Arus Kas Januari 2026',
        chartBars: [
          { val: '250K', pct: 22 }, { val: '220K', pct: 18 }, { val: '200K', pct: 15 },
          { val: '180K', pct: 12 }, { val: '150K', pct: 10 }, { val: '130K', pct: 8 }, { val: '100K', pct: 5 }
        ],
        chartInsight: 'Arus kas <strong>negatif</strong> dan terus menurun. Dengan saldo Rp 200.000 dan pengeluaran Rp 150.000/hari, kas diperkirakan habis dalam 7 hari.'
      },
      growth: {
        value: '-8%', change: 'Menurun', label: 'Bulan ini',
        summary: 'Bisnis mengalami kontraksi <strong>-8%</strong> bulan ini. Semua indikator pertumbuhan menunjukkan tren negatif. Pelanggan harian turun 60% dari 40 menjadi hanya 15 orang.',
        insight: 'Pertumbuhan negatif 8% dipicu oleh hilangnya pelanggan setia akibat persaingan harga. Disarankan fokus pada program loyalitas pelanggan dan promosi darurat untuk membalikkan tren negatif ini.',
        chartTitle: 'Perkembangan Pertumbuhan Januari 2026',
        chartBlocks: [
          { value: '-10%', month: 'Jan', arrow: 'down', label: 'Kritis', color: 'danger' },
          { value: '-12%', month: 'Feb', arrow: 'down', label: 'Memburuk', color: 'danger' },
          { value: '-8%', month: 'Mar', arrow: 'down', label: 'Kritis', color: 'danger' }
        ],
        chartInsight: 'Pertumbuhan <strong>negatif konsisten</strong> selama 3 bulan. Semua indikator menunjukkan tren menurun yang perlu tindakan segera.'
      }
    },
    aiAnalysis: 'Skor bisnis Anda berada di <strong>28</strong> (Kritis). Penjualan sangat rendah (30), keuntungan hampir tidak ada (22), dan arus kas negatif (25). Bisnis mengalami defisit karena biaya operasional lebih besar dari pendapatan. Disarankan segera lakukan evaluasi besar-besaran — cek ulang harga jual, kurangi pengeluaran tidak perlu, dan cari strategi promosi darurat untuk meningkatkan omzet.',
    insight: 'Omzet bulan ini sangat rendah, turun 15% dibanding periode sebelumnya. Produk <strong>Kopi Susu</strong> hanya terjual 12 porsi per hari. Biaya operasional masih tinggi dan perlu segera dievaluasi.',
    priorityText: '🚨 Darurat! <strong>Biaya operasional</strong> lebih besar dari pendapatan. Segera lakukan evaluasi — kurangi pengeluaran tidak perlu dan cari strategi promosi darurat untuk meningkatkan omzet.',
    aiPreviewText: 'Berdasarkan kondisi kritis saat ini, AKSA merekomendasikan <strong>evaluasi total</strong> bisnis Anda. Fokus pada pengurangan biaya, promosi besar-besaran, dan negosiasi ulang dengan supplier. Setiap hari sangat berharga.',
    recommendations: [
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Evaluasi Total Biaya Operasional', desc: 'Biaya operasional melebihi pendapatan. Lakukan audit pengeluaran segera. Hentikan pengeluaran yang tidak perlu dan negosiasi ulang sewa tempat jika memungkinkan.', reason: 'Pendapatan harian tidak mencukupi biaya tetap operasional.', confidence: 96 },
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Promo Darurat Diskon Besar', desc: 'Buat promo diskon 30-50% untuk produk andalan (Kopi Susu) untuk menarik pelanggan kembali. Pasang spanduk promosi di depan toko dan media sosial.', reason: 'Volume penjualan sangat rendah, promosi agresif diperlukan untuk menarik pelanggan.', confidence: 88 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Negosiasi Supplier', desc: 'Hubungi supplier susu dan gula untuk menunda pembayaran atau meminta harga khusus. Setiap penghematan 5-10% sangat berarti di kondisi kritis saat ini.', reason: 'Kenaikan harga bahan baku memperparah defisit yang sudah terjadi.', confidence: 85 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Kurangi Stok Semua Produk', desc: 'Jangan beli stok baru kecuali benar-benar habis. Fokus jual stok yang ada untuk menghasilkan kas. Kurangi variasi menu sementara waktu.', reason: 'Arus kas negatif membutuhkan penghematan maksimal pada pengadaan stok.', confidence: 90 },
      { urgency: 'optional', badge: 'Opsional', icon: '💡', title: 'Cari Pendapatan Tambahan', desc: 'Pertimbangkan jualan frozen food atau camilan kemasan yang tidak memerlukan modal besar. Buka layanan antar untuk menjangkau lebih banyak pelanggan.', reason: 'Diversifikasi pendapatan dapat membantu menstabilkan arus kas.', confidence: 78 }
    ],
    analysis: [
      { icon: 'down', title: 'Omzet Anjlok 35%', desc: 'Penjualan <strong>Kopi Susu</strong> turun drastis dari 45 menjadi 12 porsi per hari. Total omzet bulan ini hanya Rp 850.000 — turun 35% dibanding bulan sebelumnya. Kondisi ini sangat kritis.', reason: 'Kombinasi harga tidak kompetitif dan munculnya pesaing baru di sekitar lokasi.', urgency: 'urgent', confidence: 94 },
      { icon: 'down', title: 'Keuntungan Hampir Nol', desc: 'Keuntungan hanya Rp 75.000 dengan margin sangat tipis. Biaya operasional tetap (sewa, gaji) lebih besar dari pendapatan. Bisnis mengalami <strong>kerugian</strong> bersih setiap hari.', reason: 'Biaya tetap operasional tidak berkurang meskipun pendapatan menurun drastis.', urgency: 'urgent', confidence: 97 },
      { icon: 'down', title: 'Arus Kas Negatif', desc: 'Arus kas dalam kondisi negatif dengan saldo sangat terbatas (Rp 200.000). Tidak cukup untuk membeli stok baru atau membayar kewajiban minggu depan. <strong>Butuh injeksi dana segera.</strong>', reason: 'Pendapatan harian tidak mencukupi untuk menutup pengeluaran operasional wajib.', urgency: 'urgent', confidence: 96 },
      { icon: 'down', title: 'Pelanggan Berkurang 60%', desc: 'Jumlah pelanggan harian turun dari 40 menjadi hanya 15 orang. Kemungkinan disebabkan oleh harga yang tidak kompetitif atau kemunculan pesaing baru. Survey pelanggan sangat disarankan.', reason: 'Hilangnya pelanggan setia akibat perubahan preferensi dan persaingan harga.', urgency: 'urgent', confidence: 89 }
    ],
    analysisScore: 65,
    forecast: [
      { icon: 'fa-triangle-exclamation', title: 'Risiko Kehabisan Kas dalam 7 Hari', desc: 'Dengan arus kas saat ini (Rp 200.000) dan pengeluaran harian rata-rata Rp 150.000, kas diperkirakan habis dalam 7 hari. <strong>Segera cari solusi pendanaan darurat.</strong>', confidence: 96, color: 'red', reason: 'Arus kas negatif dengan rasio pengeluaran/pendapatan > 1.', urgency: 'urgent' },
      { icon: 'fa-chart-line', title: 'Omzet Diprediksi Turun Lagi 10%', desc: 'Jika tidak ada perubahan strategi, omzet diperkirakan terus turun 10% di minggu depan. Promo besar-besaran diperlukan untuk membalikkan tren negatif ini.', confidence: 88, color: 'orange', reason: 'Tren penurunan 3 bulan beruntun menunjukkan pola yang berkelanjutan.', urgency: 'urgent' },
      { icon: 'fa-users', title: 'Pelanggan Baru Sulit Didapat', desc: 'Biaya akuisisi pelanggan baru meningkat 3x lipat. Disarankan fokus mempertahankan pelanggan setia dengan program loyalitas sederhana.', confidence: 82, color: 'orange', reason: 'Persaingan harga dengan pesaing baru meningkatkan biaya akuisisi.', urgency: 'important' }
    ]
  },
  februari: {
    healthScore: 62,
    healthStatus: 'Perlu Perhatian',
    categories: {
      penjualan: { score: 65, color: 'orange' },
      keuntungan: { score: 58, color: 'orange' },
      arusKas: { score: 70, color: 'blue' },
      perputaranStok: { score: 55, color: 'orange' },
      pertumbuhan: { score: 60, color: 'orange' }
    },
    passport: {
      healthScore: 65,
      healthLabel: 'Moderat',
      growth: '+5%',
      risk: 'Sedang',
      riskColor: 'var(--warning)',
      verified: true,
      stats: [
        { label: 'Total Transaksi', value: '680' },
        { label: 'Rata-rata/Hari', value: 'Rp 105K' },
        { label: 'Produk Terlaris', value: 'Kopi Susu' },
        { label: 'Rating Pelanggan', value: '4.2 ★' }
      ],
      details: [
        { icon: 'fa-chart-line', label: 'Pendapatan', value: 'Rp 1.850.000', change: '+8%', changeDir: 'up' },
        { icon: 'fa-wallet', label: 'Keuntungan', value: 'Rp 420.000', change: '+5%', changeDir: 'up' },
        { icon: 'fa-exchange-alt', label: 'Arus Kas', value: 'Cukup', change: 'Mulai pulih', changeDir: 'up' },
        { icon: 'fa-chart-bar', label: 'Pertumbuhan', value: '+5%', change: 'Bulan ini', changeDir: 'up' }
      ]
    },
    dashboard: {
      revenue: {
        value: 'Rp 1.850.000', change: '+8%', label: 'hari ini',
        summary: 'Omzet mulai naik <strong>Rp 1.850.000</strong>, naik 8% dibanding bulan lalu. Produk <strong>Kopi Susu</strong> mulai diminati kembali dengan 25 porsi per hari. Tren pemulihan sudah terlihat jelas.',
        insight: 'Pemulihan omzet 8% didorong oleh strategi promosi Kopi Susu yang mulai membuahkan hasil dan kembalinya pelanggan. Namun biaya bahan baku masih perlu dikendalikan untuk meningkatkan margin keuntungan.',
        chartTitle: 'Perkembangan Pendapatan Februari 2026',
        chartY: [110, 95, 90, 80, 72, 65, 55, 45],
        chartInsight: 'Pendapatan menunjukkan tren <strong>pemulihan</strong> yang konsisten — naik 8% dari bulan lalu. Kopi Susu menjadi motor utama pemulihan dengan 25 porsi/hari.'
      },
      profit: {
        value: 'Rp 420.000', change: '+5%', label: 'minggu ini',
        summary: 'Keuntungan mulai membaik menjadi <strong>Rp 420.000</strong>, naik 5% dibanding bulan lalu. Meskipun masih tipis, ini menunjukkan arah yang benar. Volume penjualan mulai menutup biaya operasional tetap.',
        insight: 'Keuntungan naik 5% karena peningkatan volume penjualan mulai menutup biaya operasional. Fokus pada efisiensi biaya dan cari supplier alternatif untuk meningkatkan margin keuntungan.',
        chartTitle: 'Perkembangan Keuntungan Februari 2026',
        chartY: [80, 72, 75, 62, 68, 55, 50, 42],
        chartInsight: 'Keuntungan <strong>mulai membaik</strong> dari kondisi hampir nol. Tren pemulihan terlihat meskipun masih perlu waktu untuk mencapai level yang sehat.'
      },
      cashflow: {
        value: 'Rp 850.000', status: 'Cukup', change: '', label: 'mulai pulih',
        summary: 'Arus kas membaik dengan status <strong>Cukup</strong> dan saldo Rp 850.000. Mulai ada dana untuk pembelian stok. Pemulihan penjualan meningkatkan pemasukan kas secara bertahap.',
        insight: 'Arus kas mulai pulih dari kondisi negatif. Pemulihan penjualan meningkatkan pemasukan kas. Tetap disarankan mengatur pengeluaran dengan hati-hati dan menyisihkan dana cadangan.',
        chartTitle: 'Perkembangan Arus Kas Februari 2026',
        chartBars: [
          { val: '400K', pct: 35 }, { val: '500K', pct: 42 }, { val: '550K', pct: 48 },
          { val: '600K', pct: 52 }, { val: '680K', pct: 58 }, { val: '750K', pct: 65 }, { val: '850K', pct: 72 }
        ],
        chartInsight: 'Arus kas <strong>mulai pulih</strong> dari negatif. Peningkatan konsisten setiap hari menunjukkan pemulihan penjualan yang efektif.'
      },
      growth: {
        value: '+7%', change: 'Mulai naik', label: 'Bulan ini',
        summary: 'Bisnis mulai tumbuh <strong>+7%</strong> setelah mengalami kontraksi di bulan sebelumnya. Pertumbuhan didorong oleh kembalinya pelanggan dan efektivitas strategi promosi Kopi Susu.',
        insight: 'Pertumbuhan 7% menandakan awal pemulihan. Untuk mempercepat laju pertumbuhan, disarankan optimalkan jam sibuk dan kendalikan biaya bahan baku agar margin keuntungan meningkat.',
        chartTitle: 'Perkembangan Pertumbuhan Februari 2026',
        chartBlocks: [
          { value: '-3%', month: 'Jan', arrow: 'down', label: 'Menurun', color: 'danger' },
          { value: '+3%', month: 'Feb', arrow: 'up', label: 'Pemulihan', color: 'warning' },
          { value: '+7%', month: 'Mar', arrow: 'up', label: 'Membaik', color: 'secondary' }
        ],
        chartInsight: 'Pertumbuhan menunjukkan tren <strong>pemulihan</strong> dari -3% ke +7%. Strategi promosi Kopi Susu menjadi kunci keberhasilan pemulihan.'
      }
    },
    aiAnalysis: 'Skor bisnis Anda <strong>62</strong> (Perlu Perhatian). Penjualan mulai membaik (65) dibanding bulan lalu, namun keuntungan masih tipis (58). Arus kas cukup (70) namun perputaran stok lambat (55). Disarankan untuk fokus pada produk yang cepat laku, kurangi stok barang yang bergerak lambat, dan tingkatkan promosi untuk mendorong penjualan.',
    insight: 'Omzet mulai naik 8% dibanding bulan lalu. Produk <strong>Kopi Susu</strong> mulai diminati kembali dengan 25 porsi per hari. Namun biaya bahan baku masih perlu dikendalikan.',
    priorityText: '📈 <strong>Kopi Susu</strong> mulai diminati kembali — 25 porsi/hari. Fokuskan promosi pada produk ini. Kurangi stok <strong>teh</strong> yang pergerakannya lambat.',
    aiPreviewText: 'Berdasarkan data pemulihan bulan ini, AKSA merekomendasikan untuk fokus pada <strong>produk cepat laku</strong> seperti Kopi Susu. Kurangi stok teh yang lambat bergerak dan tingkatkan promosi di jam sibuk pagi hari.',
    recommendations: [
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Fokus Promosi Kopi Susu', desc: 'Kopi Susu menunjukkan peningkatan permintaan (25 porsi/hari). Tambah stok susu dan kopi, buat promo khusus seperti "Beli 2 Gratis 1" di jam sibuk pagi untuk mendorong penjualan.', reason: 'Kopi Susu menjadi produk recovery utama dengan tren positif.', confidence: 90 },
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Kurangi Stok Teh Berlebih', desc: 'Stok teh masih 30% di atas permintaan. Permintaan Es Teh belum pulih. Buat promo bundling teh dengan makanan ringan untuk mempercepat pengurangan stok.', reason: 'Stok teh menumpuk dari periode sebelumnya dan permintaan masih rendah.', confidence: 87 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Optimalkan Jam Sibuk', desc: 'Puncak kunjungan terjadi pukul 08.00-10.00 dan 17.00-19.00. Pastikan stok bahan baku cukup di jam-jam tersebut. Tambah 1 karyawan paruh waktu jika perlu.', reason: 'Data transaksi menunjukkan pola kunjungan yang konsisten di jam tertentu.', confidence: 86 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Kendalikan Biaya Bahan Baku', desc: 'Biaya bahan baku masih 8% lebih tinggi. Cari supplier alternatif atau beli dalam jumlah grosir untuk mendapatkan harga lebih murah. Targetkan penghematan 5%.', reason: 'Harga supplier belum kembali normal setelah kenaikan sebelumnya.', confidence: 84 },
      { urgency: 'optional', badge: 'Opsional', icon: '💡', title: 'Program Loyalitas Pelanggan', desc: 'Terapkan program poin atau "Beli 10 Gratis 1" untuk mempertahankan pelanggan yang sudah kembali. Pelanggan setia adalah kunci pemulihan bisnis.', reason: 'Mempertahankan pelanggan 5x lebih hemat daripada mendapatkan pelanggan baru.', confidence: 82 }
    ],
    analysis: [
      { icon: 'up', title: 'Omzet Mulai Pulih Naik 8%', desc: 'Omzet bulan ini Rp 1.850.000 — naik 8% dibanding bulan lalu. <strong>Kopi Susu</strong> menjadi motor pemulihan dengan peningkatan penjualan dari 12 menjadi 25 porsi per hari. Tren positif perlu dipertahankan.', reason: 'Strategi promosi Kopi Susu mulai membuahkan hasil dan pelanggan mulai kembali.', urgency: 'normal', confidence: 90 },
      { icon: 'up', title: 'Keuntungan Mulai Membaik', desc: 'Keuntungan naik menjadi Rp 420.000 (+5%). Meskipun masih tipis, ini menunjukkan arah yang benar. Fokus pada efisiensi biaya untuk meningkatkan margin keuntungan.', reason: 'Peningkatan volume penjualan mulai menutup biaya operasional tetap.', urgency: 'normal', confidence: 87 },
      { icon: 'up', title: 'Arus Kas Cukup Stabil', desc: 'Arus kas membaik dengan status "Cukup" dan saldo Rp 850.000. Mulai ada dana untuk pembelian stok. Namun tetap disarankan mengatur pengeluaran dengan hati-hati.', reason: 'Pemulihan penjualan meningkatkan pemasukan kas secara bertahap.', urgency: 'normal', confidence: 85 },
      { icon: 'down', title: 'Perputaran Stok Masih Lambat', desc: 'Perputaran stok masih lambat (skor 55). Stok teh dan beberapa bahan masih menumpuk. Percepat penjualan dengan promo bundling atau diskon terbatas.', reason: 'Stok berlebih dari periode sebelumnya belum terserap dengan baik.', urgency: 'important', confidence: 88 }
    ],
    analysisScore: 78,
    forecast: [
      { icon: 'fa-mug-hot', title: 'Permintaan Kopi Susu Bakal Naik 20%', desc: 'Berdasarkan tren pemulihan, permintaan Kopi Susu diprediksi naik 20% dalam 2 minggu ke depan. Siapkan stok susu dan biji kopi tambahan.', confidence: 90, color: '', reason: 'Tren peningkatan penjualan Kopi Susu konsisten selama 2 minggu terakhir.', urgency: 'important' },
      { icon: 'fa-cube', title: 'Stok Gula Cukup untuk 10 Hari', desc: 'Dengan konsumsi saat ini, stok gula aman untuk 10 hari. Namun antisipasi kenaikan permintaan akhir pekan dengan menambah stok 20% lebih banyak.', confidence: 87, color: 'blue', reason: 'Konsumsi stabil dan stok tersisa masih dalam batas aman.', urgency: 'normal' },
      { icon: 'fa-chart-line', title: 'Omzet Diprediksi Naik 10-15%', desc: 'Jika tren pemulihan berlanjut, omzet bulan depan diprediksi naik 10-15%. Persiapkan strategi untuk memanfaatkan momentum ini.', confidence: 84, color: 'green', reason: 'Pola pemulihan menunjukkan laju pertumbuhan yang berkelanjutan.', urgency: 'normal' }
    ]
  },
  maret: {
    healthScore: 78,
    healthStatus: 'Sehat',
    categories: {
      penjualan: { score: 80, color: 'blue' },
      keuntungan: { score: 75, color: 'blue' },
      arusKas: { score: 82, color: 'blue' },
      perputaranStok: { score: 70, color: 'blue' },
      pertumbuhan: { score: 78, color: 'blue' }
    },
    passport: {
      healthScore: 92,
      healthLabel: 'Sangat Sehat',
      growth: '+15%',
      risk: 'Rendah',
      riskColor: 'var(--secondary)',
      verified: true,
      stats: [
        { label: 'Total Transaksi', value: '1.284' },
        { label: 'Rata-rata/Hari', value: 'Rp 189K' },
        { label: 'Produk Terlaris', value: 'Kopi Susu' },
        { label: 'Rating Pelanggan', value: '4.8 ★' }
      ],
      details: [
        { icon: 'fa-chart-line', label: 'Pendapatan', value: 'Rp 3.250.000', change: '+12%', changeDir: 'up' },
        { icon: 'fa-wallet', label: 'Keuntungan', value: 'Rp 975.000', change: '+8%', changeDir: 'up' },
        { icon: 'fa-exchange-alt', label: 'Arus Kas', value: 'Positif', change: 'Stabil', changeDir: 'up' },
        { icon: 'fa-chart-bar', label: 'Pertumbuhan', value: '+15%', change: 'Bulan ini', changeDir: 'up' }
      ]
    },
    dashboard: {
      revenue: {
        value: 'Rp 2.450.000', change: '+10%', label: 'hari ini',
        summary: 'Pendapatan bulan ini mencapai <strong>Rp 2.450.000</strong>, tumbuh 10% dari bulan lalu. <strong>Kopi Susu</strong> tetap menjadi andalan dengan 32 porsi per hari. Pola pertumbuhan konsisten dan stabil.',
        insight: 'Pertumbuhan 10% didorong oleh kombinasi strategi promosi yang tepat dan peningkatan loyalitas pelanggan. Untuk mempertahankan tren ini, disarankan ekspansi variasi menu dan optimalkan promo bundling.',
        chartTitle: 'Perkembangan Pendapatan Maret 2026',
        chartY: [75, 65, 60, 50, 45, 40, 35, 25],
        chartInsight: 'Pendapatan tumbuh <strong>10% stabil</strong>. Kopi Susu tetap andalan dengan 32 porsi/hari. Pola pertumbuhan konsisten menunjukkan bisnis sehat.'
      },
      profit: {
        value: 'Rp 720.000', change: '+6%', label: 'minggu ini',
        summary: 'Keuntungan stabil di <strong>Rp 720.000</strong> dengan margin yang terjaga. Biaya bahan baku sudah terkendali dan harga jual optimal. Pertahankan strategi pengelolaan biaya saat ini.',
        insight: 'Keuntungan stabil karena efisiensi pengadaan bahan baku dan penyesuaian harga jual membuahkan hasil. Evaluasi harga jual untuk peningkatan margin lebih lanjut sudah bisa dilakukan.',
        chartTitle: 'Perkembangan Keuntungan Maret 2026',
        chartY: [55, 48, 50, 42, 45, 38, 40, 32],
        chartInsight: 'Keuntungan <strong>stabil</strong> dengan margin terjaga. Biaya bahan baku sudah terkendali dan harga jual optimal.'
      },
      cashflow: {
        value: 'Rp 1.250.000', status: 'Stabil', change: '', label: 'cukup',
        summary: 'Arus kas dalam kondisi <strong>stabil</strong> dengan saldo Rp 1.250.000. Bisnis memiliki likuiditas yang cukup untuk operasional dan pengembangan. Pemasukan konsisten dari penjualan harian.',
        insight: 'Arus kas sehat dan stabil karena pemasukan konsisten. Disarankan menyisihkan sebagian surplus untuk dana cadangan dan persiapan investasi pengembangan usaha di masa depan.',
        chartTitle: 'Perkembangan Arus Kas Maret 2026',
        chartBars: [
          { val: '1.1M', pct: 65 }, { val: '1.15M', pct: 68 }, { val: '1.2M', pct: 72 },
          { val: '1.22M', pct: 73 }, { val: '1.25M', pct: 75 }, { val: '1.28M', pct: 78 }, { val: '1.25M', pct: 75 }
        ],
        chartInsight: 'Arus kas <strong>stabil dan sehat</strong> dengan rata-rata saldo Rp 1,21 juta. Pemasukan konsisten dari penjualan harian.'
      },
      growth: {
        value: '+10%', change: 'Meningkat', label: 'Bulan ini',
        summary: 'Bisnis tumbuh <strong>+10%</strong> secara stabil bulan ini. Pertumbuhan konsisten dari bulan ke bulan menunjukkan tren positif yang berkelanjutan. Semua indikator berada di zona sehat.',
        insight: 'Pertumbuhan 10% stabil menunjukkan bisnis dalam kondisi sehat. Untuk percepatan pertumbuhan, disarankan tambah varian minuman hangat untuk musim hujan dan persiapkan stok untuk akhir pekan.',
        chartTitle: 'Perkembangan Pertumbuhan Maret 2026',
        chartBlocks: [
          { value: '+5%', month: 'Jan', arrow: 'up', label: 'Naik', color: 'warning' },
          { value: '+8%', month: 'Feb', arrow: 'up', label: 'Meningkat', color: 'secondary' },
          { value: '+10%', month: 'Mar', arrow: 'up', label: 'Sehat', color: 'secondary' }
        ],
        chartInsight: 'Pertumbuhan <strong>konsisten meningkat</strong> dari +5% ke +10%. Tren positif yang berkelanjutan menunjukkan strategi bisnis efektif.'
      }
    },
    aiAnalysis: 'Skor bisnis Anda <strong>78</strong> (Sehat). Penjualan cukup baik (80), keuntungan stabil (75), dan arus kas terkendali (82). Perputaran stok (70) masih perlu ditingkatkan — beberapa produk seperti teh perlu strategi promosi agar lebih cepat terjual. Pertumbuhan bisnis (78) menunjukkan tren positif yang perlu dipertahankan.',
    insight: 'Omzet bulan ini tumbuh 10%. Produk <strong>Kopi Susu</strong> masih menjadi andalan dengan 32 porsi per hari. Kondisi bisnis cukup stabil dan menunjukkan perbaikan.',
    priorityText: '✅ Bisnis dalam kondisi <strong>sehat</strong>! Optimalkan dengan menambah varian minuman hangat untuk musim hujan. Pantau stok <strong>gula</strong> agar tidak kehabisan.',
    aiPreviewText: 'Dengan kondisi bisnis yang sehat, AKSA merekomendasikan untuk <strong>ekspansi variasi menu</strong> dan meningkatkan efisiensi stok. Pertahankan momentum pertumbuhan dengan promosi bundling yang sudah terbukti efektif.',
    recommendations: [
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Tambah Varian Minuman Hangat', desc: 'Musim hujan meningkatkan permintaan minuman hangat. Tambah varian seperti Kopi Aren, Cokelat Hangat, atau Wedang Jahe untuk menarik pelanggan baru dan meningkatkan omzet.', reason: 'Pola musiman menunjukkan permintaan minuman hangat naik signifikan saat musim hujan.', confidence: 93 },
      { urgency: 'urgent', badge: 'Sangat Mendesak', icon: '🔥', title: 'Optimalkan Promo Bundling', desc: 'Promo bundling Kopi Susu + Roti Bakar terbukti meningkatkan penjualan 35%. Kembangkan bundling varian baru seperti Kopi Aren + Pisang Goreng untuk variasi.', reason: 'Data historis membuktikan promo bundling efektif meningkatkan rata-rata transaksi.', confidence: 89 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Tingkatkan Perputaran Stok Teh', desc: 'Stok teh masih bergerak lambat. Buat menu spesial "Es Teh Segar" dengan harga promo atau bundling dengan gorengan untuk mempercepat perputaran stok.', reason: 'Perputaran stok teh masih di bawah optimal, berpotensi merugikan.', confidence: 86 },
      { urgency: 'important', badge: 'Penting', icon: '⚠', title: 'Siapkan Stok untuk Akhir Pekan', desc: 'Akhir pekan diprediksi ramai dengan cuaca dingin. Tambah stok susu 30% dan gula 20% dari biasanya. Pastikan semua bahan baku tersedia cukup.', reason: 'Pola penjualan akhir pekan menunjukkan lonjakan permintaan yang konsisten.', confidence: 88 },
      { urgency: 'optional', badge: 'Opsional', icon: '💡', title: 'Evaluasi Harga Jual', desc: 'Dengan kondisi bisnis yang stabil, evaluasi harga jual untuk meningkatkan margin. Kenaikan Rp 500-1000 per produk dapat meningkatkan keuntungan 10-15%.', reason: 'Margin saat ini sudah stabil, ada ruang untuk penyesuaian harga.', confidence: 84 }
    ],
    analysis: [
      { icon: 'up', title: 'Omzet Naik 10% Stabil', desc: 'Omzet bulan ini Rp 2.450.000 dengan pertumbuhan 10%. <strong>Kopi Susu</strong> tetap menjadi andalan dengan 32 porsi per hari. Pola pertumbuhan konsisten dan stabil menunjukkan bisnis sehat.', reason: 'Kombinasi strategi promosi yang tepat dan loyalitas pelanggan meningkat.', urgency: 'normal', confidence: 93 },
      { icon: 'up', title: 'Keuntungan Stabil di Rp 720.000', desc: 'Keuntungan stabil di Rp 720.000 dengan margin yang terjaga. Biaya bahan baku sudah terkendali dan harga jual optimal. Pertahankan strategi pengelolaan biaya saat ini.', reason: 'Efisiensi pengadaan bahan baku dan penyesuaian harga jual membuahkan hasil.', urgency: 'normal', confidence: 90 },
      { icon: 'up', title: 'Arus Kas Stabil dan Sehat', desc: 'Arus kas dalam kondisi stabil dengan status "Stabil" dan saldo Rp 1.250.000. Bisnis memiliki likuiditas yang cukup untuk operasional dan pengembangan.', reason: 'Pemasukan konsisten dari penjualan harian menjamin kelancaran arus kas.', urgency: 'normal', confidence: 91 },
      { icon: 'down', title: 'Perputaran Stok Butuh Peningkatan', desc: 'Skor perputaran stok 70 — masih di bawah kategori ideal. Fokus pada strategi promosi untuk produk yang lambat bergerak seperti teh dan beberapa bahan kue.', reason: 'Beberapa item stok memiliki permintaan musiman yang belum dioptimalkan.', urgency: 'important', confidence: 86 }
    ],
    analysisScore: 92,
    forecast: [
      { icon: 'fa-mug-hot', title: 'Permintaan Minuman Hangat Naik 30%', desc: 'Musim hujan diprediksi meningkatkan permintaan minuman hangat hingga 30%. Siapkan stok kopi, susu, cokelat, dan jahe untuk mengantisipasi lonjakan.', confidence: 93, color: '', reason: 'Pola musiman konsisten menunjukkan kenaikan permintaan saat musim hujan.', urgency: 'important' },
      { icon: 'fa-cart-plus', title: 'Omzet Diprediksi Tembus Rp 3 Juta', desc: 'Dengan strategi yang tepat, omzet bulan depan diprediksi tembus Rp 3 juta untuk pertama kalinya. Fokus pada promosi bundling dan varian baru.', confidence: 89, color: 'green', reason: 'Tren pertumbuhan 10% per bulan mendekati target Rp 3 juta.', urgency: 'normal' },
      { icon: 'fa-snowflake', title: 'Es Teh Turun 10% Musim Hujan', desc: 'Permintaan Es Teh diperkirakan turun 10% selama musim hujan. Kurangi stok es dan alihkan fokus promosi ke minuman hangat.', confidence: 86, color: 'orange', reason: 'Pola musiman menunjukkan penurunan permintaan minuman dingin saat hujan.', urgency: 'normal' }
    ]
  }
};

const availableYears = [2024, 2025, 2026];
let selectedMonth = 'keseluruhan';
let selectedYear = 2026;

function getData() {
  if (selectedMonth === 'keseluruhan') return monthData.keseluruhan;
  if (selectedYear !== 2026) return null;
  return monthData[selectedMonth] || null;
}

function hasMonthData(key) {
  if (key === 'keseluruhan') return true;
  // Data hanya tersedia untuk tahun 2026
  if (selectedYear !== 2026) return false;
  return !!monthData[key];
}

/* ----- Set Status Bar Time ----- */
function updateStatusBarTime() {
  const timeEl = document.querySelector('.time');
  if (timeEl) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = hours + ':' + minutes;
  }
}

/* ----- Initialize Page ----- */
function renderPassport() {
  const period = getStoredPeriod();
  const data = monthData[period];
  if (!data || !data.passport) return;
  const p = data.passport;

  const score = document.getElementById('passportScore');
  if (score) score.textContent = p.healthScore;
  const label = document.getElementById('passportScoreLabel');
  if (label) label.textContent = p.healthLabel;
  const growth = document.getElementById('passportGrowth');
  if (growth) growth.textContent = p.growth;
  const risk = document.getElementById('passportRisk');
  if (risk) {
    risk.textContent = p.risk;
    risk.style.background = p.riskColor;
    risk.style.color = '#fff';
  }
  const verified = document.getElementById('passportVerified');
  if (verified) verified.style.display = p.verified ? 'flex' : 'none';

  const statsEl = document.getElementById('passportStats');
  if (statsEl && p.stats) {
    statsEl.innerHTML = p.stats.map(s => `
      <div class="passport-stat">
        <div class="stat-value green">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  const detailsEl = document.getElementById('passportDetails');
  if (detailsEl && p.details) {
    detailsEl.innerHTML = p.details.map(d => `
      <div class="passport-detail-card">
        <div class="pdc-icon blue"><i class="fas ${d.icon}"></i></div>
        <div class="pdc-info">
          <span class="pdc-label">${d.label}</span>
          <span class="pdc-value">${d.value}</span>
        </div>
      </div>
    `).join('');
  }
}

function applyManualData() {
  const saved = localStorage.getItem('aksaManualData');
  const source = localStorage.getItem('aksaDataSource');
  if (!saved || source !== 'manual') return;
  try {
    const entries = JSON.parse(saved);
    if (!Array.isArray(entries) || entries.length === 0) return;
    let totalRevenue = 0;
    entries.forEach(e => {
      const qty = parseInt(e.quantity) || 0;
      const price = parseInt(e.price) || 0;
      totalRevenue += qty * price;
    });
    if (totalRevenue > 0) {
      const formatted = 'Rp ' + totalRevenue.toLocaleString('id-ID');
      const revEl = document.querySelector('.metric-card[data-metric="revenue"] .metric-value');
      if (revEl) revEl.textContent = formatted;
    }
  } catch(e) {
    console.warn('Failed to parse manual data:', e);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 30000);

  // Set current year in footer if present
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Restore selected month and year FIRST
  const savedMonth = localStorage.getItem('aksaMonth');
  if (savedMonth && monthKeys.includes(savedMonth)) {
    selectedMonth = savedMonth;
  }
  const savedYear = localStorage.getItem('aksaYear');
  if (savedYear && availableYears.includes(parseInt(savedYear))) {
    selectedYear = parseInt(savedYear);
  }

  // Init period selector
  initPeriodSelector();

  // Check if selected month has data
  const hasData = selectedMonth === 'keseluruhan' || hasMonthData(selectedMonth);

  if (!hasData) {
    // Show empty state
    document.querySelectorAll('.health-card, .priority-card, .metric-grid, .insight-card, .ai-preview, .report-overview, .report-grid, .report-interpretation, .detail-insight, .detail-header-value, .chart-card, .detail-summary, .detail-insight, .btn-full, .recommendation-list, .analysis-section, #forecastContainer, #recommendationList, #analysisSection, .forecast-card').forEach(el => {
      if (el) el.style.display = 'none';
    });
    showEmptyState();
  } else {
    // Re-enable empty state elements if they were hidden
    document.querySelectorAll('.empty-state')?.forEach(el => el.remove());
    document.querySelectorAll('.health-card, .priority-card, .metric-grid, .insight-card, .ai-preview, .report-overview, .report-grid, .report-interpretation, .detail-insight, .detail-header-value, .chart-card, .detail-summary, .detail-insight, .btn-full, .recommendation-list, .analysis-section, #forecastContainer, #recommendationList, #analysisSection, .forecast-card').forEach(el => {
      if (el) el.style.display = '';
    });

    // --- Dashboard Page ---
    if (document.querySelector('.health-card')) {
    const scoreNum = document.querySelector('.score-circle .number');
    if (scoreNum) {
      const healthScore = getData().healthScore;
      animateCounter(scoreNum, healthScore, '');
    }
    // Update health status text
    const statusEl = document.querySelector('.score-status');
    if (statusEl) {
      const statusTextNode = statusEl.childNodes[0];
      if (statusTextNode) {
        statusTextNode.textContent = getData().healthStatus;
      }
    }
    // Update dashboard metrics
    updateDashboardMetrics();
  }

  // --- Health Report Page ---
  if (document.querySelector('.report-overview')) {
    updateHealthReport();
  }

  // --- Detail Pages ---
  if (document.querySelector('.detail-big-value')) {
    updateDetailPage();
  }

  // --- Recommendation Page ---
  if (document.getElementById('recommendationList')) {
    updateRecommendations();
  }

  // --- Analysis Page ---
  if (document.getElementById('analysisSection')) {
    updateAnalysisPage();
  }

  // --- Forecast Page ---
  if (document.getElementById('forecastContainer')) {
    updateForecastPage();
  }

  // --- Analysis Page (confidence score - legacy support) ---
  if (document.getElementById('confScore')) {
    animateCounter(document.getElementById('confScore'), 92, '%');
    animateConfidence('.conf-fill', 92);
  }
  }

  // --- Passport Page ---
  if (document.getElementById('passportScore')) {
    renderPassport();
  }

  // --- Apply Manual Data if exists ---
  applyManualData();

  // --- Assistant Page ---
  setupChat();

  // --- Sidebar ---
  initSidebar();

  // --- Premium ---
  initPremium();
  // Always update sidebar premium state on every page
  updatePremiumUI();

  // Ensure content scrolls to top on load
  const content = document.querySelector('.content');
  if (content) {
    content.scrollTop = 0;
  }
});

/* ----- Animate Gauge Chart ----- */
function animateGauge(score) {
  const gaugeFill = document.querySelector('.gauge-fill');
  const gaugeText = document.getElementById('gaugeScore');
  if (!gaugeFill || !gaugeText) return;
  const circumference = 2 * Math.PI * 58;
  const offset = circumference * (1 - score / 100);
  gaugeFill.style.strokeDasharray = circumference;
  gaugeFill.style.strokeDashoffset = circumference;
  setTimeout(() => {
    gaugeFill.style.strokeDashoffset = offset;
  }, 100);
  animateCounter(gaugeText, score, '');
}

function updateDashboardMetrics() {
  const data = getData().dashboard;
  const metricCards = document.querySelectorAll('.metric-card');
  if (metricCards.length < 4) return;

  function hasNeg(str) { return str && str.startsWith('-'); }

  // Revenue
  const revValue = metricCards[0].querySelector('.metric-value');
  const revChange = metricCards[0].querySelector('.metric-change');
  if (revValue) revValue.textContent = data.revenue.value;
  if (revChange) {
    const neg = hasNeg(data.revenue.change);
    revChange.innerHTML = `<i class="fas fa-arrow-${neg ? 'down' : 'up'}"></i> ${data.revenue.change} ${data.revenue.label}`;
    revChange.className = `metric-change ${neg ? 'negative' : 'positive'}`;
  }

  // Profit
  const profitValue = metricCards[1].querySelector('.metric-value');
  const profitChange = metricCards[1].querySelector('.metric-change');
  if (profitValue) profitValue.textContent = data.profit.value;
  if (profitChange) {
    const neg = hasNeg(data.profit.change);
    profitChange.innerHTML = `<i class="fas fa-arrow-${neg ? 'down' : 'up'}"></i> ${data.profit.change} ${data.profit.label}`;
    profitChange.className = `metric-change ${neg ? 'negative' : 'positive'}`;
  }

  // Cashflow
  const cashValue = metricCards[2].querySelector('.metric-value');
  const cashChange = metricCards[2].querySelector('.metric-change');
  if (cashValue) cashValue.textContent = data.cashflow.value;
  if (cashChange) {
    const isNeg = data.cashflow.status === 'Negatif';
    cashChange.innerHTML = `<i class="fas fa-${isNeg ? 'arrow-down' : 'minus'}"></i> ${data.cashflow.status}`;
    cashChange.className = `metric-change ${isNeg ? 'negative' : 'positive'}`;
  }

  // Growth
  const growthValue = metricCards[3].querySelector('.metric-value');
  const growthChange = metricCards[3].querySelector('.metric-change');
  if (growthValue) growthValue.textContent = data.growth.value;
  if (growthChange) {
    const isDown = hasNeg(data.growth.value);
    growthChange.innerHTML = `<i class="fas fa-arrow-${isDown ? 'down' : 'up'}"></i> ${data.growth.change} ${data.growth.label}`;
    growthChange.className = `metric-change ${isDown ? 'negative' : 'positive'}`;
  }

  // Update insight card
  const insightText = document.querySelector('.insight-card p');
  if (insightText) {
    insightText.innerHTML = getData().insight;
  }

  // Update priority card
  const priorityCard = document.querySelector('.priority-card p');
  if (priorityCard) {
    priorityCard.innerHTML = getData().priorityText || '';
  }

  // Update AI preview (Today's Recommendation)
  const aiPreview = document.querySelector('.ai-preview p');
  if (aiPreview) {
    aiPreview.innerHTML = getData().aiPreviewText || '';
  }

  // Animate health score gauge
  animateGauge(getData().healthScore);
}

function updateHealthReport() {
  const data = getData();

  // Update score (gauge)
  const gaugeText = document.getElementById('healthGaugeScore');
  const gaugeFill = document.querySelector('.report-overview .gauge-fill');
  const statusBadge = document.querySelector('.report-status-badge');
  if (gaugeText) animateCounter(gaugeText, data.healthScore, '');
  if (gaugeFill) {
    const circumference = 2 * Math.PI * 58;
    const offset = circumference * (1 - data.healthScore / 100);
    gaugeFill.style.strokeDasharray = circumference;
    gaugeFill.style.strokeDashoffset = offset;
    if (data.healthScore >= 90) gaugeFill.setAttribute('stroke', 'var(--secondary)');
    else if (data.healthScore >= 70) gaugeFill.setAttribute('stroke', 'var(--primary)');
    else if (data.healthScore >= 50) gaugeFill.setAttribute('stroke', 'var(--warning)');
    else gaugeFill.setAttribute('stroke', 'var(--danger)');
  }
  if (statusBadge) {
    statusBadge.innerHTML = `<i class="fas fa-check-circle"></i> ${data.healthStatus}`;
    statusBadge.className = 'report-status-badge';
    if (data.healthStatus === 'Sangat Sehat') {
      statusBadge.style.background = 'var(--secondary-bg)';
      statusBadge.style.color = 'var(--secondary)';
    } else if (data.healthStatus === 'Sehat') {
      statusBadge.style.background = 'var(--secondary-bg)';
      statusBadge.style.color = 'var(--secondary)';
    } else if (data.healthStatus === 'Perlu Perhatian') {
      statusBadge.style.background = 'var(--warning-bg)';
      statusBadge.style.color = 'var(--warning)';
    } else if (data.healthStatus === 'Kritis') {
      statusBadge.style.background = 'var(--danger-bg)';
      statusBadge.style.color = 'var(--danger)';
    }
  }

  // Update categories
  const cats = document.querySelectorAll('.report-category');
  const catKeys = ['penjualan', 'keuntungan', 'arusKas', 'perputaranStok', 'pertumbuhan'];
  cats.forEach((cat, i) => {
    if (i >= catKeys.length) return;
    const key = catKeys[i];
    const catData = data.categories[key];
    if (!catData) return;

    const scoreEl = cat.querySelector('.cat-score');
    const fillEl = cat.querySelector('.cat-fill');
    if (scoreEl) {
      scoreEl.textContent = catData.score;
      scoreEl.style.color = catData.color === 'red' ? 'var(--danger)' : catData.color === 'orange' ? 'var(--warning)' : 'var(--secondary)';
    }
    if (fillEl) {
      fillEl.style.width = catData.score + '%';
      fillEl.className = 'cat-fill ' + catData.color;
    }
  });

  // Update interpretation checkmark
  document.querySelectorAll('.interpretation-item').forEach(item => {
    const span = item.querySelector('span:last-child');
    if (span) {
      const icon = span.querySelector('.fa-check-circle');
      if (icon) icon.remove();
    }
  });

  const score = data.healthScore;
  let rangeKey = 'kritis';
  if (score >= 90) rangeKey = 'sangat-sehat';
  else if (score >= 70) rangeKey = 'sehat';
  else if (score >= 50) rangeKey = 'perlu-perhatian';
  else if (score >= 30) rangeKey = 'berisiko';

  const activeItem = document.querySelector(`.interpretation-item[data-range="${rangeKey}"]`);
  if (activeItem) {
    const labelSpan = activeItem.querySelector('span:last-child');
    if (labelSpan && !labelSpan.querySelector('.fa-check-circle')) {
      labelSpan.append(' ');
      const icon = document.createElement('i');
      icon.className = 'fas fa-check-circle';
      icon.style.color = 'var(--secondary)';
      labelSpan.appendChild(icon);
    }
  }

  // Update AI analysis
  const insightEl = document.querySelector('.detail-insight p');
  if (insightEl) {
    insightEl.innerHTML = data.aiAnalysis;
  }
}

function updateRecommendations() {
  const container = document.getElementById('recommendationList');
  if (!container) return;
  const data = getData();
  if (!data || !data.recommendations) return;

  container.innerHTML = data.recommendations.map(rec => {
    const urgencyLabel = rec.urgency === 'urgent' ? 'Sangat Penting' : rec.urgency === 'important' ? 'Penting' : 'Normal';
    const urgencyClass = rec.urgency === 'urgent' ? 'urgent' : rec.urgency === 'important' ? 'important' : 'normal';
    return `
    <div class="rec-item ${rec.urgency}">
      <div class="rec-header">
        <span class="rec-badge ${rec.urgency}"><i class="fas ${rec.urgency === 'urgent' ? 'fa-fire' : rec.urgency === 'important' ? 'fa-triangle-exclamation' : 'fa-lightbulb'}"></i> ${rec.badge}</span>
        <span class="rec-icon">${rec.icon}</span>
      </div>
      <h4 class="rec-title">${rec.title}</h4>
      <p class="rec-desc">${rec.desc}</p>
      ${rec.reason || rec.confidence ? `
      <div class="explainable-ai">
        <div class="ai-explain-row">
          <span class="ai-explain-label">Mengapa?</span>
          <span class="ai-explain-value reason">${rec.reason || '-'}</span>
        </div>
        <div class="ai-explain-row">
          <span class="ai-explain-label">Urgensi</span>
          <span class="ai-explain-value urgency ${urgencyClass}"><i class="fas ${urgencyClass === 'urgent' ? 'fa-fire' : urgencyClass === 'important' ? 'fa-triangle-exclamation' : 'fa-check-circle'}"></i> ${urgencyLabel}</span>
        </div>
        <div class="ai-explain-row">
          <span class="ai-explain-label">Confidence</span>
          <span class="ai-explain-value confidence-val">${rec.confidence || 0}%</span>
          <div class="ai-conf-mini-bar"><div class="conf-mini-fill" data-target="${rec.confidence || 0}"></div></div>
        </div>
      </div>
      ` : ''}
    </div>
    `;
  }).join('');

  // Animate mini confidence bars
  setTimeout(() => {
    container.querySelectorAll('.conf-mini-fill').forEach(el => {
      const target = el.getAttribute('data-target');
      if (target) el.style.width = target + '%';
    });
  }, 200);
}

function updateAnalysisPage() {
  const container = document.getElementById('analysisSection');
  if (!container) return;
  const data = getData();
  if (!data || !data.analysis) return;

  container.innerHTML = `
    <div class="analysis-card">
      ${data.analysis.map((item, i) => {
        const urgencyLabel = item.urgency === 'urgent' ? 'Sangat Penting' : item.urgency === 'important' ? 'Penting' : 'Normal';
        const urgencyClass = item.urgency === 'urgent' ? 'urgent' : item.urgency === 'important' ? 'important' : 'normal';
        return `
        <div class="analysis-item"${i === data.analysis.length - 1 ? ' style="border-bottom: none; padding-bottom: 0;"' : ''}>
          <div class="item-header">
            <i class="fas fa-arrow-${item.icon === 'up' ? 'up up' : 'down down'}"></i>
            <h4>${item.title}</h4>
          </div>
          <div class="item-desc">${item.desc}</div>
          ${item.reason || item.urgency || item.confidence ? `
          <div class="explainable-ai">
            <div class="ai-explain-row">
              <span class="ai-explain-label">Mengapa?</span>
              <span class="ai-explain-value reason">${item.reason || '-'}</span>
            </div>
            <div class="ai-explain-row">
              <span class="ai-explain-label">Urgensi</span>
              <span class="ai-explain-value urgency ${urgencyClass}"><i class="fas ${urgencyClass === 'urgent' ? 'fa-fire' : urgencyClass === 'important' ? 'fa-triangle-exclamation' : 'fa-check-circle'}"></i> ${urgencyLabel}</span>
            </div>
            <div class="ai-explain-row">
              <span class="ai-explain-label">Confidence</span>
              <span class="ai-explain-value confidence-val">${item.confidence || 0}%</span>
              <div class="ai-conf-mini-bar"><div class="conf-mini-fill" data-target="${item.confidence || 0}"></div></div>
            </div>
          </div>
          ` : ''}
        </div>
        `;
      }).join('')}
    </div>
  `;

  // Animate mini confidence bars
  setTimeout(() => {
    container.querySelectorAll('.conf-mini-fill').forEach(el => {
      const target = el.getAttribute('data-target');
      if (target) el.style.width = target + '%';
    });
  }, 200);

  // Update confidence score based on period
  const score = data.analysisScore || 92;
  const confScoreEl = document.getElementById('confScore');
  if (confScoreEl) {
    animateCounter(confScoreEl, score, '%');
    animateConfidence('.conf-fill', score);
  }
}

function updateForecastPage() {
  const container = document.getElementById('forecastContainer');
  if (!container) return;
  const data = getData();
  if (!data || !data.forecast) return;

  container.innerHTML = data.forecast.map(item => {
    const urgencyLabel = item.urgency === 'urgent' ? 'Sangat Penting' : item.urgency === 'important' ? 'Penting' : 'Normal';
    const urgencyClass = item.urgency === 'urgent' ? 'urgent' : item.urgency === 'important' ? 'important' : 'normal';
    return `
    <div class="forecast-card">
      <div class="forecast-header">
        <i class="fas ${item.icon}"></i>
        <h4>${item.title}</h4>
      </div>
      <p class="forecast-desc">${item.desc}</p>
      <div class="forecast-stats">
        <div class="forecast-progress">
          <div class="progress-fill${item.color ? ' ' + item.color : ''}" style="width: 0%;"></div>
        </div>
        <div class="forecast-conf">
          <i class="fas fa-check-circle" style="color: var(--primary);"></i>
          <strong style="font-size: 14px;">${item.confidence}%</strong>
        </div>
      </div>
      ${item.reason || item.urgency ? `
      <div class="explainable-ai">
        <div class="ai-explain-row">
          <span class="ai-explain-label">Mengapa?</span>
          <span class="ai-explain-value reason">${item.reason || '-'}</span>
        </div>
        <div class="ai-explain-row">
          <span class="ai-explain-label">Urgensi</span>
          <span class="ai-explain-value urgency ${urgencyClass}"><i class="fas ${urgencyClass === 'urgent' ? 'fa-fire' : urgencyClass === 'important' ? 'fa-triangle-exclamation' : 'fa-check-circle'}"></i> ${urgencyLabel}</span>
        </div>
        <div class="ai-explain-row">
          <span class="ai-explain-label">Confidence</span>
          <span class="ai-explain-value confidence-val">${item.confidence || 0}%</span>
          <div class="ai-conf-mini-bar"><div class="conf-mini-fill" data-target="${item.confidence || 0}"></div></div>
        </div>
      </div>
      ` : ''}
    </div>
    `;
  }).join('');

  // Animate confidence bars after render
  setTimeout(() => {
    container.querySelectorAll('.forecast-conf strong').forEach(el => {
      const val = parseInt(el.textContent);
      if (!isNaN(val)) {
        animateConfidence(el.closest('.forecast-card').querySelector('.progress-fill'), val);
      }
    });
    container.querySelectorAll('.conf-mini-fill').forEach(el => {
      const target = el.getAttribute('data-target');
      if (target) el.style.width = target + '%';
    });
  }, 100);
}

function updateDetailPage() {
  const data = getData().dashboard;
  const pageTitle = document.querySelector('.page-header h1')?.textContent?.toLowerCase() || '';

  function hasNeg(str) { return str && str.startsWith('-'); }

  let metric = '';
  if (pageTitle.includes('pendapatan')) {
    metric = 'revenue';
  } else if (pageTitle.includes('keuntungan')) {
    metric = 'profit';
  } else if (pageTitle.includes('kas')) {
    metric = 'cashflow';
  } else if (pageTitle.includes('tumbuhan')) {
    metric = 'growth';
  }

  if (!metric) return;
  const metricData = data[metric];

  // Update big value / change / label
  const val = document.querySelector('.detail-big-value');
  const change = document.querySelector('.detail-big-change');
  const label = document.querySelector('.detail-big-label');

  if (metric === 'revenue') {
    if (val) val.textContent = metricData.value;
    if (change) {
      const neg = hasNeg(metricData.change);
      change.innerHTML = `<i class="fas fa-arrow-${neg ? 'down' : 'up'}"></i> ${metricData.change} ${metricData.label}`;
      change.className = `detail-big-change ${neg ? 'negative' : 'positive'}`;
    }
    if (label) label.textContent = 'Total pendapatan ' + metricData.label;
  } else if (metric === 'profit') {
    if (val) val.textContent = metricData.value;
    if (change) {
      const neg = hasNeg(metricData.change);
      change.innerHTML = `<i class="fas fa-arrow-${neg ? 'down' : 'up'}"></i> ${metricData.change} ${metricData.label}`;
      change.className = `detail-big-change ${neg ? 'negative' : 'positive'}`;
    }
    if (label) label.textContent = 'Total keuntungan ' + metricData.label;
  } else if (metric === 'cashflow') {
    if (val) val.textContent = metricData.value;
    if (change) {
      const isNeg = metricData.status === 'Negatif';
      change.innerHTML = `<i class="fas fa-${isNeg ? 'arrow-down' : 'minus'}"></i> ${metricData.status}`;
      change.className = `detail-big-change ${isNeg ? 'negative' : 'positive'}`;
    }
    if (label) label.textContent = 'Saldo arus kas ' + metricData.label;
  } else if (metric === 'growth') {
    if (val) val.textContent = metricData.value;
    if (change) {
      const isDown = hasNeg(metricData.value);
      change.innerHTML = `<i class="fas fa-arrow-${isDown ? 'down' : 'up'}"></i> ${metricData.change} ${metricData.label}`;
      change.className = `detail-big-change ${isDown ? 'negative' : 'positive'}`;
    }
    if (label) label.textContent = 'Pertumbuhan bisnis ' + metricData.label;
  }

  // Update summary, insight, and chart title
  const summaryEl = document.getElementById('detailSummary');
  const insightEl = document.getElementById('detailInsight');
  const chartTitleEl = document.getElementById('chartTitle');
  if (summaryEl && metricData.summary) summaryEl.innerHTML = metricData.summary;
  if (insightEl && metricData.insight) insightEl.innerHTML = metricData.insight;
  if (chartTitleEl && metricData.chartTitle) chartTitleEl.textContent = metricData.chartTitle;

  renderDetailChart(metric, metricData);
}

function renderDetailChart(metric, d) {
  const container = document.getElementById('detailChart');
  if (!container) return;

  if (metric === 'revenue' && d.chartY) {
    const xs = [10, 50, 90, 130, 170, 210, 250, 290];
    const pts = xs.map((x, i) => x + ',' + d.chartY[i]).join(' ');
    const areaPath = 'M0,120 ' + xs.map((x, i) => 'L' + x + ',' + d.chartY[i]).join(' ') + ' L300,120 Z';
    container.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
        <defs><linearGradient id="revGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#2563EB;stop-opacity:0.15"/>
          <stop offset="100%" style="stop-color:#2563EB;stop-opacity:0.01"/>
        </linearGradient></defs>
        <path d="${areaPath}" fill="url(#revGrad)"/>
        <polyline fill="none" stroke="#2563EB" stroke-width="2" points="${pts}" vector-effect="non-scaling-stroke"/>
        <circle cx="${xs[xs.length-1]}" cy="${d.chartY[d.chartY.length-1]}" r="3" fill="#2563EB"/>
      </svg>`;
  } else if (metric === 'profit' && d.chartY) {
    const xs = [10, 50, 90, 130, 170, 210, 250, 290];
    const pts = xs.map((x, i) => x + ',' + d.chartY[i]).join(' ');
    const areaPath = 'M0,120 ' + xs.map((x, i) => 'L' + x + ',' + d.chartY[i]).join(' ') + ' L300,120 Z';
    container.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
        <defs><linearGradient id="profitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#10B981;stop-opacity:0.15"/>
          <stop offset="100%" style="stop-color:#10B981;stop-opacity:0.01"/>
        </linearGradient></defs>
        <path d="${areaPath}" fill="url(#profitGrad)"/>
        <polyline fill="none" stroke="#10B981" stroke-width="2" points="${pts}" vector-effect="non-scaling-stroke"/>
        <circle cx="${xs[xs.length-1]}" cy="${d.chartY[d.chartY.length-1]}" r="3" fill="#10B981"/>
      </svg>`;
  } else if (metric === 'cashflow' && d.chartBars) {
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    container.innerHTML = '<div class="bar-chart">' +
      d.chartBars.map((b, i) =>
        '<div class="bar-col"><div class="bar-fill orange" style="height:' + b.pct + '%"><span class="bar-val">' + b.val + '</span></div><span class="bar-label">' + days[i] + '</span></div>'
      ).join('') + '</div>';
  } else if (metric === 'growth' && d.chartBlocks) {
    container.innerHTML = '<div class="pct-blocks">' +
      d.chartBlocks.map(b =>
        '<div class="pct-block"><div class="pct-value" style="color:var(--' + b.color + ')">' + b.value + '</div><div class="pct-month">' + b.month + '</div><div class="pct-arrow ' + b.arrow + '"><i class="fas fa-arrow-' + b.arrow + '"></i> ' + b.label + '</div></div>'
      ).join('') + '</div>';
  }

  const chartInsightEl = document.getElementById('chartInsight');
  if (chartInsightEl && d.chartInsight) chartInsightEl.innerHTML = d.chartInsight;
}

function showEmptyState() {
  const content = document.querySelector('.content');
  if (!content) return;
  const existing = content.querySelector('.empty-state');
  if (existing) return;

  const monthLabel = monthLabels[selectedMonth] || selectedMonth;
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <div class="empty-icon"><i class="fas fa-calendar-times"></i></div>
    <h3>Belum Ada Data</h3>
    <p>Data untuk <strong>${monthLabel} ${selectedYear}</strong> belum tersedia.<br>Silakan pilih bulan atau tahun lain.</p>
  `;
  // Insert after header but before first content
  const header = content.querySelector('.page-header');
  if (header) {
    header.after(div);
  } else {
    content.prepend(div);
  }
}

function initPeriodSelector() {
  const container = document.getElementById('periodSelector');
  if (!container) return;
  container.innerHTML = '';

  // Build trigger bar
  const trigger = document.createElement('div');
  trigger.className = 'period-trigger';
  const curLabel = selectedMonth === 'keseluruhan' ? 'Keseluruhan' : monthLabels[selectedMonth] + ' ' + selectedYear;
  const hasD = selectedMonth === 'keseluruhan' || hasMonthData(selectedMonth);
  trigger.innerHTML = `
    <span class="trigger-label">
      <i class="fas fa-calendar-alt" style="margin-right:8px;color:var(--primary);"></i>
      ${curLabel}
      <span class="trigger-sub">${hasD ? '' : '(Kosong)'}</span>
    </span>
    <span class="trigger-icon"><i class="fas fa-chevron-down"></i></span>
  `;

  // Build dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'period-dropdown';

  // Month items
  monthKeys.forEach(key => {
    const item = document.createElement('div');
    item.className = 'drop-item';
    if (key === selectedMonth) item.classList.add('active');
    if (key !== 'keseluruhan' && !hasMonthData(key)) item.classList.add('no-data');
    item.setAttribute('data-month', key);

    const label = monthLabels[key] || key;
    let sub = '';
    if (key === 'keseluruhan') {
      sub = 'Semua bulan';
    } else {
      sub = hasMonthData(key) ? monthData[key].healthStatus + ' · ' + selectedYear : 'Belum ada data';
    }
    item.innerHTML = `
      <span class="drop-label">
        ${label}
        <span class="drop-sub">${sub}</span>
      </span>
      <span class="drop-check"><i class="fas fa-check"></i></span>
    `;

    item.addEventListener('click', function() {
      const mk = this.getAttribute('data-month');
      if (mk && mk !== selectedMonth) {
        selectedMonth = mk;
        localStorage.setItem('aksaMonth', mk);
        window.location.reload();
      }
    });
    dropdown.appendChild(item);
  });

  // Year row
  const yearRow = document.createElement('div');
  yearRow.className = 'drop-years';
  yearRow.innerHTML = '<span style="font-size:12px;color:var(--text-secondary);margin-right:4px;">Tahun:</span>';
  availableYears.forEach(year => {
    const yp = document.createElement('span');
    yp.className = 'drop-year';
    if (year === selectedYear) yp.classList.add('active');
    yp.textContent = year;
    yp.addEventListener('click', function(e) {
      e.stopPropagation();
      const y = parseInt(this.textContent);
      if (y && y !== selectedYear) {
        selectedYear = y;
        localStorage.setItem('aksaYear', y.toString());
        window.location.reload();
      }
    });
    yearRow.appendChild(yp);
  });
  dropdown.appendChild(yearRow);

  // Toggle dropdown
  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    closeAllPeriodDropdowns();
    if (!isOpen) {
      dropdown.classList.add('open');
      trigger.classList.add('open');
    }
  });

  container.appendChild(trigger);
  container.appendChild(dropdown);

  // Close dropdown on outside click
  if (!window._periodCloseListener) {
    window._periodCloseListener = true;
    document.addEventListener('click', function() {
      closeAllPeriodDropdowns();
    });
  }
}

function closeAllPeriodDropdowns() {
  document.querySelectorAll('.period-dropdown.open').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.period-trigger.open').forEach(t => t.classList.remove('open'));
}

function renderPassport() {
  const data = getData();
  if (!data || !data.passport) return;
  const p = data.passport;

  const score = document.getElementById('passportScore');
  if (score) score.textContent = p.healthScore;
  const label = document.getElementById('passportScoreLabel');
  if (label) label.textContent = p.healthLabel;
  const growth = document.getElementById('passportGrowth');
  if (growth) growth.textContent = p.growth;
  const risk = document.getElementById('passportRisk');
  if (risk) {
    risk.textContent = p.risk;
    risk.style.background = p.riskColor;
    risk.style.color = '#fff';
  }
  const verified = document.getElementById('passportVerified');
  if (verified) verified.style.display = p.verified ? 'flex' : 'none';

  const statsEl = document.getElementById('passportStats');
  if (statsEl && p.stats) {
    statsEl.innerHTML = p.stats.map(s => `
      <div class="passport-stat">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  const detailsEl = document.getElementById('passportDetails');
  if (detailsEl && p.details) {
    detailsEl.innerHTML = p.details.map(d => `
      <div class="passport-detail-card">
        <div class="pdc-icon ${d.changeDir === 'up' ? 'green' : 'orange'}"><i class="fas ${d.icon}"></i></div>
        <div class="pdc-info">
          <span class="pdc-label">${d.label}</span>
          <span class="pdc-value">${d.value}</span>
        </div>
      </div>
    `).join('');
  }
}

function applyManualData() {
  const saved = localStorage.getItem('aksaManualData');
  const source = localStorage.getItem('aksaDataSource');
  if (!saved || source !== 'manual') return;

  try {
    const entries = JSON.parse(saved);
    if (!Array.isArray(entries) || entries.length === 0) return;

    let totalRevenue = 0;
    entries.forEach(e => {
      const qty = parseInt(e.quantity) || 0;
      const price = parseInt(e.price) || 0;
      totalRevenue += qty * price;
    });

    if (totalRevenue > 0) {
      const formatted = 'Rp ' + totalRevenue.toLocaleString('id-ID');
      const revEl = document.querySelector('.metric-card[data-metric="revenue"] .metric-value');
      if (revEl) revEl.textContent = formatted;
    }
  } catch(e) {
    console.warn('Failed to parse manual data:', e);
  }
}

/* ==========================================
   CHAT ASSISTANT
   ========================================== */

/* ----- Chat Responses ----- */
const chatResponses = [
  {
    keywords: ['omzet', 'turun', 'pendapatan', 'penjualan'],
    response: 'Penjualan minuman turun 18% selama 7 hari terakhir.',
    penyebab: 'Produk yang paling memengaruhi:\n• Kopi Susu (-20%)\n• Es Teh (-15%)',
    rekomendasi: 'Buat promo bundling Kopi Susu + Roti Bakar.',
    urgency: 'Penting',
    confidence: 94,
    related: ['analysis', 'forecast', 'recommendation']
  },
  {
    keywords: ['naik', 'meningkat', 'untung', 'laba'],
    response: 'Omzet mengalami kenaikan 12% dibandingkan minggu lalu.',
    penyebab: 'Produk yang paling berkontribusi:\n• Kopi Susu (+25%)\n• Roti Bakar (+15%)',
    rekomendasi: 'Pertahankan stok bahan baku agar tidak kehabisan di akhir pekan.',
    urgency: 'Normal',
    confidence: 92,
    related: ['analysis', 'recommendation']
  },
  {
    keywords: ['stok', 'habis', 'bahan', 'gula', 'susu', 'kopi', 'teh'],
    response: 'Stok gula akan habis dalam 4 hari dengan tingkat konsumsi saat ini.',
    penyebab: 'Konsumsi harian rata-rata 2 kg dengan stok tersisa 8 kg.',
    rekomendasi: 'Segera lakukan pemesanan gula untuk menghindari kehabisan stok.',
    urgency: 'Sangat Penting',
    confidence: 91,
    related: ['forecast', 'recommendation']
  },
  {
    keywords: ['promo', 'promosi', 'diskon', 'bundling'],
    response: 'Promo bundling Kopi Susu + Roti Bakar meningkatkan penjualan 35%.',
    penyebab: 'Data menunjukkan jam 14.00-16.00 memiliki rata-rata kunjungan terendah.',
    rekomendasi: 'Terapkan promo bundling di jam 14.00-16.00 untuk meningkatkan kunjungan.',
    urgency: 'Penting',
    confidence: 89,
    related: ['analysis', 'recommendation']
  },
  {
    keywords: ['pelanggan', 'pengunjung', 'rame', 'ramai', 'sepi'],
    response: 'Jumlah pelanggan meningkat 8% dalam 2 minggu terakhir.',
    penyebab: 'Puncak kunjungan pada jam 08.00-10.00 dan 17.00-19.00.',
    rekomendasi: 'Buat promo khusus di jam sepi (14.00-16.00) untuk menarik pelanggan.',
    urgency: 'Normal',
    confidence: 93,
    related: ['analysis', 'recommendation']
  },
  {
    keywords: ['biaya', 'modal', 'pengeluaran', 'belanja'],
    response: 'Biaya bahan baku naik 8% dibandingkan bulan lalu.',
    penyebab: 'Kenaikan harga susu dan gula menjadi faktor utama.',
    rekomendasi: 'Cari supplier alternatif atau beli dalam jumlah grosir untuk harga lebih murah.',
    urgency: 'Penting',
    confidence: 87,
    related: ['analysis', 'recommendation']
  },
  {
    keywords: ['rekomendasi', 'saran', 'harus', 'baik'],
    response: 'Berdasarkan kondisi bisnis saat ini, berikut rekomendasi prioritas:',
    penyebab: '1. Tambah stok gula (sangat mendesak)\n2. Buat promo bundling untuk jam sepi\n3. Evaluasi harga jual produk\n4. Kurangi stok teh yang berlebih',
    rekomendasi: 'Dengan menerapkan rekomendasi ini, diprediksi omzet dapat naik 15-20% dalam 2 minggu.',
    urgency: 'Sangat Penting',
    confidence: 95,
    related: ['analysis', 'forecast', 'recommendation']
  }
];

function setupChat() {
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatContainer = document.getElementById('chatMessages');

  if (!chatInput || !sendBtn || !chatContainer) return;

  // Load saved chat history
  loadChatHistory();

  // Toggle send button active state based on input
  function toggleSendBtn() {
    if (chatInput.value.trim().length > 0) {
      sendBtn.classList.add('active');
    } else {
      sendBtn.classList.remove('active');
    }
  }

  chatInput.addEventListener('input', toggleSendBtn);
  toggleSendBtn();

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    addUserMessage(text);
    chatInput.value = '';
    toggleSendBtn();

    // Simulate AI typing delay
    setTimeout(() => {
      const response = getAIResponse(text);
      addAIMessage(response.response, response.confidence, response.extra);
    }, 800 + Math.random() * 400);
  }

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
}

function scrollContentToBottom() {
  const content = document.querySelector('.content');
  if (content) {
    content.scrollTop = content.scrollHeight;
  }
}

function addUserMessage(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'chat-message user';
  div.textContent = text;
  container.appendChild(div);
  scrollContentToBottom();
  saveChatHistory();
}

function addAIMessage(text, confidence, extra) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  let structuredHTML = '';

  if (extra && extra.penyebab) {
    // Structured response
    const urgencyClass = extra.urgency === 'Sangat Penting' ? 'urgent' : extra.urgency === 'Penting' ? 'important' : 'normal';
    const urgencyIcon = urgencyClass === 'urgent' ? 'fa-fire' : urgencyClass === 'important' ? 'fa-triangle-exclamation' : 'fa-check-circle';

    let relatedHTML = '';
    if (extra.related && extra.related.length > 0) {
      const relatedLinks = extra.related.map(r => {
        if (r === 'analysis') return '<a href="analysis.html" class="ai-related-link"><i class="fas fa-chart-bar"></i> Business Analysis</a>';
        if (r === 'forecast') return '<a href="forecast.html" class="ai-related-link"><i class="fas fa-chart-simple"></i> Forecast</a>';
        if (r === 'recommendation') return '<a href="recommendation.html" class="ai-related-link"><i class="fas fa-lightbulb"></i> Recommendation</a>';
        return '';
      }).join('');

      relatedHTML = `
        <div class="ai-related">
          <div class="ai-related-title">Analisis Terkait</div>
          <div class="ai-related-links">${relatedLinks}</div>
        </div>
      `;
    }

    structuredHTML = `
      <div class="ai-badge"><i class="fas fa-robot"></i> AKSA AI</div>
      <div><strong>Penyebab</strong></div>
      <div>${text}</div>
      <div style="margin-top:6px;">${extra.penyebab.replace(/\n/g, '<br>')}</div>
      <div style="margin-top:10px;"><strong>Rekomendasi</strong></div>
      <div>${extra.rekomendasi}</div>
      <div class="explainable-ai">
        <div class="ai-explain-row">
          <span class="ai-explain-label">Urgensi</span>
          <span class="ai-explain-value urgency ${urgencyClass}"><i class="fas ${urgencyIcon}"></i> ${extra.urgency}</span>
        </div>
        <div class="ai-explain-row">
          <span class="ai-explain-label">Confidence</span>
          <span class="ai-explain-value confidence-val">${extra.confidence}%</span>
          <div class="ai-conf-mini-bar"><div class="conf-mini-fill" style="width: ${extra.confidence}%;"></div></div>
        </div>
      </div>
      ${relatedHTML}
    `;
  } else {
    // Simple fallback response
    const lines = text.split('\n');
    let formattedText = '';
    lines.forEach((line, idx) => {
      if (line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.') || line.trim().startsWith('4.') || line.trim().startsWith('5.')) {
        formattedText += '<br>' + line;
      } else if (idx > 0 && line.trim() !== '') {
        formattedText += '<br>' + line;
      } else {
        formattedText += line;
      }
    });

    structuredHTML = `
      <div class="ai-badge"><i class="fas fa-robot"></i> AKSA AI</div>
      <div>${formattedText}</div>
      <div class="ai-confidence"><i class="fas fa-check-circle"></i> Confidence: ${confidence || 85}%</div>
    `;
  }

  const div = document.createElement('div');
  div.className = 'chat-message ai';
  div.innerHTML = structuredHTML;
  container.appendChild(div);
  scrollContentToBottom();
  saveChatHistory();
}

function saveChatHistory() {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const messages = [];
  container.querySelectorAll('.chat-message').forEach(msg => {
    const isUser = msg.classList.contains('user');
    messages.push({
      type: isUser ? 'user' : 'ai',
      html: msg.innerHTML,
      text: msg.textContent
    });
  });
  // Limit to last 50 messages
  const limited = messages.slice(-50);
  localStorage.setItem('aksaChatHistory', JSON.stringify(limited));
}

function loadChatHistory() {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const saved = localStorage.getItem('aksaChatHistory');
  if (!saved) return;

  try {
    const messages = JSON.parse(saved);
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'chat-message ' + msg.type;
      div.innerHTML = msg.html;
      container.appendChild(div);
    });
    scrollContentToBottom();
  } catch(e) {
    // ignore parse errors
  }
}

function clearChatHistory() {
  localStorage.removeItem('aksaChatHistory');
}

function getAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  // Find best matching response
  let bestMatch = null;
  let bestScore = 0;

  chatResponses.forEach(item => {
    let score = 0;
    item.keywords.forEach(keyword => {
      if (msg.includes(keyword)) {
        score++;
        // Give extra weight to multiple keyword matches
        const regex = new RegExp(keyword, 'gi');
        const matches = msg.match(regex);
        if (matches) score += matches.length * 0.5;
      }
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });

  // Default response if no keywords match
  if (!bestMatch || bestScore === 0) {
    return {
      response: 'Maaf, saya belum bisa menganalisis pertanyaan tersebut. Coba tanyakan tentang omzet, stok, pelanggan, atau promo bisnis Anda.',
      confidence: 85,
      extra: null
    };
  }

  return {
    response: bestMatch.response,
    confidence: bestMatch.confidence,
    extra: {
      penyebab: bestMatch.penyebab,
      rekomendasi: bestMatch.rekomendasi,
      urgency: bestMatch.urgency,
      confidence: bestMatch.confidence,
      related: bestMatch.related
    }
  };
}

/* ==========================================
   SPLASH SCREEN
   ========================================== */
// Handled in index.html with inline redirect

/* ==========================================
   LOGIN
   ========================================== */
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;

  if (!email || !password) {
    alert('Silakan isi email dan password terlebih dahulu.');
    return false;
  }

  // Simple validation for prototype
  if (!email.includes('@')) {
    alert('Masukkan email yang valid.');
    return false;
  }

  if (password.length < 6) {
    alert('Password minimal 6 karakter.');
    return false;
  }

  localStorage.setItem('aksaLoggedIn', 'true');
  localStorage.setItem('aksaPassword', password);

  if (!localStorage.getItem('aksaOnboarded')) {
    window.location.href = 'business-profile.html';
  } else {
    window.location.href = 'dashboard.html';
  }
  return false;
}

function handleGoogleLogin() {
  localStorage.setItem('aksaLoggedIn', 'true');
  if (!localStorage.getItem('aksaPassword')) {
    localStorage.setItem('aksaPassword', '123456');
  }

  if (!localStorage.getItem('aksaOnboarded')) {
    window.location.href = 'business-profile.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

/* ==========================================
   BUSINESS PROFILE
   ========================================== */
function handleBusinessProfile(e) {
  e.preventDefault();
  window.location.href = 'data-source.html';
  return false;
}

/* ==========================================
   SYNC DETAIL MODAL
   ========================================== */
function openSyncModal() {
  document.getElementById('syncModalOverlay').classList.add('open');
  document.getElementById('syncModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSyncModal() {
  document.getElementById('syncModalOverlay').classList.remove('open');
  document.getElementById('syncModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ==========================================
   DATA SOURCE
   ========================================== */
function selectDataSource(method) {
  localStorage.setItem('aksaDataSource', method);
  localStorage.setItem('aksaSyncTime', new Date().toISOString());
  window.location.href = 'onboarding.html';
}

/* ==========================================
   SIDEBAR NAVIGATION
   ========================================== */

const sidebarConfig = {
  items: [
    { icon: 'fa-house', label: 'Dashboard', href: 'dashboard.html', premium: false },
    { icon: 'fa-chart-bar', label: 'Analisis Bisnis', href: 'analysis.html', premium: false },
    { icon: 'fa-heart-pulse', label: 'Health Report', href: 'health-report.html', premium: false },
    { icon: 'fa-passport', label: 'Business Passport', href: 'passport.html', premium: false },
    { icon: 'fa-list-check', label: 'Rekomendasi', href: 'recommendation.html', premium: false },
    { icon: 'fa-chart-simple', label: 'Prediksi', href: 'forecast.html', premium: true },
    { icon: 'fa-robot', label: 'AI Assistant', href: 'assistant.html', premium: true },
    { icon: 'fa-user', label: 'Profile', href: 'profile.html', premium: false },
    { icon: 'fa-arrow-right-from-bracket', label: 'Keluar', href: 'login.html', premium: false },
  ],
};

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function initSidebar() {
  const phone = document.querySelector('.phone');
  if (!phone) return;

  const currentPage = getCurrentPage();
  const noSidebar = ['index.html', 'login.html', 'business-profile.html', 'data-source.html', 'onboarding.html'];
  if (noSidebar.includes(currentPage)) return;

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';

  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  let html = `
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <img class="logo-mark" src="assets/logo/aksa-logo.png" alt="AKSA">
        <span>AKSA</span>
      </div>
      <button class="sidebar-close" id="sidebarClose"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="sidebar-user">
      <div class="user-avatar"><i class="fas fa-store"></i></div>
      <div class="user-info">
        <div class="user-name">Warung Kopi Senja</div>
        <div class="user-plan">${isPremium ? 'Premium Plan' : 'Basic Plan'}</div>
      </div>
      <span class="user-badge${isPremium ? ' premium' : ''}">${isPremium ? 'Premium' : 'Basic'}</span>
    </div>
    <nav class="sidebar-menu">
  `;

  sidebarConfig.items.forEach(item => {
    const isActive = currentPage === item.href;
    const isLogout = item.label === 'Keluar';
    const premiumTag = item.premium
      ? `<span class="premium-tag" style="${isPremium ? 'display:none' : ''}"><i class="fas fa-crown"></i> Premium</span>`
      : '';
    const extraClass = isLogout ? ' logout-item' : '';
    const logoutAttrs = isLogout
      ? ` onclick="localStorage.removeItem('aksaLoggedIn');localStorage.removeItem('aksaOnboarded');localStorage.removeItem('aksaSyncTime');window.location.href='${item.href}'"`
      : ` href="${item.href}"`;
    html += `
      <a${logoutAttrs} class="sidebar-item${extraClass} ${isActive ? 'active' : ''}">
        <i class="fas ${item.icon}"></i>
        <span class="sidebar-label">${item.label}</span>
        ${premiumTag}
      </a>
    `;
  });

  html += `</nav><div class="sidebar-footer">AKSA v1.0.0</div>`;
  sidebar.innerHTML = html;

  phone.appendChild(overlay);
  phone.appendChild(sidebar);

  document.querySelectorAll('.hamburger').forEach(btn => {
    btn.addEventListener('click', openSidebar);
  });
  document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
}

function openSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('sidebarOverlay');
  if (s) s.classList.add('open');
  if (o) o.classList.add('open');
}

function closeSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('sidebarOverlay');
  if (s) s.classList.remove('open');
  if (o) o.classList.remove('open');
}

/* ==========================================
   PREMIUM SUBSCRIPTION TOGGLE
   ========================================== */

let isPremium = localStorage.getItem('aksapremium') === 'true';

function togglePremium() {
  isPremium = !isPremium;
  localStorage.setItem('aksapremium', isPremium);
  updatePremiumUI();
  updateSidebarPremium();
}

function updatePremiumUI() {
  const toggle = document.getElementById('premiumToggle');
  const label = document.getElementById('premiumLabel');
  const statusText = document.getElementById('premiumStatusText');

  if (toggle) toggle.checked = isPremium;
  if (label) label.textContent = isPremium ? 'Paket Premium' : 'Paket Basic';
  if (statusText) {
    statusText.textContent = isPremium
      ? 'Aktif — Nikmati semua fitur premium'
      : 'Nonaktif — Aktifkan untuk fitur lanjutan';
  }

  // Update sidebar
  const userPlan = document.querySelector('.user-plan');
  const userBadge = document.querySelector('.user-badge');
  if (userPlan) userPlan.textContent = isPremium ? 'Premium Plan' : 'Basic Plan';
  if (userBadge) {
    userBadge.textContent = isPremium ? 'Premium' : 'Basic';
    userBadge.className = 'user-badge' + (isPremium ? ' premium' : '');
  }

  // Toggle premium tags in sidebar menu
  document.querySelectorAll('.sidebar-menu .premium-tag').forEach(tag => {
    tag.style.display = isPremium ? 'none' : '';
  });

  // Toggle premium overlay banners
  const overlayForecast = document.getElementById('premiumOverlayForecast');
  const overlayAssistant = document.getElementById('premiumOverlayAssistant');
  if (overlayForecast) overlayForecast.style.display = isPremium ? 'none' : '';
  if (overlayAssistant) overlayAssistant.style.display = isPremium ? 'none' : '';

  // Hide forecast content when not premium
  const forecastContainer = document.getElementById('forecastContainer');
  if (forecastContainer) {
    forecastContainer.style.opacity = isPremium ? '1' : '0.15';
    forecastContainer.style.pointerEvents = isPremium ? 'auto' : 'none';
  }

  // Hide period selector on forecast page when not premium
  const periodSelectorForecast = document.querySelector('#periodSelector');
  if (periodSelectorForecast && document.getElementById('forecastContainer')) {
    periodSelectorForecast.style.opacity = isPremium ? '1' : '0.4';
    periodSelectorForecast.style.pointerEvents = isPremium ? 'auto' : 'none';
  }

  // Toggle premium-active class on phone container
  const phone = document.querySelector('.phone');
  if (phone) phone.classList.toggle('premium-active', isPremium);

  // Toggle chat input on assistant page
  const chatArea = document.getElementById('chatInputArea');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  if (chatArea) {
    chatArea.style.opacity = isPremium ? '1' : '0.4';
    chatArea.style.pointerEvents = isPremium ? 'auto' : 'none';
  }
  if (chatInput) chatInput.disabled = !isPremium;
  if (sendBtn) sendBtn.disabled = !isPremium;
}

function initPremium() {
  const premiumToggle = document.getElementById('premiumToggle');
  if (premiumToggle) {
    premiumToggle.addEventListener('change', togglePremium);
    updatePremiumUI();
  }
}

function updateSidebarPremium() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const userPlan = sidebar.querySelector('.user-plan');
  const userBadge = sidebar.querySelector('.user-badge');
  if (userPlan) userPlan.textContent = isPremium ? 'Premium Plan' : 'Basic Plan';
  if (userBadge) {
    userBadge.textContent = isPremium ? 'Premium' : 'Basic';
    userBadge.className = 'user-badge' + (isPremium ? ' premium' : '');
  }

  sidebar.querySelectorAll('.premium-tag').forEach(tag => {
    tag.style.display = isPremium ? 'none' : '';
  });
}
