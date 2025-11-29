import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GenerateButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  onPress: () => void;
}

export function GenerateButton({ isGenerating, isDisabled, onPress }: GenerateButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View 
      entering={FadeInUp.delay(500).duration(400)}
      className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border"
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <Button 
        className="w-full h-14 rounded-full flex-row items-center justify-center gap-2"
        onPress={onPress}
        disabled={isDisabled || isGenerating}
      >
        {isGenerating ? (
          <>
            <Ionicons name="sync" size={20} color="#fff" />
            <Text className="text-primary-foreground font-semibold text-lg">Generating...</Text>
          </>
        ) : (
          <>
            <Sparkles size={20} color="#fff" />
            <Text className="text-primary-foreground font-semibold text-lg">Generate Jersey</Text>
          </>
        )}
      </Button>
    </Animated.View>
  );
}
