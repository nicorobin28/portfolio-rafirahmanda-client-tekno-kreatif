# Dokumentasi API Portfolio CMS

Dokumentasi ini menjelaskan cara frontend mengonsumsi API untuk entitas **Portfolio** dan **Portfolio Content**. Semua endpoint kecuali metode `GET` memerlukan autentikasi (NextAuth session aktif/cookie).

Daftar Isi:
1. [Base URL](#base-url)
2. [Get All Portfolios](#get-all-portfolios)
3. [Create Portfolio](#create-portfolio)
4. [Update Portfolio](#update-portfolio)
5. [Delete Portfolio](#delete-portfolio)
6. [Get Portfolio Content](#get-portfolio-content-tidak-ada-endpoint-khusus-tapi-data-sudah-ter-include)
7. [Create Portfolio Content](#create-portfolio-content)
8. [Update Portfolio Content](#update-portfolio-content)
9. [Delete Portfolio Content](#delete-portfolio-content)

---

## Base URL
Path utama untuk semua request adalah `/api/portfolios`.

---

## Get All Portfolios

**Endpoint:** `GET /api/portfolios`

**Deskripsi:** Mengambil semua data portfolio, sudah termasuk relasi referensi tabel `images` dan `contents`. Diurutkan berdasarkan `createdAt` terbaru (descending).

**Akses:** Publik / Diperlukan untuk frontend untuk menampilkan.

**Response Berhasil (200 OK):**
```json
[
  {
    "id": "clt2x...",
    "title": "Proyek Website Toko Online",
    "role": "Fullstack Developer",
    "company": "CV Maju Jaya",
    "year": 2024,
    "createdAt": "2026-03-24T10:00:00.000Z",
    "updatedAt": "2026-03-24T10:00:00.000Z",
    "userId": "usr_...",
    "images": [
      {
        "id": "img1",
        "url": "/uploads/portfolios/a1b2c3-gambar1.png",
        "altText": "Proyek Website Toko Online",
        "order": 0,
        "portfolioId": "clt2x..."
      }
    ],
    "contents": [
      {
        "id": "content1",
        "title": "Latar Belakang Proyek",
        "body": "Proyek ini bertujuan untuk...",
        "order": 0,
        "portfolioId": "clt2x...",
        "createdAt": "2026-03-24T10:05:00.000Z"
      }
    ]
  }
]
```

**Response Error (500 Internal Server Error):**
```json
{
  "error": "Error message details"
}
```

---

## Create Portfolio

**Endpoint:** `POST /api/portfolios`

**Deskripsi:** Membuat portfolio baru dengan menyertakan multiple gambar.

**Akses:** Private (Memerlukan session NextAuth yang valid).

**Format Request:** `multipart/form-data`

**Body FormData:**
- `title` (text): Judul portfolio
- `role` (text): Peran/Role
- `company` (text): Nama Perusahaan/Klien
- `year` (number): Tahun portfolio dibuat
- `images` (file): Gambar portfolio (Multiple file)

**Contoh Payload Fetch di Frontend:**
```javascript
const formData = new FormData();
formData.append("title", "UI/UX Redesign");
formData.append("role", "UI Designer");
formData.append("company", "TechCorp");
formData.append("year", "2023");
// Untuk multiple image
files.forEach(file => {
  formData.append("images", file);
});

fetch('/api/portfolios', {
  method: 'POST',
  body: formData
});
```

**Response Berhasil (201 Created):**
```json
{
  "id": "new_clt...",
  "title": "UI/UX Redesign",
  "role": "UI Designer",
  "company": "TechCorp",
  "year": 2023,
  "userId": "usr_...",
  "createdAt": "...",
  "updatedAt": "...",
  "images": [...],
  "contents": []
}
```

**Response Error (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

**Response Error (500 Internal Server Error):**
```json
{
  "error": "Missing title or something else"
}
```

---

## Update Portfolio

**Endpoint:** `PUT /api/portfolios/[id]`

**Deskripsi:** Memperbarui data teks atau memperbarui keseluruhan set gambar di sebuah portfolio. (*Catatan:* Apabila field `images` dikirim dan berisi setidaknya satu gambar, hal ini akan menghapus referensi gambar lama dan membuat referensi gambar yang sepenuhnya baru).

**Akses:** Private (Memerlukan session NextAuth yang valid).

**Format Request:** `multipart/form-data`

**Params:**
- `id` (string): ID dari Portfolio yang akan diupdate.

**Body FormData:**
- `title` (text): Judul portfolio
- `role` (text): Peran/Role
- `company` (text): Nama Perusahaan/Klien
- `year` (number): Tahun
- `images` (file, opsional): List file gambar baru.

**Response Berhasil (200 OK):**
```json
{
  "id": "clt...id",
  "title": "Updated Title",
  "role": "Updated Role",
  "company": "Updated Company",
  "year": 2024,
  "userId": "usr_...",
  "images": [
     // List of updated images
  ],
  "contents": [
    // Pre-existing contents references
  ]
}
```

---

## Delete Portfolio

**Endpoint:** `DELETE /api/portfolios/[id]`

**Deskripsi:** Menghapus data portfolio berdasarkan ID. Seluruh relasi child seperti images dan contents yang memiliki cascade delete di prisma biasanya akan otomatis terhapus datanya (hanya reference DB, perhatikan bahwa file sistem/disk tidak terhapus otomatis by default di sistem saat ini).

**Akses:** Private.

**Response Berhasil (200 OK):**
```json
{
  "success": true
}
```

---

## Create Portfolio Content

**Endpoint:** `POST /api/portfolios/[id]/content`

**Deskripsi:** Menambahkan detail (isi) konten tambahan pada suatu portfolio.

**Akses:** Private.

**Format Request:** `application/json`

**Params:**
- `id` (string): Portfolio ID

**Body JSON:**
```json
{
  "title": "Tantangan Proyek",
  "body": "Deskripsi singkat terkait tantangan proyek ini..."
}
```

**Response Berhasil (201 Created):**
```json
{
  "id": "content_uuid...",
  "portfolioId": "clt...",
  "title": "Tantangan Proyek",
  "body": "Deskripsi singkat terkait tantangan proyek ini...",
  "order": 0,
  "createdAt": "..."
}
```

---

## Update Portfolio Content

**Endpoint:** `PUT /api/portfolios/[id]/content`

**Deskripsi:** Memperbarui data portfolio content.

**Akses:** Private.

**Format Request:** `application/json`

**Params:**
- `id` (string): Portfolio ID (saat ini dilempar saja lewat parameter API Next.js tetapi tidak digunakan untuk query)

**Body JSON:**
```json
{
  "contentId": "content_uuid...",
  "title": "Tantangan Proyek Terbaru",
  "body": "Body yang diupdate"
}
```

**Response Berhasil (200 OK):**
```json
{
  "id": "content_uuid...",
  "portfolioId": "clt...",
  "title": "Tantangan Proyek Terbaru",
  "body": "Body yang diupdate",
  "order": 0,
  "createdAt": "..."
}
```

**Response Error (400 Bad Request - Content ID belum diberikan):**
```json
{
  "error": "Content ID is required"
}
```

---

## Delete Portfolio Content

**Endpoint:** `DELETE /api/portfolios/[id]/content?contentId=[contentId]`

**Deskripsi:** Menghapus blok konten dari sebuah portfolio.

**Akses:** Private.

**Format Request:** Parameter Search / Query params.

**Params Path:**
- `id` (string): Portfolio ID

**QueryParams:**
- `contentId` (string): ID spesifik dari konten yang akan dihapus.

**Contoh URL:** 
`DELETE /api/portfolios/cltu7y3g/content?contentId=content123`

**Response Berhasil (200 OK):**
```json
{
  "success": true
}
```

**Response Error (400 Bad Request):**
```json
{
  "error": "Content ID required"
}
```
