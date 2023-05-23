import React from "react";
import { StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";

const AppointmentsDetails = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer />
    </KeyboardAvoidingView>
  );
};

export default AppointmentsDetails;
