import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";

const HomeDetails = () => {
  return (
    <SafeAreaView style ={{flex: 1}} >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer  title ="Home Details" />
      <View  style={styles.container}>
        <Text>Home Details!!</Text>
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

export default HomeDetails;
