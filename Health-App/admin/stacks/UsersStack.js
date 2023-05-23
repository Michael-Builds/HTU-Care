import { createStackNavigator } from "@react-navigation/stack";
import Users from "../screen/Users";
import UsersDetails from "../screen/UsersDetails";

const StackUsers = createStackNavigator();

const UsersStack = () => {
  return (
    <StackUsers.Navigator initialRouteName="Users">
      <StackUsers.Screen
        name="Users"
        component={Users}
        options={{ headerShown: false }}
      />
      <StackUsers.Screen
        name="UsersDetails"
        component={UsersDetails}
        options={{ headerShown: false }}
      />
    </StackUsers.Navigator>
  );
};

export default UsersStack;
