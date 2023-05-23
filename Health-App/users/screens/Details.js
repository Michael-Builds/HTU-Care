import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


const Details = () => {
  const navigation = useNavigation();

  const DetailsAproach = () => {
    navigation.navigate("DetailsAproach");
  };
  
  const handleSubmit = () => {
    // Add logic to handle form submission here
  };

  return (
    <SafeAreaView  >

        <StatusBar
          hidden={false}
          backgroundColor="#191970"
          barStyle="light-content"
        />
        <CustomDrawer title="Details" isHome={true} navigation={navigation} />

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  
});

export default Details;
