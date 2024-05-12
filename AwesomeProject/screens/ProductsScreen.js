import React, { useState, useEffect, Fragment } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image,
  Button, TextInput, ActivityIndicator
} from 'react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_API_URL } from '../services/api';
import ProductItem from '../components/ProductItem';

export default function ProductsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const { token } = route.params || {};

  const serverURI = BASE_API_URL.split('/api/')[0];


  useEffect(() => {
      const getToken = async () => {
          const storedToken = await AsyncStorage.getItem('token');
          console.log('Stored token in ProductsScreen:', storedToken);
          const Username = await AsyncStorage.getItem('username');

          console.log('Stored username in ProductsScreen:', Username);
          setToken(storedToken);
      };
      getToken();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [searchQuery, products]);

  const pressHandler = (product) => {
    // Assuming 'isLoggedIn' is a boolean indicating the user's login status
    if (token) {
      navigation.navigate('Order', { product });
    } else {
      // Prompt the user to log in
      Alert.alert(
        "Login Required",
        "You must be logged in to place an order.",
        [
          { text: "OK", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        ],
        { cancelable: false }
      );
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let endpoint = BASE_API_URL + 'product/';
      const response = await fetch(endpoint);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Products</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItemContainer} onPress={() => pressHandler(item)}>
              <Image
                source={{ uri: serverURI+item.picture || 'https://via.placeholder.com/100' }}
                // source={{ uri: item.url || 'https://via.placeholder.com/100' }}
                style={styles.productImage}
                // defaultSource={require('./path/to/local/placeholder.png')}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                
                {parseFloat(item.discount) > 0 ? (
                  <>
                    <Text style={[styles.productPrice, { textDecorationLine: 'line-through' }]}>Old Price: ${parseFloat(item.price)}</Text>
                    <Text style={styles.productPrice}>Price: ${parseFloat(item.price) - parseFloat(item.price) * parseFloat(item.discount)}</Text>
                    <Text style={styles.productPrice}>Discount: {parseFloat(item.discount)*100}% off</Text>
                  </>
                ) : (
                  <Text style={styles.productPrice}>Price: ${parseFloat(item.price)}</Text>
                )}
                {/* <Text style={styles.productPrice}>Discount: {item.discount}</Text> */}
                {/* <Text style={styles.productPrice}>Quantity: {item.quantity}</Text> */}
                <Text style={styles.productDescription}>{item.description}</Text>
                <Button title="Order Now" onPress={() => pressHandler(item)} />
              </View>
            </TouchableOpacity>
          // renderItem={({ item }) => (
            // <ProductItem item={item} />
          // )}
          )}
          refreshing={isLoading}
          onRefresh={fetchProducts}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Products Found</Text>
          <Button title="Refresh" onPress={fetchProducts} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    // fontFamily: 'Arial',
    fontSize: 16,
  },
  productList: {
    alignItems: 'center',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    // fontFamily: 'Arial',
    fontSize: 18,
    marginBottom: 20,
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    // marginLeft: 5,  // Reduced margin to increase width
    // marginRight: 5,  // Reduced margin to increase width
    flex: 1,  // Ensures it stretches to fill available space horizontally
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productInfo: {
    // flex: 1,
  },
  productName: {
    // fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#4267B2',
    marginBottom: 3,
  },
  productDescription: {
    // fontFamily: 'Arial',
    fontSize: 16,
    color: '#aaa',
    marginTop: 3,
    marginBottom: 10,
  },
});
