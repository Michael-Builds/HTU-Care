import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import HealthRecords from "../screens/HealthRecords";
import ViewRecords from "../screens/ViewRecords";
import PasswordUpdate from "../screens/Update";
import Prescription from "../screens/Prescription";
import Logout from "../screens/Logout";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("Loading");
  const [email, setEmail] = useState("Loading");

  //Users data callback API
  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://192.168.43.237:4000/", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      });
      const data = await response.json();
      console.log(data);
      setUsername(data.username);
      setEmail(data.email);
    }
    fetchData();
  }, []);

  //Logout Logic Here
  const Signout = async (props) => {
    await AsyncStorage.removeItem("token");
    props.navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Image Profile View */}
      <View
        style={{
          height: 160,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Image container and User name Appearance */}
        <View
          style={{
            borderBottomColor: "#6b7280",
            borderBottomWidth: 1,
            flexDirection: "row",
            paddingBottom: 10,
            alignItems: "center",
            marginBottom: -35,
          }}
        >
          <Image
            style={{
              marginBottom: 5,
              height: 65,
              width: 65,
            }}
            source={require("../../assets/images/account.png")}
          />
        </View>
      </View>

      <ScrollView
        style={{
          marginLeft: 5,
        }}
      >
        {/* Users details callback */}
        <View>
          <Text
            style={{
              justifyContent: "center",
              fontSize: 17,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "center",
              color: "#333",
            }}
          >
           {username}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              fontSize: 13,
              fontWeight: "normal",
              marginBottom: 20,
              textAlign: "center",
              color: "#9CA3AF",
            }}
          >
            {email}
          </Text>
        </View>

        {/* Home Tab */}
        <TouchableOpacity
          style={{
            marginTop: 25,
            flexDirection: "row",
            marginBottom: 20,
            marginLeft: 10,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Menu")}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
            }}
            source={require("../../assets/images/Dashboard.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Text>
        </TouchableOpacity>

        {/* Records Tab */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            marginBottom: 20,
            marginLeft: 10,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("HealthRecords")}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
            }}
            source={require("../../assets/images/medical-report.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Upload Records
          </Text>
        </TouchableOpacity>

        {/* View Records Tab */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            marginBottom: 20,
            marginLeft: 10,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("ViewRecords")}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
              tintColor: "#007bff",
            }}
            source={require("../../assets/images/patient.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            View Records
          </Text>
        </TouchableOpacity>

        {/* Records Update Section */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            marginBottom: 20,
            marginLeft: 10,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("PasswordUpdate")}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
            }}
            source={require("../../assets/images/update.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Profile Update
          </Text>
        </TouchableOpacity>

        {/* Settings Section */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            marginBottom: 20,
            marginLeft: 10,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Prescription")}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
            }}
            source={require("../../assets/images/settings.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Prescriptions
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Tab */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 100,
          marginLeft: 10,
          alignItems: "center",
        }}
        onPress={() => {
          props.navigation.closeDrawer();
          setModalVisible(true);
        }}
      >
        <Image
          style={{ width: 35, height: 35, marginLeft: 20 }}
          source={require("../../assets/images/logout.png")}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: 20,
            fontSize: 17,
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 15,
              width: "80%",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Logout
            </Text>
            <Text style={{ marginBottom: 15 }}>
              Are you sure you want to Logout?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "blue",
                  padding: 10,
                  borderRadius: 5,
                  width: "25%",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 5,
                  width: "25%",
                }}
                onPress={() => {
                  setModalVisible(false);
                  Signout(props);
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const SideDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => CustomDrawerContent(props)}
      initialRouteName="Menu"
    >
      <Drawer.Screen
        name="Menu"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="HealthRecords"
        component={HealthRecords}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="ViewRecords"
        component={ViewRecords}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="PasswordUpdate"
        component={PasswordUpdate}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Prescription"
        component={Prescription}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default SideDrawer;
