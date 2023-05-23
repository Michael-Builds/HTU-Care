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

const PasswordUpdate = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  //Password Strenght Validation
  const validatePassword = (currentPassword, newPassword) => {
    // Regular expressions to check for password requirements
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check password length
    if (currentPassword.length < 8 || newPassword.length < 8) {
      return false;
    }

    // Check for uppercase, lowercase, number, and symbol
    if (
      (!uppercaseRegex.test(currentPassword) ||
        !uppercaseRegex.test(newPassword),
      !lowercaseRegex.test(currentPassword) ||
        !lowercaseRegex.test(newPassword),
      !numberRegex.test(currentPassword) || !numberRegex.test(newPassword),
      !symbolRegex.test(currentPassword) || !symbolRegex.test(newPassword))
    ) {
      return false;
    }

    return true;
  };

  handleSubmit = async (userId, CurrentPassword, NewPassword) => {
    if (!validatePassword(currentPassword && newPassword)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long"
      );
      return;
    }

    if (!currentPassword || !newPassword) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setLoading(true); // Set loading state to true
    try {
      // Send the update password request with the obtained user ID
      await axios.put(`http://192.168.43.237:4000/users/${userId}`, {
        CurrentPassword,
        NewPassword,
      });

      // Password updated successfully
      Alert.alert("Success", "Your password has been updated.");
      // Navigate to the home screen
      navigation.navigate("Homes");
    } catch (error) {
      // Error occurred while updating password
      if (error.response.status === 401) {
        Alert.alert("Error", "Invalid current password.");
      } else {
        Alert.alert("Error", "Failed to update password.");
      }
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Password Update" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../../assets/images/Logo.png")}
          />

          <Text style={styles.title}>
            Reset <Text style={{ color: "#075eec" }}>Password</Text>
          </Text>

          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Old Password</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.inputControl, { flex: 1, borderRightWidth: 1 }]}
                autoCorrect={false}
                placeholder="Old Password"
                placeholderTextColor="#6b7280"
                onChangeText={(text) => setCurrentPassword(text)}
                value={currentPassword}
                secureTextEntry={!showCurrentPassword}
              />
              <View style={{ position: "absolute", right: 8 }}>
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <MaterialIcons
                    name={showCurrentPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.inputControl, { flex: 1, borderRightWidth: 1 }]}
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
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
            >
              <View style={styles.btn}>
                {loading ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator color="#fff" />
                    <Text style={styles.loaderText}>Please wait...</Text>
                  </View>
                ) : (
                  <Text style={styles.btnText}>Reset Password</Text>
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
    marginTop: -25,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },

  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#222",
    marginBottom: 10,
  },
  inputControl: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 15,
    color: "#222",
  },
  formAction: {
    marginVertical: 24,
    marginBottom: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "500",
    color: "#fff",
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    marginLeft: 10,
    color: "#fff",
  },
});

export default PasswordUpdate;
