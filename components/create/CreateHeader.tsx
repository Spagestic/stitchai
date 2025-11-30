import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Repeat } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

type CreateHeaderProps = {
  onRandomize?: () => void;
};

export function CreateHeader({ onRandomize }: CreateHeaderProps) {
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
      <Pressable
        className="size-10 items-center justify-center rounded-full bg-secondary"
        onPress={onRandomize}
      >
        <Repeat color={isDark ? "#fff" : "#000"} size={20} />
      </Pressable>
    </Animated.View>
  );
}
