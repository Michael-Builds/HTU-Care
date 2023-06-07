import React, { useState, useEffect  } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  Alert,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const HealthRecords = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [facility, setFacility] = useState("");
  const [healthProvider, setHealthProvider] = useState("");
  const [testType, setTestType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);


  const testTypeOptions = [
    { label: "Lab Test", value: "lab" },
    { label: "Radiology Report", value: "radiology" },
    { label: "Medication List", value: "medication" },
    { label: "Imaging tests", value: "imaging" },
    { label: "Electrocardiogram (ECG) ", value: "lectrocardiogram" },
    { label: "Endoscopy", value: "endoscopy" },
    { label: "Biopsy", value: "biopsy" },
    { label: "Urine tests", value: "urine tests" },
    { label: "Genetic tests", value: "genetic tests" },
  ];

  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTestTypeChange = (value) => {
    setTestType(value);
  };

  <Picker
    selectedValue={testType}
    onValueChange={onTestTypeChange}
    style={styles.dropdown}
  >
    <Picker.Item label="Select Test Type" value="" />
    {testTypeOptions.map((option) => (
      <Picker.Item
        key={option.value}
        label={option.label}
        value={option.value}
      />
    ))}
  </Picker>;


//handle submit button
const handleSubmit = async () => {
  const healthRecordData = {
    fullName,
    email,
    facility,
    healthProvider,
    testType,
    date,
  };

  try {
    setLoading(true);

    // Retrieve the token from AsyncStorage or any other storage mechanism
    const token = await AsyncStorage.getItem("token");

    // Make a POST request to the backend API to upload the health record
    const uploadResponse = await fetch("http://192.168.43.237:4000/health-records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(healthRecordData),
    });

    if (uploadResponse.ok) {
      const responseData = await uploadResponse.json();

      if (uploadResponse.status === 201) {
        Alert.alert("Success", "Health record uploaded successfully");

        // Reset the form fields
        setFullName("");
        setEmail("");
        setFacility("");
        setHealthProvider("");
        setTestType("");
        setDate(new Date());
        
          // Navigate back to the appointments screen
          navigation.navigate("Homes");
      } else {
        Alert.alert("Error", responseData.error || "Failed to upload health record");
      }
    } else if (uploadResponse.status === 403) {
      const responseData = await uploadResponse.json();
      Alert.alert("Error", responseData.error || "Maximum limit reached for today");
    } else {
      Alert.alert("Error", "Failed to upload health record");
    }
  } catch (error) {
    console.error(error);

    if (error.message && !error.message.includes("Failed to fetch")) {
      Alert.alert(
        "Error",
        error.message || "An error occurred. Please try again later."
      );
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Health Records" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../../assets/images/card1.jpeg")}
          />
          <Text style={styles.title}>
            Health <Text style={{ color: "#075eec" }}>Records</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
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
          <TextInput
            style={styles.input}
            placeholder="Name of Facility"
            value={facility}
            onChangeText={(text) => setFacility(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Nurse or Doctor"
            value={healthProvider}
            onChangeText={(text) => setHealthProvider(text)}
          />
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={testType}
              style={styles.dropdown}
              onValueChange={(itemValue) => setTestType(itemValue)}
            >
              <Picker.Item label="Lab Test" value="lab" />
              <Picker.Item label="Radiology Report" value="radiology" />
              <Picker.Item label="Medication List" value="medication" />
              <Picker.Item label="Imaging tests" value="imaging" />
              <Picker.Item
                label="Electrocardiogram (ECG) "
                value="electrocardiogram"
              />
              <Picker.Item label="Endoscopy" value="endoscopy" />
              <Picker.Item label="Biopsy" value="biopsy" />
              <Picker.Item label="Genetic tests" value="genetic tests" />
              <Picker.Item label="Urine tests" value="urine tests" />
            </Picker>
          </View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateInput}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(date) => handleDateChange(date)}
            />
          )}

          {/* Loading indicator */}
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color="#075eec" />
              <Text style={styles.loaderText}>Loading...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          )}
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
    width: 190,
    height: 180,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 8,
    textAlign: "center",
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

  button: {
    backgroundColor: "#075eec",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 35,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },

  dropdownContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    elevation: 1.5,
  },
  dropdown: {
    height: 40,
  },
});

export default HealthRecords;
