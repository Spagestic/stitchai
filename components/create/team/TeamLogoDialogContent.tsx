import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import type { Team } from "@/constants/teams";
import { TeamSearchInput } from "./TeamSearchInput";
import { TeamsGrid } from "./TeamsGrid";

const PAGE_SIZE = 12;

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
  searchQuery,
  onSearchChange,
  filteredTeams,
  selectedTeamId,
  onSelectTeam,
  totalTeams,
}: TeamLogoDialogContentProps) {
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset pagination when search changes
  useEffect(() => {
    setDisplayedCount(PAGE_SIZE);
  }, []);

  const displayedTeams = filteredTeams.slice(0, displayedCount);
  const hasMoreItems = displayedCount < filteredTeams.length;

  const handleSearchChange = useCallback(
    (text: string) => {
      onSearchChange(text);
      setDisplayedCount(PAGE_SIZE);
    },
    [onSearchChange]
  );

  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || !hasMoreItems) {
      return;
    }

    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) =>
        Math.min(prev + PAGE_SIZE, filteredTeams.length)
      );
      setIsLoadingMore(false);
    }, 100);
  }, [isLoadingMore, hasMoreItems, filteredTeams.length]);

  const renderLoadingFooter = useCallback(() => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View className="items-center py-3">
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isLoadingMore]);

  return (
    <DialogContent className="max-h-[85vh] flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <DialogHeader>
          <DialogTitle>Select Team Logo</DialogTitle>
          <DialogDescription>
            Choose a team logo to include on your jersey
          </DialogDescription>
        </DialogHeader>

        <TeamSearchInput
          onChangeText={handleSearchChange}
          value={searchQuery}
        />

        <View className="flex-1">
          <TeamsGrid
            onEndReached={loadMoreItems}
            onSelectTeam={onSelectTeam}
            selectedTeamId={selectedTeamId}
            teams={displayedTeams}
          />
        </View>

        {renderLoadingFooter()}

        <View className="border-border border-b pt-3">
          <Text className="text-center text-muted-foreground text-xs">
            Showing {displayedTeams.length} of {totalTeams} teams
          </Text>
        </View>
      </KeyboardAvoidingView>
    </DialogContent>
  );
}
