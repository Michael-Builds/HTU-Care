import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomDrawer from "../nav/CustomDrawer";
import { useNavigation } from "@react-navigation/native";

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://192.168.43.237:4000/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching counts", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredUsers.length > 0) {
      setError(false);
      setFilteredUsers(filteredUsers);
    } else {
      setError(true);
      setFilteredUsers([]);
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
      <CustomDrawer isHome={true} navigation={navigation} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            style={styles.headerImg}
            source={require("../../assets/images/pat.jpg")}
          />
          <Text style={styles.title}>
            Patient's <Text style={{ color: "#075eec" }}>Details</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search user..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
              <Image
                source={require("../../assets/images/searchb.png")}
                style={styles.searchIconImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {loading ? (
            <Text>Loading users...</Text>
          ) : (
            <View>
              {filteredUsers.length === 0 ? (
                error ? (
                  <Text style={{ color: "red", textAlign: "center" }}>
                    No user found with the entered username
                  </Text>
                ) : (
                  users.map((user) => (
                    <View key={user._id} style={styles.card}>
                      <Image
                        source={require("../../assets/images/nurse.png")}
                        style={styles.image}
                      />
                      <Text style={styles.username}>
                        Username: {user.username}
                      </Text>
                      <Text style={styles.email}>Email: {user.email}</Text>

                      <View style={styles.imagesContainer}>
                        <View style={styles.imageWrapper}>
                          <Image
                            source={require("../../assets/images/calendar.png")}
                            style={[
                              styles.calendarImage,
                              { tintColor: "gray" },
                            ]}
                          />
                        </View>
                        <View style={styles.imageWrapper}>
                          <Image
                            source={require("../../assets/images/clock.png")}
                            style={[styles.clockImage, { tintColor: "gray" }]}
                          />
                        </View>
                      </View>
                    </View>
                  ))
                )
              ) : (
                filteredUsers.map((user) => (
                  <View key={user._id} style={styles.card}>
                    <Image
                      source={require("../../assets/images/nurse.png")}
                      style={styles.image}
                    />
                    <Text style={styles.username}>
                      Username: {user.username}
                    </Text>
                    <Text style={styles.email}>Email: {user.email}</Text>
                  </View>
                ))
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginVertical: 35,
    marginTop: 10,
  },
  headerImg: {
    width: 120,
    height: 110,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    width: "80%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    flexDirection: "column",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 5,
    padding: 8,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  searchIconImage: {
    width: 25,
    height: 20,
    resizeMode: "contain",
  },
  image: {
    backgroundColor: "#c5c5c5",
    width: 45,
    height: 45,
    borderRadius: 50,
    marginBottom: 8,
  },
  username: {
    fontSize: 15,
    marginBottom: 8,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  imageWrapper: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  clockImage: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
});
export default Users;
