import React, { useState, useEffect  } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from "../services/api";
export default function OrderAdminScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [userToken, setUserToken] = useState(null); // State to store user token
  
    const getOrders = async (token) => {
      let endpoint = BASE_API_URL + "admin/orders/";
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      };
  
      try {
        const response = await fetch(endpoint, {
          method: method,
          headers: headers,
        });
  
        if (!response.ok) {
          throw new Error("Cannot fetch any orders");
        }
  
        const jsonResponse = await response.json();
        setOrdersList(jsonResponse);
        console.log("Orders fetched successfully:", jsonResponse.status);
        jsonResponse.forEach((transaction) => {
          console.log("Transaction status:", transaction.status);
        });
        return jsonResponse;
      } catch (error) {
        console.error("Error fetching orders:", error);
        return { error: "Cannot fetch any orders" };
      }
    };
    const fetchOrders = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsLoading(true);
        await getOrders(token);
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchOrders();
      }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Order History */}

      <Text style={styles.sectionTitle}>Order History</Text>

      <View style={styles.dropdownContent}>
      <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : ordersList.length > 0 ? (
        <FlatList
          data={ordersList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Invoice:</Text>
              <Text style={styles.detailText}> {item.invoice_no}</Text>
              <Text style={styles.itemText}>Customer:</Text>
              <Text style={styles.detailText}> {item.customer.username}</Text>
              <Text style={styles.itemText}>Product:</Text>
              <Text style={styles.detailText}> {item.product.name}</Text>
              <Text style={styles.itemText}>Quantity:</Text>
              <Text style={styles.detailText}> {item.quantity}</Text>
              <Text style={styles.itemText}>Price:</Text>
              <Text style={styles.detailText}> {item.total_amount}</Text>
              <Text style={styles.itemText}>Delivery Date: </Text>
              <Text style={styles.detailText}>{item.delivery_date}</Text>
              <Text style={styles.itemText}>Status: </Text>
              <Text style={styles.detailText}>{item.status}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Transaction records</Text>
          <Button
            title="Refresh"
            onPress={() => fetchOrders(userToken)}
            color="#007bff"
          />
        </View>
      )}
    </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  itemText: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#4267B2",
  },
  detailText: {},
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
