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

  const totalStreak = habits.reduce(
    (sum, habit) => sum + (habit.streak_count || 0),
    0
  );

  const averageStreak = habits.length > 0 ? totalStreak / habits.length : 0;

  return (
    <View bg={darkThemeColors.background.base} p="$4" f={1}>
      <View 
      bg={darkThemeColors.background.card}
      p="$4"
      br="$4"
      mb="$4"
    

      >
        <Text color={darkThemeColors.text.emphasized}>Total Streak: {totalStreak}</Text>
        <Text color={darkThemeColors.text.emphasized}>Average Streak: {averageStreak.toFixed(1)}</Text>
      </View>
    </View>
  );
};
