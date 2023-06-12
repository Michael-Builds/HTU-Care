import React, { useEffect, useState } from "react";
import { StatusBar, SafeAreaView, Text, View } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Appointment = () => {
  const navigation = useNavigation();
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundClor: "" }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer isHome={true} />
     <Text style ={{textAlign: "center", color: "black", marginTop: 300,}}>Hello Mr. Doctor, ready to view the appointments?</Text>
    </SafeAreaView>
  );
};

export default Appointment;
