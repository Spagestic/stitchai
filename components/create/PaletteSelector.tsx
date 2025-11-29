import { Palette } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { colorPalettes } from "@/constants/jersey";

type PaletteSelectorProps = {
  selectedPalette: string | null;
  onPaletteChange: (paletteId: string | null) => void;
};

export function PaletteSelector({
  selectedPalette,
  onPaletteChange,
}: PaletteSelectorProps) {
  return (
    <Animated.View
      className="mb-6 px-4"
      entering={FadeInDown.delay(300).duration(400)}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Palette className="text-primary" size={20} />
        <Text className="font-semibold text-base">Color Palette</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {colorPalettes.map((palette) => (
          <Pressable
            className={`mr-3 rounded-xl border-2 p-3 ${
              selectedPalette === palette.id
                ? "border-primary"
                : "border-border"
            }`}
            key={palette.id}
            onPress={() =>
              onPaletteChange(
                selectedPalette === palette.id ? null : palette.id
              )
            }
          >
            <View className="mb-2 flex-row">
              {palette.colors.map((color) => (
                <View
                  className="-ml-2 size-8 rounded-full border-2 border-background first:ml-0"
                  key={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
            <Text
              className={`text-center text-xs ${
                selectedPalette === palette.id
                  ? "font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {palette.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
