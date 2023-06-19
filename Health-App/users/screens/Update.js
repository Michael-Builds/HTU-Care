import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Update = () => {
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userId, setUserId] = useState(null); // Added state for user ID


//handle click for image upload
const handleImageUpload = async () => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      throw new Error("Permission to access media library was denied");
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setSelectedImage(pickerResult.assets[0].uri); // Update the URI assignment
    }
  } catch (error) {
    console.error("Failed to upload image:", error);
  }
};


useEffect(() => {
  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://192.168.43.237:4000/users/id");
      const { userID } = response.data;
      setUserId(userID);
    } catch (error) {
      console.log("Error: Failed to fetch user ID.", error);
    }
  };

  fetchUserId();
}, []);

  //handle click for submitting the form
  const handleSubmit = async () => {
    if (!newUsername && !newEmail && !newPassword && !selectedImage) {
      Alert.alert("Error", "Please fill at least one field");
      return;
    }
    setLoading(true);
    try {

      const payload = new FormData();
      if (newUsername) payload.append("username", newUsername);
      if (newEmail) payload.append("email", newEmail);
      if (newPassword) payload.append("password", newPassword);
      if (selectedImage) {
        const imageUri =
          Platform.OS === "android" ? `file://${selectedImage}` : selectedImage;
        payload.append("image", {
          uri: imageUri,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      await axios.patch(`http://192.168.43.237:4000/users/${userId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Your profile has been updated.");
      navigation.navigate("Homes");
    } catch (error) {
      console.log("Error", "Failed to update profile.", error);
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
      <ScrollView>
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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Profile Image</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleImageUpload}
              >
                <Text style={styles.uploadButtonText}>Choose Image</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
              )}
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
                    <Text style={styles.btnText}>Update Profile</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginTop: -2,
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
  uploadButton: {
    backgroundColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
});

export default Update;
