import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AppointmentsDetails = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Use false to hide the date picker
    setDate(currentDate);
  };

  const handleTimeChange = (_, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false); // Use false to hide the time picker
    setTime(currentTime);
  };

  //checking for empty and invalid input fields
  const isFormValid = () => {
    if (!fullName || !email || !date || !time || !condition) {
      return false;
    }
    return true;
  };

  // Format the date and time to local short strings
  const formatLocalDate = (date) => {
    return date.toLocaleDateString();
  };

  const formatLocalTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const formattedDate = formatLocalDate(date);
    const formattedTime = formatLocalTime(time);

    const appointmentData = {
      fullName,
      email,
      date: formattedDate,
      time: formattedTime,
      condition,
    };

    try {
      setLoading(true);

      // Send a POST request to the backend API endpoint
      const response = await axios.post(
        "http://192.168.43.237:4000/appointments",
        appointmentData
      );

      console.log(response.data); // Appointment booked successfully message or other response from the backend
      // Reset form fields
      setFullName("");
      setEmail("");
      setDate(new Date());
      setTime(new Date());
      setCondition("");

      Alert.alert("Success", "Appointment booked successfully!");
      // Navigate back to the appointments screen
      navigation.navigate("Homes");
    } catch (error) {
      console.error(error);
      if (error.message === "Network Error") {
        Alert.alert(
          "Network Error",
          "Please check your internet connection and try again."
        );
      } else if (error.response && error.response.status === 400) {
        Alert.alert("Error", "User has already booked two appointments");
      } else if (error.response && error.response.status === 404) {
        Alert.alert("Error", "No doctor found. Please try again later.");
      } else {
        Alert.alert("Error", "Failed to book appointment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../../assets/images/card2.jpeg")}
          />
          <Text style={styles.title}>
            Book <Text style={{ color: "#075eec" }}>Appointments</Text>
          </Text>
          <Text style={styles.subtitle}>
            Nurture Your Health, Boost Productivity
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateInput}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.timeInput}>{time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              onChange={handleTimeChange}
            />
          )}
          <TextInput
            style={styles.conditionInput}
            placeholder="Condition"
            multiline
            numberOfLines={4}
            value={condition}
            onChangeText={(text) => setCondition(text)}
          />

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
            >
              <View style={styles.btn}>
                {loading ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator color="#fff" />
                    <Text style={styles.loaderText}>Loading...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Book Now!</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    marginVertical: 36,
  },

  headerImg: {
    width: 180,
    height: 170,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 30,
  },
  subtitle: {
    color: "gray",
    fontSize: 14,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 8,
    textAlign: "center",
  },

  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  conditionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 100,
    textAlignVertical: "top",
  },
  formAction: {
    marginVertical: 24,
    marginTop: 5,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    marginLeft: 10,
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
  },
});

export default AppointmentsDetails;
