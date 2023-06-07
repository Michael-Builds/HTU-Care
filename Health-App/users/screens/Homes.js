import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import * as Progress from "react-native-progress";
import CustomDrawer from "../navigators/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import walk from "../../assets/images/walk.png";
import yoga from "../../assets/images/yoga.png";
import cycle from "../../assets/images/cycle.png";
import next from "../../assets/images/next.png";



const Home = () => {
  const navigation = useNavigation();

  const HomeDetails = () => {
    navigation.navigate("HomeDetails");
  };

    // Video components
    const { width } = Dimensions.get('window');

    const videos = [
      { id: 1, url: '../../assets/images/Fitness.mp4' },
      { id: 2, url: '../../assets/images/Health.mp4' },
      { id: 3, url: '../../assets/images/Fitness.mp4' },
      { id: 4, url: '../../assets/images/Health.mp4' },
  ];



  // Data variables
  const data = [
    {
      name: "Cycling",
      status: 85,
      image: cycle,
      lightColor: "#f8e4d9",
      color: "#fcf1ea",
      darkColor: "#fac5a4",
    },
    {
      name: "Walking",
      status: 25,
      image: walk,
      lightColor: "#d7f0f7",
      color: "#e8f7fc",
      darkColor: "#aceafc",
    },
    {
      name: "Yoga",
      status: 50,
      image: yoga,
      lightColor: "#dad5fe",
      color: "#e7e3ff",
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
              color: data.darkColor, // add a color property here
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
    <ScrollView style={{ flex: 1 }}>
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
        <Text>Your Activities</Text>
        <View style={{ flexDirection: "row" }}>
          {data.map((item, index) => (
            <Card key={index} data={item} index={index} />
          ))}
        </View>

        {/* Videos Container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text>Fitness Video</Text>
          <Text
            style={{
              opacity: 0.5,
              fontSize: 12,
            }}
          >
            View All
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          
        </View>
      </View>

      {/* <TouchableOpacity style={{ marginTop: 20 }} onPress={HomeDetails}>
          <Text>Go to Home Details!!</Text>
        </TouchableOpacity> */}
    </ScrollView>
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
