import React, { Fragment, useState, useCallback } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
} from "react-native";
import { BASE_API_URL} from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';

// LoginScreen.propTypes = {
//   register: PropTypes.bool,
// };

// LoginScreen.defaultProps = {
//   register: false,
// };

// Placeholder functions for handling login and register navigation
const handleSignUp = () => {};

const handleForgotPassword = () => {
  console.log("Forgot Password");
};

const handleRegisterNavigation = () => {
  // console.log("navigate to register");
  navigation.navigate("Register");
};

const googleLogo = require("../assets/images/google-logo.png");
const facebookLogo = require("../assets/images/facebook-logo.png");
const AppleLogo = require("../assets/images/apple-logo.png");
const Logo = require("../assets/images/logo.png");

export default function LoginScreen({ navigation , onLogin}) {
  var register = false;
  const [Username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [maintenancePopup, setMaintenancePopup] = useState(false); // State variable for showing maintenance popup
  const [regUsername, regsetUsername] = useState("");
  const [regpassword, regsetPassword] = useState("");

  const handleOAuthLogin = (service) => {
    console.log(`Login with ${service}`);
    setMaintenancePopup("This feature is under maintenance");
  };

  const [registrationModalVisible, setRegistrationModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  

  // Function to handle opening and closing of the registration modal
  const toggleRegistrationModal = () => {
    setRegistrationModalVisible(!registrationModalVisible);
  };

  const handleLogin = useCallback(async () => {
    try {
      const data = { username: Username, password: password, role: role }; // Modify the data object to match API requirements
      var endpoint = BASE_API_URL + "api-token-auth/";
      const response = await fetch(
        endpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // Handle error if response is not OK
        if (response.status === 400) {
          // If response status is 400, display the modal for incorrect password or username
          setMaintenancePopup("Incorrect username or password");
        } else {
          console.error("Login failed");
        }
        return;
      }

      const responseData = await response.json();
      const { token } = responseData;

      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("username", Username);
      // await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("role", responseData.role);

      console.log("Token:", token);
      console.log("Username:", Username);
      console.log("Role:", responseData.role);

      // Redirect or update state accordingly
      // For example, navigate to the next screen
      onLogin(token, responseData.role);
      // navigation.navigate("Home", { token }); 
      // navigation.navigate("Products", { token: responseData.token, role: responseData.role});


      // refesh the page
      (0);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [Username, password, navigation]);

  const handleRegistration = useCallback(async () => {
    try {
      const data = {
        username: regUsername,
        password: regpassword,
        password2: password2,
        email: email,
      };
      const endpoint = BASE_API_URL + "api/admin/account/";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        console.error("Registration failed");
        setMaintenancePopup("A user with that username already exists.");
        return;
      }
  
      const responseData = await response.json();
      console.log("Registration response:", responseData);      
  
      // Close the registration modal after successful registration
      toggleRegistrationModal();

    } catch (error) {
      console.error("Error:", error);
    }
  }, [regUsername, regpassword, password2, email]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        {!register ? (
          <Fragment>
            <Text style={styles.title}>Let's Sign You In</Text>
            <Text style={styles.subtitle}>
              Welcome back, you've been missed!
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Nice to meet You!</Text>
          </Fragment>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.inputHint}>Username</Text>

          <View style={styles.inputIcon}>
            <FontAwesome name="user" size={20} color="#8F92A1" />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={Username}
              placeholder="Username"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHint}>Password</Text>
          <View style={styles.inputIcon}>
            <FontAwesome name="lock" size={20} color="#8F92A1" />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Password"
            />
          </View>
        </View>
        {/* Add eye icon for password visibility */}
        {!register ? null : (
          <View style={styles.inputContainer}>
            <Text style={styles.inputHint}>Retype Password</Text>
            <View style={styles.inputIcon}>
              <MaterialCommunityIcons name="lock" size={20} color="#8F92A1" />
              <TextInput
                style={styles.input}
                onChangeText={setPassword2}
                value={password2}
                secureTextEntry
                placeholder="Enter Password Again"
              />
            </View>
          </View>
        )}
        {!register ? (
          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
            {/* Add arrow icon */}
          </TouchableOpacity>
        ) : (
          <Fragment></Fragment>
        )}
        <TouchableOpacity onPress={() => {
          setRole(role == 'user' ? 'admin' : 'user');
        }}>

<View style={styles.registerTextContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={toggleRegistrationModal}>
            <Text style={styles.registerButtonText}>Sign up here</Text>
          </TouchableOpacity>
        </View>
          <Text style={styles.registerButtonText}>{role}</Text>
        </TouchableOpacity>
        {register ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={styles.line} />
            <Text style={styles.orSignInWithText}>Or sign in with</Text>
            <View style={styles.line} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={styles.line} />
            <Text style={styles.orSignInWithText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>
        )}

        <View style={styles.oauthContainer}>
          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleOAuthLogin("Google")}
          >
            <Image source={googleLogo} style={styles.oauthLogo} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleOAuthLogin("Apple")}
          >
            <Image source={AppleLogo} style={styles.oauthLogo} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.oauthButton}
            onPress={() => handleOAuthLogin("Facebook")}
          >
            <Image source={facebookLogo} style={styles.oauthLogo} />
          </TouchableOpacity>
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={registrationModalVisible}
          onRequestClose={toggleRegistrationModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Registration form fields */}
              <Text style={styles.modalText}>Registration Form</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => regsetUsername(text)}
                value={regUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => regsetPassword(text)}
                value={regpassword}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Re-enter Password"
                onChangeText={(text) => setPassword2(text)}
                value={password2}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              {/* Buttons for registration and closing the modal */}
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={handleRegistration} // Implement this function
              >
                <Text style={styles.textStyle}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={toggleRegistrationModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={maintenancePopup} // Show the popup based on state variable
          onRequestClose={() => {
            setMaintenancePopup(false); // Close the popup when requested
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{maintenancePopup}</Text>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setMaintenancePopup(false); // Close the popup when clicked
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48, // This would be for status bar height
  },
  container: {
    paddingHorizontal: 35,
    paddingTop: 148,
    height: 812, // Fixed height could be problematic, consider using flex
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    letterSpacing: -0.8,
    color: "#171717",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: -0.4,
    color: "rgba(23, 23, 23, 0.6)",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 20,
  },
  inputIcon: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically in the center
    borderBottomWidth: 1,
    borderBottomColor: "rgba(143, 146, 161, 0.2)",
    paddingTop: 20, // Provide space above the input and icon
    paddingBottom: 8, // And space below
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingHorizontal: 10, // Spacing from the icon to the text
    color: "#171717",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: -0.2,
    color: "#171717",
  },
  inputHint: {
    position: "absolute",
    height: 16,
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 20,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.17,
    color: "#8F92A1",
  },
  // input: {
  //   height: 44,
  //   marginTop: 16,
  //   marginLeft: 30,
  // fontSize: 16,
  // fontWeight: '500',
  // lineHeight: 20,
  // letterSpacing: -0.2,
  // color: '#171717',
  // borderBottomWidth: 1,
  // borderBottomColor: 'rgba(143, 146, 161, 0.2)',
  // },
  signInButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#C6AB59",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  accountText: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 17,
    letterSpacing: -0.2,
    color: "rgba(23, 23, 23, 0.6)",
    textAlign: "center",
    marginBottom: 20,
  },
  socialConnectContainer: {
    width: 305,
    height: 48,
    backgroundColor: "#3C79E6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 82, // Adjusted for visual layout in React Native
  },
  connectText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: -0.8,
    color: "#FFFFFF",
  },
  homeIndicator: {
    position: "absolute",
    width: 134,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 100,
    bottom: 8,
    alignSelf: "center",
    opacity: 0.05,
  },
  registerTextContainer: {
    alignSelf: "center", // Center the text components
    flexDirection: "row", // Align text components in a row
    marginTop: 20, // More spacing above the registration prompt
    alignItems: "center", // Align items vertically
  },
  registerText: {
    fontSize: 12,
    color: "#333", // Dark text for readability
  },
  registerButtonText: {
    color: "#007AFF", // Use the primary color for the 'Sign up here' text
    fontWeight: "bold",
    fontSize: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D0D0D0",
  },
  orSignInWithText: {
    color: "#A0A0A0",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  oauthContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 0,
  },
  oauthButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
  oauthLogo: {
    width: 24,
    height: 24,
  },
  forgotPasswordText: {
    color: "#007AFF", // Use your theme color
    fontSize: 14,
    marginTop: 15, // Adjust the margin as needed
  },
  // Styles for maintenance popup
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#DADDE1",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#000000",
  },
  openButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#4267B2",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
