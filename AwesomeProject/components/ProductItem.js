import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function ProductItem({ item, pressHandler}) {
    const defaultImage = 'https://reactnative.dev/img/tiny_logo.png'
    return (
        <TouchableOpacity
            style={styles.whitebox}
            activeOpacity={1}
            onPress={() => pressHandler (item)}
            >
            {/* item item image */}
            <Image
                style={styles.logo}
                source={{ uri: item.picture == null || item.picture == "" ? defaultImage : item.picture }}
            />

            {/* item item info display box*/}
            <View style={styles.infoBox}>
                <Text style={styles.title}>{item.name}</Text>
                <View>
                    <Text>{item.description}</Text>
                    <Text>Qty: {item.quantity}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text>Last Update: {item.updated}</Text>
                </View>
            </View>

            {/* https://icons.expo.fyi/ */}
            <MaterialIcons
                name="add-shopping-cart"
                size={32}
                color="skyblue"
                style={styles.rightIcon}
            />
        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
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
