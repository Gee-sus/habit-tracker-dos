import { View, Text, Input } from "tamagui";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { darkThemeColors } from "../utils/colors";
import { Pressable } from "react-native";

type Frequency = "Daily" | "Weekly" | "Monthly";

export const AddHabitScreen = () => {
  const { userId } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("Daily");

  const frequencyOptions: Frequency[] = ["Daily", "Weekly", "Monthly"];

  const handleSubmit = async () => {
    if (!userId) return;

    try {
      await addDoc(collection(db, "habits"), {
        title: title,
        description: description,
        userId: userId,
        frequency: frequency,
        streak_count: 0,
        createdAt: new Date(),
      });
      setTitle("");
      setDescription("");
      setFrequency("Daily");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View f={1} bg={darkThemeColors.background.base} p="$4" ai="center" jc="center">
      <View w="100%" mb="$4">
        <Text 
          fontSize="$4" 
          fontWeight="600" 
          mb="$2" 
          color={darkThemeColors.text.secondary}
        >
          Title
        </Text>
        <Input
          value={title}
          onChangeText={setTitle}
          placeholder="Enter the habit title..."
          placeholderTextColor={darkThemeColors.text.muted}
          bg={darkThemeColors.background.card}
          borderColor={darkThemeColors.border.subtle}
          borderWidth={1}
          color={darkThemeColors.text.primary}
          br="$4"
          p="$3"
          fontSize="$4"
          w="100%"
        />
      </View>

      <View w="100%" mb="$4">
        <Text 
          fontSize="$4" 
          fontWeight="600" 
          mb="$2" 
          color={darkThemeColors.text.secondary}
        >
          Description
        </Text>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description..."
          placeholderTextColor={darkThemeColors.text.muted}
          bg={darkThemeColors.background.card}
          borderColor={darkThemeColors.border.subtle}
          borderWidth={1}
          color={darkThemeColors.text.primary}
          br="$4"
          p="$3"
          fontSize="$4"
          w="100%"
        />
      </View>

      <View w="100%" mb="$4">
        <Text 
          fontSize="$4" 
          fontWeight="600" 
          mb="$2" 
          color={darkThemeColors.text.secondary}
        >
          Frequency
        </Text>
        <View fd="row" gap="$2" w="100%">
          {frequencyOptions.map((option) => {
            return (
              <Pressable
                key={option}
                onPress={() => setFrequency(option)}
                style={{ flex: 1 }}
              >
                {({ pressed }) => (
                  <View
                    bg={
                      pressed
                        ? darkThemeColors.interactive.pressed
                        : frequency === option
                          ? darkThemeColors.background.raised
                          : darkThemeColors.background.card
                    }
                    p="$3"
                    br="$4"
                    borderWidth={1}
                    borderTopColor={
                      pressed 
                        ? darkThemeColors.interactive.pressedTop  // L=12% (lighter, shining when pressed)
                        : darkThemeColors.border.top  // L=10% (lighter, from 5% card)
                    }
                    borderBottomColor={
                      pressed 
                        ? darkThemeColors.interactive.pressedBottom  // L=6% (darker when pressed)
                        : darkThemeColors.border.bottom  // L=5% (from 0% base)
                    }
                    borderLeftColor={darkThemeColors.border.left}
                    borderRightColor={darkThemeColors.border.right}
                    borderTopWidth={pressed ? 1 : 1.5}
                    borderBottomWidth={pressed ? 1.5 : 1}
                    shadowColor={darkThemeColors.shadow.color}
                    shadowOffset={
                      pressed
                        ? darkThemeColors.shadow.offset.subtle
                        : frequency === option
                          ? darkThemeColors.shadow.offset.medium
                          : darkThemeColors.shadow.offset.subtle
                    }
                    shadowOpacity={
                      pressed
                        ? darkThemeColors.shadow.opacity.strong
                        : frequency === option
                          ? darkThemeColors.shadow.opacity.medium
                          : darkThemeColors.shadow.opacity.subtle
                    }
                    shadowRadius={
                      pressed
                        ? darkThemeColors.shadow.radius.subtle
                        : frequency === option
                          ? darkThemeColors.shadow.radius.medium
                          : darkThemeColors.shadow.radius.subtle
                    }
                    ai="center"
                    jc="center"
                  >
                    <Text
                      fontSize="$3"
                      fontWeight={frequency === option ? "bold" : "600"}
                      color={
                        frequency === option
                          ? darkThemeColors.text.emphasized
                          : darkThemeColors.text.secondary
                      }
                    >
                      {option}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable
        onPress={handleSubmit}
        style={{ width: '100%' }}
      >
        {({ pressed }) => (
          <View
            bg={
              pressed
                ? darkThemeColors.interactive.pressed
                : darkThemeColors.background.raised
            }
            p="$4"
            br="$5"
            borderWidth={1}
            borderTopColor={
              pressed 
                ? darkThemeColors.interactive.pressedTop  // L=12% (lighter, shining when pressed)
                : darkThemeColors.border.top  // L=10% (lighter, from 5% card)
            }
            borderBottomColor={
              pressed 
                ? darkThemeColors.interactive.pressedBottom  // L=6% (darker when pressed)
                : darkThemeColors.border.bottom  // L=5% (from 0% base)
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
            w="100%"
          >
            <Text
              fontSize="$5"
              fontWeight="bold"
              color={darkThemeColors.text.emphasized}
            >
              Submit
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
