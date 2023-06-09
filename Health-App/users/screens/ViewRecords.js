import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from "react-native";
import axios from "axios";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const HealthRecordCard = ({ record }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Record {record.id}</Text>
      <Text>Full Name: {record.fullName}</Text>
      <Text>Email: {record.email}</Text>
      <Text>Facility: {record.facility}</Text>
      <Text>Health Provider: {record.healthProvider}</Text>
      <Text>Test Type: {record.testType}</Text>
      <Text>Date: {record.addedOn}</Text>
    </View>
  );
};

const ViewRecords = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHealthRecords();
    const interval = setInterval(fetchHealthRecords, 5000); // Refresh records every 5 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost/health-records"
      );
      const updatedRecords = response.data.map((record) => ({
        ...record,
        addedOn: formatDate(record.date), // Add "addedOn" field to record with formatted date
      }));
      setHealthRecords(updatedRecords);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }); // Format the date as "Month, Day, Year" (e.g., "January 1, 2023")
  };

  const groupRecordsByDate = () => {
    const groupedRecords = {};
    healthRecords.forEach((record) => {
      const date = formatDate(record.date);
      if (!groupedRecords[date]) {
        groupedRecords[date] = [];
      }
      groupedRecords[date].push(record);
    });
    return groupedRecords;
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

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Health Records</Text>
        {Object.entries(groupRecordsByDate()).map(([date, records]) => (
          <View key={date}>
            <Text style={styles.date}>{date}</Text>
            {records.map((record) => (
              <HealthRecordCard key={record._id} record={record} />
            ))}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: "#ADD8E6",
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
    textAlign: "center",
  },
});

export default ViewRecords;
