import { Dimensions, Image, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const { width } = Dimensions.get("window");

type PreviewSectionProps = {
  onRegenerate: () => void;
  onSave: () => void;
};

export function PreviewSection({ onRegenerate, onSave }: PreviewSectionProps) {
  return (
    <Animated.View className="mb-6 px-4" entering={FadeInUp.duration(400)}>
      <Text className="mb-3 font-semibold text-base">Your Design</Text>
      <View className="items-center rounded-2xl bg-secondary p-4">
        <Image
          resizeMode="contain"
          source={require("@/assets/images/jerseys/Modern_blue_gradient.png")}
          style={{
            width: width - 64,
            height: (width - 64) * 1.2,
            borderRadius: 12,
          }}
        />
        <View className="mt-4 flex-row gap-3">
          <Button
            className="flex-1 rounded-full"
            onPress={onRegenerate}
            variant="outline"
          >
            <Text>Regenerate</Text>
          </Button>
          <Button className="flex-1 rounded-full" onPress={onSave}>
            <Text className="text-primary-foreground">Save Design</Text>
          </Button>
        </View>
      </View>
    </Animated.View>
  );
}
