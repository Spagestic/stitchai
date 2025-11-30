import { FlatList, Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import type { Team } from "@/constants/teams";

type TeamsGridProps = {
  teams: Team[];
  selectedTeamId?: string;
  onSelectTeam: (team: Team) => void;
  onEndReached?: () => void;
};

const ITEMS_PER_ROW = 3;

export function TeamsGrid({
  teams,
  selectedTeamId,
  onSelectTeam,
  onEndReached,
}: TeamsGridProps) {
  if (teams.length === 0) {
    return (
      <View className="w-full items-center py-8">
        <Text className="text-muted-foreground">No teams found</Text>
      </View>
    );
  }

  const renderTeamItem = ({ item }: { item: Team }) => (
    <View className="w-1/3 p-1">
      <Pressable
        className={`items-center rounded-lg border p-2 ${
          selectedTeamId === item.id
            ? "border-primary bg-primary/10"
            : "border-border"
        }`}
        onPress={() => onSelectTeam(item)}
      >
        <Image
          className="size-12 rounded"
          resizeMode="contain"
          source={item.logo}
        />
        <Text className="mt-1 text-center text-xs" numberOfLines={2}>
          {item.name}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      className="flex-1"
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={teams}
      initialNumToRender={12}
      keyExtractor={(item) => item.id}
      maxToRenderPerBatch={9}
      numColumns={ITEMS_PER_ROW}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={renderTeamItem}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      windowSize={5}
    />
  );
}
