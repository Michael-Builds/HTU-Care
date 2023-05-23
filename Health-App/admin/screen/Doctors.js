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

const Doctors = () => {
  const navigation = useNavigation();

  const DoctorsDetails = () => {
    navigation.navigate("DoctorsDetails");
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
        <Text>Welcome to Doctors Screen!!</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={DoctorsDetails}>
          <Text>Go to Doctors Details!!</Text>
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

export default Doctors;
