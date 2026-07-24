File Markdown kamu sudah siap!
[file-tag: code-generated-file-0-1784923922579114789]

Saya telah menyusun file **`README.md`** sesuai dengan format yang kamu berikan, dan menyesuaikannya 100% dengan identitas project **WarungKu Digital (Domain C)**, nama dan NIM kamu, serta daftar fitur canggih (*Scan Barcode*) yang baru saja kita selesaikan. 

Kamu bisa langsung menyalin seluruh kode di bawah ini dan menempelkannya (*paste*) ke dalam file `README.md` yang ada di bagian paling luar folder project kamu (selevel dengan `App.js` dan `app.json`).

```markdown
# WarungKu Digital — Domain C: Warung Digital

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Local_Persistence-00b894)
![Expo Camera](https://img.shields.io/badge/Expo_Camera-Barcode_Scanner-FF6B6B)

> WarungKu Digital adalah aplikasi kasir POS (*Point of Sale*) pintar berbasis React Native dan Expo yang dirancang khusus untuk UMKM/Warung Digital. Aplikasi ini menyelesaikan masalah pencatatan pesanan manual dengan menyediakan pemindai barcode kamera otomatis untuk mengenali produk sembako, menampilkan detail informasi & komposisi barang, serta mengelola transaksi secara real-time.

---

## 📸 Screenshots

| Login Screen | Home Kasir POS | Pemindai Barcode | Detail & Komposisi |
|:---:|:---:|:---:|:---:|
| [Login]( <img width="720" height="1600" alt="Login" src="https://github.com/user-attachments/assets/a10613d9-a894-481d-b6db-2508f8cda7be" />
 ) |
 [Home]( <img width="720" height="1600" alt="home" src="https://github.com/user-attachments/assets/6baa75e4-c98b-4873-9aba-829f74c0c848" />
 ) |
 [Scanner]( <img width="720" height="1600" alt="scanner" src="https://github.com/user-attachments/assets/e050126c-6bc6-40fa-891e-8e347f386734" />
 ) |
 [Detail]( <img width="720" height="1600" alt="detailproduk" src="https://github.com/user-attachments/assets/0e0d23e8-f4e9-47d1-9210-037ba5e16b74" />
 ) |

---

## ✨ Fitur Utama

- [x] **Autentikasi & Validasi Form:** Login mandiri dengan penanganan sesi pengguna via AsyncStorage.
- [x] **Mesin Kasir POS Pintar:** Tampilan dashboard utama yang fokus pada pemindaian barcode cepat.
- [x] **Pemindai Barcode Kamera (`expo-camera`):** Fitur scan kemasan fisik produk warung (Susu Tiga Sapi, Dancow, Indomie, Tolak Angin, dll).
- [x] **Detail Produk & Komposisi:** Menampilkan merek, harga, stok, deskripsi, dan bahan komposisi secara akurat.
- [x] **Penanganan Barang Baru:** Otomatis mendeteksi barcode yang belum terdaftar dan mengatur status produk baru.
- [x] **Manajemen Keranjang Belanja:** Kontrol kuantitas barang (+ / - / Hapus) dan kalkulasi total harga otomatis.
- [x] **Penyimpanan Lokal Persisten:** Riwayat transaksi dan sesi keranjang disimpan permanen via `@react-native-async-storage/async-storage`.
- [x] **Navigasi Multi-Screen:** Kombinasi React Navigation (Bottom Tab Navigation & Native Stack Navigation).

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React Native + Expo (SDK 51+) |
| Navigation | React Navigation v6 (Stack + Bottom Tab) |
| Storage | `@react-native-async-storage/async-storage` |
| Hardware Feature | `expo-camera` (Barcode & QR Scanner) |
| Icons & UI | `@expo/vector-icons` (Ionicons) |
| Build System | EAS Build (Expo Application Services - Preview APK) |

---

## 🚀 Cara Menjalankan

```bash
git clone [https://github.com/abdullah2045/WarungScan.git]
cd warungKu
npm install
npx expo start -c

Scan QR Code dengan Expo Go di HP.
( <img width="857" height="665" alt="Screenshot 2026-07-25 032232" src="https://github.com/user-attachments/assets/7113edec-9d93-46c7-9226-0086a38615be" />
 )

## 📦 Download APK

[Download APK terbaru](https://expo.dev/accounts/mabdullah45/projects/warungku-digital/builds/0e2325e7-b5a2-4125-8650-d454319ccc8f)

---
## 🌐 Expo Snack

[Buka di Expo Snack](https://snack.expo.dev/@mabdullah45/warungsederhana)

## 👤 Developer

**M Abdul Nizham N** | 243303621284 | Kelas 4PagiB
Universitas Prima Indonesia — Prodi Sistem Informasi
Mata Kuliah: Pemrograman Mobile (TI-MOBILE-01)
