import { Text, View } from "tamagui";
import { HomeScreen } from "../screens/HomeScreen";
import { AddHabitScreen } from "../screens/AddHabitScreen";
import { StreakScreen } from "../screens/StreakScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { darkThemeColors } from "../utils/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Pressable, TouchableOpacity } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Ticker } from "../components/Ticker";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

const Tab = createBottomTabNavigator();

// Custom Tab Bar Button with circular highlight and gradient
const CustomTabBarButton = ({
  children,
  onPress,
  accessibilityState,
}: BottomTabBarButtonProps) => {
  const isActive = accessibilityState?.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isActive ? (
        <View
          bg={darkThemeColors.background.raised} // L=10% (raised, closer to user)
          px="$3"
          py="$2"
          br="$10" // Very rounded (circular)
          borderWidth={1}
          borderTopColor={darkThemeColors.interactive.active} // L=14% (lighter, light from above)
          borderBottomColor={darkThemeColors.border.bottom} // L=5% (darker, shadow)
          borderLeftColor={darkThemeColors.border.left} // L=8%
          borderRightColor={darkThemeColors.border.right} // L=7%
          borderTopWidth={1.5} // Thicker top border (more light)
          borderBottomWidth={1} // Thinner bottom border
          shadowColor={darkThemeColors.shadow.color}
          shadowOffset={darkThemeColors.shadow.offset.medium}
          shadowOpacity={darkThemeColors.shadow.opacity.medium}
          shadowRadius={darkThemeColors.shadow.radius.medium}
          minWidth={60}
          minHeight={40}
          ai="center"
          jc="center"
        >
          {children}
        </View>
      ) : (
        <View ai="center" jc="center" minWidth={60} minHeight={40}>
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

export const MainLayout = () => {
  const insets = useSafeAreaInsets();

  const [value, setValue] = useState(0);

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
        // Header styling with dark theme and gradient borders
        headerStyle: {
          backgroundColor: darkThemeColors.background.card, // L=5% (main card surface)
          borderBottomWidth: 1,
          borderBottomColor: darkThemeColors.border.bottom, // L=5% (gradient from 0% base)
          // Note: React Navigation doesn't support borderTopColor directly,
          // but we can use elevation or shadows for depth
        },
        headerTintColor: darkThemeColors.text.primary, // L=90% (foreground text)
        headerTitleStyle: {
          color: darkThemeColors.text.emphasized, // L=95% (closest to user)
          fontWeight: "bold",
        },

        // Tab bar styling with dark theme and gradient borders
        tabBarStyle: {
          backgroundColor: darkThemeColors.background.card, // L=5% (main card surface)
          borderTopWidth: 1,
          borderTopColor: darkThemeColors.border.top, // L=10% (lighter, gradient from 5% card)
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          height: 60 + Math.max(insets.bottom - 8, 0),
          // Add subtle shadow for depth
          shadowColor: darkThemeColors.shadow.color,
          shadowOffset: darkThemeColors.shadow.offset.subtle,
          shadowOpacity: darkThemeColors.shadow.opacity.subtle,
          shadowRadius: darkThemeColors.shadow.radius.subtle,
          elevation: 2, // Android shadow
        },
        tabBarActiveTintColor: darkThemeColors.text.emphasized, // L=95% (closest to user)
        tabBarInactiveTintColor: darkThemeColors.text.muted, // L=50% (muted)
        tabBarActiveBackgroundColor: "transparent", // Transparent - using custom button instead
        tabBarInactiveBackgroundColor: "transparent",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarButton: (props) => <CustomTabBarButton {...props} />,

        // Logout button with light-from-above effect
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 12 }}>
            {({ pressed }: { pressed: boolean }) => (
              <View
                bg={
                  pressed
                    ? darkThemeColors.interactive.pressed // L=8% (darker when pressed)
                    : darkThemeColors.background.raised // L=10% (raised, closer to user)
                }
                px="$3"
                py="$1.5"
                br="$3"
                borderWidth={1}
                borderTopColor={
                  pressed
                    ? darkThemeColors.interactive.pressedTop // L=12% (lighter, shining when pressed)
                    : darkThemeColors.border.top // L=10% (lighter, from 5% card)
                }
                borderBottomColor={
                  pressed
                    ? darkThemeColors.interactive.pressedBottom // L=6% (darker when pressed)
                    : darkThemeColors.border.bottom // L=5% (from 0% base)
                }
                borderLeftColor={darkThemeColors.border.left}
                borderRightColor={darkThemeColors.border.right}
                borderTopWidth={pressed ? 1 : 1.5}
                borderBottomWidth={pressed ? 1.5 : 1}
                shadowColor={darkThemeColors.shadow.color}
                shadowOffset={
                  pressed
                    ? darkThemeColors.shadow.offset.subtle
                    : darkThemeColors.shadow.offset.medium
                }
                shadowOpacity={
                  pressed
                    ? darkThemeColors.shadow.opacity.strong
                    : darkThemeColors.shadow.opacity.medium
                }
                shadowRadius={
                  pressed
                    ? darkThemeColors.shadow.radius.subtle
                    : darkThemeColors.shadow.radius.medium
                }
                ai="center"
                jc="center"
              >
                <Text
                  fontSize="$3"
                  fontWeight="600"
                  color={darkThemeColors.text.primary} // L=90% (foreground)
                >
                  logOut
                </Text>
              </View>
            )}
          </Pressable>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "My Habits",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="scroll" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Streaks"
        component={StreakScreen}
        options={{
          title: "My Streaks",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ticker"
        
        options={{
          title: "Ticker",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="stopwatch" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <>
            <Ticker value={value} />
            <Button
              title="random Value"
              onPress={() => setValue(Math.floor(Math.random() * 1000000))}
            ></Button>
          </>
        )}
      </Tab.Screen>

      <Tab.Screen 
      name="HabitScreen"
      component={AddHabitScreen}
      options={{
        title: "Add Habit",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle" size={size} color={color} />
        ),
      }}
      />
    </Tab.Navigator>
  );
};
