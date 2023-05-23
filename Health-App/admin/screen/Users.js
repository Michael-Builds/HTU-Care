import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CustomDrawer from "../nav/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Users = () => {
  const navigation = useNavigation();

  const Users = () => {
    navigation.navigate("UsersDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Users" isHome ={true} navigation = {navigation}  />
      <View style={styles.container}>
        <Text>Welcome to Users Screen!!</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={Users}>
          <Text>Go to Users Details!!</Text>
        </TouchableOpacity>
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

export default Users;
