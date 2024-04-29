import { Icon } from '@rneui/themed';
import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import { WebView } from "react-native-webview";

export default function PaypalView({ url, showModal, closeModal, paypalHandler }) {
    return (
        <Modal
            visible={showModal}
            onRequestClose={closeModal}
        >
            <SafeAreaView style={styles.modalView}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{padding: 13}}
                        onPress={closeModal}>
                        <Icon  name='close' size={24} color='white'/>
                    </TouchableOpacity>
                    <Text
                        style={styles.headerText}>
                        PayPal
                    </Text>
                </View>

                <WebView
                    source={{ uri: url }}
                    onNavigationStateChange={paypalHandler}
                    style={{ marginTop: 20 }}
                    renderLoading={() => (
                        <ActivityIndicator
                            color="black"
                            size="large"
                            style={styles.flexContainer}
                        />
                    )}
                />
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
    },
    flexContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0079C1',
        zIndex: 25,
        elevation: 2,
    },
    headerText:{
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
})