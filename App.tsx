import "react-native-reanimated";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { TamaguiProvider, View } from "tamagui";

import { AuthProvider } from "./contexts/AuthContext";
import { AppNavigator } from "./navigators/AppNavigator";
import config from "./tamagui.config";

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
