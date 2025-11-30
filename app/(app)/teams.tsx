import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { allTeams, type Team } from "@/constants/teams";

const PAGE_SIZE = 20;

export default function TeamsPage() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredTeams = useMemo(
    () =>
      allTeams.filter(
        (team) =>
          team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          team.league.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const displayedTeams = useMemo(
    () => filteredTeams.slice(0, displayedCount),
    [filteredTeams, displayedCount]
  );

  const hasMoreItems = displayedCount < filteredTeams.length;

  // Reset pagination when search query changes
  useEffect(() => {
    setDisplayedCount(PAGE_SIZE);
  }, []);

  // Also reset when search changes
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
    setDisplayedCount(PAGE_SIZE);
  }, []);

  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || !hasMoreItems) {
      return;
    }

    setIsLoadingMore(true);
    // Small delay for smoother UX
    setTimeout(() => {
      setDisplayedCount((prev) =>
        Math.min(prev + PAGE_SIZE, filteredTeams.length)
      );
      setIsLoadingMore(false);
    }, 100);
  }, [isLoadingMore, hasMoreItems, filteredTeams.length]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View className="items-center py-4">
        <ActivityIndicator
          color={colorScheme === "dark" ? "#fff" : "#000"}
          size="small"
        />
      </View>
    );
  }, [isLoadingMore, colorScheme]);

  const handleTeamPress = (teamId: string) => {
    router.push(`/create?team=${teamId}`);
  };

  const renderTeamItem = ({ item, index }: { item: Team; index: number }) => (
    <Animated.View
      className="flex-1 p-2"
      entering={FadeInDown.delay(index * 50).duration(300)}
    >
      <Pressable
        className="overflow-hidden rounded-xl border border-border bg-card"
        onPress={() => handleTeamPress(item.id)}
      >
        <View className="h-24 items-center justify-center bg-secondary/50">
          <Image
            className="h-16 w-16"
            resizeMode="contain"
            source={item.logo}
          />
        </View>
        <View className="p-3">
          <Text className="font-medium text-sm" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-muted-foreground text-xs">{item.league}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 pt-14 pb-4">
        <Pressable
          className="size-10 items-center justify-center rounded-full bg-secondary"
          onPress={() => router.back()}
        >
          <Ionicons
            color={colorScheme === "dark" ? "#fff" : "#000"}
            name="arrow-back"
            size={24}
          />
        </Pressable>
        <Text className="flex-1 font-bold text-xl">All Teams</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center gap-2 rounded-xl bg-secondary px-4 py-3">
          <Ionicons
            color={colorScheme === "dark" ? "#888" : "#666"}
            name="search"
            size={20}
          />
          <TextInput
            className="flex-1 text-foreground"
            onChangeText={handleSearchChange}
            placeholder="Search teams..."
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
            value={searchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => {
                setSearchQuery("");
                setDisplayedCount(PAGE_SIZE);
              }}
            >
              <Ionicons
                color={colorScheme === "dark" ? "#888" : "#666"}
                name="close-circle"
                size={20}
              />
            </Pressable>
          )}
        </View>
      </View>

      {/* Teams Grid */}
      <FlatList
        className="flex-1 px-2"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={displayedTeams}
        initialNumToRender={PAGE_SIZE}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons
              color={colorScheme === "dark" ? "#888" : "#666"}
              name="football-outline"
              size={48}
            />
            <Text className="mt-4 text-muted-foreground">No teams found</Text>
          </View>
        }
        ListFooterComponent={renderFooter}
        maxToRenderPerBatch={10}
        numColumns={2}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        renderItem={renderTeamItem}
        showsVerticalScrollIndicator={false}
        windowSize={5}
      />
    </View>
  );
}
