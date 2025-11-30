import { View } from "react-native";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import type { Team } from "@/constants/teams";
import { LeagueFilter } from "./LeagueFilter";
import { TeamSearchInput } from "./TeamSearchInput";
import { TeamsGrid } from "./TeamsGrid";

type TeamLogoDialogContentProps = {
  leagues: string[];
  selectedLeague: string;
  onLeagueChange: (league: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredTeams: Team[];
  selectedTeamId?: string;
  onSelectTeam: (team: Team) => void;
  totalTeams: number;
};

export function TeamLogoDialogContent({
  leagues,
  selectedLeague,
  onLeagueChange,
  searchQuery,
  onSearchChange,
  filteredTeams,
  selectedTeamId,
  onSelectTeam,
  totalTeams,
}: TeamLogoDialogContentProps) {
  return (
    <DialogContent className="h-[80%] max-h-[600px]">
      <DialogHeader>
        <DialogTitle>Select Team Logo</DialogTitle>
        <DialogDescription>
          Choose a team logo to include on your jersey
        </DialogDescription>
      </DialogHeader>

      <TeamSearchInput onChangeText={onSearchChange} value={searchQuery} />

      <LeagueFilter
        leagues={leagues}
        onLeagueChange={onLeagueChange}
        selectedLeague={selectedLeague}
      />

      <TeamsGrid
        onSelectTeam={onSelectTeam}
        selectedTeamId={selectedTeamId}
        teams={filteredTeams}
      />

      <View className="border-border border-t pt-3">
        <Text className="text-center text-muted-foreground text-xs">
          Showing {filteredTeams.length} of {totalTeams} teams
        </Text>
      </View>
    </DialogContent>
  );
}
