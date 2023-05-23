import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNav from "./BottomTabNav";
import Signout from "../screen/Signout";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
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
    await AsyncStorage.removeItem("token").then(() => {
      props.navigation.replace("Login");
    });
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
              marginBottom: 12,
              height: 70,
              width: 70,
              borderRadius: 20,
              tintColor: "#007bff",
            }}
            source={require("../../assets/images/User.png")}
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
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              fontSize: 14,
              fontWeight: "normal",
              marginBottom: 10,
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
            marginBottom: 15,
            marginLeft: 20,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Menu")}
        >
          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 10,
              tintColor: "#007bff",
            }}
            source={require("../../assets/images/route.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 17,
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Main
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Tab */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 90,
          marginLeft: 20,
          alignItems: "center",
        }}
        onPress={() => {
          Alert.alert(
            "Signout",
            "Are you sure you want to sign out?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  Signout(props);
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={{ marginLeft: 15, fontSize: 16, color: "red" }}>
          Logout
        </Text>
        <Image
          style={{ width: 25, height: 25, marginLeft: 10, tintColor: "red" }}
          source={require("../../assets/images/logout.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const SideDraw = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => CustomDrawerContent(props)}
      initialRouteName="Menu"
    >
      <Drawer.Screen
        name="Menu"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Signout"
        component={Signout}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default SideDraw;
