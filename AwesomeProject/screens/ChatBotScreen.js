import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Keyboard,
  ScrollView,
} from "react-native";
import BASE_API_URL from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatBotScreen = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const scrollViewRef = useRef();
  const [token, setToken] = useState("");

  const questions = {
    questions: [
      {
        id: 1,
        text: "What item do you want information about?",
      },
      {
        id: 2,
        text: "Tell me my order details?",
      },
      {
        id: 3,
        text: "What promotions are available?",
      },
      {
        id: 4,
        text: "What product is on sale?",
      },
    ],
  };

  const responses = {
    responses: {
      "What item do you want information about?":
        "We have a wide range of products available. Please let us know the category you are interested in."
    },
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        Animated.timing(keyboardHeight, {
          duration: e.duration,
          toValue: e.endCoordinates.height,
          useNativeDriver: false,
        }).start();
      },
      []
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOptionSelect = (option) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: option, sender: "user" },
    ]);
  
    // If the user typed the message directly, send it to the API
    if (!questions.questions.some((question) => question.text === option)) {
      console.log("Sending message to API:", option);
      fetch("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: option,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from API:", data);
          // Update chat history with response from API
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { text: data.messages[0].content, sender: "bot" },
          ]);
        })
        .catch((error) => {
          console.error("Error sending message to API:", error);
          // Update chat history with error message if API call fails
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              text: "Sorry, there was an error processing your request.",
              sender: "bot",
            },
          ]);
        });
    } else {
      // If the user selected a predefined question, handle it accordingly
      const response = responses.responses[option];
      if (response) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { text: response, sender: "bot" },
        ]);
      // } else if (option === "What product is on sale?" && token) {
      } else if (option === "What product is on sale?") {
        console.log("Fetching products...");
        // Fetch product data from Django only if token is available
        fetchProducts();
      } else if (option === "Tell me my order details?") {
        console.log("Fetching order...");
        // Fetch order data from Django only if token is available
        fetchOrder();

      }
    }
  };
  
  const fetchOrder = async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      console.error("No token available.");
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          text: "Sorry, you need to log in to view your orders.",
          sender: "bot",
        },
      ]);
      return;
    }
  
    // Fetch orders data from Django API endpoint with token in headers
    fetch("http://127.0.0.1:8000/api/orders/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract order details from the fetched data
        console.log("Orders fetched successfully:", data);
  
        // Assuming data is an array of orders
        data.forEach((order) => {
          const {
            invoice_no,
            product: { name: productName },
            quantity,
            total_amount: price,
            delivery_date,
            status,
          } = order;
  
          const orderDetails = `Invoice: ${invoice_no}\nProduct: ${productName}\nQuantity: ${quantity}\nPrice: ${price}\nDelivery Date: ${delivery_date}\nStatus: ${status}`;
  
          // Update chat history with the order details
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { text: orderDetails, sender: "bot" },
          ]);
        });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        // Update chat history with error message if fetching fails
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            text: "Sorry, there was an error fetching orders.",
            sender: "bot",
          },
        ]);
      });
  };
  
  

  const fetchProducts = () => {
    // Fetch product data from Django API endpoint with token in headers
    fetch("http://127.0.0.1:8000/api/product/", {
      // headers: {
      //   Authorization: `Token ${token}`,
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract product details from the fetched data
        console.log("Data fetched:", data);
        // Extract product details from the product object
        const { name, price, discount, quantity, description } = data[0];
        const productDetails = `Product Name: ${name}\nPrice: $${price}\nDiscount: ${discount}%\nQuantity: ${quantity}\nDescription: ${description}`;
        
        // Update chat history with the product details
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { text: productDetails, sender: "bot" },
        ]);
        console.log("Product details fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        // Update chat history with error message if fetching fails
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            text: "Sorry, there was an error fetching product details.",
            sender: "bot",
          },
        ]);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ChatBot</Text>
        </View>
        <View style={styles.chatContainer}>
          <Animated.ScrollView
            ref={scrollViewRef}
            style={[styles.chatScrollView, { marginBottom: keyboardHeight }]}
            contentContainerStyle={{ paddingVertical: 20 }}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {chatHistory.map((chat, index) => (
              <View
                key={index}
                style={
                  chat.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                <Text style={styles.messageText}>{chat.text}</Text>
              </View>
            ))}
          </Animated.ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              onChangeText={setMessage}
              value={message}
              onSubmitEditing={() => {
                handleOptionSelect(message);
                setMessage("");
              }}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                handleOptionSelect(message);
                setMessage("");
              }}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {questions.questions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(question.text)}
              >
                <Text style={styles.optionText}>{question.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4267B2",
  },
  chatContainer: {
    flex: 1,
    width: "100%",
  },
  chatScrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "70%",
    elevation: 3,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "70%",
    elevation: 3,
  },
  messageText: {
    // black
    color: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#DADADA",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#DADADA",
    backgroundColor: "#FFFFFF",
  },
  optionButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    marginRight: 10,
  },
  optionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  productDetailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailValue: {
    marginBottom: 10,
  },
});

export default ChatBotScreen;
