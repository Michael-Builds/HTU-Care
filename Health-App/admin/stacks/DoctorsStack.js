import { createStackNavigator } from "@react-navigation/stack";
import Doctors from "../screen/Doctors";
import DoctorsDetails from "../screen/DoctorsDetails";

const StackDoctors = createStackNavigator();

const DoctorsStack = () => {
  return (
    <StackDoctors.Navigator initialRouteName="Doctors">
      <StackDoctors.Screen
        name="Doctors"
        component={Doctors}
        options={{ headerShown: false }}
      />
      <StackDoctors.Screen
        name="DoctorsDetails"
        component={DoctorsDetails}
        options={{ headerShown: false }}
      />
    </StackDoctors.Navigator>
  );
};

export default DoctorsStack;
