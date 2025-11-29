import { View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Palette } from 'lucide-react-native';
import { colorPalettes } from '@/lib/constants/jersey';

interface PaletteSelectorProps {
  selectedPalette: string | null;
  onPaletteChange: (paletteId: string | null) => void;
}

export function PaletteSelector({ selectedPalette, onPaletteChange }: PaletteSelectorProps) {
  return (
    <Animated.View 
      entering={FadeInDown.delay(300).duration(400)}
      className="px-4 mb-6"
    >
      <View className="flex-row items-center gap-2 mb-3">
        <Palette size={20} className="text-primary" />
        <Text className="text-base font-semibold">Color Palette</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {colorPalettes.map((palette) => (
          <Pressable
            key={palette.id}
            onPress={() => onPaletteChange(selectedPalette === palette.id ? null : palette.id)}
            className={`mr-3 p-3 rounded-xl border-2 ${
              selectedPalette === palette.id
                ? 'border-primary'
                : 'border-border'
            }`}
          >
            <View className="flex-row mb-2">
              {palette.colors.map((color, index) => (
                <View
                  key={index}
                  className="size-8 rounded-full -ml-2 first:ml-0 border-2 border-background"
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
            <Text className={`text-xs text-center ${
              selectedPalette === palette.id ? 'font-medium' : 'text-muted-foreground'
            }`}>
              {palette.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
