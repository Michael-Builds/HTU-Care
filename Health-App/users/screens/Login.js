import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Signup Screen Redirection
  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  //Email Validity
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  handleSubmit = () => {
    if (!isEmailValid(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setLoading(true);
    fetch("http://192.168.43.237:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem("token", data.token);
          Alert.alert("Success", "Logged in successfully!");
          navigation.navigate("SideDrawer");
        } catch (e) {
          console.log("Error logging in", e);
          Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error parsing response", error);
        if (error.message === "Network request failed") {
          Alert.alert(
            "Network Error",
            "Please check your internet connection and try again."
          );
        } else {
          Alert.alert("Error", "Something went wrong. Please try again.");
        }
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../assets/images/Logo.png")}
          />

          <Text style={styles.title}>
            Login to <Text style={{ color: "#075eec" }}>Continue</Text>
          </Text>

          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter Email"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              caretHidden={false}
              caretColor="#191970"
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter Password"
                placeholderTextColor="#6b7280"
                style={[styles.inputControl, { flex: 1, borderRightWidth: 1 }]}
                secureTextEntry={!showPassword}
                value={password}
                caretHidden={false}
                caretColor="#191970"
              />
              <View style={{ position: "absolute", right: 8 }}>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility-off" : "visibility"}
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
                    <Text style={styles.loaderText}>Loading...</Text>
                  </View>
                ) : (
                  <Text style={styles.btnText}>Login</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={handleSignUp}
              style={{ marginTop: "auto" }}
            >
              <Text
                style={{
                  color: "#075eec",
                  textDecorationLine: "underline",
                  fontSize: 16,
                  textAlign: "center",
                  letterSpacing: 0.15,
                }}
              >
                Sign up
              </Text>
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

  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
  btnText: {
    color: "#fff",
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
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
    marginBottom: 5,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#222",
    marginBottom: 9,
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
});

export default Login;
