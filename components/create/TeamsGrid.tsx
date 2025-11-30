import { Image, Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import type { Team } from "@/constants/teams";

type TeamsGridProps = {
  teams: Team[];
  selectedTeamId?: string;
  onSelectTeam: (team: Team) => void;
};

export function TeamsGrid({
  teams,
  selectedTeamId,
  onSelectTeam,
}: TeamsGridProps) {
  if (teams.length === 0) {
    return (
      <View className="w-full items-center py-8">
        <Text className="text-muted-foreground">No teams found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap gap-2">
        {teams.map((team) => (
          <Pressable
            className={`w-[30%] items-center rounded-lg border p-2 ${
              selectedTeamId === team.id
                ? "border-primary bg-primary/10"
                : "border-border"
            }`}
            key={team.id}
            onPress={() => onSelectTeam(team)}
          >
            <Image
              className="size-12 rounded"
              resizeMode="contain"
              source={team.logo}
            />
            <Text className="mt-1 text-center text-xs" numberOfLines={2}>
              {team.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
