import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./Splash";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import SideDrawer from '../Health-App/users/navigators/SideDrawer';
import SideDraw from '../Health-App/admin/nav/SideDraw';
import SideBar from '../Health-App/doctors/navigations/SideBar';

const Stack = createStackNavigator();

const AuthNavigator = () => {
 
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SideDrawer" component={SideDrawer} />
      <Stack.Screen name="SideDraw" component={SideDraw} />
      <Stack.Screen name="SideBar" component={SideBar} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
