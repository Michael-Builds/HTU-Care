import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const HealthRecords = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [facility, setFacility] = useState("");
  const [healthprovider, setHealthProvider] = useState("");
  const [testType, setTestType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Submittion Button handler
  const handleSubmit = () => {
    // handle form submission
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
            value={healthprovider}
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
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
