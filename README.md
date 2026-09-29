# Dev Portfolio

Portofolio developer minimalis, cepat, dan responsif — **HTML/CSS/JS murni** tanpa framework dan tanpa build step. Tinggal deploy ke Vercel.

Demo hitam-putih penuh, animasi scroll halus, dark/light theme, filter proyek, dan form kontak dengan validasi.

## ✨ Fitur

- ⚡ **Nol dependency** — tidak ada `npm install`, tidak ada build step, langsung jadi
- 🌗 **Dark/Light mode** — tersimpan di `localStorage`, mengikuti preferensi sistem sebagai default
- 📱 **Responsif** — tampil bagus di HP, tablet, dan desktop
- ✨ **Animasi scroll** — via `IntersectionObserver`, ramah `prefers-reduced-motion`
- 🧩 **Filter proyek** — kategori All / Web / Backend / Open source
- ✉️ **Form kontak** — validasi sisi klien (siang-siang saat ini demo, lihat catatan di bawah)
- 🚫 **Tidak ada analytics, tracker, atau cookie**

## 🚀 Deploy ke Vercel

**Opsi A — via dashboard (paling cepat):**
1. Push folder ini ke repository GitHub/GitLab/Bitbucket
2. Buka https://vercel.com/new, lalu import repo
3. Vercel akan otomatis mendeteksi sebagai situs statis — klik **Deploy**

**Opsi B — via CLI:**
```bash
npm i -g vercel
vercel        # ikuti prompt (pilih link ke existing project OR new)
vercel --prod  # deploy ke production
```

Tidak perlu konfigurasi apa pun — output sudah otomatis `index.html` + aset statis.

## 🛠️ Kustomisasi

Semua data ada di satu tempat: `script.js`, di bagian paling atas:

```js
const PROFILE = { name, role, email, socials };  // identitas kamu
const PROJECTS = [ ... ];                         // daftar proyek
```

| Mau ubah | Edit |
|---|---|
| Nama, email, link sosial | objek `PROFILE` di `script.js` |
| Daftar proyek | array `PROJECTS` di `script.js` |
| Warna (sekunder, aksen) | variabel `:root` di `style.css` |
| Daftar skill | atribut `data-skills` di `index.html` |
| Foto / gambar | ganti `.project-thumb` (saat ini gradient + nomor) |

Setiap proyek mendukung kategori untuk filter: `web`, `api`, `oss`. Satu proyek bisa masuk beberapa kategori.

## 📁 Struktur

```
dev-portfolio/
├── index.html      # markup + konten statis (about, skills)
├── style.css       # seluruh styling + theming
├── script.js       # data + interaksi
└── vercel.json     # header keamanan & cache (opsional)
```

## ⚠️ Catatan untuk form kontak

Form saat ini **demo** (validasi sisi klien saja, tidak mengirim ke mana pun). Untuk membuatnya berfungsi, sambungkan ke salah satu layanan ini, gratis untuk pemakaian kecil:

- [Formspree](https://formspree.io) — cukup arahkan `action` form ke endpoint kamu
- [Web3Forms](https://web3forms.com) — pakai access key, gratis selamanya
- [Resend](https://resend.com) — kirim lewat API (butuh endpoint serverless)

Contoh integrasi Web3Forms yang paling simpel — ganti tag `<form>` di `index.html`:

```html
<form class="contact-form" action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="ACCESS_KEY_KAMU" />
  <!-- ...field yang ada tetap sama... -->
</form>
```

Lalu di `script.js`, ganti handler submit agar tidak mencegah pengiriman default bila validasi lolos.

## 📝 Lisensi

MIT — bebas dipakai dan dimodifikasi.
