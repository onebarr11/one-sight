# OneSight v7.0.0 - Master Your Routes

Dashboard operasional untuk pengemudi ojol: profit, shift, biaya, target, hotspot, dan laporan. Semua data tersimpan di perangkat Anda (LocalStorage, dengan cermin IndexedDB) dan tidak dikirim ke server.

## Isi folder
| Berkas | Fungsi |
|---|---|
| `index.html` | Aplikasi (satu berkas: HTML, CSS, JavaScript) |
| `logo.svg` | Logo di header dan sidebar |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Ikon PWA |
| `manifest.webmanifest` | Manifest PWA |
| `sw.js` | Service worker (offline dan pembaruan) |

Simpan semuanya dalam satu folder.

## Menjalankan
- **Cepat:** buka `index.html` di browser. Semua fitur jalan, kecuali instal PWA dan mode offline.
- **Dengan PWA:** di folder ini jalankan `python3 -m http.server 8080`, lalu buka `http://localhost:8080`. Untuk di HP, unggah folder ke hosting HTTPS (GitHub Pages, Netlify). Service worker tidak berjalan dari `file://`.

## Mengganti logo
Timpa `logo.svg` (persegi, disarankan 64x64 atau lebih) dengan logo Anda. Untuk ikon PWA, timpa tiga file PNG dengan nama yang sama (192, 512, dan 512 maskable dengan margin aman sekitar 14%). Lalu naikkan versi (lihat di bawah) agar cache diperbarui. Logo bawaan saat ini hanya placeholder.

## Menu
- **Beranda:** profit hari ini, perbandingan dengan kemarin dan target, analitik, aktivitas terbaru, aksi cepat.
- **Kalkulator:** tarif dasar, surge, tarif final; jarak dan durasi; hasil AMBIL, PERTIMBANGKAN, atau LEWATI. Parameter: potongan aplikator, konsumsi BBM, harga BBM.
- **Hotspot:** hotspot, zona merah, jam hindari, jadwal. Hari produktif dipilih dengan tombol Sen sampai Min.
- **Shift:** tanggal, waktu mulai dan selesai, odometer awal dan akhir, total pendapatan kotor, jumlah order selesai, catatan.
- **Riwayat order, Biaya, Biaya kendaraan, Kendaraan, Aplikator:** pencatatan dan pengelolaan.
- **Target:** pilih Harian, Mingguan, atau Bulanan, lalu isi pendapatan, profit, order, jam kerja, dan kilometer.
- **Evaluasi, Prakiraan, Insight, Laporan, Laporan lanjutan:** analitik, insight berbasis aturan, ekspor CSV, JSON, Excel, dan PDF (cetak).
- **Pengingat dan PWA:** pengingat backup, servis, target, penutupan shift; ringkasan harian dan mingguan; pemasangan aplikasi.
- **Data dan backup:** backup dan pemulihan JSON, status penyimpanan.

## Catatan perhitungan
- Profit order dan shift adalah estimasi: tarif dikurangi potongan aplikator dan BBM (jarak ÷ km/L × harga BBM). Penyusutan kendaraan tidak lagi diminta.
- **Patokan kalkulator** (profit minimum per order, per km, per jam) diambil dari **Target harian**: profit ÷ order, ÷ kilometer, ÷ jam kerja. Bila target belum diisi, dipakai nilai bawaan.
- Cuaca hanya diambil saat tombol ditekan; hotspot berasal dari catatan Anda sendiri.

## Penyimpanan dan sinkronisasi
LocalStorage adalah penyimpanan utama dan IndexedDB adalah cermin terverifikasi. Tombol **Sinkronkan ulang cermin** memeriksa dan membangun ulang cermin tersebut. Sinkronisasi cloud antar perangkat belum tersedia karena belum ada server; untuk memindahkan data ke perangkat lain, gunakan backup JSON. Data di browser dan file backup tidak dienkripsi.

## Rilis versi baru
1. Ubah `V` di `sw.js` dan `APPV` di `index.html` (dan `app-version` pada meta).
2. Unggah ulang semua berkas. Pengguna akan melihat tombol **Perbarui**; data mereka tidak berubah.

Strategi cache: halaman memakai jaringan lebih dulu (batas 4 detik) lalu cadangan offline; berkas lokal dari cache; font disegarkan di latar belakang; cuaca tidak pernah di-cache.

## Perubahan v7
- Nama menjadi **OneSight** (slogan Master Your Routes), logo baru, indikator Online dihapus.
- Beranda: tombol ganda dihapus; aksi masuk hanya lewat Aksi cepat.
- Shift disederhanakan; tombol menjadi **Simpan**.
- Kalkulator: penjelasan tarif dasar, surge, tarif final (dengan tarif final langsung terhitung); kolom penyusutan dihapus.
- Hotspot: penjelasan istilah dan pemilih hari.
- Riwayat order: setiap nilai diberi nama kolom.
- Target: pilihan Harian, Mingguan, Bulanan.
- Aplikator menjadi menu sendiri.
- Data dan backup: tombol sinkronisasi diganti yang berfungsi dan memberi umpan balik.
- Pengaturan: "Batas keputusan order" dihapus; patokan diambil dari Target harian.
