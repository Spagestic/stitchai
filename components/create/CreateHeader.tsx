import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

export function CreateHeader() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  return (
    <Animated.View
      className="flex-row items-center justify-between px-4 pb-4"
      entering={FadeIn.duration(300)}
      style={{ paddingTop: insets.top + 8 }}
    >
      <Pressable
        className="size-10 items-center justify-center rounded-full bg-secondary"
        onPress={() => router.back()}
      >
        <Ionicons
          color={isDark ? "#fff" : "#000"}
          name="arrow-back"
          size={24}
        />
      </Pressable>
      <Text className="font-bold text-xl">Create Jersey</Text>
      <View className="size-10" />
    </Animated.View>
  );
}
