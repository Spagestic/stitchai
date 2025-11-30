import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

type Team = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
  logo?: ImageSourcePropType;
};

type TeamCardProps = {
  team: Team;
  onPress: (teamId: string) => void;
  width: number;
};

export const TeamCard = ({ team, onPress, width }: TeamCardProps) => (
  <Pressable
    className="mr-3"
    onPress={() => onPress(team.id)}
    style={{ width }}
  >
    <View className="mb-2 h-20 items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
      {/* Team logo */}
      {team.logo ? (
        <Image className="h-12 w-12" resizeMode="contain" source={team.logo} />
      ) : (
        <Text className="px-2 text-center font-bold text-foreground text-sm">
          {team.name}
        </Text>
      )}
    </View>
    <Text className="text-center text-muted-foreground text-xs">
      {team.league}
    </Text>
  </Pressable>
);
