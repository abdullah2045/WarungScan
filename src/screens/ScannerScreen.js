import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

// DATABASE MENGGUNAKAN GAMBAR STOCK UNSPLASH YANG SESUAI DENGAN VISUAL PRODUK
const DATABASE_WARUNG = {
  // 1. Susu Tiga Sapi (Kaleng / Kental Manis)
  8993007002967: {
    nama: "Susu Kental Manis Tiga Sapi",
    merek: "Indofood",
    harga: 12500,
    stok: 24,
    // Visual Unsplash: Gelas Susu Creamy yang estetik
    gambar: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    deskripsi:
      "Susu kental manis lezat dan gurih, kemasan kaleng praktis. Cocok dipadukan dengan kopi, teh, maupun martabak.",
    komposisi:
      "Gula, Air, Minyak Nabati, Whey Bubuk, Susu Bubuk Skim, Maltodekstrin, Penstabil Nabati, Perisa Sintetik Susu.",
  },

  // 2. Susu Dancow FortiGro (Kotak / Bubuk)
  8992801111111: {
    nama: "Susu Dancow FortiGro Enriched Full Cream",
    merek: "Nestle",
    harga: 39500,
    stok: 15,
    // Visual Unsplash: Botol & Gelas Susu Segar
    gambar: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    deskripsi:
      "Susu bubuk bernutrisi tinggi kemasan kotak (box) untuk keluarga. Mendukung pertumbuhan dan kecerdasan anak.",
    komposisi:
      "Susu Sapi Asli, Susu Bubuk Skim, Mineral, Pengemulsi Lesitin Kedelai, Premiks Vitamin.",
  },

  // 3. Indomie Mi Goreng Spesial
  8998866200100: {
    nama: "Indomie Mi Goreng Spesial",
    merek: "Indofood",
    harga: 3500,
    stok: 150,
    // Visual Unsplash: Mangkuk berisi Mie yang menggugah selera
    gambar:
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400",
    deskripsi:
      "Mi instan goreng legendaris khas Indonesia dengan taburan bawang goreng asli.",
    komposisi:
      "Tepung Terigu, Minyak Nabati, Garam, Mineral, Bumbu (Gula, Garam, MSG).",
  },

  // 4. Tolak Angin Cair (Pouch / Herbal)
  8999999112233: {
    nama: "Tolak Angin Cair 15ml",
    merek: "Sido Muncul",
    harga: 4000,
    stok: 50,
    // Visual Unsplash: Madu & Herbal alami (Merepresentasikan Tolak Angin)
    gambar:
      "https://images.unsplash.com/photo-1587049352847-81a56d773c16?w=400",
    deskripsi:
      "Obat herbal terstandar untuk mengatasi masuk angin dan memelihara daya tahan tubuh secara alami.",
    komposisi:
      "Madu murni, Ekstrak Jahe, Daun Mint, Daun Cengkeh, Buah Adas, Kayu Ules.",
  },
};

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="camera-outline" size={60} color="#0F5132" />
        <Text style={styles.message}>
          Izin Kamera Diperlukan untuk Fitur Scan
        </Text>
        <Button
          onPress={requestPermission}
          title="Izinkan Kamera"
          color="#0F5132"
        />
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    const produkDitemukan = DATABASE_WARUNG[data];

    if (produkDitemukan) {
      navigation.navigate("Detail", {
        barcodeData: data,
        namaProduk: produkDitemukan.nama,
        merek: produkDitemukan.merek,
        harga: produkDitemukan.harga,
        stok: produkDitemukan.stok,
        gambar: produkDitemukan.gambar,
        deskripsi: produkDitemukan.deskripsi,
        komposisi: produkDitemukan.komposisi,
      });
    } else {
      navigation.navigate("Detail", {
        barcodeData: data,
        namaProduk: "Produk Tidak Dikenal",
        merek: "Merek Belum Terdaftar",
        harga: 0,
        stok: 0,
        // Visual Unsplash: Kotak/Kardus (Untuk Barang Baru yang belum terdaftar)
        gambar:
          "https://images.unsplash.com/photo-1580870059728-608882583802?w=400",
        deskripsi:
          "Sistem tidak menemukan detail produk ini di server. Harap lapor ke admin untuk di-update.",
        komposisi: "Data komposisi tidak tersedia.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.targetBox} />
          <Text style={styles.instructionText}>
            Arahkan Kamera ke Barcode Barang
          </Text>
        </View>
      </CameraView>

      {scanned && (
        <TouchableOpacity
          style={styles.rescanBtn}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.rescanText}>Scan Ulang</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: { textAlign: "center", marginVertical: 15, fontSize: 15 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  targetBox: {
    width: 260,
    height: 160,
    borderWidth: 3,
    borderColor: "#00FF66",
    borderRadius: 16,
  },
  instructionText: {
    color: "#fff",
    marginTop: 25,
    fontSize: 14,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "bold",
  },
  rescanBtn: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#0F5132",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  rescanText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
