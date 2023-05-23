import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomDrawer from "../nav/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const HomeDetails = () => {
    navigation.navigate("HomeyDetails");
  };

  useEffect(() => {
    fetch("http://192.168.43.237:4000/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setUserCount(data.userCount);
        setDoctorCount(data.doctorCount);
        setUsers(data.users);
        setDoctors(data.doctors);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching counts", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Home" isHome={true} navigation={navigation} />
      <View style={styles.container}>
        <Text>Welcome to Home Screen!!</Text>
        <Text>Total Users: {userCount}</Text>
        <Text>Total Doctors: {doctorCount}</Text>

        <View style={styles.userList}>
          <Text>User List:</Text>
          {users.map((user) => (
            <View key={user._id}>
              <Text>Username: {user.username}</Text>
              <Text>Email: {user.email}</Text>
            </View>
          ))}
        </View>

        <View style={styles.doctorList}>
          <Text>Doctor List:</Text>
          {doctors.map((doctor) => (
            <View key={doctor._id}>
              <Text>Username: {doctor.username}</Text>
              <Text>Email: {doctor.email}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={HomeDetails}>
          <Text>Go to Home Details!!</Text>
        </TouchableOpacity>
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
  dropdownContainer: {
    marginTop: 20,
    width: 200,
  },
  userList: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  doctorList: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  detailsButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Home;
