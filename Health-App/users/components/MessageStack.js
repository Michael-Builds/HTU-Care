import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Message";
import MessageDetails from "../screens/MessageDetails";

const StackMessage = createStackNavigator();

const MessageStack = () => {
  return (
    <StackMessage.Navigator initialRouteName="Messages">
      <StackMessage.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <StackMessage.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={{ headerShown: false }}
      />
    </StackMessage.Navigator>
  );
};

export default MessageStack;
