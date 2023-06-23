import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import * as Progress from "react-native-progress";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import walk from "../../assets/images/walk.png";
import yoga from "../../assets/images/yoga.png";
import cycle from "../../assets/images/cycle.png";
import next from "../../assets/images/next.png";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();

  // Health tip state
  const [healthTip, setHealthTip] = useState({ text: "", author: "" });

  // Fetch random health tip
  useEffect(() => {
    const fetchRandomHealthTip = async () => {
      try {
        const response = await axios.get("https://type.fit/api/quotes");
        const healthTips = response.data;
        const randomIndex = Math.floor(Math.random() * healthTips.length);
        const randomHealthTip = healthTips[randomIndex];
        setHealthTip(randomHealthTip);
      } catch (error) {
        console.error("Failed to fetch random health tip:", error);
      }
    };

    fetchRandomHealthTip();

    // Update health tip every 1 minutes
    const intervalId = setInterval(fetchRandomHealthTip, 1 * 60 * 1000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  // Data variables
  const data = [
    {
      name: "Lufart",
      status: 12,
      image: cycle,
      lightColor: "#f5d6c1",
      color: "#fae9de",
      darkColor: "#fac5a4",
    },
    {
      name: "Gebedol",
      status: 52,
      image: walk,
      lightColor: "#bae1f5",
      color: "#dceef7",
      darkColor: "#aceafc",
    },
    {
      name: "Citro-C",
      status: 79,
      image: yoga,
      lightColor: "#c4bcf5",
      color: "#dad5f7",
      darkColor: "#8860a2",
    },
  ];

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
                  source={require("../../assets/images/meditate.png")}
                  resizeMode="contain"
                  style={styles.fireImage}
                />
              </View>
              <Text style={styles.offer}>Revitalize.Transform</Text>
            </View>
            <Text style={styles.offerText}>Unlock Your Wellness</Text>
            <Text style={styles.offerText}>Health Boost!</Text>
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
            color: "gray",
            marginLeft: 5,
            fontSize: 13.5,
          }}
        >
          Your Prescriptions
        </Text>
        <View style={{ flexDirection: "row" }}>
          {data.map((item, index) => (
            <Card key={index} data={item} index={index} />
          ))}
        </View>

        {/* Health Tips Container */}

        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "gray",
              marginTop: -5,
              marginLeft: 5,
              fontSize: 13.5,
            }}
          >
            Health Tips
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignItems: "flex-start",
              marginTop: 15,
              paddingHorizontal: 10,
              backgroundColor: "#d0e9f5",
              height: 165,
              borderRadius: 15,
              flexWrap: "wrap",
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Image
              source={require("../../assets/images/nurse.png")}
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                backgroundColor: "#c5c5c5",
                marginBottom: 10,
                position: "absolute",
                top: 12,
                left: 12,
              }}
            />
            <View style={{ marginLeft: -5, marginTop: 65 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 8,
                  fontSize: 14,
                  color: "#5c5c5c",
                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                {healthTip.author}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontSize: 13,
                }}
              >
                {healthTip.text}
              </Text>
            </View>
          </View>
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
    marginLeft: -15,
    marginBottom: 5,
  },
  fireContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fireImage: {
    height: 20,
    width: 20,
    alignSelf: "center",
    margin: 5,
  },
  offer: {
    color: "white",
    fontSize: 11,
  },
  offerText: {
    color: "white",
    fontSize: 14,
  },
  model: {
    position: "absolute",
    right: 20,
    bottom: 0,
    zIndex: 10,
    height: "100%",
    width: "50%",
    top: "13%",
  },
});

export default Home;
