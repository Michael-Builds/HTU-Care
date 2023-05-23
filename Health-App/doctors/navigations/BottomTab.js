import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import HomeStack from "../stack/HomeStack";
import AppointmentStack from "../stack/AppointmentStack";
import MessageStack from "../stack/MessageStack";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const home = "House";
const appointments = "Appointment";
const message = "Chat";

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: "flex",
        },
        tabBarActiveTintColor: "#191970",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 70 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === appointments) {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (rn === message) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>110</Text>
                </View>
              </View>
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={home} component={HomeStack} />
      <Tab.Screen name={appointments} component={AppointmentStack} />
      <Tab.Screen name={message} component={MessageStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  notificationBadge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 20,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default BottomTab;
