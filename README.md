# Ojol Ops v6.1 (Fase 8-11 + penyempurnaan UI/UX)

Berkas: index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, icon-maskable-512.png. Simpan semuanya dalam satu folder.

## Menjalankan dengan PWA
Service worker tidak berjalan dari file://. Di folder ini jalankan `python3 -m http.server 8080`, lalu buka http://localhost:8080
(localhost dianggap konteks aman). Untuk di HP, unggah folder ke hosting HTTPS (GitHub Pages, Netlify).
Tanpa server, index.html tetap berfungsi penuh, hanya tanpa mode offline/instal.

## Rilis versi baru
Ubah `V` di sw.js dan `APPV` di index.html. Pengguna melihat tombol Perbarui; data tidak berubah (localStorage).

## Cache
Navigasi: jaringan dulu (batas 4 detik), cadangan offline. Berkas lokal: cache. Font: segarkan di latar belakang. Cuaca: tidak pernah di-cache.
