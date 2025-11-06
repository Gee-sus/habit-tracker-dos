import { Text, View, Button } from "tamagui";
import { HomeScreen } from "../screens/HomeScreen";
import { AddHabitScreen } from "../screens/AddHabitScreen";
import { StreakScreen } from "../screens/StreakScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export const MainLayout = () => {
 
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <Button onPress={handleLogout} size="$3">
            logOut
          </Button>
        ),
      
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="Streaks"
        component={StreakScreen}
        options={{ title: "Streaks" }}
      />

      <Tab.Screen
        name="HabitScreen"
        component={AddHabitScreen}
        options={{ title: "Add Habit" }}
      />
    </Tab.Navigator>
  );
};
