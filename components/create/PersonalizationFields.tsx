import { Type } from "lucide-react-native";
import { TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

type PersonalizationFieldsProps = {
  playerName: string;
  playerNumber: string;
  onPlayerNameChange: (name: string) => void;
  onPlayerNumberChange: (number: string) => void;
};

export function PersonalizationFields({
  playerName,
  playerNumber,
  onPlayerNameChange,
  onPlayerNumberChange,
}: PersonalizationFieldsProps) {
  return (
    <Animated.View
      className="mb-6 px-4"
      entering={FadeInDown.delay(400).duration(400)}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Type className="text-primary" size={20} />
        <Text className="font-semibold text-base">Personalize</Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-2 text-muted-foreground text-sm">
            Player Name
          </Text>
          <View className="rounded-xl bg-secondary px-4 py-3">
            <TextInput
              autoCapitalize="characters"
              className="text-base text-foreground"
              maxLength={15}
              onChangeText={onPlayerNameChange}
              placeholder="RONALDO"
              placeholderTextColor="#9ca3af"
              value={playerName}
            />
          </View>
        </View>
        <View className="w-24">
          <Text className="mb-2 text-muted-foreground text-sm">Number</Text>
          <View className="rounded-xl bg-secondary px-4 py-3">
            <TextInput
              className="text-center text-base text-foreground"
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={onPlayerNumberChange}
              placeholder="7"
              placeholderTextColor="#9ca3af"
              value={playerNumber}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
