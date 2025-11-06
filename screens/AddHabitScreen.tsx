import { View, Text, Input, Button } from "tamagui";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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
    <View f={1} ai="center" jc="center">
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder="Enter the habit title..."
      />
      <Input
        value={description}
        onChangeText={setDescription}
        placeholder="Enter Description..."
      />

      <View fd="row" gap="$2" w="100%" mb="$4">
        {frequencyOptions.map((option) => {
          return (
            <Button
              key={option}
              onPress={() => setFrequency(option)}
              bg={frequency === option ? "$blue10" : "$gray5"}
              f={1}
            >
              {option}
            </Button>
          );
        })}
      </View>

      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
};
