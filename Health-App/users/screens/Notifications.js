import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Notifications = () => {
  const navigation = useNavigation();
  const [appointmentDetails, setAppointmentDetails] = useState([]);

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get("http://192.168.43.237:4000/appointments");
      const appointmentDetails = response.data;
      console.log("Appointment Details:", appointmentDetails);
      setAppointmentDetails(appointmentDetails);

      if (appointmentDetails.length > 0) {
        const appointmentId = appointmentDetails[0]._id;
        console.log("Appointment ID:", appointmentId);

        const statusResponse = await axios.get(
          `http://192.168.43.237:4000/appointments/${appointmentId}`
        );
        console.log("Status Response:", statusResponse.data);

        if (statusResponse.data.status === "rejected") {
          console.log("Appointment rejected");
          console.log("Rejection Reason:", statusResponse.data.appointment.rejectReason);
        } else if (statusResponse.data.status === "accepted") {
          console.log("Appointment accepted");
          console.log("Acceptance Information:", statusResponse.data.appointment.acceptInfo);
        } else {
          console.log("Appointment pending");
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
        <Text style={styles.title}>Appointments</Text>
        {appointmentDetails.length === 0 ? (
          <Text>Pending Approval...</Text>
        ) : (
          <>
            {appointmentDetails.map((appointment) => (
              <View key={appointment._id} style={styles.appointmentContainer}>
                <Text>Appointment ID: {appointment._id}</Text>
                <Text>Status: {appointment.status}</Text>
              </View>
            ))}
          </>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appointmentContainer: {
    marginBottom: 20,
  },
});

export default Notifications;
