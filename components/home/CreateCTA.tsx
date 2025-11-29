import { Ionicons } from "@expo/vector-icons";
import { Sparkles } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

type CreateCTAProps = {
  onPress: () => void;
};

export const CreateCTA = ({ onPress }: CreateCTAProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="p-4">
      <Pressable
        className="flex-row items-center justify-between rounded-2xl border border-primary/20 bg-primary/10 p-4"
        onPress={onPress}
      >
        <View className="flex-row items-center gap-3">
          <View className="size-12 items-center justify-center rounded-full bg-primary">
            <Sparkles color="#fff" size={24} />
          </View>
          <View>
            <Text className="font-bold text-lg">Create with AI</Text>
            <Text className="text-muted-foreground text-sm">
              Design your dream jersey
            </Text>
          </View>
        </View>
        <Ionicons
          color={isDark ? "#fff" : "#000"}
          name="chevron-forward"
          size={24}
        />
      </Pressable>
    </View>
  );
};
