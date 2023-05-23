import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Homes";
import HomeDetails from "../screens/HomeDetails";

const StackHome = createStackNavigator();

const HomeStack = () => {
  return (
    <StackHome.Navigator initialRouteName="Homes">
      <StackHome.Screen
        name="Homes"
        component={Home}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="HomeDetails"
        component={HomeDetails}
        options={{ headerShown: false }}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
