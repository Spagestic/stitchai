import { View, Pressable } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { Sparkles } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface CreateCTAProps {
  onPress: () => void;
}

export const CreateCTA = ({ onPress }: CreateCTAProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="p-4">
      <Pressable 
        onPress={onPress}
        className="flex-row items-center justify-between bg-primary/10 rounded-2xl p-4 border border-primary/20"
      >
        <View className="flex-row items-center gap-3">
          <View className="size-12 rounded-full bg-primary items-center justify-center">
            <Sparkles size={24} color="#fff" />
          </View>
          <View>
            <Text className="text-lg font-bold">Create with AI</Text>
            <Text className="text-muted-foreground text-sm">Design your dream jersey</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={isDark ? '#fff' : '#000'} />
      </Pressable>
    </View>
  );
};
