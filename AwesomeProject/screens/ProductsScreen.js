import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import ProductItem from '../components/ProductItem';

export default function ProductsScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch token when component mounts
        fetchToken();
    }, []);

    useEffect(() => {
        setFilteredProducts(filterProducts());
    }, [searchQuery, products]); // Update filtered products when searchQuery or products change

    const pressHandler = (product) => {
        navigation.navigate('Order', {
            product: product
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
            fetchProducts(data.token); // Call fetchProducts with the token
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
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: '#0066cc' }]}>Products</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>
            {filteredProducts.length > 0 ?
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ProductItem
                            item={item}
                            pressHandler={pressHandler}
                        />
                    )}
                    refreshing={isLoading}
                    onRefresh={() => fetchProducts()}
                /> :
                <View style={styles.emptyView}>
                    <Text>No Products</Text>
                    <Button title="Refresh" onPress={() => fetchProducts()} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
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
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    emptyView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
