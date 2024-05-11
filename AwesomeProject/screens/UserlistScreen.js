import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BASE_API_URL } from "../services/api";
export default function UserListScreen() {
  const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
  const [userData, setUserData] = useState([]); // Assume userData is an array

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      let endpoint = BASE_API_URL + "admin/account/";
      const response = await fetch(endpoint);
      const data = await response.json();
      setUserData(data); // Assuming the JSON has a `users` array
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={[styles.tab, { marginTop: 20 }]}
        onPress={() => setOrderHistoryVisible(!orderHistoryVisible)}
      >
        <Text style={styles.sectionTitle}>User List</Text>
      </TouchableOpacity>
      {userData.map((user, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Username:</Text>
            <Text style={styles.detailText}>{user.username}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailText}>{user.email}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f0f2f5",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tab: {
    marginBottom: 20,
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
