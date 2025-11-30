import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Dimensions,
  Image,
  type ImageRequireSource,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const jerseyImages: Record<string, ImageRequireSource> = {
  "1": require("@/assets/images/jerseys/black_jersey.png"),
  "2": require("@/assets/images/jerseys/Classic_red_and_whit.png"),
  "3": require("@/assets/images/jerseys/Modern_blue_gradient.png"),
  "4": require("@/assets/images/jerseys/Retro_90s_style_jers.png"),
};

const jerseyData: Record<
  string,
  { name: string; description: string; colors: string[]; sizes: string[] }
> = {
  "1": {
    name: "Black Jersey",
    description:
      "A sleek and modern black jersey perfect for any team. Features breathable fabric and a classic design.",
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  "2": {
    name: "Classic Red & White",
    description:
      "Traditional red and white color scheme that never goes out of style. Perfect for teams with a classic aesthetic.",
    colors: ["Red", "White", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  "3": {
    name: "Modern Blue Gradient",
    description:
      "Eye-catching gradient design that transitions from deep blue to light blue. A modern take on the classic jersey.",
    colors: ["Blue", "Light Blue", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  "4": {
    name: "Retro 90s Style",
    description:
      "Throwback design inspired by the iconic jerseys of the 1990s. Perfect for teams who love vintage aesthetics.",
    colors: ["Purple", "Teal", "Yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
};

const { width, height } = Dimensions.get("window");

export default function JerseyDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2); // Default to 'L'

  const jersey = jerseyData[id || "1"];
  const jerseyImage = jerseyImages[id || "1"];

  if (!jersey) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text>Jersey not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="absolute top-0 right-0 left-0 z-10 flex-row items-center justify-between px-4 pt-14 pb-4">
        <Pressable
          className="size-10 items-center justify-center rounded-full bg-background/80"
          onPress={() => router.back()}
        >
          <Ionicons
            color={colorScheme === "dark" ? "#fff" : "#000"}
            name="arrow-back"
            size={24}
          />
        </Pressable>
        <Pressable className="size-10 items-center justify-center rounded-full bg-background/80">
          <Ionicons
            color={colorScheme === "dark" ? "#fff" : "#000"}
            name="bookmark-outline"
            size={18}
          />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Jersey Image */}
        <Animated.View entering={FadeIn.duration(300)}>
          <Image
            resizeMode="cover"
            source={jerseyImage}
            style={{ width, height: height * 0.5 }}
          />
        </Animated.View>

        {/* Content */}
        <Animated.View
          className="-mt-6 rounded-t-3xl bg-background p-6"
          entering={FadeInDown.delay(150).duration(400)}
        >
          <Text className="mb-2 font-bold text-2xl">{jersey.name}</Text>
          <Text className="mb-6 text-muted-foreground">
            {jersey.description}
          </Text>

          {/* Color Selection */}
          <View className="mb-6">
            <Text className="mb-3 font-semibold text-base">Color</Text>
            <View className="flex-row gap-3">
              {jersey.colors.map((color, index) => (
                <Pressable
                  className={`rounded-full border-2 px-4 py-2 ${
                    selectedColor === index
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }`}
                  key={color}
                  onPress={() => setSelectedColor(index)}
                >
                  <Text
                    className={
                      selectedColor === index
                        ? "font-medium text-primary"
                        : "text-foreground"
                    }
                  >
                    {color}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View className="mb-6">
            <Text className="mb-3 font-semibold text-base">Size</Text>
            <View className="flex-row gap-2">
              {jersey.sizes.map((size, index) => (
                <Pressable
                  className={`size-12 items-center justify-center rounded-full border-2 ${
                    selectedSize === index
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                  key={size}
                  onPress={() => setSelectedSize(index)}
                >
                  <Text
                    className={
                      selectedSize === index
                        ? "font-medium text-primary-foreground"
                        : "text-foreground"
                    }
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Customization Options */}
          <View className="mb-6">
            <Text className="mb-3 font-semibold text-base">Customization</Text>
            <View className="gap-3">
              <Pressable className="flex-row items-center justify-between rounded-xl bg-secondary p-4">
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                    name="text"
                    size={20}
                  />
                  <Text>Add Name</Text>
                </View>
                <Ionicons
                  color={colorScheme === "dark" ? "#888" : "#666"}
                  name="chevron-forward"
                  size={20}
                />
              </Pressable>
              <Pressable className="flex-row items-center justify-between rounded-xl bg-secondary p-4">
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                    name="keypad"
                    size={20}
                  />
                  <Text>Add Number</Text>
                </View>
                <Ionicons
                  color={colorScheme === "dark" ? "#888" : "#666"}
                  name="chevron-forward"
                  size={20}
                />
              </Pressable>
              <Pressable className="flex-row items-center justify-between rounded-xl bg-secondary p-4">
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                    name="image"
                    size={20}
                  />
                  <Text>Add Logo</Text>
                </View>
                <Ionicons
                  color={colorScheme === "dark" ? "#888" : "#666"}
                  name="chevron-forward"
                  size={20}
                />
              </Pressable>
            </View>
          </View>

          {/* Spacer for bottom button */}
          <View className="h-24" />
        </Animated.View>
      </ScrollView>

      {/* Bottom Action Button */}
      <Animated.View
        className="absolute right-0 bottom-0 left-0 border-border border-t bg-background p-6 pb-10"
        entering={FadeInDown.delay(300).duration(400)}
      >
        <Button className="h-14 w-full rounded-full">
          <Text className="font-semibold text-lg text-primary-foreground">
            Start Customizing
          </Text>
        </Button>
      </Animated.View>
    </View>
  );
}
