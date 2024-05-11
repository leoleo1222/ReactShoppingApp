import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function OrderItem({ product, quantity, totalAmount, deliveryDate, onDateChange, inputHandler }) {
    const defaultImage = 'https://reactnative.dev/img/tiny_logo.png';
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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
        <View style={styles.container}>
            <Image style={styles.logo} source={{ uri: product.picture || defaultImage }} />
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.infoBox}>
                <Text style={styles.descriptionText}>{product.description}</Text>
                <Text style={styles.text}>Available Quantity: {product.quantity}</Text>
                <Text style={styles.priceLine}>
                    Price: <Text style={styles.originalPrice}>${product.price}</Text> ${(product.price * product.discount).toFixed(2)}
                </Text>
            </View>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => inputHandler(quantity > 1 ? quantity - 1 : 1)} style={[styles.button, {backgroundColor: '#06629d'}]}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput 
                    style={styles.textInput} 
                    value={quantity.toString()} 
                    onChangeText={inputHandler}
                    keyboardType='numeric' 
                    textAlign='center'
                />
                <TouchableOpacity onPress={() => inputHandler(Math.min(quantity + 1, product.quantity))} style={[styles.button, {backgroundColor: '#12354c'}]}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>Delivery Date: {deliveryDate.toLocaleDateString()}</Text>
            <View style={styles.buttonContainer}>
                <Button icon={<Icon name="calendar" size={15} color="white" />} onPress={showDatepicker} title="Date" />
                <Button icon={<Icon name="clock-o" size={15} color="white" />} onPress={showTimepicker} title="Time" />
            </View>

            {show && (
                <DateTimePicker value={deliveryDate} minimumDate={new Date()} mode={mode} is24Hour={true} display="default" onChange={onChange} />
            )}

            <Text style={styles.amountText}>Total: ${totalAmount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 80,
        width: 80,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    infoBox: {
        alignSelf: 'stretch',
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666666',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        marginRight: 5,
    },
    priceLine: {
        fontSize: 16,
        marginBottom: 5,
    },
    amountText: {
        fontSize: 16,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        width: 60,  // Set a fixed width for the input
        textAlign: 'center',
    },
    button: {
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: '#dddddd',
    },
    buttonText:{
        color: 'white',
    }
});
