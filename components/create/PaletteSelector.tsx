import { Palette, X } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { ColorPickerDialog } from "@/components/create/ColorPickerDialog";
import { Text } from "@/components/ui/text";
import { type ColorPalette, colorPalettes } from "@/constants/jersey";

type PaletteSelectorProps = {
  selectedPalette: string | null;
  onPaletteChange: (paletteId: string | null) => void;
  customPalettes?: ColorPalette[];
  onCustomPaletteCreate?: (palette: ColorPalette) => void;
  onCustomPaletteDelete?: (paletteId: string) => void;
};

export function PaletteSelector({
  selectedPalette,
  onPaletteChange,
  customPalettes = [],
  onCustomPaletteCreate,
  onCustomPaletteDelete,
}: PaletteSelectorProps) {
  const allPalettes = [...colorPalettes, ...customPalettes];

  const handleCreatePalette = (palette: { name: string; colors: string[] }) => {
    const newPalette: ColorPalette = {
      id: `custom-${Date.now()}`,
      name: palette.name,
      colors: palette.colors,
      isCustom: true,
    };
    onCustomPaletteCreate?.(newPalette);
    onPaletteChange(newPalette.id);
  };

  return (
    <Animated.View
      className="mb-6 px-4"
      entering={FadeInDown.delay(300).duration(400)}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Palette className="text-primary" size={20} />
        <Text className="font-semibold text-base">Color Palette</Text>
        <Text className="text-muted-foreground text-xs">
          ({allPalettes.length} available)
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Custom Palette Creator */}
        <ColorPickerDialog onCreatePalette={handleCreatePalette} />

        {/* Custom Palettes First */}
        {customPalettes.map((palette) => (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}
            key={palette.id}
          >
            <Pressable
              className={`mr-3 rounded-xl border-2 p-3 ${
                selectedPalette === palette.id
                  ? "border-primary"
                  : "border-border"
              }`}
              onPress={() =>
                onPaletteChange(
                  selectedPalette === palette.id ? null : palette.id
                )
              }
            >
              <View className="mb-2 flex-row gap-1">
                {palette.colors.map((color) => (
                  <View
                    className="-ml-2 size-8 rounded-full border border-muted-foreground first:ml-0"
                    key={`${palette.id}-${color}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </View>
              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-xs ${
                    selectedPalette === palette.id
                      ? "font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {palette.name}
                </Text>
                <Pressable
                  className="ml-2"
                  hitSlop={8}
                  onPress={(e) => {
                    e.stopPropagation();
                    onCustomPaletteDelete?.(palette.id);
                    if (selectedPalette === palette.id) {
                      onPaletteChange(null);
                    }
                  }}
                >
                  <X className="text-muted-foreground" size={14} />
                </Pressable>
              </View>
            </Pressable>
          </Animated.View>
        ))}

        {/* Preset Palettes */}
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
            <View className="mb-2 flex-row gap-1">
              {palette.colors.map((color) => (
                <View
                  className="-ml-2 size-8 rounded-full border border-muted-foreground first:ml-0"
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
