import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";

const MessageDetails = () => {
  return (
    <SafeAreaView style ={{flex: 1}} >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer  title ="Message Details" />
      <View  style={styles.container}>
        <Text>Messages Details!!</Text>
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

export default MessageDetails;
