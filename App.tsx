
import { StyleSheet } from "react-native";
import { Auth } from "./components/auth";
import { TamaguiProvider, View, Text } from "tamagui";
import config from "./tamagui.config";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppNavigator } from "./navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <AuthProvider>
            <NavigationContainer>
              <View style={styles.container}>
                <AppNavigator />
              </View>
            </NavigationContainer>
          </AuthProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
