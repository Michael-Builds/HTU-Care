import React, { useState, useEffect } from "react";
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
import CustomDrawer from "../navigations/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Prescription = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("Loading");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [patientAge, setPatientAge] = useState("");
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

  useEffect(() => {
    // Fetch the list of users with the role "user" from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.43.237:4000/admin/dashboard"
        );
        const users = response.data.users;
        setUsers(users);

        // Find the user with the role "doctor"
        const doctorUser = users.find((user) => user.role === "doctor");
        if (doctorUser) {
          setDoctorName(doctorUser.username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Users data callback API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.43.237:4000/", {
          headers: new Headers({
            Authorization: "Bearer " + token,
          }),
        });
        const data = await response.json();
        console.log(data);
        setUsername(data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Input validation
      if (
        !selectedUser ||
        !patientAge ||
        !drugname ||
        !prescriptiondate ||
        !durationDays ||
        !timeinterval ||
        !timesPerDay
      ) {
        setLoading(false);
        return Alert.alert("Error", "All fields are required.");
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
        selectedUser,
        patientAge: Number(patientAge),
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
        navigation.navigate("Home");
        // Reset the form fields
        setSelectedUser("");
        setPatientAge("");
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
            Nurture Your Health, Boost Productivity
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue) => setSelectedUser(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a User" value="" />
              {users.map((user) => (
                <Picker.Item
                  key={user._id}
                  value={user._id}
                  label={user.username}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Patient Age"
            value={patientAge}
            onChangeText={(text) => setPatientAge(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder={`Dr. ${username}`}
            autoCapitalize="words"
            value={doctorName}
            onChangeText={(text) => setDoctorName(text)}
            editable={false}
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
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#929292",
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#000",
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

export default Prescription;
