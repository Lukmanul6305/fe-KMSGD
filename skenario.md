Skenario 1: Silent Refresh (Paling Ideal & Sering Digunakan)
Admin tidak akan menyadari kalau tokennya sudah habis. Semua terjadi secara instan di balik layar saat Admin melakukan klik pertama setelah kembali.

Admin kembali ke laptop, lalu mengklik menu "Tambah Kegiatan".

Frontend mengirim permintaan (request) ke backend sambil membawa access token yang sudah mati.

Backend merespons dengan error: 401 Unauthorized (Token Expired).

Interseptor Frontend Beraksi: Kode frontend kamu mendeteksi error 401 tersebut. Frontend langsung menjeda (pause) request "Tambah Kegiatan" tadi, lalu diam-diam menembak API /refresh sambil membawa refresh token.

Backend memeriksa refresh token. Karena refresh token punya umur panjang (misal 7 hari) dan Admin baru ditinggal 2 jam, maka backend mengonfirmasi: "Oke valid, ini access token barumu."

Frontend menerima access token baru, lalu otomatis mengulang kembali request "Tambah Kegiatan" yang sempat tertunda tadi.

Hasilnya: Halaman "Tambah Kegiatan" terbuka dengan lancar. Admin merasa webnya normal-normal saja.

Skenario 2: Terlempar ke Halaman Login (Jika Ditinggal Terlalu Lama)
Skenario ini terjadi jika Admin diamnya keterlaluan lama, misalnya ditinggal liburan 2 minggu, sehingga bukan cuma access token-nya yang habis, tapi refresh token-nya yang berumur 7 hari juga sudah ikut mati.

Admin kembali ke laptop setelah 2 minggu, lalu mengklik menu "Tambah Kegiatan".

Frontend mendeteksi access token habis, lalu mencoba melakukan Silent Refresh (seperti langkah di Skenario 1).

Backend memeriksa refresh token dan merespons: "Maaf, refresh token ini juga sudah kedaluwarsa!"

Frontend menerima penolakan tersebut, langsung menghapus sisa-sisa token yang tersimpan, dan mengarahkan (redirect) Admin secara paksa ke halaman login.

Hasilnya: Admin harus memasukkan username dan password lagi dari awal. (Ini sangat wajar dan demi keamanan).

Kesimpulan & Tips Koding
Jadi, jika Admin cuma diam beberapa jam, mereka tidak akan dikeluarkan dari aplikasi selama refresh token-nya masih aktif.

Untuk mewujudkan ini di bagian frontend, kuncinya ada pada Axios Interceptor (jika menggunakan Axios). Kamu bisa membuat fungsi penangkap error 401 yang bertugas untuk:

Menangkap error token expired.

Meminta token baru ke backend.

Mengulang kembali request yang gagal tadi tanpa membuat user melihat halaman error.
