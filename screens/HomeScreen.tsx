import { View, Text, ScrollView } from "tamagui";
import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { db } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, onSnapshot} from 'firebase/firestore';
import { darkThemeColors } from "../utils/colors";

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
              <Pressable
                key={habit.id}
                style={{ width: '100%', marginBottom: 12 }}
              >
                {({ pressed }: { pressed: boolean }) => (
                  <View
                    bg={
                      pressed 
                        ? darkThemeColors.interactive.pressed 
                        : isRaised 
                          ? darkThemeColors.background.raised 
                          : darkThemeColors.background.card
                    }
                    p="$4"
                    br="$5"
                    borderWidth={1}
                    // Gradient border effect: top border lighter (light from above)
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
                    shadowColor={darkThemeColors.shadow.color}
                    shadowOffset={
                      pressed 
                        ? darkThemeColors.shadow.offset.subtle 
                        : isRaised 
                          ? darkThemeColors.shadow.offset.medium 
                          : darkThemeColors.shadow.offset.subtle
                    }
                    shadowOpacity={
                      pressed 
                        ? darkThemeColors.shadow.opacity.strong 
                        : isRaised 
                          ? darkThemeColors.shadow.opacity.medium 
                          : darkThemeColors.shadow.opacity.subtle
                    }
                    shadowRadius={
                      pressed 
                        ? darkThemeColors.shadow.radius.subtle 
                        : isRaised 
                          ? darkThemeColors.shadow.radius.medium 
                          : darkThemeColors.shadow.radius.subtle
                    }
                    w="100%"
                    // Light from above effect: subtle top highlight
                    borderTopWidth={pressed ? 1 : 1.5}
                    borderBottomWidth={pressed ? 1.5 : 1}
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
                    <Text fontSize="$3" color={darkThemeColors.text.muted}>
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
                    <Text fontSize="$3" color={darkThemeColors.text.muted}>
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
              )}
            </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
