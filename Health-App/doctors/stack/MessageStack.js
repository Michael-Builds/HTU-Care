import { createStackNavigator } from "@react-navigation/stack";
import Message from "../pages/Messages";
import MessageDetails from "../pages/MessagesDetails";

const StackMessage = createStackNavigator();

const MessageStack = () => {
  return (
    <StackMessage.Navigator initialRouteName="Message">
      <StackMessage.Screen
        name="Message"
        component={Message}
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
