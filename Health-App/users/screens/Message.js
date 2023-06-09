import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Messages = () => {
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([
    { id: 1, sender: "Sender", text: "Call me!" },
    { id: 2, sender: "Receiver", text: "Hi there!" },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newId = messages.length + 1;
      const newMessageObj = {
        id: newId,
        sender: "Receiver",
        text: newMessage,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Home" isHome={true} navigation={navigation} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.container}>
          <View style={styles.senderContainer}>
            <Image
              source={require("../../assets/images/nurse.png")}
              style={styles.senderImage}
            />
            <View style={styles.senderNameContainer}>
              <Text style={styles.senderName}>Sender</Text>
            </View>
            <View style={styles.senderMessageContainer}>
              {messages.map((message) => {
                if (message.sender === "Sender") {
                  return (
                    <View style={styles.senderQuote} key={message.id}>
                      <Text style={styles.senderMessageText}>
                        {message.text}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          </View>

          <View style={styles.receiverContainer}>
            <Image
              source={require("../../assets/images/nurse.png")}
              style={styles.receiverImage}
            />
            <View style={styles.recieverNameContainer}>
              <Text style={styles.receiverName}>Receiver</Text>
            </View>
            <View style={styles.receiverMessageContainer}>
              {messages.map((message) => {
                if (message.sender === "Receiver") {
                  return (
                    <View style={styles.receiverQuote} key={message.id}>
                      <View style={styles.receiverPointer} />
                      <Text style={styles.receiverMessageText}>
                        {message.text}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          </View>
        </View>

        <View style={styles.messageBoxContainer}>
          <TextInput
            style={styles.messageBox}
            placeholder="Type your message"
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
  },
  senderContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    marginTop: 15,
  },
  receiverContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: 16,
    marginTop: 40,
  },
  senderImage: {
    width: 40,
    height: 40,
    backgroundColor: "#E7EAEA",
    borderRadius: 40,
    marginBottom: 8,
  },
  receiverImage: {
    backgroundColor: "#E7EAEA",
    width: 45,
    height: 45,
    borderRadius: 40,
    marginBottom: 8,
  },
  senderNameContainer: {
    position: "absolute",
    top: 18,
    right: 82,
  },
  senderName: {
    color: "#333",
    fontSize: 12,
    marginBottom: 8,
  },
  recieverNameContainer: {
    position: "absolute",
    top: 20,
    right: 67,
  },
  receiverName: {
    color: "#333",
    fontSize: 12,
    marginBottom: 8,
  },
  senderMessageContainer: {
    marginTop: 8,
  },
  receiverMessageContainer: {
    marginTop: 8,
  },
  senderQuote: {
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
    position: "relative",
    marginLeft: 15,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#EFEFEF",
    width: "100%",
    textAlign: "justify",
  },
  receiverQuote: {
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
    position: "relative",
    marginLeft: 30,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#EFEFEF",
    width: "100%",
    textAlign: "justify",
  },
  receiverPointer: {
    position: "absolute",
    top: 4,
    left: -7,
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderTopColor: "transparent",
    borderRightWidth: 7,
    borderRightColor: "#EFEFEF",
    borderBottomWidth: 7,
    borderBottomColor: "transparent",
  },
  senderMessageText: {
    fontSize: 16,
    color: "#333",
  },
  receiverMessageText: {
    fontSize: 16,
    color: "#333",
  },
  messageBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  messageBox: {
    flex: 1,
    height: 70,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 5,
    backgroundColor: "#fff",
  },
  sendButton: {
    alignItems: "center", 
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#075eec",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Messages;
