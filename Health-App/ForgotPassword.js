import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  // ForgotPassword Screen Redirection
  const handleReset = ()=>{
    navigation.navigate("")
  }

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
            source={require("../Health-App/assets/images/Logo.png")}
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
            <Text style={styles.inputLabel}>New Password</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                autoCorrect={false}
                onChangeText={(text) => setNewPassword(text)}
                placeholder="Enter Password"
                placeholderTextColor="#6b7280"
                style={[styles.inputControl, { flex: 1, borderRightWidth: 1 }]}
                secureTextEntry={!showPassword}
                value={newpassword}
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
                handleReset();
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Reset Password</Text>
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

export default ForgotPassword;
