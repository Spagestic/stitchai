import { Plus, Trash2, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type ColorPickerTriggerProps = {
  onPress: () => void;
  trigger?: React.ReactNode;
};

type ColorPickerContentProps = {
  onCreatePalette: (palette: { name: string; colors: string[] }) => void;
  onClose: () => void;
};

const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

const PRESET_COLORS = [
  "#FF0000",
  "#FF4500",
  "#FF8C00",
  "#FFD700",
  "#FFFF00",
  "#00FF00",
  "#00CED1",
  "#00BFFF",
  "#0000FF",
  "#8A2BE2",
  "#FF00FF",
  "#FF1493",
  "#FFFFFF",
  "#808080",
  "#000000",
];

// Trigger component for opening the drawer
export function ColorPickerTrigger({
  onPress,
  trigger,
}: ColorPickerTriggerProps) {
  return (
    <Pressable onPress={onPress}>
      {trigger || (
        <View className="mr-3 items-center justify-center rounded-xl border-2 border-border border-dashed p-3">
          <View className="mb-2 size-8 items-center justify-center rounded-full bg-muted">
            <Plus className="text-muted-foreground" size={16} />
          </View>
          <Text className="text-center text-muted-foreground text-xs">
            Custom
          </Text>
        </View>
      )}
    </Pressable>
  );
}

// Content component to be rendered inside BottomDrawer
export function ColorPickerContent({
  onCreatePalette,
  onClose,
}: ColorPickerContentProps) {
  const [paletteName, setPaletteName] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState("#");

  const handleReset = () => {
    setPaletteName("");
    setSelectedColors([]);
    setCustomColor("#");
  };

  const handleAddColor = (color: string) => {
    if (selectedColors.length < 5 && !selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const handleAddCustomColor = () => {
    if (
      HEX_COLOR_REGEX.test(customColor) &&
      !selectedColors.includes(customColor) &&
      selectedColors.length < 5
    ) {
      setSelectedColors([...selectedColors, customColor]);
      setCustomColor("#");
    }
  };

  const handleCreate = () => {
    if (paletteName.trim() && selectedColors.length >= 2) {
      onCreatePalette({
        name: paletteName.trim(),
        colors: selectedColors,
      });
      handleReset();
      onClose();
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-4">
        <Text className="font-semibold text-lg">Create Custom Palette</Text>
        <Text className="text-muted-foreground text-sm">
          Select 2-5 colors to create your own palette
        </Text>
      </View>

      {/* Palette Name Input */}
      <View className="mb-3">
        <Text className="mb-1 font-medium text-sm">Palette Name</Text>
        <TextInput
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          onChangeText={setPaletteName}
          placeholder="My Custom Palette"
          placeholderTextColor="#888"
          value={paletteName}
        />
      </View>

      {/* Selected Colors Preview */}
      <View className="mb-3">
        <Text className="mb-1 font-medium text-sm">
          Selected Colors ({selectedColors.length}/5)
        </Text>
        <View className="min-h-12 flex-row flex-wrap gap-2 rounded-lg border border-border bg-muted/50 p-2">
          {selectedColors.length === 0 ? (
            <Text className="self-center text-muted-foreground text-xs">
              Tap colors below to add
            </Text>
          ) : (
            selectedColors.map((color) => (
              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(150)}
                key={color}
              >
                <Pressable
                  className="relative size-10 rounded-full border border-muted-foreground"
                  onPress={() => handleRemoveColor(color)}
                  style={{ backgroundColor: color }}
                >
                  <View className="-right-1 -top-1 absolute size-4 items-center justify-center rounded-full bg-destructive">
                    <X className="text-destructive-foreground" size={10} />
                  </View>
                </Pressable>
              </Animated.View>
            ))
          )}
        </View>
      </View>

      {/* Preset Colors Grid */}
      <View className="mb-3">
        <Text className="mb-1 font-medium text-sm">Preset Colors</Text>
        <View className="flex-row flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <Pressable
              className={`size-8 rounded-full border-2 ${
                selectedColors.includes(color)
                  ? "border-primary"
                  : "border-muted-foreground"
              }`}
              disabled={
                selectedColors.includes(color) || selectedColors.length >= 5
              }
              key={color}
              onPress={() => handleAddColor(color)}
              style={{
                backgroundColor: color,
                opacity:
                  selectedColors.length >= 5 && !selectedColors.includes(color)
                    ? 0.4
                    : 1,
              }}
            />
          ))}
        </View>
      </View>

      {/* Custom Color Input */}
      <View className="mb-4">
        <Text className="mb-1 font-medium text-sm">Custom Hex Color</Text>
        <View className="flex-row items-center gap-2">
          <TextInput
            autoCapitalize="characters"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-foreground"
            maxLength={7}
            onChangeText={(text) => {
              if (text.startsWith("#")) {
                setCustomColor(text.toUpperCase());
              } else {
                setCustomColor(`#${text}`);
              }
            }}
            placeholder="#FF5500"
            placeholderTextColor="#888"
            value={customColor}
          />
          <View
            className="size-10 rounded-lg border border-muted-foreground"
            style={{
              backgroundColor: HEX_COLOR_REGEX.test(customColor)
                ? customColor
                : "#CCCCCC",
            }}
          />
          {/* TODO: Open color picker dialog when clicked on */}
          <Button
            disabled={
              !HEX_COLOR_REGEX.test(customColor) || selectedColors.length >= 5
            }
            onPress={handleAddCustomColor}
            size="sm"
          >
            <Text>Add</Text>
          </Button>
        </View>
      </View>

      {/* Footer Buttons */}
      <View className="flex-row gap-2">
        <Button className="flex-1" onPress={handleReset} variant="outline">
          <Trash2 className="mr-2 text-muted-foreground" size={16} />
          <Text>Reset</Text>
        </Button>
        <Button
          className="flex-1"
          disabled={!paletteName.trim() || selectedColors.length < 2}
          onPress={handleCreate}
        >
          <Plus className="mr-2 text-primary-foreground" size={16} />
          <Text>Create</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
