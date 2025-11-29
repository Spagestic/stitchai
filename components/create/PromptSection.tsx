import { Wand2 } from "lucide-react-native";
import { TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

type PromptSectionProps = {
  prompt: string;
  onPromptChange: (text: string) => void;
};

export function PromptSection({ prompt, onPromptChange }: PromptSectionProps) {
  return (
    <Animated.View
      className="mb-6 px-4"
      entering={FadeInDown.delay(100).duration(400)}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Wand2 className="text-primary" size={20} />
        <Text className="font-semibold text-base">Describe Your Jersey</Text>
      </View>
      <View className="rounded-2xl bg-secondary p-4">
        <TextInput
          className="min-h-[100px] text-base text-foreground"
          multiline
          numberOfLines={4}
          onChangeText={onPromptChange}
          placeholder="E.g., A futuristic jersey with geometric patterns, inspired by cyberpunk aesthetics..."
          placeholderTextColor="#9ca3af"
          style={{ textAlignVertical: "top" }}
          value={prompt}
        />
      </View>
    </Animated.View>
  );
}
