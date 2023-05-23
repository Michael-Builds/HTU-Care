import { createStackNavigator } from "@react-navigation/stack";
import Appointment from "../pages/Appointments";
import AppointmentsDetails from "../pages/AppointmentsDetails";

const StackAppointments = createStackNavigator();

const AppointmentsStack = () => {
  return (
    <StackAppointments.Navigator initialRouteName="Appointment">
      <StackAppointments.Screen
        name="Appointment"
        component={Appointment}
        options={{ headerShown: false }}
      />
      <StackAppointments.Screen
        name="AppointmentsDetails"
        component={AppointmentsDetails}
        options={{ headerShown: false }}
      />
    </StackAppointments.Navigator>
  );
};

export default AppointmentsStack;
