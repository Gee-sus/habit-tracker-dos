import { View, Text, ScrollView } from "tamagui";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { darkThemeColors } from "../utils/colors";

interface Habit {
  id: string;
  title: string;
  description: string;
  streak_count: number;
  createdAt: any;
  userId: string;
  frequncy: string;
}

export const StreakScreen = () => {
  const { userId } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    if (!userId) return;

    const habitsRef = collection(db, "habits");
    const q = query(habitsRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot && snapshot.docs) {
          const habitsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Habit[];

          setHabits(habitsList);
        }
      },
      (error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, [userId]);

  return (
    <View>
      <Text>steak screen</Text>
    </View>
  );
};
