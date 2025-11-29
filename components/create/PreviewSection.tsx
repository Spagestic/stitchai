import { View, Image, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface PreviewSectionProps {
  onRegenerate: () => void;
  onSave: () => void;
}

export function PreviewSection({ onRegenerate, onSave }: PreviewSectionProps) {
  return (
    <Animated.View 
      entering={FadeInUp.duration(400)}
      className="px-4 mb-6"
    >
      <Text className="text-base font-semibold mb-3">Your Design</Text>
      <View className="bg-secondary rounded-2xl p-4 items-center">
        <Image
          source={require('@/assets/images/jerseys/Modern_blue_gradient.png')}
          style={{ width: width - 64, height: (width - 64) * 1.2, borderRadius: 12 }}
          resizeMode="contain"
        />
        <View className="flex-row gap-3 mt-4">
          <Button 
            variant="outline" 
            className="flex-1 rounded-full"
            onPress={onRegenerate}
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
