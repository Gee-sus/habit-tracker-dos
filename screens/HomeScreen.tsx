import { View, Text, ScrollView } from "tamagui";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, onSnapshot} from 'firebase/firestore'

interface Habit {
  id: string;
  title: string;
  description: string;
  streak_count: number;
  createdAt: any;
  userId: string;
  frequency: string;
}

export const HomeScreen = () => {
  const { userId } = useAuth();

  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    if(!userId) return;

    const habitsRef = collection(db, "habits");
    const q = query(habitsRef, 
        where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot && snapshot.docs) {
          const habitsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Habit[];

          habitsList.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
            const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
          })
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
    <View f={1} p="$4" ai="center">
      <Text fontSize="$10" fontWeight="bold" mb="$4">
        My Habits
      </Text>
      {habits.length === 0 ? (
        <Text>No habits yet. Add one to get started!</Text>
      ) : (
        habits.map((habit) => (
          <View key={habit.id}>
            <Text>{habit.title}</Text>
            <Text>{habit.description}</Text>
            <Text> Frequency: {habit.frequency}</Text>
            <Text>Streak: {habit.streak_count}</Text>
          </View>
        ))
      )}
    </View>
  );
};
