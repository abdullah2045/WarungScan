import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [riwayat, setRiwayat] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      cekUserSession();
      muatRiwayat();
    }, []),
  );

  const cekUserSession = async () => {
    try {
      const data = await AsyncStorage.getItem("USER_SESSION");
      if (data) {
        setUser(JSON.parse(data));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const muatRiwayat = async () => {
    try {
      const data = await AsyncStorage.getItem("RIWAYAT_TRANSAKSI");
      if (data) {
        setRiwayat(JSON.parse(data));
      } else {
        setRiwayat([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    if (!emailInput || !passwordInput) {
      Alert.alert("Peringatan", "Silakan isi Email dan Password!");
      return;
    }

    const userData = {
      email: emailInput,
      nama: emailInput.split("@")[0],
    };

    await AsyncStorage.setItem("USER_SESSION", JSON.stringify(userData));
    setUser(userData);
    setEmailInput("");
    setPasswordInput("");
    Alert.alert("Selamat Datang!", `Berhasil login sebagai ${userData.nama}`);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USER_SESSION");
    setUser(null);
  };

  const handleHapusRiwayat = async () => {
    Alert.alert("Konfirmasi", "Hapus semua riwayat transaksi?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("RIWAYAT_TRANSAKSI");
          setRiwayat([]);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Tampilan Jika Belum Login */}
      {!user ? (
        <View style={styles.loginCard}>
          <Ionicons
            name="lock-closed-outline"
            size={48}
            color="#0F5132"
            style={{ alignSelf: "center" }}
          />
          <Text style={styles.loginTitle}>Login Akun WarungKu</Text>
          <Text style={styles.loginSub}>
            Masuk untuk melihat riwayat dan profil kamu.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Masukkan Email"
            value={emailInput}
            onChangeText={setEmailInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Masukkan Password"
            value={passwordInput}
            onChangeText={setPasswordInput}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
            <Text style={styles.btnLoginText}>MASUK SEKARANG</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Tampilan Jika Sudah Login */
        <>
          <View style={styles.profileBox}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={30} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.namaUser}>{user.nama}</Text>
              <Text style={styles.emailUser}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#DC3545" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
            {riwayat.length > 0 && (
              <TouchableOpacity onPress={handleHapusRiwayat}>
                <Text style={styles.clearText}>Hapus Semua</Text>
              </TouchableOpacity>
            )}
          </View>

          {riwayat.length === 0 ? (
            <View style={styles.emptyHistory}>
              <Ionicons name="receipt-outline" size={40} color="#ccc" />
              <Text style={styles.emptyHistoryText}>
                Belum ada riwayat transaksi tersimpan.
              </Text>
            </View>
          ) : (
            <FlatList
              data={riwayat}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#0F5132"
                    />
                    <Text style={styles.historyDate}>{item.tanggal}</Text>
                  </View>
                  <Text style={styles.historyTotal}>
                    Rp {item.total?.toLocaleString("id-ID")}
                  </Text>
                  <Text style={styles.historyItems}>
                    {item.jumlahItem} Barang Dibeli
                  </Text>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#F4F7F4" },
  loginCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    elevation: 3,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  loginSub: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  btnLogin: {
    backgroundColor: "#0F5132",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  btnLoginText: { color: "#fff", fontWeight: "bold" },
  profileBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0F5132",
    justifyContent: "center",
    alignItems: "center",
  },
  namaUser: { fontSize: 16, fontWeight: "bold", textTransform: "capitalize" },
  emailUser: { fontSize: 12, color: "#6c757d", marginTop: 2 },
  btnLogout: { padding: 8 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#0F5132" },
  clearText: { color: "#DC3545", fontSize: 12, fontWeight: "bold" },
  emptyHistory: { alignItems: "center", marginTop: 30 },
  emptyHistoryText: { color: "#888", marginTop: 8 },
  historyCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  historyDate: { fontSize: 12, color: "#6c757d", marginLeft: 6 },
  historyTotal: { fontSize: 17, fontWeight: "bold", color: "#0F5132" },
  historyItems: { fontSize: 12, color: "#333", marginTop: 2 },
});
