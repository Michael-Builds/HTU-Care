import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";

const NotificationsDetails = () => {
  return (
    <SafeAreaView style ={{flex: 1}} >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer  title ="Notifications Details" />
      <View  style={styles.container}>
        <Text>Notifications Details!!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationsDetails;
