import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

export default function ProductsScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const defaultImage='https://handbook.ar.hkbu.edu.hk/assets/calendar/images/logo.png'
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
    

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Products</Text>
            {productsList.length > 0 ?
                <FlatList
                    data={productsList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item})=>(

                        <TouchableOpacity
                            style={styles.whitebox}
                            activeOpacity={1}
                            onPress={() => {}}
                        >
                        
                        <Image
                            style={styles.logo}
                            source={{ uri: item.picture == null || item.picture == "" ? defaultImage : item.picture }}
                        />
                        
                        <View style={styles.infoBox}>
                            <Text style={styles.title}>{item.name}</Text>
                            <View>
                                <Text>{item.description}</Text>
                                <Text>Qty: {item.quantity}</Text>
                                <Text>Price: ${item.price}</Text>
                                <Text>Last Update:{item.updated}</Text>
                            </View>
                        </View>

                        <MaterialIcons
                            name="add-shopping-cart"
                            size={32}
                            color="skyblue"
                            style={styles.rightIcon}
                        />

                        </TouchableOpacity>
                    )}
                        
                    refreshing={isLoading}
                /> :
                <View Style={styles.emptyView}>
                    <Text>No Products</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    topText:{
        marginTop:50,
        marginBottom:20,
        fontSize: 20,
        fontWeight:"blod",
        textAlign:"left",
    },
    whitebox: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        backgroundColor: 'white',
    },
    logo: {
        width: 50,
        height: 50,
    },
    infoBox: {
        marginHorizontal: 20,
        flexGrow: 1,
    },
    rightIcon: {
        alignSelf: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }

})
