import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Pressable,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

type Team = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
  logo: ImageSourcePropType;
};

// All teams organized by league
const allTeams: Team[] = [
  // La Liga
  {
    id: "real-madrid",
    name: "Real Madrid",
    primaryColor: "#FFFFFF",
    secondaryColor: "#00529F",
    league: "La Liga",
    logo: require("@/assets/logos/Spain - LaLiga/Real Madrid.png"),
  },
  {
    id: "barcelona",
    name: "FC Barcelona",
    primaryColor: "#A50044",
    secondaryColor: "#004D98",
    league: "La Liga",
    logo: require("@/assets/logos/Spain - LaLiga/FC Barcelona.png"),
  },
  {
    id: "atletico-madrid",
    name: "Atlético Madrid",
    primaryColor: "#CE3524",
    secondaryColor: "#FFFFFF",
    league: "La Liga",
    logo: require("@/assets/logos/Spain - LaLiga/Atlético de Madrid.png"),
  },
  {
    id: "sevilla",
    name: "Sevilla FC",
    primaryColor: "#FFFFFF",
    secondaryColor: "#D4021D",
    league: "La Liga",
    logo: require("@/assets/logos/Spain - LaLiga/Sevilla FC.png"),
  },
  // Premier League
  {
    id: "man-united",
    name: "Manchester United",
    primaryColor: "#DA291C",
    secondaryColor: "#FBE122",
    league: "Premier League",
    logo: require("@/assets/logos/England - Premier League/Manchester United.png"),
  },
  {
    id: "liverpool",
    name: "Liverpool FC",
    primaryColor: "#C8102E",
    secondaryColor: "#00B2A9",
    league: "Premier League",
    logo: require("@/assets/logos/England - Premier League/Liverpool FC.png"),
  },
  {
    id: "man-city",
    name: "Manchester City",
    primaryColor: "#6CABDD",
    secondaryColor: "#1C2C5B",
    league: "Premier League",
    logo: require("@/assets/logos/England - Premier League/Manchester City.png"),
  },
  {
    id: "arsenal",
    name: "Arsenal FC",
    primaryColor: "#EF0107",
    secondaryColor: "#FFFFFF",
    league: "Premier League",
    logo: require("@/assets/logos/England - Premier League/Arsenal FC.png"),
  },
  {
    id: "chelsea",
    name: "Chelsea FC",
    primaryColor: "#034694",
    secondaryColor: "#FFFFFF",
    league: "Premier League",
    logo: require("@/assets/logos/England - Premier League/Chelsea FC.png"),
  },
  {
    id: "tottenham",
    name: "Tottenham Hotspur",
    primaryColor: "#FFFFFF",
    secondaryColor: "#132257",
    league: "Premier League",
    logo: require("@/assets/logos/England - Premier League/Tottenham Hotspur.png"),
  },
  // Bundesliga
  {
    id: "bayern",
    name: "Bayern Munich",
    primaryColor: "#DC052D",
    secondaryColor: "#0066B2",
    league: "Bundesliga",
    logo: require("@/assets/logos/Germany - Bundesliga/Bayern Munich.png"),
  },
  {
    id: "dortmund",
    name: "Borussia Dortmund",
    primaryColor: "#FDE100",
    secondaryColor: "#000000",
    league: "Bundesliga",
    logo: require("@/assets/logos/Germany - Bundesliga/Borussia Dortmund.png"),
  },
  {
    id: "leverkusen",
    name: "Bayer Leverkusen",
    primaryColor: "#E32221",
    secondaryColor: "#000000",
    league: "Bundesliga",
    logo: require("@/assets/logos/Germany - Bundesliga/Bayer 04 Leverkusen.png"),
  },
  {
    id: "rb-leipzig",
    name: "RB Leipzig",
    primaryColor: "#DD0741",
    secondaryColor: "#FFFFFF",
    league: "Bundesliga",
    logo: require("@/assets/logos/Germany - Bundesliga/RB Leipzig.png"),
  },
  // Ligue 1
  {
    id: "psg",
    name: "Paris Saint-Germain",
    primaryColor: "#004170",
    secondaryColor: "#DA291C",
    league: "Ligue 1",
    logo: require("@/assets/logos/France - Ligue 1/Paris Saint-Germain.png"),
  },
  {
    id: "marseille",
    name: "Olympique Marseille",
    primaryColor: "#2FAEE0",
    secondaryColor: "#FFFFFF",
    league: "Ligue 1",
    logo: require("@/assets/logos/France - Ligue 1/Olympique Marseille.png"),
  },
  {
    id: "lyon",
    name: "Olympique Lyon",
    primaryColor: "#FFFFFF",
    secondaryColor: "#1B3F8F",
    league: "Ligue 1",
    logo: require("@/assets/logos/France - Ligue 1/Olympique Lyon.png"),
  },
  {
    id: "monaco",
    name: "AS Monaco",
    primaryColor: "#ED1C24",
    secondaryColor: "#FFFFFF",
    league: "Ligue 1",
    logo: require("@/assets/logos/France - Ligue 1/AS Monaco.png"),
  },
  // Serie A
  {
    id: "juventus",
    name: "Juventus FC",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
    league: "Serie A",
    logo: require("@/assets/logos/Italy - Serie A/Juventus FC.png"),
  },
  {
    id: "inter",
    name: "Inter Milan",
    primaryColor: "#010E80",
    secondaryColor: "#000000",
    league: "Serie A",
    logo: require("@/assets/logos/Italy - Serie A/Inter Milan.png"),
  },
  {
    id: "ac-milan",
    name: "AC Milan",
    primaryColor: "#FB090B",
    secondaryColor: "#000000",
    league: "Serie A",
    logo: require("@/assets/logos/Italy - Serie A/AC Milan.png"),
  },
  {
    id: "napoli",
    name: "SSC Napoli",
    primaryColor: "#12A0D7",
    secondaryColor: "#FFFFFF",
    league: "Serie A",
    logo: require("@/assets/logos/Italy - Serie A/SSC Napoli.png"),
  },
  {
    id: "roma",
    name: "AS Roma",
    primaryColor: "#8E1F2F",
    secondaryColor: "#F0BC42",
    league: "Serie A",
    logo: require("@/assets/logos/Italy - Serie A/AS Roma.png"),
  },
  // Liga Portugal
  {
    id: "sporting",
    name: "Sporting CP",
    primaryColor: "#006600",
    secondaryColor: "#FFFFFF",
    league: "Liga Portugal",
    logo: require("@/assets/logos/Portugal - Liga Portugal/Sporting CP.png"),
  },
  {
    id: "benfica",
    name: "SL Benfica",
    primaryColor: "#FF0000",
    secondaryColor: "#FFFFFF",
    league: "Liga Portugal",
    logo: require("@/assets/logos/Portugal - Liga Portugal/SL Benfica.png"),
  },
  {
    id: "porto",
    name: "FC Porto",
    primaryColor: "#003893",
    secondaryColor: "#FFFFFF",
    league: "Liga Portugal",
    logo: require("@/assets/logos/Portugal - Liga Portugal/FC Porto.png"),
  },
];

const leagues = [
  "All",
  "Premier League",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "Ligue 1",
  "Liga Portugal",
];

export default function TeamsPage() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("All");

  const filteredTeams = allTeams.filter((team) => {
    const matchesSearch = team.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLeague =
      selectedLeague === "All" || team.league === selectedLeague;
    return matchesSearch && matchesLeague;
  });

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
            onChangeText={setSearchQuery}
            placeholder="Search teams..."
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
            value={searchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons
                color={colorScheme === "dark" ? "#888" : "#666"}
                name="close-circle"
                size={20}
              />
            </Pressable>
          )}
        </View>
      </View>

      {/* League Filter */}
      <View className="mb-3 px-4">
        <FlatList
          data={leagues}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              className={`mr-2 rounded-full px-4 py-2 ${
                selectedLeague === item
                  ? "bg-primary"
                  : "border border-border bg-secondary"
              }`}
              onPress={() => setSelectedLeague(item)}
            >
              <Text
                className={
                  selectedLeague === item
                    ? "font-medium text-primary-foreground text-xs"
                    : "text-foreground text-xs"
                }
              >
                {item}
              </Text>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Teams Grid */}
      <FlatList
        className="flex-1 px-2"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={filteredTeams}
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
        numColumns={2}
        renderItem={renderTeamItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
