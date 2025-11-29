import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CreateHeader() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      className="flex-row items-center justify-between px-4 pb-4"
      style={{ paddingTop: insets.top + 8 }}
    >
      <Pressable
        onPress={() => router.back()}
        className="size-10 rounded-full bg-secondary items-center justify-center"
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDark ? '#fff' : '#000'}
        />
      </Pressable>
      <Text className="text-xl font-bold">Create Jersey</Text>
      <View className="size-10" />
    </Animated.View>
  );
}
