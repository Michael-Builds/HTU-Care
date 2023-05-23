import React from "react";
import {
  StatusBar,
  SafeAreaView,
} from "react-native";
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
      <CustomDrawer title="Appointment" isHome={true} />
    </SafeAreaView>
  );
};

export default Appointment;
