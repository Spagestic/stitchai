import { Pressable, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";

type LeagueFilterProps = {
  leagues: readonly string[];
  selectedLeague: string;
  onLeagueChange: (league: string) => void;
};

const getDisplayName = (league: string): string =>
  league === "All" ? "All Leagues" : league;

export function LeagueFilter({
  leagues,
  selectedLeague,
  onLeagueChange,
}: LeagueFilterProps) {
  return (
    <ScrollView
      className="-mx-2 max-h-10"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {leagues.map((league) => (
        <Pressable
          className={`mx-1 rounded-full px-3 py-1 ${
            selectedLeague === league ? "bg-primary" : "bg-muted"
          }`}
          key={league}
          onPress={() => onLeagueChange(league)}
        >
          <Text
            className={`text-xs ${
              selectedLeague === league
                ? "font-medium text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            {getDisplayName(league)}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
