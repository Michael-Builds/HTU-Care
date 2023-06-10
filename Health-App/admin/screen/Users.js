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
            source={require("../../assets/images/card2.jpeg")}
          />
          <Text style={styles.title}>
            User <Text style={{ color: "#075eec" }}>Details</Text>
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
                  <Text>No user found with the entered username.</Text>
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
    marginVertical: 36,
    marginTop: 15,
  },
  headerImg: {
    width: 140,
    height: 130,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    width: "85%",
  },
  card: {
    backgroundColor: "#fff",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  image: {
    backgroundColor: "#c5c5c5",
    width: 45,
    height: 45,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 15,
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: "#333",
  },
});
export default Users;
