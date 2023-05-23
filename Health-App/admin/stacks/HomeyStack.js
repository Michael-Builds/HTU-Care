import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screen/Homey';
import HomeDetails from "../screen/HomeyDetails";

const StackHome = createStackNavigator();

const HomeStack = () => {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="HomeyDetails"
        component={HomeDetails}
        options={{ headerShown: false }}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
