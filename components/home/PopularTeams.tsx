import { Plus } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { TeamCard } from "./TeamCard";

type Team = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
};

type PopularTeamsProps = {
  teams: Team[];
  onTeamPress: (teamId: string) => void;
  onCustomTeamPress: () => void;
};

const teamCardWidth = 140;

export const PopularTeams = ({
  teams,
  onTeamPress,
  onCustomTeamPress,
}: PopularTeamsProps) => {
  return (
    <View className="px-4 pt-2">
      <View className="py-2">
        <Text
          className={
            "font-semibold text-muted-foreground text-xs uppercase tracking-wide"
          }
        >
          Popular Teams
        </Text>
      </View>
      <ScrollView
        className="pb-2"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            onPress={onTeamPress}
            team={team}
            width={teamCardWidth}
          />
        ))}
        {/* Add More Teams Card */}
        <Pressable
          className="mr-3"
          onPress={onCustomTeamPress}
          style={{ width: teamCardWidth }}
        >
          <View className="mb-2 h-20 items-center justify-center rounded-xl border border-muted-foreground border-dashed">
            <Plus className="text-muted-foreground" size={24} />
          </View>
          <Text className="text-center text-muted-foreground text-xs">
            Custom Team
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
