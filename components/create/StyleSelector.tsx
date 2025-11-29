import { View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Shirt } from 'lucide-react-native';
import { jerseyStyles } from '@/lib/constants/jersey';

interface StyleSelectorProps {
  selectedStyle: string | null;
  onStyleChange: (styleId: string | null) => void;
}

export function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Animated.View 
      entering={FadeInDown.delay(200).duration(400)}
      className="px-4 mb-6"
    >
      <View className="flex-row items-center gap-2 mb-3">
        <Shirt size={20} className="text-primary" />
        <Text className="text-base font-semibold">Style</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {jerseyStyles.map((style) => (
          <Pressable
            key={style.id}
            onPress={() => onStyleChange(selectedStyle === style.id ? null : style.id)}
            className={`mr-3 px-4 py-3 rounded-xl border-2 flex-row items-center gap-2 ${
              selectedStyle === style.id
                ? 'border-primary bg-primary/10'
                : 'border-border bg-secondary'
            }`}
          >
            <Ionicons
              name={style.icon as any}
              size={18}
              color={selectedStyle === style.id ? (isDark ? '#fff' : '#000') : '#9ca3af'}
            />
            <Text className={selectedStyle === style.id ? 'font-medium' : 'text-muted-foreground'}>
              {style.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
