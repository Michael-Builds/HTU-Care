import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import CustomDrawer from "../nav/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import doctor from "../../assets/images/doctors.png";
import finance from "../../assets/images/finance.png";
import user from "../../assets/images/users.png";

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const data = [
    {
      name: "Users",
      status: userCount,
      image: user,
      active: "Active",
      lightColor: "#f8e4d9",
      color: "#fcf1ea",
      darkColor: "#fac5a4",
    },
    {
      name: "Doctors",
      status: doctorCount,
      image: doctor,
      active: "Active",
      lightColor: "#d7f0f7",
      color: "#e8f7fc",
      darkColor: "#aceafc",
    },
    {
      name: "Finances",
      status: 0,
      image: finance,
      active: "Active",
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
            formatText={() => `${data.status}`}
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
        <View style={{ flexDirection: "row", alignItems: "center",justifyContent: "center" }}>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 4,
              backgroundColor: "green",
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 10, textAlign: "center" }}>
            {data.active}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text style ={{ fontWeight: "bold"}}>{data.name}</Text>
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
      <CustomDrawer isHome={true} navigation={navigation} />

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
                  source={require("../../assets/images/analysis.png")}
                  resizeMode="contain"
                  style={styles.fireImage}
                />
              </View>
              <Text style={styles.offer}>Analytical tool</Text>
            </View>
            <Text style={styles.offerTexts}>Daily Accounts</Text>
            <Text style={styles.offerText}>Hospital's Management</Text>
          </View>
        </ImageBackground>
        <Image
          source={require("../../assets/images/admin2.png")}
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
          Your Analysis
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
    marginLeft: -20,
    alignItems: "center",
  },
  fireImage: {
    height: 15,
    width: 20,
    alignSelf: "center",
    margin: 5,
  },
  offer: {
    color: "white",
    fontSize: 12,
  },
  offerText: {
    color: "white",
    fontSize: 14,
    marginLeft: -5,
    marginBottom: 5,
    marginTop: 5,
  },
  offerTexts: {
    color: "white",
    fontSize: 14,
    marginLeft: -5,
    marginTop: 5,
  },
  model: {
    position: "absolute",
    right: 15,
    bottom: 0,
    zIndex: 10,
    height: "110%",
    width: "50%",
    top: "10%",
  },
});

export default Home;
