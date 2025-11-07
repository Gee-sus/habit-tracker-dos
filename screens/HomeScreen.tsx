import { View, Text, ScrollView } from "tamagui";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { Swipeable } from "react-native-gesture-handler";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { darkThemeColors } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";

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
  const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

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

          habitsList.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
            const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
          });
          setHabits(habitsList);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const handleIncreaseStreak = async (
    habitId: string,
    currentStreak: number
  ) => {
    try {
      const habitRef = doc(db, "habits", habitId);
      await updateDoc(habitRef, { streak_count: currentStreak + 1 });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      const habitRef = doc(db, "habits", habitId);
      await deleteDoc(habitRef);
    } catch (error) {
      console.error(error);
    }
  };

  const renderRightActions = (habit: Habit) => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#14532d",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 28,
      }}
    >
      <Ionicons name="checkmark" size={28} color={darkThemeColors.text.emphasized} />
      <Text
        color={darkThemeColors.text.emphasized}
        fontWeight="700"
        fontSize="$5"
        mt="$1"
      >
        Increase
      </Text>
    </View>
  );

  const renderLeftActions = (habit: Habit) => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#7f1d1d",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 28,
      }}
    >
      <Text
        color={darkThemeColors.text.emphasized}
        fontWeight="700"
        fontSize="$5"
        mt="$1"
        mb="$1"
        textAlign="right"
      >
        Delete
      </Text>
      <Ionicons name="trash" size={28} color={darkThemeColors.text.emphasized} />
    </View>
  );

  return (
    <View f={1} bg={darkThemeColors.background.base} p="$4">
      <Text
        fontSize="$10"
        fontWeight="bold"
        mb="$4"
        ta="center"
        color={darkThemeColors.text.emphasized}
      >
        My Habits
      </Text>
      {habits.length === 0 ? (
        <View f={1} ai="center" jc="center">
          <Text fontSize="$5" color={darkThemeColors.text.muted}>
            No habits yet. Add one to get started!
          </Text>
        </View>
      ) : (
        <ScrollView f={1} w="100%" showsVerticalScrollIndicator={false}>
          {habits.map((habit, index) => {
            // Use raised background for first card (most recent), card for others
            const isRaised = index === 0;

            return (
              <Swipeable
                key={habit.id}
                ref={(ref) => {
                  swipeableRefs.current[habit.id] = ref;
                }}
                renderLeftActions={() => renderLeftActions(habit)}
                renderRightActions={() => renderRightActions(habit)}
                overshootLeft={false}
                overshootRight={false}
                onSwipeableOpen={(direction) => {
                  if (direction === "right") {
                    handleIncreaseStreak(habit.id, habit.streak_count);
                    swipeableRefs.current[habit.id]?.close();
                  }
                  if (direction === "left") {
                    handleDeleteHabit(habit.id);
                    swipeableRefs.current[habit.id]?.close();
                  }
                }}
              >
                <View style={{ width: "100%", marginBottom: 12, borderRadius: 18, overflow: "hidden" }}>
                  <View
                    bg={
                      isRaised
                        ? darkThemeColors.background.raised
                        : darkThemeColors.background.card
                    }
                    p="$4"
                    br="$5"
                    borderWidth={1}
                    borderTopColor={darkThemeColors.border.top}
                    borderBottomColor={darkThemeColors.border.bottom}
                    borderLeftColor={darkThemeColors.border.left}
                    borderRightColor={darkThemeColors.border.right}
                    shadowColor={darkThemeColors.shadow.color}
                    shadowOffset={
                      isRaised
                        ? darkThemeColors.shadow.offset.medium
                        : darkThemeColors.shadow.offset.subtle
                    }
                    shadowOpacity={
                      isRaised
                        ? darkThemeColors.shadow.opacity.medium
                        : darkThemeColors.shadow.opacity.subtle
                    }
                    shadowRadius={
                      isRaised
                        ? darkThemeColors.shadow.radius.medium
                        : darkThemeColors.shadow.radius.subtle
                    }
                    w="100%"
                    borderTopWidth={isRaised ? 1.5 : 1}
                    borderBottomWidth={isRaised ? 1 : 1}
                  >
                      <View fd="row" jc="space-between" ai="center" mb="$3">
                        <Text
                          fontSize="$7"
                          fontWeight="bold"
                          color={darkThemeColors.text.primary}
                          f={1}
                        >
                          {habit.title}
                        </Text>
                        <View
                          bg={darkThemeColors.background.nested}
                          px="$3"
                          py="$1.5"
                          br="$4"
                          borderWidth={1}
                          borderColor={darkThemeColors.border.medium}
                        >
                          <Text
                            fontSize="$2"
                            fontWeight="bold"
                            color={darkThemeColors.text.secondary}
                          >
                            {habit.frequency}
                          </Text>
                        </View>
                      </View>

                      <Text
                        fontSize="$4"
                        color={darkThemeColors.text.secondary}
                        mb="$4"
                        lineHeight="$1"
                      >
                        {habit.description}
                      </Text>

                      <View
                        fd="row"
                        jc="space-between"
                        ai="center"
                        p="$3"
                        bg={darkThemeColors.background.nested}
                        br="$3"
                        borderWidth={1}
                        borderColor={darkThemeColors.border.subtle}
                      >
                        <View fd="row" ai="center" gap="$2">
                          <Text
                            fontSize="$3"
                            color={darkThemeColors.text.muted}
                          >
                            Frequency:
                          </Text>
                          <Text
                            fontSize="$3"
                            fontWeight="600"
                            color={darkThemeColors.text.secondary}
                          >
                            {habit.frequency}
                          </Text>
                        </View>
                        <View fd="row" ai="center" gap="$2">
                          <Text
                            fontSize="$3"
                            color={darkThemeColors.text.muted}
                          >
                            Streak:
                          </Text>
                          <Text
                            fontSize="$4"
                            fontWeight="bold"
                            color={darkThemeColors.text.emphasized}
                          >
                            🔥 {habit.streak_count}
                          </Text>
                        </View>
                      </View>
                  </View>
                </View>
              </Swipeable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
