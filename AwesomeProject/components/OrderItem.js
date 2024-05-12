import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAvoidingView} from 'react-native';
import { BASE_API_URL } from '../services/api';

export default function OrderItem({ product, quantity, totalAmount, deliveryDate, onDateChange, inputHandler, onAddressChange}) {
    const defaultImage = 'https://reactnative.dev/img/tiny_logo.png';
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const serverURI = BASE_API_URL.split('/api/')[0];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || deliveryDate;
        setShow(Platform.OS === 'ios');
        onDateChange(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
        setMode('date');
    };

    const showTimepicker = () => {
        setShow(true);
        setMode('time');
    };

    return (
        
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
        <View style={styles.container}>
            <Image style={styles.logo} source={{ uri: serverURI+product.picture || defaultImage }} />
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.infoBox}>
                <Text style={styles.descriptionText}>{product.description}</Text>
                <Text style={styles.text}>Available Quantity: {product.quantity}</Text>
                <Text style={styles.priceLine}>
                    Price: <Text style={styles.originalPrice}>${product.price}</Text> ${(product.price * product.discount).toFixed(2)}
                </Text>
            </View>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => inputHandler(quantity > 1 ? quantity - 1 : 1)} style={[styles.button, styles.decrementButton]}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput 
                    style={styles.textInput} 
                    value={quantity.toString()} 
                    onChangeText={inputHandler}
                    keyboardType='numeric' 
                    textAlign='center'
                />
                <TouchableOpacity onPress={() => inputHandler(Math.min(quantity + 1, product.quantity))} style={[styles.button, styles.incrementButton]}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>Delivery Date: {deliveryDate.toLocaleDateString()}</Text>
            <Text style={styles.text}>Delivery Time: {deliveryDate.toLocaleTimeString()}</Text>
            <View style={styles.buttonContainer}>
                <Button icon={<Icon name="calendar" size={15} color="white" />} onPress={showDatepicker} title="Select Date" />
                <Button icon={<Icon name="clock-o" size={15} color="white" />} onPress={showTimepicker} title="Select Time" />
            </View>

            {show && (
                <DateTimePicker value={deliveryDate} minimumDate={new Date()} mode={mode} is24Hour={true} display="default" onChange={onChange} />
            )}

            <Text style={styles.amountText}>Total: ${totalAmount}</Text>
            <TextInput
                style={styles.AddressInput}
                placeholder="Enter your address"
                onChangeText={onAddressChange}
            />
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    infoBox: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        color: '#555',
    },
    descriptionText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#999',
        marginRight: 5,
    },
    priceLine: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '500',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 80,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        padding: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    decrementButton: {
        // backgroundColor: '#cc6868',
        backgroundColor: '#06629d',
    },
    incrementButton: {
        // backgroundColor: '#68cc7d',
        backgroundColor: '#12354c',
    },
    buttonText:{
        fontSize: 18,
        color: 'white',
    },
    AddressInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        marginTop: 20,
    },

});
