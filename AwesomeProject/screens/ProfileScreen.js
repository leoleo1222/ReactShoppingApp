import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import TransactionsScreen from './TransactionsScreen'; // Import the TransactionsScreen component


export default function ProfileScreen() {
  // State variables to control dropdown visibility
  const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
  const [wishlistVisible, setWishlistVisible] = useState(false);

  // Mock data for Order History and Wishlist
  const orderHistoryData = [
    { id: 1, orderNumber: "ORD123", date: "2024-05-01", total: "$100" },
    { id: 2, orderNumber: "ORD124", date: "2024-04-25", total: "$150" },
  ];

  const wishlistData = [
    { id: 1, productName: "Product 1", price: "$50" },
    { id: 2, productName: "Product 2", price: "$75" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailText}>John Doe</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailText}>john.doe@example.com</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailText}>+1234567890</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Shipping Address:</Text>
          <Text style={styles.detailText}>123 Main St, City, Country</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Billing Address:</Text>
          <Text style={styles.detailText}>456 Elm St, City, Country</Text>
        </View>
      </View>

      {/* Order History */}
      <TouchableOpacity
        style={[styles.tab, { marginTop: 20 }]} // Adjust margin top for proper spacing
        onPress={() => setOrderHistoryVisible(!orderHistoryVisible)}
      >
        <Text style={styles.sectionTitle}>Order History</Text>
      </TouchableOpacity>

      {orderHistoryVisible && (
        <View style={styles.dropdownContent}>
          <TransactionsScreen />
        </View>
      )}

      {/* Wishlist */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setWishlistVisible(!wishlistVisible)}
      >
        <Text style={styles.sectionTitle}>Wishlist</Text>
      </TouchableOpacity>
      {wishlistVisible && (
        <View style={styles.dropdownContent}>
          {wishlistData.map((item) => (
            <View key={item.id} style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Product Name:</Text>
              <Text style={styles.detailText}>{item.productName}</Text>
              <Text style={styles.detailLabel}>Price:</Text>
              <Text style={styles.detailText}>{item.price}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Settings, Payment Methods, Reviews and Ratings, Rewards and Loyalty Points, Support and Help */}
      {/* Implement similar dropdown functionality for these sections */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f0f2f5", // Facebook-like background color
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#ffffff", // White background color
    borderRadius: 10,
    elevation: 3, // Add elevation for a card-like effect
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tab: {
    marginBottom: 20, // Increased margin between tabs
  },
  dropdownContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    padding: 15,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#4267B2",
  },
  detailText: {},
});
