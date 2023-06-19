import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { GiftedChat } from "react-native-gifted-chat";
import * as Progress from "react-native-progress";
import check from "../../assets/images/check.png";
import wrong from "../../assets/images/wrong.png";
import pend from "../../assets/images/pend.png";

const Home = () => {
  const navigation = useNavigation();
  const [visibleDiseases, setVisibleDiseases] = useState(4);
  const [showButton, setShowButton] = useState(true);

  const trendingDiseases = [
    {
      id: "1",
      name: "Common Cold",
      details: "Symptoms: runny nose, sore throat, sneezing",
    },
    { id: "2", name: "Flu", details: "Symptoms: fever, body aches, fatigue" },
    {
      id: "3",
      name: "Mononucleosis (Mono)",
      details: "Symptoms: severe fatigue, sore throat, swollen glands",
    },
    {
      id: "4",
      name: "Strep Throat",
      details: "Symptoms: sore throat, difficulty swallowing, fever",
    },
    {
      id: "5",
      name: "Gastroenteritis",
      details: "Symptoms: nausea, vomiting, diarrhea",
    },
    {
      id: "6",
      name: "Conjunctivitis (Pink Eye)",
      details: "Symptoms: redness, itching, discharge in the eyes",
    },
    {
      id: "7",
      name: "Acne",
      details: "Symptoms: pimples, blackheads, whiteheads",
    },
    {
      id: "8",
      name: "Stomach Ulcers",
      details: "Symptoms: abdominal pain, bloating, heartburn",
    },
    {
      id: "9",
      name: "Migraine Headaches",
      details: "Symptoms: severe headache, sensitivity to light and sound",
    },
    {
      id: "10",
      name: "Anxiety",
      details: "Symptoms: excessive worrying, restlessness, panic attacks",
    },
    {
      id: "11",
      name: "Depression",
      details:
        "Symptoms: persistent sadness, loss of interest, changes in appetite",
    },
    {
      id: "12",
      name: "Insomnia",
      details: "Symptoms: difficulty falling asleep, staying asleep",
    },
    {
      id: "13",
      name: "Asthma",
      details: "Symptoms: wheezing, shortness of breath, coughing",
    },
    {
      id: "14",
      name: "Allergies",
      details: "Symptoms: sneezing, itchy eyes, congestion",
    },
    {
      id: "15",
      name: "Eating Disorders",
      details: "Symptoms: distorted body image, abnormal eating habits",
    },
    {
      id: "16",
      name: "Hypertension (High Blood Pressure)",
      details: "Symptoms: headache, dizziness, chest pain",
    },
    {
      id: "17",
      name: "Meningitis",
      details: "Symptoms: severe headache, neck stiffness, fever",
    },
    {
      id: "18",
      name: "Sexually Transmitted Infections (STIs)",
      details: "Symptoms: varies depending on the specific infection",
    },
    {
      id: "19",
      name: "Urinary Tract Infections (UTIs)",
      details: "Symptoms: frequent urination, burning sensation, cloudy urine",
    },
    {
      id: "20",
      name: "Sleep Deprivation",
      details: "Symptoms: excessive sleepiness, difficulty concentrating",
    },
    {
      id: "21",
      name: "Hives",
      details: "Symptoms: itchy, raised welts on the skin",
    },
    {
      id: "22",
      name: "Common Cold Sores",
      details: "Symptoms: blisters around the mouth, fever",
    },
    {
      id: "23",
      name: "Plantar Warts",
      details: "Symptoms: rough, grainy growths on the soles of the feet",
    },
  ];

  // Render chat message item
  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Text style={styles.diseaseName}>{item.name}</Text>
      <Text style={styles.diseaseDetails}>{item.details}</Text>
    </View>
  );

  const handleViewMore = () => {
    const totalDiseases = trendingDiseases.length;
    const remainingDiseases = totalDiseases - visibleDiseases;
    const newVisibleDiseases = visibleDiseases + Math.min(4, remainingDiseases);
    setVisibleDiseases(newVisibleDiseases);
    setShowButton(newVisibleDiseases < totalDiseases);
  };

  const visibleDiseaseItems = trendingDiseases.slice(0, visibleDiseases);

  //useStates for catching our appointment counts and and usercounts
  const [loading, setLoading] = useState(true);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [messages, setMessages] = useState([]);

  //useEffect for reading and displaying the current number of user's and appointments count in our database
  useEffect(() => {
    fetch("http://192.168.43.237:4000/acceptedappointments/count")
      .then((res) => res.json())
      .then((data) => {
        setAcceptedCount(data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching counts", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://192.168.43.237:4000/rejectedappointments/count")
      .then((res) => res.json())
      .then((data) => {
        setRejectedCount(data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching counts", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://192.168.43.237:4000/appointments/count")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching appointment count:", error);
      });
  }, []);

  // Data variables
  const data = [
    {
      name: "Appointments",
      status: appointmentCount,
      image: pend,
      active: "Pending",
      lightColor: "#f8e4d9",
      color: "#fcf1ea",
      darkColor: "orange",
    },
    {
      name: "Appointments",
      status: acceptedCount,
      image: check,
      active: "Accepted",
      lightColor: "#d7f0f7",
      color: "#e8f7fc",
      darkColor: "#5bb450",
    },
    {
      name: "Appointments",
      status: rejectedCount,
      image: wrong,
      active: "Rejected",
      lightColor: "#dad5fe",
      color: "#e7e3ff",
      darkColor: "#D30000",
    },
  ];

  // Card for displaying activities
  const Card = ({ data, index }) => {
    let activeColor;

    if (data.active === "Rejected") {
      activeColor = "#D30000";
    } else if (data.active === "Accepted") {
      activeColor = "#5bb450";
    } else {
      activeColor = "orange";
    }
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 4,
              backgroundColor: activeColor,
              marginRight: 5,
              marginTop: -5,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>
              {data.active}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>{data.name}</Text>
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
                  source={require("../../assets/images/stet.png")}
                  resizeMode="contain"
                  style={styles.fireImage}
                />
              </View>
              <Text style={styles.offer}>Analytical tool</Text>
            </View>
            <Text style={styles.offerTexts}>Daily Diagnoses</Text>
            <Text style={styles.offerText}>Save a life today!</Text>
          </View>
        </ImageBackground>
        <Image
          source={require("../../assets/images/doc-pat.png")}
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
            marginTop: 5,
            marginBottom: 12,
            marginLeft: 10,
            fontSize: 14,
          }}
        >
          Appointment Schedules
        </Text>
        <View style={{ flexDirection: "row" }}>
          {data.map((item, index) => (
            <Card key={index} data={item} index={index} />
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Common Diseases</Text>
      {/* Chat and Graph Container */}
      <FlatList
        data={["chats", "graph"]}
        renderItem={({ item }) => (
          <View style={styles.container}>
            {/* Chats */}
            {item === "chats" && (
              <View style={styles.chatContainer}>
                {/* <Text style={styles.sectionTitle}>Common Diseases</Text> */}
                <FlatList
                  data={visibleDiseaseItems}
                  renderItem={renderChatItem}
                  keyExtractor={(item) => item.id}
                />
                {showButton && (
                  <TouchableOpacity
                    onPress={handleViewMore}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#075eec",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      justifyContent: "center",
                      borderRadius: 8,
                      borderColor: "#075eec",
                    }}
                  >
                    <Text style={{ color: "white" }}>View More</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Graph */}
            {item === "graph" && (
              <View style={styles.graphContainer}>
                <Text style={styles.sectionTitle}>Graph</Text>
                {/* Add your code for displaying the graph here */}
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item}
      />
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
    marginTop: 18,
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
    marginLeft: -20,
  },
  fireImage: {
    height: 20,
    width: 45,
    alignSelf: "center",
    margin: 5,
  },
  offer: {
    color: "white",
    fontSize: 12,
    marginLeft: -10,
  },
  offerText: {
    color: "white",
    fontSize: 12,
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
    right: 14,
    bottom: 0,
    zIndex: 10,
    height: "100%",
    width: "50%",
    top: "13%",
  },
  container: {
    marginHorizontal: "10%",
    marginTop: 15,
  },
  chatContainer: {
    // marginBottom: 1,
  },
  graphContainer: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 12,
  },
  chatItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diseaseName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
    fontSize: 14,
  },
  diseaseDetails: {
    fontSize: 12,
  },
});

export default Home;
