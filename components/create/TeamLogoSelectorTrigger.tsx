import { Shield } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { allTeams, leagues, type Team } from "@/constants/teams";
import { TeamLogoDialogContent } from "./TeamLogoDialogContent";

type TeamLogoSelectorTriggerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLeague: string;
  onLeagueChange: (league: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredTeams: Team[];
  onSelectTeam: (team: Team) => void;
};

export function TeamLogoSelectorTrigger({
  isOpen,
  onOpenChange,
  selectedLeague,
  onLeagueChange,
  searchQuery,
  onSearchChange,
  filteredTeams,
  onSelectTeam,
}: TeamLogoSelectorTriggerProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <Pressable className="flex-1 flex-row items-center gap-3 rounded-xl border-2 border-border border-dashed p-4">
          <View className="size-12 items-center justify-center rounded-lg bg-muted">
            <Shield className="text-muted-foreground" size={24} />
          </View>
          <View>
            <Text className="font-medium text-muted-foreground">
              Select a team logo
            </Text>
            <Text className="text-muted-foreground text-xs">
              Browse {allTeams.length} teams from {leagues.length - 1} leagues
            </Text>
          </View>
        </Pressable>
      </DialogTrigger>
      <TeamLogoDialogContent
        filteredTeams={filteredTeams}
        leagues={Array.from(leagues)}
        onLeagueChange={onLeagueChange}
        onSearchChange={onSearchChange}
        onSelectTeam={onSelectTeam}
        searchQuery={searchQuery}
        selectedLeague={selectedLeague}
        totalTeams={allTeams.length}
      />
    </Dialog>
  );
}
