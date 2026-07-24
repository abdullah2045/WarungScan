import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <Ionicons name="storefront" size={70} color="#0F5132" />
        <Text style={styles.title}>Mesin Kasir WarungKu</Text>
        <Text style={styles.subtitle}>Sistem Pemindai Pintar Otomatis</Text>
      </View>

      <View style={styles.scanContainer}>
        <View style={styles.instructionBox}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#0F5132"
          />
          <Text style={styles.instructionText}>
            Arahkan kamera ke kemasan fisik barang. Sistem akan otomatis mencari
            detail nama dan harga produk.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("Scanner")}
          activeOpacity={0.8}
        >
          <Ionicons name="barcode-outline" size={40} color="#fff" />
          <Text style={styles.scanButtonText}>MULAI SCAN BARANG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F4",
    padding: 20,
    justifyContent: "center",
  },
  welcomeCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 40,
  },
  title: { fontSize: 24, fontWeight: "900", color: "#212529", marginTop: 15 },
  subtitle: { fontSize: 14, color: "#6c757d", marginTop: 5 },
  scanContainer: { alignItems: "center" },
  instructionBox: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  instructionText: {
    flex: 1,
    fontSize: 13,
    color: "#2E7D32",
    marginLeft: 10,
    lineHeight: 20,
  },
  scanButton: {
    flexDirection: "row",
    backgroundColor: "#0F5132",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 12,
    letterSpacing: 1,
  },
});
