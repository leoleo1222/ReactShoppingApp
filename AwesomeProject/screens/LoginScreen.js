import React from 'react'

import {
        ImageBackground,
        Image,
        KeyboardAvoidingView,
        StyleSheet,
        ScrollView,
        TouchableOpacity,
        View,
        Text,
    } from 'react-native';
    
export default function LoginScreen() {
    return (
        <ImageBackground
            source={require("../assets/images/login_bg.jpeg")}
            style={styles.bgImage}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo} 
            />
            </ScrollView>    
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
      },
    bgImage:{
        width:'100%',
        height:'100%'
    },
    scrollView: {
        marginTop: 40,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
        marginBottom: 10
    },

    })
    

