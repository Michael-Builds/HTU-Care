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

const Message = () => {
  const navigation = useNavigation();

  const MessageDetails = () => {
    navigation.navigate("MessageDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Message" isHome ={true} navigation = {navigation}  />
      <View style={styles.container}>
        <Text>Welcome to Message Screen!!</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={MessageDetails}>
          <Text>Go to Message Details!!</Text>
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

export default Message;
