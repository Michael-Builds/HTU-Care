import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Appointment = () => {
  const navigation = useNavigation();

  const imageAnim = useRef(new Animated.Value(0)).current;
  const nameAnim = useRef(new Animated.Value(0)).current;
  const specialtyAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const AppointmentsDetails = () => {
    navigation.navigate("AppointmentsDetails");
  };

  // useEffects
  useEffect(() => {
    const zoomIn = () => {
      Animated.sequence([
        Animated.timing(imageAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(nameAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(specialtyAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    };
    zoomIn();
  }, [imageAnim, nameAnim, specialtyAnim, buttonAnim]);

  const imageScale = imageAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const nameScale = nameAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const specialtyScale = specialtyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const buttonScale = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundClor: '' }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Appointment" isHome={true} />
      <View style={styles.container}>
        <Animated.Image
          source={require("../../assets/images/card1.jpeg")}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />

        <Animated.Text
          style={[styles.name, { transform: [{ scale: nameScale }] }]}
        >
          {" "}
          Dr. Michael Kabanda
        </Animated.Text>
        <Animated.Text
          style={[styles.specialty, { transform: [{ scale: specialtyScale }] }]}
        >
          Medical Director
        </Animated.Text>

        <TouchableOpacity onPress={AppointmentsDetails} style={styles.button}>
          <Animated.View
            style={[styles.button, { transform: [{ scale: buttonScale }] }]}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </Animated.View>
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
  image: {
    width: 170,
    height: 170,
    borderRadius: 25,
    marginBottom: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "gray",
  },
  specialty: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Appointment;
