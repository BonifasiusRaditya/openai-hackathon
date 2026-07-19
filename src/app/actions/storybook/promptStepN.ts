export const userPrompt2 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 2:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. [NOW] Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt3 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 3:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt4 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 4:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt5 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 5:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt6 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 6:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt7 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 7:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt8 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 8:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt9 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 9:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt10 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 10:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line

export const userPrompt11 = (textCerita: string) => `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 11:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

> Mulai dari tahap 2 - 11, gunakan kriteria generation gambar berikut:
> - Gunakan gambar wireframe layout yang sudah saya lampirkan (gambar 1) sebagai layout dasar pembuatan ilustrasi: ilustrasi visual di sebelah kiri, dan teks paragraf di sebelah kanan.
> - Gunakan transisi gradasi kecil antara section visual di kiri dan section teks di kanan.
> - Gunakan font serif untuk section teks. 
> - Gunakan Disney illustration style.
> - Lihat gambar design step sebelumnya (gambar 2) untuk membantu Anda melakukan image generation dengan styling yang konsisten.
> - Gambar memiliki rasio landscape (1536 * 1024). 

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. [NOW] Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`; // Leave this extra new line
