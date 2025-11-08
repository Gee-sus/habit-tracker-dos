import { Input, View, Text, Button, YStack, XStack } from "tamagui";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { darkThemeColors } from "../utils/colors";
import { KeyboardAvoidingView, Platform } from "react-native";

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1, backgroundColor: darkThemeColors.background.base}}
    
    >
      <View bg={darkThemeColors.background.base} jc="center" ai="center" f={1} >
        <View bg={darkThemeColors.background.raised} p="$5" br="$5">
          <Text
            color={darkThemeColors.text.primary}
            mb="$4"
            fontSize="$6"
            textAlign="center"
          >
            {" "}
            {isSignUp ? "Sign-up" : "Sign-In"}{" "}
          </Text>
          <Input
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="put your email here..."
            bg={darkThemeColors.background.card}
            color={darkThemeColors.text.primary}
            borderColor={darkThemeColors.border.subtle}
            mb="$4"
          />
          <Input
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="put your password here..."
            autoCapitalize="none"
            bg={darkThemeColors.background.card}
            color={darkThemeColors.text.primary}
            borderColor={darkThemeColors.border.subtle}
            mb="$4"
          />

          <Button
            onPress={isSignUp ? handleSignUp : handleSignIn}
            bg={darkThemeColors.background.raised}
            color={darkThemeColors.text.emphasized}
            fontWeight={700}
            borderColor={darkThemeColors.border.subtle}
            mb="$4"
            pressStyle={{ bg: darkThemeColors.interactive.pressed,
                
    shadowOpacity: darkThemeColors.shadow.opacity.subtle,
    shadowRadius: darkThemeColors.shadow.radius.subtle,
    shadowOffset: darkThemeColors.shadow.offset.subtle,
             }}

             hoverStyle={{
                bg: darkThemeColors.interactive.hover,
                shadowColor: darkThemeColors.shadow.color,
                shadowOpacity: darkThemeColors.shadow.opacity.medium,
                shadowRadius: darkThemeColors.shadow.radius.medium,
                shadowOffset: darkThemeColors.shadow.offset.medium,
              }}
          >
            {isSignUp ? "Sign-up" : "Sign-In"}
          </Button>
          <Text
           color={darkThemeColors.text.secondary}
          onPress={() => setIsSignUp(!isSignUp)}>
            {
            isSignUp ? "Already have an account? Sign in" : "Don't have an Account? Sign up"}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
