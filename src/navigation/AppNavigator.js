import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ScannerScreen from "../screens/ScannerScreen";
import DetailScreen from "../screens/DetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Komponen Ikon Keranjang di Header Atas Kanan
function HeaderCartIcon({ navigation }) {
  const [cartCount, setCartCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadCartCount = async () => {
        try {
          const data = await AsyncStorage.getItem("KERANJANG_BELANJA");
          if (data) {
            const cart = JSON.parse(data);
            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            setCartCount(totalQty);
          } else {
            setCartCount(0);
          }
        } catch (e) {
          console.log(e);
        }
      };
      loadCartCount();
    }, []),
  );

  return (
    <TouchableOpacity
      style={styles.headerCartBtn}
      onPress={() => navigation.navigate("Main", { screen: "Keranjang" })}
    >
      <Ionicons name="cart" size={24} color="#fff" />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: "#0F5132",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: { fontWeight: "600", fontSize: 11, marginBottom: 6 },
        headerStyle: {
          backgroundColor: "#0F5132",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        headerRight: () => <HeaderCartIcon navigation={navigation} />,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Katalog")
            iconName = focused ? "storefront" : "storefront-outline";
          else if (route.name === "Keranjang")
            iconName = focused ? "cart" : "cart-outline";
          else if (route.name === "Profil")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Katalog"
        component={HomeScreen}
        options={{ title: "WarungKu Digital" }}
      />
      <Tab.Screen
        name="Keranjang"
        component={CartScreen}
        options={{ title: "Keranjang Saya" }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{ title: "Profil & Akun" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            title: "Pemindai Barcode",
            headerStyle: { backgroundColor: "#0F5132" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: "Detail Produk",
            headerStyle: { backgroundColor: "#0F5132" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === "android" ? 72 : 65, // Ditambah tingginya agar lebih lapang
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: Platform.OS === "android" ? 12 : 8, // Ditambah jarak bawahnya agar tidak mepet tombol Android
    paddingTop: 8,
    elevation: 8,
  },
  headerCartBtn: {
    marginRight: 15,
    padding: 6,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF3D00",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
