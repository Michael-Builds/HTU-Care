import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Notifications = () => {
  const navigation = useNavigation();

  const NotificationsDetails = () => {
    navigation.navigate("NotificationsDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Notifications" isHome ={true} navigation = {navigation}  />
      <View style={styles.container}>
        <Text>Welcome to Notifications Screen!!</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={NotificationsDetails}>
          <Text>Go to Notifications Details!!</Text>
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

export default Notifications;
