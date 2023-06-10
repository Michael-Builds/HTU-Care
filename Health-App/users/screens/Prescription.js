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
  const [patientAge, setPatientAge] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [drugname, setDrugName] = useState("");
  const [prescriptiondate, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [durationDays, setDurationDays] = useState("");
  const [timeinterval, setTimeInterval] = useState("");
  const [timesPerDay, setTimesPerDay] = useState("");
  const [additionalnotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Use false to hide the date picker
    setDate(currentDate);
  };

  // Format the date and time to local short strings
  const formatLocalDate = (date) => {
    return date.toLocaleDateString();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Input validation
      if (
        !fullName ||
        !patientAge ||
        !contact ||
        !address ||
        !doctorName ||
        !drugname ||
        !prescriptiondate ||
        !durationDays ||
        !timeinterval ||
        !timesPerDay
      ) {
        setLoading(false);
        return Alert.alert("Error", "All fields are required.");
      }

      if (contact.length > 10) {
        setLoading(false);
        return Alert.alert(
          "Error",
          "Contact number should be up to 10 characters."
        );
      }
      if (contact.length < 10) {
        setLoading(false);
        return Alert.alert(
          "Error",
          "Contact number should not be less than 10 characters"
        );
      }

      if (Number(patientAge) <= 0) {
        setLoading(false);
        return Alert.alert(
          "Error",
          "Invalid age. Age must be a positive number."
        );
      }

      const formattedDate = formatLocalDate(prescriptiondate);
      // Create the prescription object
      const prescriptionData = {
        fullName,
        patientAge: Number(patientAge),
        contact,
        address,
        doctorName,
        drugname,
        prescriptiondate: formattedDate,
        durationDays,
        timeinterval,
        timesPerDay,
        additionalnotes,
      };

      // Send the prescription data to the backend API
      const response = await axios.post(
        "http://192.168.43.237:4000/prescriptions",
        prescriptionData
      );

      setLoading(false);
      if (response.status === 201) {
        Alert.alert("Success", "Prescription uploaded successfully.");
        // Navigate back to the appointments screen
        navigation.navigate("Homes");
        // Reset the form fields
        setFullName("");
        setPatientAge("");
        setContact("");
        setAddress("");
        setDoctorName("");
        setDrugName("");
        setDate(new Date());
        setDurationDays("");
        setTimeInterval("");
        setTimesPerDay("");
        setAdditionalNotes("");
      } else {
        Alert.alert(
          "Error",
          "An error occurred while uploading the prescription."
        );
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.response) {
        // Request was made and server responded with a status code outside the range of 2xx
        Alert.alert("Error", "Server responded with an error.");
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert("Error", "No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert("Error", "An error occurred while sending the request.");
      }
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
            source={require("../../assets/images/Prescription.jpg")}
          />
          <Text style={styles.title}>
            Upload <Text style={{ color: "#075eec" }}>Prescriptions</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Patient Name"
            autoCapitalize="words"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Patient Age"
            value={patientAge}
            onChangeText={(text) => setPatientAge(text)}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="numeric"
            value={contact}
            onChangeText={(text) => setContact(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Patient Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Prescription Doctor"
            value={doctorName}
            autoCapitalize="words"
            onChangeText={(text) => setDoctorName(text)}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateInput}>
              {prescriptiondate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={prescriptiondate}
              placeholder="Prescription Date"
              mode="date"
              onChange={handleDateChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Drug Name"
            autoCapitalize="words"
            value={drugname}
            onChangeText={(text) => setDrugName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (Days)"
            value={durationDays}
            keyboardType="numeric"
            onChangeText={(text) => setDurationDays(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Times Per Day"
            value={timesPerDay}
            keyboardType="numeric"
            onChangeText={(text) => setTimesPerDay(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Time Interval (hours)"
            value={timeinterval}
            keyboardType="numeric"
            onChangeText={(text) => setTimeInterval(text)}
          />

          <TextInput
            style={styles.conditionInput}
            placeholder="Additional Notes"
            multiline
            numberOfLines={4}
            value={additionalnotes}
            onChangeText={(text) => setAdditionalNotes(text)}
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
                  <Text style={styles.buttonText}>Upload</Text>
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
    width: 150,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
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
