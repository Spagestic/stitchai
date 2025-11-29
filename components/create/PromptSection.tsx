import { View, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Wand2 } from 'lucide-react-native';

interface PromptSectionProps {
  prompt: string;
  onPromptChange: (text: string) => void;
}

export function PromptSection({ prompt, onPromptChange }: PromptSectionProps) {
  return (
    <Animated.View 
      entering={FadeInDown.delay(100).duration(400)}
      className="px-4 mb-6"
    >
      <View className="flex-row items-center gap-2 mb-3">
        <Wand2 size={20} className="text-primary" />
        <Text className="text-base font-semibold">Describe Your Jersey</Text>
      </View>
      <View className="bg-secondary rounded-2xl p-4">
        <TextInput
          value={prompt}
          onChangeText={onPromptChange}
          placeholder="E.g., A futuristic jersey with geometric patterns, inspired by cyberpunk aesthetics..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
          className="text-foreground text-base min-h-[100px]"
          style={{ textAlignVertical: 'top' }}
        />
      </View>
    </Animated.View>
  );
}
