import { createStackNavigator } from "@react-navigation/stack";
import Notifications from "../screens/Notifications";
import NotificationsDetails from "../screens/NotificationsDetails";

const StackNotifications = createStackNavigator();

const NotificationsStack = () => {
  return (
    <StackNotifications.Navigator initialRouteName="Notifications">
      <StackNotifications.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <StackNotifications.Screen
        name="NotificationsDetails"
        component={NotificationsDetails}
        options={{ headerShown: false }}
      />
    </StackNotifications.Navigator>
  );
};

export default NotificationsStack;
