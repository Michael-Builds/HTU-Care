import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

const Splash = ({ navigation }) => {
  const animatedValue = new Animated.Value(0);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const state = await NetInfo.fetch();
        if (!state.isConnected || state.type === "none") {
          setNetworkError(true);
        } else {
          setTimeout(() => {
            navigation.replace("Login");
          }, 7000);
        }
      } catch (error) {
        console.error("Error checking network status:", error);
      }
    };

    const handleConnectivityChange = (state) => {
      if (!state.isConnected || state.type === "none") {
        setNetworkError(true);
      } else {
        setNetworkError(false);
      }
    };

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      checkNetworkStatus();
    });

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, [animatedValue, navigation]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height / 2, 0],
  });

  const logoSize = Dimensions.get("window").width * 0.6;
  const logoTop = Dimensions.get("window").height * 0.3 - logoSize / 2;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#191970"
          barStyle="light-content"
        />
        <View style={[styles.logoContainer, { top: logoTop }]}>
          <Animated.Image
            source={require("../Health-App/assets/images/Logo.png")}
            style={[
              styles.logo,
              {
                transform: [{ translateY }],
                width: logoSize,
                height: logoSize,
              },
            ]}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>HTU Care&#10084;</Text>
        </View>

        {/* Footer Container View */}
        <View style={styles.footer}>
          {networkError ? (
            <Text style={styles.errorText}>Network Error</Text>
          ) : (
            <Text style={styles.footerText}>
              Empowering student health through digitalization for a brighter
              future
            </Text>
          )}
        </View>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#E7EAEA",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: '#E7EAEA',
    backgroundColor: "#e8ecf4",
  },
  footer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
  },
  footerText: {
    textAlign: "center",
    fontSize: 15,
    color: "#333",
    fontStyle: "italic",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },

  logoContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  errorText: {
    textAlign: "center",
    fontSize: 15,
    color: "red",
    fontStyle: "italic",
  },
  logo: {
    marginTop: 50,
    width: "100%",
    height: "100%",
  },
  logoText: {
    color: "#626262",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default Splash;
