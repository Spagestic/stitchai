import { X } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import type { Team } from "@/constants/teams";

type TeamLogoPreviewProps = {
  selectedTeam: Team;
  onClear: () => void;
};

export function TeamLogoPreview({
  selectedTeam,
  onClear,
}: TeamLogoPreviewProps) {
  return (
    <Animated.View
      className="flex-row items-center gap-3 rounded-xl border-2 border-primary bg-primary/5 p-3"
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
    >
      <Image
        className="size-12 rounded-lg"
        resizeMode="contain"
        source={selectedTeam.logo}
      />
      <View className="flex-1">
        <Text className="font-medium">{selectedTeam.name}</Text>
        <Text className="text-muted-foreground text-xs">
          {selectedTeam.league}
        </Text>
      </View>
      <Pressable
        className="rounded-full bg-muted p-2"
        hitSlop={8}
        onPress={onClear}
      >
        <X className="text-muted-foreground" size={16} />
      </Pressable>
    </Animated.View>
  );
}
