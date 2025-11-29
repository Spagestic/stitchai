import { Ionicons } from "@expo/vector-icons";
import { Sparkles } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type GenerateButtonProps = {
  isGenerating: boolean;
  isDisabled: boolean;
  onPress: () => void;
};

export function GenerateButton({
  isGenerating,
  isDisabled,
  onPress,
}: GenerateButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      className="absolute right-0 bottom-0 left-0 border-border border-t bg-background p-4"
      entering={FadeInUp.delay(500).duration(400)}
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <Button
        className="h-14 w-full flex-row items-center justify-center gap-2 rounded-full"
        disabled={isDisabled || isGenerating}
        onPress={onPress}
      >
        {isGenerating ? (
          <>
            <Ionicons color="#fff" name="sync" size={20} />
            <Text className="font-semibold text-lg text-primary-foreground">
              Generating...
            </Text>
          </>
        ) : (
          <>
            <Sparkles color="#fff" size={20} />
            <Text className="font-semibold text-lg text-primary-foreground">
              Generate Jersey
            </Text>
          </>
        )}
      </Button>
    </Animated.View>
  );
}
