import { Shield } from "lucide-react-native";
import { useMemo, useState } from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { allTeams, type Team } from "@/constants/teams";
import { TeamLogoDialogContent } from "./TeamLogoDialogContent";
import { TeamLogoPreview } from "./TeamLogoPreview";
import { TeamLogoSelectorTrigger } from "./TeamLogoSelectorTrigger";

type TeamLogoSelectorProps = {
  selectedTeam: Team | null;
  onTeamChange: (team: Team | null) => void;
};

export function TeamLogoSelector({
  selectedTeam,
  onTeamChange,
}: TeamLogoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<string>("All");

  const filteredTeams = useMemo(
    () =>
      allTeams.filter((team) => {
        const matchesSearch = team.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesLeague =
          selectedLeague === "All" || team.league === selectedLeague;
        return matchesSearch && matchesLeague;
      }),
    [searchQuery, selectedLeague]
  );

  const handleSelectTeam = (team: Team) => {
    onTeamChange(team);
    setIsOpen(false);
    setSearchQuery("");
    setSelectedLeague("All");
  };

  const handleClearSelection = () => {
    onTeamChange(null);
  };

  return (
    <Animated.View
      className="mb-6 px-4"
      entering={FadeInDown.delay(150).duration(400)}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Shield className="text-primary" size={20} />
        <Text className="font-semibold text-base">Team Logo</Text>
        <Text className="text-muted-foreground text-xs">(optional)</Text>
      </View>

      <View className="flex-row items-center gap-3">
        {selectedTeam ? (
          <TeamLogoPreview
            onClear={handleClearSelection}
            selectedTeam={selectedTeam}
          />
        ) : (
          <TeamLogoSelectorTrigger
            filteredTeams={filteredTeams}
            isOpen={isOpen}
            onLeagueChange={setSelectedLeague}
            onOpenChange={setIsOpen}
            onSearchChange={setSearchQuery}
            onSelectTeam={handleSelectTeam}
            searchQuery={searchQuery}
            selectedLeague={selectedLeague}
          />
        )}
      </View>

      {selectedTeam ? (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild>
            <Button className="mt-3" size="sm" variant="outline">
              <Text>Change Team</Text>
            </Button>
          </DialogTrigger>
          <TeamLogoDialogContent
            filteredTeams={filteredTeams}
            leagues={Array.from(allTeams.map((t) => t.league))}
            onLeagueChange={setSelectedLeague}
            onSearchChange={setSearchQuery}
            onSelectTeam={handleSelectTeam}
            searchQuery={searchQuery}
            selectedLeague={selectedLeague}
            selectedTeamId={selectedTeam.id}
            totalTeams={allTeams.length}
          />
        </Dialog>
      ) : null}
    </Animated.View>
  );
}
