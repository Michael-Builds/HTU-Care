import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  SafeAreaView,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

const Splash = ({ navigation }) => {
  const animatedValue = new Animated.Value(0);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      checkNetworkStatus();
    });

    return () => {
      NetInfo.removeEventListener(handleConnectivityChange);
    };
  }, [animatedValue, navigation]);

  const checkNetworkStatus = () => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected || state.type === "none") {
        setNetworkError(true);
      } else {
        setTimeout(() => {
          navigation.replace("Login");
        }, 7000);
      }
    });

    NetInfo.addEventListener(handleConnectivityChange);
  };

  const handleConnectivityChange = (state) => {
    if (!state.isConnected || state.type === "none") {
      setNetworkError(true);
    } else {
      setNetworkError(false);
    }
  };

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
            source={require("../assets/images/Logo.png")}
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
            <View style={styles.centeredContainer}>
              <Text style={styles.footerText}>
                Empowering student health through digitalization for a brighter
                future
              </Text>
            </View>
          )}
        </View>
      </View>
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
  errorText: {
    textAlign: "center",
    fontSize: 15,
    color: "red",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%", // Ensure the container takes up the full height
  },
  footerText: {
    textAlign: "center",
    fontSize: 15,
    color: "#333",
    fontStyle: "italic",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // flex: 1, // Allow the text to expand to fill available space
    // justifyContent: "space-between", // Distribute space evenly between lines
  },
  logoContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
