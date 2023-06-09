import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const Update = () => {
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async () => {
    if (!newUsername && !newEmail && !newPassword) {
      Alert.alert("Error", "Please fill at least one field");
      return;
    }
    setLoading(true);
    try {
      const userId = ""; // Replace with the user ID or retrieve it from your authentication system
      const payload = {};
      if (newUsername) payload.username = newUsername;
      if (newEmail) payload.email = newEmail;
      if (newPassword) payload.password = newPassword;

      // Send the update profile request with the obtained user ID
      await axios.put(`http://192.168.43.237:4000/users/${userId}`, payload);

      Alert.alert("Success", "Your profile has been updated.");
      navigation.navigate("Homes");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../../assets/images/Logo.png")}
          />
          <Text style={styles.title}>
            Update <Text style={{ color: "#075eec" }}>Profile</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.inputControl}
              autoCorrect={false}
              value={newUsername}
              onChangeText={(text) => setNewUsername(text)}
              placeholder="New Username"
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputControl}
              autoCorrect={false}
              value={newEmail}
              onChangeText={(text) => setNewEmail(text)}
              placeholder="New Email"
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[
                  styles.inputControl,
                  { flex: 1, borderRightWidth: 1, borderColor: "#ccc" },
                ]}
                autoCorrect={false}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                placeholder="New Password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showNewPassword}
              />

              <View style={{ position: "absolute", right: 8 }}>
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <MaterialIcons
                    name={showNewPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                {loading ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator color="#fff" />
                    <Text style={styles.loaderText}>Please wait...</Text>
                  </View>
                ) : (
                  <Text style={styles.btnText}>Update</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: -40,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },

  input: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  inputControl: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 13,
    color: "#9CA3AF",
  },
  formAction: {
    marginVertical: 24,
    marginBottom: 5,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#075eec",
  },
  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loaderText: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default Update;
