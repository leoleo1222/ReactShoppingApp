import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from "react-native";

export default function ProductsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [searchQuery, products]);

  const pressHandler = (product) => {
    navigation.navigate("Order", {
      product: product,
    });
  };

  const fetchToken = () => {
    fetch("http://127.0.0.1:8000/api/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "a",
        password: "a",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Token fetched:", data.token);
        fetchProducts(data.token);
      })
      .catch((error) => console.error("Error fetching token:", error));
  };

  const fetchProducts = (token) => {
    fetch("http://127.0.0.1:8000/api/product/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log("Products fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const filterProducts = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: "#0066cc",
              fontFamily: "Arial",
              fontSize: 24,
              fontWeight: "bold",
            },
          ]}
        >
          Our Products
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          placeholderTextColor="#999"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productItemContainer}
              onPress={() => pressHandler(item)}
            >
              {/* <Image source={{ uri: item.imageUrl }} style={styles.productImage} /> */}
              <Image
                source={{
                  uri: "https://i.pinimg.com/736x/90/d5/21/90d5218e67406acdae9c83a2a3fddcca.jpg",
                }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productPricee}>{item.name}</Text>
                <Text style={styles.productPrice}>Price: </Text><Text>{item.price}</Text>
                <Text style={styles.productPrice}>
                  Discount: </Text><Text>{item.discount}
                </Text>
                <Text style={styles.productPrice}>
                  Quantity: </Text><Text>{item.quantity}
                </Text>
                <Text style={styles.productPrice}>
                  Description: </Text><Text>{item.description}
                </Text>
                <Button title="Order Now" onPress={() => pressHandler(item)} />
              </View>
            </TouchableOpacity>
          )}
          refreshing={isLoading}
          onRefresh={() => fetchProducts()}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Products Found</Text>
          <Button title="Refresh" onPress={() => fetchProducts()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontFamily: "Arial",
    fontSize: 16,
  },
  productList: {
    alignItems: "center",
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Arial",
    fontSize: 18,
    marginBottom: 20,
  },
  productItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: "Arial",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#4267B2",
  },
  productPricee: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#000000",
    // larger text
    fontSize: 20,
  },
});
