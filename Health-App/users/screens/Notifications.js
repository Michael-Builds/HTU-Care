import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const Notifications = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState("");
  const [rescheduledReason, setRescheduledReason] = useState("");
  const [acceptanceInfo, setAcceptanceInfo] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const notificationTypeOptions = [
    { label: "Appointments", value: "appointments" },
    { label: "Prescriptions", value: "prescriptions" },
  ];

  const onNotificationTypeChange = (value) => {
    setNotificationType(value);
    handleContentChange(value);
  };

  useEffect(() => {
    fetchAppointmentStatus();
  }, []);

  const fetchAppointmentStatus = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.237:4000/appointments"
      );
      const appointmentDetails = response.data;
      setAppointmentDetails(appointmentDetails);

      if (appointmentDetails.length > 0) {
        const appointmentId = appointmentDetails[0]._id;

        const statusResponse = await axios.get(
          `http://192.168.43.237:4000/appointments/${appointmentId}`
        );

        const { status, appointment } = statusResponse.data;

        if (status === "rescheduled") {
          setStatus("Appointment rescheduled");
          setRescheduledReason(appointment.rescheduledReason);
        } else if (status === "accepted") {
          setStatus("Appointment accepted");
          setAcceptanceInfo(appointment.acceptInfo);

          const response = await axios.get(
            `http://192.168.43.237:4000/prescriptions/${appointment.selectedUser}`
          );
          const prescriptionData = response.data.prescriptions;
          setPrescriptions(prescriptionData);
        } else {
          setStatus("Appointment pending");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleContentChange = (itemValue) => {
    setSelectedContent(itemValue);
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={notificationType}
          onValueChange={onNotificationTypeChange}
          style={styles.dropdown}
          itemStyle={styles.dropdownItem}
          prompt="Select Notification Type"
        >
          {notificationTypeOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {selectedContent === "appointments" && (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Appointments</Text>
          {appointmentDetails.length === 0 ? (
            <Text style={styles.statusText}>Pending Approval...</Text>
          ) : (
            <>
              <Text style={styles.statusText}>Status: {status}</Text>
              {status === "Appointment rescheduled" && (
                <Text style={[styles.statusText, styles.rescheduledReasonText]}>
                  Rescheduling Reason: {rescheduledReason}
                </Text>
              )}
              {status === "Appointment accepted" && (
                <Text style={[styles.statusText, styles.acceptanceInfoText]}>
                  Acceptance Information: {acceptanceInfo}
                </Text>
              )}
            </>
          )}
        </View>
      )}
      {selectedContent === "prescriptions" && (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Prescriptions:</Text>
          {prescriptions.length === 0 ? (
            <Text>No prescriptions available.</Text>
          ) : (
            prescriptions.map((prescription, index) => (
              <View key={index} style={styles.prescriptionContainer}>
                <Text>Patient: {prescription.selectedUser}</Text>
                <Text>Drug Name: {prescription.drugname}</Text>
                <Text>
                  Prescription Date:{" "}
                  {new Date(prescription.prescriptiondate).toLocaleDateString()}
                </Text>
                <Text>Duration: {prescription.durationDays}</Text>
                <Text>Time Interval: {prescription.timeinterval}</Text>
                <Text>Times Per Day: {prescription.timesPerDay}</Text>
                <Text>Additional Notes: {prescription.additionalnotes}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItem: {
    fontSize: 16,
  },
  contentContainer: {
    marginBottom: 110,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  prescriptionContainer: {
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
  },
  rejectionReasonText: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  acceptanceInfoText: {
    marginBottom: 10,
  },
});

export default Notifications;
