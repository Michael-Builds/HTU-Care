import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Notifications = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [acceptanceInfo, setAcceptanceInfo] = useState("");

  useEffect(() => {
    fetchAppointmentStatus();
  }, []);

  const fetchAppointmentStatus = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.237:4000/appointments"
      );
      const appointmentDetails = response.data;

      if (appointmentDetails.length > 0) {
        const appointmentId = appointmentDetails[0]._id;

        const statusResponse = await axios.get(
          `http://192.168.43.237:4000/appointments/${appointmentId}/status`
        );
        console.log("statusResponse:", statusResponse.data);
        console.log("status:", status);

        setStatus(statusResponse.data.message);

        if (statusResponse.data.rejectReason) {
          setRejectionReason(statusResponse.data.rejectReason);
        }

        if (statusResponse.data.acceptInfo) {
          setAcceptanceInfo(statusResponse.data.acceptInfo);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer
        title="Notifications"
        isHome={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <Text>Status: {status}</Text>

        {status === "Appointment rejected" && (
          <Text>Rejection Reason: {rejectionReason}</Text>
        )}

        {status === "Appointment accepted" && (
          <Text>Acceptance Information: {acceptanceInfo}</Text>
        )}
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
