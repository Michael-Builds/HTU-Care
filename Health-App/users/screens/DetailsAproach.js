import React from "react";
import { View, Text, StatusBar,StyleSheet } from "react-native";
import CustomDrawer from '../navigators/CustomDrawer'
import { SafeAreaView } from "react-native-safe-area-context";

const DetailsAproach = () => {
  return (
    <SafeAreaView style ={{flex: 1}} >
      <StatusBar
        hidden={false}
        backgroundColor="#191970"
        barStyle="light-content"
      />
      <CustomDrawer  title ="Details Aproach"/>
      <View  style={styles.container}>
        <Text>Details Aproach</Text>
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
});


export default DetailsAproach;
