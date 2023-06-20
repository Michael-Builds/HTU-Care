import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import HomeStack from "../components/HomeStack";
import MessageStack from "../components/MessageStack";
import AppointmentStack from "../components/AppointmentStack";
import NotificationStack from "../components/NotificationStack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const home = "Home";
const appointments = "Appointments";
const notification = "Notification";
const clipboard = "Notes";

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);
  const [userId, setUserId] = useState(null);

  // Set the user ID when the user logs in or authenticates
  const handleUserLogin = (userId) => {
    setUserId(userId);
  };

  useEffect(() => {
    if (!userId) return; // Skip if the user ID is not set

    const fetchNotificationCounts = async () => {
      try {
        const acceptedUrl = `http://192.168.43.237:4000/acceptedappointments/count?userId=${userId}`;
        const rejectedUrl = `http://192.168.43.237:4000/rejectedappointments/count?userId=${userId}`;

        const acceptedCount = await fetchNotificationCounts(acceptedUrl);
        const rejectedCount = await fetchNotificationCounts(rejectedUrl);

        const totalCount = acceptedCount + rejectedCount;
        setNotificationCount(totalCount);
      } catch (error) {
        console.error(error);
        setNotificationCount(0);
      }
    };

    fetchNotificationCounts();
  }, [userId]);

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
          } else if (rn === clipboard) {
            iconName = focused ? "clipboard" : "clipboard-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          } else if (rn === notification) {
            iconName = focused ? "notifications" : "notifications-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={home} component={HomeStack} />
      <Tab.Screen name={appointments} component={AppointmentStack} />
      <Tab.Screen name={clipboard} component={MessageStack} />
      <Tab.Screen name={notification} component={NotificationStack} />
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
    width: 16,
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

export default BottomTabNavigator;
