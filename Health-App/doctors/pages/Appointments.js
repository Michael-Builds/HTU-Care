import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import BottomTab from "../navigations/BottomTab";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import axios from "axios";

const formatTime = (time) => {
  return moment(time).format("h:mm A");
};

const AppointmentDetailsCard = ({ details, toggleDetails, opened }) => {
  const handleToggle = () => {
    toggleDetails(details._id);
  };

  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View style={styles.header}>
          <Icon
            style={styles.icon}
            name={opened ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
          <Text style={styles.title}>Reveal Details</Text>
        </View>
      </TouchableWithoutFeedback>
      {opened && (
        <View style={styles.detailsContainer}>
          <Text style={styles.titles}>Appointment Details {details.id}</Text>
          <Text>Patient: {details.fullName}</Text>
          <Text>Email: {details.email}</Text>
          <Text>Date: {details.addedOn}</Text>
          <Text>Time: {formatTime(details.time)}</Text>
          <Text>Condition: {details.condition}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Accept" onPress={() => handleAccept(details.id)} />
            <Button title="Reject" onPress={() => handleReject(details.id)} />
          </View>
        </View>
      )}
    </View>
  );
};

const Appointment = () => {
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState([]);
  const [openedAppointmentCount, setOpenedAppointmentCount] = useState(0);
  const [openedAppointmentCards, setOpenedAppointmentCards] = useState({});

  useEffect(() => {
    const count = Object.values(openedAppointmentCards).filter(Boolean).length;
    setOpenedAppointmentCount(count);
  }, [openedAppointmentCards]);

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
    }); // Format the date as "Month, Day and Year" (e.g., January 21, 2023)
  };

  const toggleDetails = (id) => {
    setOpenedAppointmentCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    setOpenedAppointmentCount((prevCount) =>
      openedAppointmentCards[id] ? prevCount - 1 : prevCount + 1
    );
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
    <SafeAreaView style={{ flex: 1, backgroundClor: "" }}>
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
              <AppointmentDetailsCard
                key={detail._id}
                details={detail}
                toggleDetails={toggleDetails}
                opened={openedAppointmentCards[detail._id]}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <BottomTab openedAppointmentCount={openedAppointmentCount} />
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
    marginTop: 10,
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
    marginTop: 10,
  },
  card: {
    backgroundColor: "#ADD8E6",
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
    marginTop: 10,
  },
});

export default Appointment;
