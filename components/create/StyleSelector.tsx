import { Ionicons } from "@expo/vector-icons";
import { Shirt } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { jerseyStyles } from "@/constants/jersey";

type StyleSelectorProps = {
  selectedStyle: string | null;
  onStyleChange: (styleId: string | null) => void;
};

export function StyleSelector({
  selectedStyle,
  onStyleChange,
}: StyleSelectorProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Animated.View
      className="mb-6 px-4"
      entering={FadeInDown.delay(200).duration(400)}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Shirt className="text-primary" size={20} />
        <Text className="font-semibold text-base">Style</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {jerseyStyles.map((style) => {
          let iconColor: string;
          if (selectedStyle === style.id) {
            iconColor = isDark ? "#fff" : "#000";
          } else {
            iconColor = "#9ca3af";
          }
          return (
            <Pressable
              className={`mr-3 flex-row items-center gap-2 rounded-xl border-2 px-4 py-3 ${
                selectedStyle === style.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary"
              }`}
              key={style.id}
              onPress={() =>
                onStyleChange(selectedStyle === style.id ? null : style.id)
              }
            >
              <Ionicons color={iconColor} name={style.icon} size={18} />
              <Text
                className={
                  selectedStyle === style.id
                    ? "font-medium"
                    : "text-muted-foreground"
                }
              >
                {style.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
