import { Plus } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";

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
      <Text className="mb-4 font-bold text-lg">Popular Teams</Text>
      <ScrollView
        className="pb-2"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {teams.map((team) => (
          <Pressable
            className="mr-3"
            key={team.id}
            onPress={() => onTeamPress(team.id)}
            style={{ width: teamCardWidth }}
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
                    team.primaryColor === "#FFFFFF" ||
                    team.primaryColor === "#FBE122"
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
