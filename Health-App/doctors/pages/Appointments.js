import React, { useEffect, useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import axios from "axios";

const formatTime = (time) => {
  return moment(time).format("h:mm A");
};

const AppointmentDetailsCard = ({ details }) => {
  const navigation = useNavigation();
  const [showDetails, setShowDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [alertMessage, setAlertMessage] = useState('');

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleAccept = async (id) => {
    // TODO: Implement the handleAccept functionality
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const handleSend = async (appointmentId, rejectReason) => {
    try {
      // Validate input data
      if (!rejectReason) {
        throw new Error("Invalid request data");
      }

      // Send the rejection request to the server
      const rejectionResponse = await axios.post(
        "http://192.168.43.237:4000/appointments/reject",
        {
          appointmentId: appointmentId,
          rejectReason,
        }
      );

      // Rejection request successful
      console.log(rejectionResponse.data.message);
      Alert.alert("Success", "Appointment Rejected successfully!");
      // Navigate back to the appointments screen
      navigation.navigate("Home");

      // Retrieve the updated appointment details
      const detailsResponse = await axios.get(
        "http://192.168.43.237:4000/appointments"
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Rejection request failed with a specific error message
        console.error(
          "Error while sending rejection:",
          error.response.data.error
        );
      } else if (error.response && error.response.status === 404) {
        // Appointment not found
        console.error("Appointment not found");
      } else if (error.message === "Invalid request data") {
        // Invalid request data
        console.error("Invalid request data");
      } else {
        // Other generic error
        console.error(
          "An error occurred while sending rejection:",
          error.message
        );
      }
    }
  };

  const closeModal = () => {
    setShowRejectModal(false);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleDetails}>
        <View style={styles.header}>
          <Icon
            style={styles.icon}
            name={showDetails ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
          <Text style={styles.title}>Reveal Details</Text>
        </View>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.titles}>Appointment Details {details.id}</Text>
          <View style={styles.detailsContents}>
            <Text>Patient: {details.fullName}</Text>
            <Text>Email: {details.email}</Text>
            <Text>Date: {details.addedOn}</Text>
            <Text>Time: {formatTime(details.time)}</Text>
            <Text>Condition: {details.condition}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAccept(details.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReject}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal visible={showRejectModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Type Reason for Rejection:</Text>
            <TextInput
              style={styles.input}
              value={rejectReason}
              onChangeText={setRejectReason}
              placeholder="Reason"
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleSend(details.id, rejectReason)}
              >
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Appointment = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointmentDetails();
    const interval = setInterval(fetchAppointmentDetails, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.237:4000/appointments"
      );
      const updatedDetails = response.data.map((details) => ({
        ...details,
        addedOn: formatDate(details.date),
      }));
      setAppointments(updatedDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const groupDetailsByDate = () => {
    const groupedDetails = {};
    appointments.forEach((details) => {
      const date = formatDate(details.date);
      if (!groupedDetails[date]) {
        groupedDetails[date] = [];
      }
      groupedDetails[date].push(details);
    });
    return groupedDetails;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "" }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer isHome={true} />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Appointments</Text>
        {Object.entries(groupDetailsByDate()).map(([date, details]) => (
          <View key={date}>
            <Text style={styles.date}>{date}</Text>
            {details.map((detail) => (
              <AppointmentDetailsCard key={detail._id} details={detail} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "center",
  },
  icon: {
    marginLeft: -10,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 5,
    textAlign: "center",
    color: "#333",
  },
  titles: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  detailsContainer: {
    marginTop: 5,
    textAlign: "center",
    marginBottom: 15,
  },
  detailsContents: {
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#cccfcf",
    padding: 20,
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#075eec",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
  },
  buttonText: {
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  input: {
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },

  modalText: {
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    backgroundColor: "#075eec",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Appointment;
