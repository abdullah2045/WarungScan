import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      muatKeranjang();
    }, []),
  );

  const muatKeranjang = async () => {
    try {
      const data = await AsyncStorage.getItem("KERANJANG_BELANJA");
      if (data) {
        setItems(JSON.parse(data));
      } else {
        setItems([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const simpanPerubahan = async (newItems) => {
    setItems(newItems);
    await AsyncStorage.setItem("KERANJANG_BELANJA", JSON.stringify(newItems));
  };

  const handleTambahQty = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );
    simpanPerubahan(updated);
  };

  const handleKurangQty = (id) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return item.qty > 1 ? { ...item, qty: item.qty - 1 } : item;
      }
      return item;
    });
    simpanPerubahan(updated);
  };

  const handleHapusItem = (id) => {
    Alert.alert("Konfirmasi", "Hapus produk ini dari keranjang?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          const updated = items.filter((item) => item.id !== id);
          simpanPerubahan(updated);
        },
      },
    ]);
  };

  const totalHarga = items.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0,
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      const pesananBaru = {
        id: Date.now().toString(),
        tanggal: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        total: totalHarga,
        jumlahItem: items.reduce((sum, item) => sum + item.qty, 0),
        detailItems: items,
      };

      const simpananLama = await AsyncStorage.getItem("RIWAYAT_TRANSAKSI");
      const riwayat = simpananLama ? JSON.parse(simpananLama) : [];
      riwayat.unshift(pesananBaru); // Pesanan terbaru di atas

      await AsyncStorage.setItem("RIWAYAT_TRANSAKSI", JSON.stringify(riwayat));
      await AsyncStorage.removeItem("KERANJANG_BELANJA");
      setItems([]);

      Alert.alert(
        "Checkout Berhasil! 🎉",
        "Transaksi berhasil disimpan ke Riwayat Transaksi.",
        [
          {
            text: "Lihat Riwayat",
            onPress: () => navigation.navigate("Profil"),
          },
        ],
      );
    } catch (e) {
      Alert.alert("Error", "Gagal memproses checkout.");
    }
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Keranjang Belanja Kosong</Text>
          <Text style={styles.emptySub}>
            Silakan pilih barang di Katalog atau Scan Barcode.
          </Text>
          <TouchableOpacity
            style={styles.btnGoKatalog}
            onPress={() => navigation.navigate("Katalog")}
          >
            <Text style={styles.btnGoKatalogText}>Mulai Belanja</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <Image source={{ uri: item.gambar }} style={styles.cartImage} />
                <View style={styles.infoBox}>
                  <Text style={styles.itemTitle}>{item.nama}</Text>
                  <Text style={styles.itemPrice}>
                    Rp {item.harga.toLocaleString("id-ID")}
                  </Text>

                  {/* Kontrol Tambah/Kurang Qty */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleKurangQty(item.id)}
                    >
                      <Ionicons name="remove" size={16} color="#0F5132" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleTambahQty(item.id)}
                    >
                      <Ionicons name="add" size={16} color="#0F5132" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Tombol Hapus */}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleHapusItem(item.id)}
                >
                  <Ionicons name="trash-outline" size={22} color="#DC3545" />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Pembayaran:</Text>
              <Text style={styles.totalValue}>
                Rp {totalHarga.toLocaleString("id-ID")}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnCheckout}
              onPress={handleCheckout}
            >
              <Text style={styles.btnCheckoutText}>PROSES CHECKOUT NOW</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#F4F7F4" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  emptySub: { fontSize: 13, color: "#777", marginTop: 5, marginBottom: 20 },
  btnGoKatalog: {
    backgroundColor: "#0F5132",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  btnGoKatalogText: { color: "#fff", fontWeight: "bold" },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  infoBox: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 15, fontWeight: "bold" },
  itemPrice: { color: "#0F5132", fontWeight: "bold", marginTop: 2 },
  qtyContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyBtn: {
    backgroundColor: "#E8F5E9",
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { marginHorizontal: 12, fontWeight: "bold", fontSize: 14 },
  deleteBtn: { padding: 8 },
  footer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalLabel: { fontSize: 14, color: "#6c757d" },
  totalValue: { fontSize: 20, fontWeight: "bold", color: "#0F5132" },
  btnCheckout: {
    backgroundColor: "#0F5132",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnCheckoutText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
