import { View, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Type } from 'lucide-react-native';

interface PersonalizationFieldsProps {
  playerName: string;
  playerNumber: string;
  onPlayerNameChange: (name: string) => void;
  onPlayerNumberChange: (number: string) => void;
}

export function PersonalizationFields({
  playerName,
  playerNumber,
  onPlayerNameChange,
  onPlayerNumberChange,
}: PersonalizationFieldsProps) {
  return (
    <Animated.View 
      entering={FadeInDown.delay(400).duration(400)}
      className="px-4 mb-6"
    >
      <View className="flex-row items-center gap-2 mb-3">
        <Type size={20} className="text-primary" />
        <Text className="text-base font-semibold">Personalize</Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground mb-2">Player Name</Text>
          <View className="bg-secondary rounded-xl px-4 py-3">
            <TextInput
              value={playerName}
              onChangeText={onPlayerNameChange}
              placeholder="RONALDO"
              placeholderTextColor="#9ca3af"
              className="text-foreground text-base"
              maxLength={15}
              autoCapitalize="characters"
            />
          </View>
        </View>
        <View className="w-24">
          <Text className="text-sm text-muted-foreground mb-2">Number</Text>
          <View className="bg-secondary rounded-xl px-4 py-3">
            <TextInput
              value={playerNumber}
              onChangeText={onPlayerNumberChange}
              placeholder="7"
              placeholderTextColor="#9ca3af"
              className="text-foreground text-base text-center"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
