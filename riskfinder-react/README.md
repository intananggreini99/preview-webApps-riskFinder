# RiskFinder — Versi Next.js (Siap Deploy ke Vercel)

Prototipe UI/UX **Credit Risk Analysis** untuk produk **RiskFinder**.
Dibangun dengan **Next.js 14 (App Router) + TypeScript + TailwindCSS**.

> Ini adalah *prototype overview* — semua data adalah mock data agar bisa diklik & dijelajahi end-to-end sebelum diintegrasikan ke backend ML (PyCaret).

---

## 🚀 Cara Menjalankan Lokal

Pastikan Node.js ≥ 18.17 terpasang.

```bash
# 1. Install dependency
npm install

# 2. Jalankan dev server
npm run dev

# 3. Buka di Chrome
# http://localhost:3000
```

Build produksi:
```bash
npm run build
npm start
```

---

## ☁️ Deploy ke Vercel (3 cara)

### Cara 1 — Via Vercel CLI (paling cepat)
```bash
npm i -g vercel
vercel        # ikuti prompt, pilih scope, default semua
vercel --prod # promote ke production
```

### Cara 2 — Via GitHub (recommended)
1. Push folder ini ke repository GitHub baru:
   ```bash
   git init
   git add .
   git commit -m "init RiskFinder prototype"
   git branch -M main
   git remote add origin https://github.com/USERNAME/riskfinder.git
   git push -u origin main
   ```
2. Buka [vercel.com/new](https://vercel.com/new), pilih repository tersebut.
3. Framework Preset akan **otomatis terdeteksi sebagai Next.js** — klik **Deploy**.
4. Tunggu ±1 menit, app live di `https://riskfinder-xxxx.vercel.app`.

### Cara 3 — Drag & Drop
1. Jalankan `npm run build` lokal.
2. Buka [vercel.com/new](https://vercel.com/new) → tab **Upload** → drag folder project.

> Tidak perlu environment variable. Tidak perlu `vercel.json` — Next.js auto-detected.

---

## 🗺️ Struktur Routing

| Route | Halaman | Akses |
|---|---|---|
| `/login` | Login (pilih divisi) | Public |
| `/data-scientist/upload` | Upload Dataset | Divisi DS |
| `/data-scientist` | Pemilihan Dataset | Divisi DS |
| `/data-scientist/build-model` | Build Model (PyCaret compare + tuning + validation) | Divisi DS |
| `/data-scientist/evaluation` | Evaluasi Model (ROC-AUC, Confusion Matrix, Learning Curve) | Divisi DS |
| `/credit-analysis` | Entry Data 23 fitur + queue multi-peminjam | Divisi CA |
| `/credit-analysis/result` | Hasil Analisis (prediksi default 0/1) | Divisi CA |

Login flow: pilih **Data Scientist** → `/data-scientist/upload`, atau **Credit Analysis** → `/credit-analysis`. Username/password apa pun bisa (prototype).

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Ink** | `#0A1929` |
| **Navy** | `#0A2540` |
| **Royal** | `#1E5AA8` |
| **Mint (accent)** | `#00C49A` |
| **Cyan2 (accent)** | `#00A8E8` |
| **Danger** | `#E04A5F` |
| **Paper** | `#F7F4EE` |
| Font display | Playfair Display (serif) |
| Font body | Manrope |
| Font data | JetBrains Mono |

Font dimuat via `next/font/google` di `app/layout.tsx` — **zero CLS, otomatis self-hosted di Vercel**.

### 7 Prinsip Desain yang Diterapkan
1. **Balance** — Hero login asimetris (split 5:7), grid kartu seimbang di dashboard.
2. **Color** — Palet terbatas (navy + 2 accent mint/cyan) menjaga identitas korporat.
3. **Spacing** — Padding konsisten via Tailwind scale (`px-6`, `py-10`).
4. **Consistency** — Komponen `Card`, `Button`, `Chip` dipakai ulang di semua halaman.
5. **Contrast** — Ink/paper di body, navy gradient di hero untuk hierarki kuat.
6. **Aesthetics** — Grid-paper background + diagonal stripe industrial.
7. **User Friendly** — Breadcrumb + progress stepper + label fitur dalam bahasa awam.

---

## 📦 Tech Stack

- **Next.js 14.2.5** — App Router
- **React 18.3** — Server & Client Components
- **TypeScript 5.4**
- **TailwindCSS 3.4** — utility-first styling
- **next/font** — Google Fonts optimization

---

## ⚙️ Mock Prediction Logic

Untuk demo prototype, prediksi default dihitung sederhana berdasarkan 3 sinyal kuat:
```
score = 0.18 + max(PAY_0, 0) × 0.08 + utilization × 0.35 − (PAY_AMT1 / BILL_AMT1) × 0.15
pred  = 1 jika score ≥ 0.5, else 0
```
Ganti dengan call ke API model PyCaret saat integrasi backend.

---

## 🧭 Tombol Navigasi Prototype

Di bagian atas setiap halaman ada **PROTOTYPE BAR** dengan 7 tombol bernomor untuk loncat antar halaman tanpa harus mengisi form. Memudahkan stakeholder me-review keseluruhan flow dalam 1 menit.
