import React, { useState, useEffect  } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import TransactionsScreen from "./TransactionsScreen"; // Import the TransactionsScreen component

export default function ProfileScreen({ navigation }) {
  // State variables to control dropdown visibility
  const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("username");
    console.log("Removed token from async storage");
    navigation.navigate("Products");
    window.location.reload();
  };
  

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);
  // Function to fetch user data from the API
  const fetchUserData = async () => {
    const Username = await AsyncStorage.getItem('username');
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/account/${Username}/`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Details */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton}
        onPress={() => handleLogout()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.tab, { marginTop: 20 }]} // Adjust margin top for proper spacing
        onPress={() => setOrderHistoryVisible(!orderHistoryVisible)}
      >
        <Text style={styles.sectionTitle}>User Detail</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        {userData && (
          <>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Username:</Text>
              <Text style={styles.detailText}>{userData.username}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailText}>{userData.email}</Text>
            </View>
          </>
        )}
      </View>

      {/* Order History */}
      <TouchableOpacity
        style={[styles.tab, { marginTop: 20 }]} // Adjust margin top for proper spacing
        onPress={() => setOrderHistoryVisible(!orderHistoryVisible)}
      >
        <Text style={styles.sectionTitle}>Order History</Text>
      </TouchableOpacity>

      <View style={styles.dropdownContent}>
        <TransactionsScreen />
      </View>
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
  logoutButtonContainer: {
    position: 'absolute', // Use absolute position to place the button at the top right corner
    top: 10, // Move it a bit towards the center from the top
    right: 10, // Move it a bit towards the center from the right
  },
  logoutButton: {
    backgroundColor: '#ff0000', // Change this to the desired background color
    padding: 10, // Add some padding so it's easier to tap
    borderRadius: 10, // Add rounded corners
  },
  logoutButtonText: {
    color: '#ffffff', // Change this to the desired text color
  },
});
