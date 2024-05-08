import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import ProductItem from '../components/ProductItem';

export default function ProductsScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsList, setProductsList] = useState([
        {
            "id": 1,
            "name": "pearl",
            "price": "99.99",
            "discount": 1.0,
            "quantity": 10,
            "description": "This is a pearl",
            "picture": "",
            "created": "2018-12-22",
            "updated": "2019-02-16"
        },
        {
            "id": 2,
            "name": "Apple",
            "price": "1.99",
            "discount": 1.0,
            "quantity": 90,
            "description": "This is an apple",
            "picture": "",
            "created": "2018-12-22",
            "updated": "2019-02-16"
        }
    ]);

    useEffect(() => {
        setFilteredProducts(filterProducts());
    }, [searchQuery]);

    const pressHandler = (product) => {
        navigation.navigate('Order', {
            product: product
        });
    };

    const fetchProducts = () => {
        setIsLoading(true);
        console.log("Fetching product list from server ...");
        // Simulate fetching data from server
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const filterProducts = () => {
        return productsList.filter(product =>
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
