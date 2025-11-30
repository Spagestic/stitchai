import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

type Team = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
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
    <View
      className="mb-2 h-20 items-center justify-center overflow-hidden rounded-xl border border-border"
      style={{
        backgroundColor: team.primaryColor,
      }}
    >
      <View
        className="absolute top-0 right-0 bottom-0 w-1/3"
        style={{ backgroundColor: team.secondaryColor }}
      />
      <Text
        className="z-10 px-2 text-center font-bold text-sm"
        style={{
          color:
            team.primaryColor === "#FFFFFF" || team.primaryColor === "#FBE122"
              ? "#000"
              : "#fff",
          textShadowColor: "rgba(0,0,0,0.3)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {team.name}
      </Text>
    </View>
    <Text className="text-center text-muted-foreground text-xs">
      {team.league}
    </Text>
  </Pressable>
);
