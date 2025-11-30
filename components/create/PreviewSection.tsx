import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import jerseyExamples from "@/constants/jersey_examples.json";

const { width } = Dimensions.get("window");

type PreviewSectionProps = {
  onRegenerate: () => void;
  onSave: () => void;
};

function getRandomJersey() {
  const randomIndex = Math.floor(Math.random() * jerseyExamples.length);
  const jersey = jerseyExamples[randomIndex];
  return {
    name: jersey.team,
    tags: [jersey.style, `${jersey.playerName} #${jersey.playerNumber}`],
  };
}

export function PreviewSection({ onRegenerate, onSave }: PreviewSectionProps) {
  const jerseyData = useMemo(() => getRandomJersey(), []);

  return (
    <Animated.View className="my-6 px-4" entering={FadeInUp.duration(400)}>
      <Text className="font-semibold text-base">Your Design</Text>
      <View className="items-center rounded-2xl p-4">
        <View className="relative overflow-hidden rounded-sm">
          <Image
            className="rounded-sm"
            resizeMode="cover"
            source={require("@/assets/images/jerseys/Modern_blue_gradient.png")}
            style={{
              width: width - 64,
              height: (width - 64) * 1.2,
              borderRadius: 12,
            }}
          />
          {/* Gradient Overlay - from black at bottom to transparent at top */}
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 0.6)",
              "rgba(0, 0, 0, 0.15)",
              "rgba(0, 0, 0, 0)",
            ]}
            end={[0, 0]}
            start={[0, 1]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: width - 64,
              height: (width - 64) * 1.2,
            }}
          />
          {/* Jersey Info */}
          <View className="absolute right-4 bottom-4 left-4 z-10">
            <View className="flex flex-col gap-0">
              <Text className="font-normal text-accent text-sm leading-relaxed">
                {jerseyData.name}
              </Text>
              <Text
                className="font-normal text-muted/80"
                style={{ fontSize: 10 }}
              >
                {jerseyData.tags.join(" • ")}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row gap-3">
        <Button className="flex-1" onPress={onRegenerate} variant="outline">
          <Text>Regenerate</Text>
        </Button>
        <Button className="flex-1" onPress={onSave}>
          <Text className="text-primary-foreground">Save Design</Text>
        </Button>
      </View>
    </Animated.View>
  );
}
