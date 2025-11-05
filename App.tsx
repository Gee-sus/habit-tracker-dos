import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Auth } from "./components/auth";
import { TamaguiProvider, View, Text } from "tamagui";
import config from "./tamagui.config";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppNavigator } from "./navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </NavigationContainer>
      </AuthProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
