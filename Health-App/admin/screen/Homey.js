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
import walk from "../../assets/images/walk.png";
import yoga from "../../assets/images/yoga.png";
import cycle from "../../assets/images/cycle.png";
import next from "../../assets/images/next.png";

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

  // Data variables
  const data = [
    {
      name: "Lufart",
      status: 12,
      image: cycle,
      lightColor: "#f8e4d9",
      color: "#fcf1ea",
      darkColor: "#fac5a4",
    },
    {
      name: "Gebedol",
      status: 52,
      image: walk,
      lightColor: "#d7f0f7",
      color: "#e8f7fc",
      darkColor: "#aceafc",
    },
    {
      name: "Citro-C",
      status: 79,
      image: yoga,
      lightColor: "#dad5fe",
      color: "#e7e3ff",
      darkColor: "#8860a2",
    },
  ];

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
  //   <View style={styles.container}>
  //   <Text>Welcome to Home Screen!!</Text>
  //   <Text>Total Users: {userCount}</Text>
  //   <Text>Total Doctors: {doctorCount}</Text>

  //   <View style={styles.userList}>
  //     <Text>User List:</Text>
  //     {users.map((user) => (
  //       <View key={user._id}>
  //         <Text>Username: {user.username}</Text>
  //         <Text>Email: {user.email}</Text>
  //       </View>
  //     ))}
  //   </View>

  //   <View style={styles.doctorList}>
  //     <Text>Doctor List:</Text>
  //     {doctors.map((doctor) => (
  //       <View key={doctor._id}>
  //         <Text>Username: {doctor.username}</Text>
  //         <Text>Email: {doctor.email}</Text>
  //       </View>
  //     ))}
  //   </View>

  //   <TouchableOpacity style={{ marginTop: 20 }} onPress={HomeDetails}>
  //     <Text>Go to Home Details!!</Text>
  //   </TouchableOpacity>
  // </View>

  // Card for displaying activities
  const Card = ({ data, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: index === 1 ? 180 : 150,
          padding: 10,
          alignSelf: "center",
          backgroundColor: data.color,
          justifyContent: "space-between",
          marginHorizontal: 8,
          borderRadius: 10,
          shadowColor: "lightgrey",
          shadowOffset: { width: -5, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      >
        <Image source={data.image} style={{ height: 25, width: 25 }} />

        {/* Container for the progress bars */}
        <View style={{ alignSelf: "center", margin: 5 }}>
          <Progress.Circle
            size={50}
            progress={data.status / 100}
            showsText={true}
            unfilledColor="#ededed"
            borderColor="#ededed"
            color={data.darkColor}
            direction="counter-clockwise"
            fill="white"
            strokeCap="round"
            thickness={5}
            style={{
              shadowColor: "grey",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
            }}
            textStyle={{
              fontSize: 14,
              fontWeight: "bold",
              color: data.darkColor,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 10 }}> {"Day     3"} </Text>
          <Text style={{ fontSize: 10 }}>{"Time   20 min"}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{data.name}</Text>
          <View
            style={{
              backgroundColor: data.lightColor,
              padding: 2,
              borderRadius: 10,
            }}
          >
            <Image
              source={next}
              style={{
                height: 12,
                width: 12,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer title="Home" isHome={true} navigation={navigation} />

      {/* Banner images and container */}

      <View
        style={{
          padding: 20,
          width: "100%",
          marginTop: -20,
        }}
      >
        <ImageBackground
          style={styles.banner}
          source={require("../../assets/images/bg.png")}
        >
          <View style={styles.bannerContainer}>
            <View style={styles.rowLabel}>
              <View style={styles.fireContainer}>
                <Image
                  source={require("../../assets/images/fire.png")}
                  resizeMode="contain"
                  style={styles.fireImage}
                />
              </View>
              <Text style={styles.offer}>limited offer</Text>
            </View>
            <Text style={styles.offerText}>30% Discount</Text>
            <Text style={styles.offerText}>Flash Sales</Text>
          </View>
        </ImageBackground>
        <Image
          source={require("../../assets/images/nurse.png")}
          style={styles.model}
          resizeMode="contain"
        />
      </View>

      {/* Activities Section */}
      <View style={{ marginHorizontal: "3%" }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#333",
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          Your Prescriptions
        </Text>
        <View style={{ flexDirection: "row" }}>
          {data.map((item, index) => (
            <Card key={index} data={item} index={index} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    marginTop: 20,
    padding: 30,
    resizeMode: "contain",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
  },
  bannerContainer: {
    flex: 1,
  },
  rowLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  fireContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fireImage: {
    height: 15,
    width: 15,
    alignSelf: "center",
    margin: 5,
  },
  offer: {
    color: "white",
    fontSize: 10,
  },
  offerText: {
    color: "white",
    fontSize: 16,
  },
  model: {
    position: "absolute",
    right: 14,
    bottom: 0,
    zIndex: 10,
    height: "100%",
    width: "50%",
    top: "13%",
  },
});

export default Home;
