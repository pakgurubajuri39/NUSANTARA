# NUSANTARA: Takhta, Sekutu, & Prahara 👑
Board Game Strategis Sejarah Nusantara dengan Game Master Engine cerdas, 24 Petak Melingkar dalam 3 Era Sejarah, Sistem Rempah, Diplomasi, Prahara, dan Pertempuran Militer.

---

## 🚀 Panduan Deploy ke Vercel (Langkah demi Langkah)

Proyek ini telah dikonfigurasi secara lengkap untuk dapat di-deploy ke **Vercel** dengan satu klik (baik via GitHub maupun Vercel CLI).

### Metode 1: Deploy Melalui GitHub & Vercel Dashboard (Paling Mudah & Otomatis)

1. **Push Proyek ke Repository GitHub Anda:**
   ```bash
   git init
   git add .
   git commit -m "feat: Nusantara Takhta Sekutu & Prahara Board Game"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/nusantara-boardgame.git
   git push -u origin main
   ```

2. **Buka Dashboard Vercel:**
   - Kunjungi [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
   - Klik tombol **"Add New..."** lalu pilih **"Project"**.
   - Pilih repository GitHub `nusantara-boardgame` yang baru saja Anda buat, lalu klik **"Import"**.

3. **Pengaturan Konfigurasi Proyek di Vercel:**
   - **Framework Preset:** `Vite` (Vercel akan otomatis mendeteksinya).
   - **Root Directory:** `./`
   - **Build Command:** `vite build` (atau `npm run build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Tambahkan Environment Variables (Kunci AI Game Master):**
   - Di bagian **Environment Variables**, tambahkan:
     - **Key:** `GEMINI_API_KEY`
     - **Value:** Masukkan API Key Google Gemini Anda (dapatkan gratis di [Google AI Studio](https://aistudio.google.com/app/apikey)).
   *(Catatan: Permainan tetap dapat berjalan normal dengan Babad Hikayat Klasik internal jika API key belum diisi).*

5. **Klik "Deploy":**
   - Vercel akan memproses build dalam waktu ~1 menit.
   - Setelah selesai, Anda akan mendapatkan URL domain publik gratis (contoh: `https://nusantara-boardgame.vercel.app`).

---

### Metode 2: Deploy Cepat via Vercel CLI (Terminal)

Jika Anda memiliki `npm` di komputer Anda, Anda dapat langsung men-deploy tanpa membuka browser:

```bash
# 1. Install Vercel CLI (jika belum)
npm install -g vercel

# 2. Login ke akun Vercel Anda
vercel login

# 3. Jalankan perintah deploy di folder proyek
vercel

# 4. Saat deploy produksi:
vercel --prod
```

Saat CLI meminta konfirmasi:
- **Set up and deploy?** [Y]
- **Which scope?** Pilih akun Anda
- **Link to existing project?** [N]
- **Project name?** `nusantara-boardgame`
- **In which directory?** `./`
- **Want to modify settings?** [N]

---

## 🛠️ File Konfigurasi Vercel yang Disediakan
- **`vercel.json`**: Mengatur build Vite, rewrites SPA untuk routing halaman, serta mengarahkan API `/api/gm-narrate` ke serverless function Vercel.
- **`api/gm-narrate.ts`**: Serverless function Node.js untuk menangani narasi AI Game Master secara instan dan hemat biaya (scale-to-zero).
