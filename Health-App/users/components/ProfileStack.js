import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import ProfileDetails from "../screens/ProfileDetails";

const StackProfile = createStackNavigator();

const ProfileStack = () => {
  return (
    <StackProfile.Navigator initialRouteName="Details">
      <StackProfile.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <StackProfile.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{ headerShown: false }}
      />
    </StackProfile.Navigator>
  );
};

export default ProfileStack;
