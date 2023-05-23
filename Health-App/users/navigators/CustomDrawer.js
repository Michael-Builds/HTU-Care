import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = ({ title, isHome }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  //date and useStates
  const [dateTime, setDateTime] = useState("");

  //useEffect that handles the date and time
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setDateTime(`${time}\n${date}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  //Opening a navigation Drawer
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        backgroundColor: "#E7EAEA",
      }}
    >
      {isHome ? (
        <TouchableOpacity
          onPress={openDrawer}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Image
            style={{ width: 30, height: 30, marginLeft: 10 }}
            source={require("../../assets/images/menu.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={goBack}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            style={{ width: 25, height: 25, marginLeft: 10 }}
            source={require("../../assets/images/left.png")}
            resizeMode="contain"
          />
          <Text style={styles.Back}>Back</Text>
        </TouchableOpacity>
      )}

      {/*   Header View */}
      <View
        style={{
          flex: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ textAlign: "center", fontSize: 12, color: "#191970", }}>
            {dateTime}
          </Text>
        </View>
      </View>

      {/* Notification Icon View */}
      {/* <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
      ></View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  Back: {
    marginLeft: 5,
  },
});

export default CustomDrawer;
