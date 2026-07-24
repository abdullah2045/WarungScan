import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailScreen({ route, navigation }) {
  const {
    barcodeData,
    namaProduk,
    merek,
    harga,
    stok,
    gambar,
    deskripsi,
    komposisi,
  } = route.params;

  const isBarangBaru = harga === 0;

  const handleTambahKeranjang = async () => {
    try {
      const dataLama = await AsyncStorage.getItem("KERANJANG_BELANJA");
      let cart = dataLama ? JSON.parse(dataLama) : [];

      const itemBaru = {
        id: Date.now().toString(),
        barcode: barcodeData,
        nama: namaProduk,
        harga: harga,
        gambar: gambar, // URL gambar langsung disimpan
        qty: 1,
      };

      cart.push(itemBaru);
      await AsyncStorage.setItem("KERANJANG_BELANJA", JSON.stringify(cart));

      Alert.alert("Sukses 🎉", `${namaProduk} masuk ke Keranjang!`, [
        {
          text: "Ke Keranjang",
          onPress: () => navigation.navigate("Main", { screen: "Keranjang" }),
        },
        { text: "Scan Lagi", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Error", "Gagal menyimpan produk.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Memuat gambar langsung dari URL */}
      <Image
        source={{ uri: gambar }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <View style={styles.barcodeBox}>
          <Ionicons name="barcode-outline" size={18} color="#0F5132" />
          <Text style={styles.barcodeText}>KODE: {barcodeData}</Text>
        </View>

        <Text style={styles.merekText}>{merek}</Text>
        <Text style={[styles.nama, isBarangBaru && { color: "#DC3545" }]}>
          {namaProduk}
        </Text>

        {isBarangBaru ? (
          <Text style={styles.hargaError}>Belum Ada Harga</Text>
        ) : (
          <Text style={styles.harga}>Rp {harga.toLocaleString("id-ID")}</Text>
        )}

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="document-text-outline" size={20} color="#0F5132" />
          <Text style={styles.subTitle}>Deskripsi Produk:</Text>
        </View>
        <Text
          style={[
            styles.infoText,
            isBarangBaru && { color: "#DC3545", fontWeight: "bold" },
          ]}
        >
          {deskripsi}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons name="leaf-outline" size={20} color="#0F5132" />
          <Text style={styles.subTitle}>Komposisi / Bahan:</Text>
        </View>
        <Text style={styles.infoText}>{komposisi}</Text>

        {!isBarangBaru && (
          <View style={styles.stokBox}>
            <Ionicons name="cube-outline" size={18} color="#2E7D32" />
            <Text style={styles.stokText}>Sisa Stok Gudang: {stok} pcs</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.btnCart, isBarangBaru && { backgroundColor: "#FF9800" }]}
        onPress={handleTambahKeranjang}
      >
        <Ionicons
          name={isBarangBaru ? "warning-outline" : "cart"}
          size={22}
          color="#fff"
        />
        <Text style={styles.btnCartText}>
          {isBarangBaru ? "TETAP MASUKKAN (HARGA RP 0)" : "TAMBAH KE KERANJANG"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F4" },
  image: { width: "100%", height: 260, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 15,
    borderRadius: 16,
    elevation: 4,
    marginTop: -20,
  },
  barcodeBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  barcodeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F5132",
    marginLeft: 6,
    letterSpacing: 1,
  },
  merekText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#6c757d",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  nama: { fontSize: 24, fontWeight: "900", color: "#212529", lineHeight: 28 },
  harga: { fontSize: 26, color: "#0F5132", fontWeight: "900", marginTop: 5 },
  hargaError: {
    fontSize: 22,
    color: "#DC3545",
    fontWeight: "900",
    marginTop: 5,
  },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 18 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 4,
  },
  subTitle: { fontSize: 15, fontWeight: "bold", color: "#333", marginLeft: 6 },
  infoText: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
    marginBottom: 15,
    lineHeight: 20,
    textAlign: "justify",
  },
  stokBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7F4",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  stokText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "bold",
    marginLeft: 8,
  },
  btnCart: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 40,
    backgroundColor: "#0F5132",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  btnCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
});
