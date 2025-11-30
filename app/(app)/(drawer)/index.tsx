import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CommunityCreations } from "@/components/home/CommunityCreations";
import { HomeSkeleton } from "@/components/home/HomeSkeleton";
import { PopularTeams } from "@/components/home/PopularTeams";
import { popularTeams } from "@/constants/teams";
import { useAuth } from "@/context/AuthContext";

// Sample community creations / inspiration
const communityCreations = [
  {
    id: 1,
    source: require("@/assets/images/jerseys/black_jersey.png"),
    name: "Midnight Edition",
    creator: "Alex",
    tags: ["Modern", "Bold"],
  },
  {
    id: 2,
    source: require("@/assets/images/jerseys/Classic_red_and_whit.png"),
    name: "Classic Red",
    creator: "Maria",
    tags: ["Classic"],
  },
  {
    id: 3,
    source: require("@/assets/images/jerseys/Modern_blue_gradient.png"),
    name: "Ocean Wave",
    creator: "João",
    tags: ["Modern"],
  },
  {
    id: 4,
    source: require("@/assets/images/jerseys/Retro_90s_style_jers.png"),
    name: "Retro Vibes",
    creator: "Carlos",
    tags: ["Retro", "Bold"],
  },
  {
    id: 5,
    source: require("@/assets/images/jerseys/hunyuan.png"),
    name: "Nature's Touch",
    creator: "Sofia",
    tags: ["Modern", "Futuristic"],
  },
  {
    id: 6,
    source: require("@/assets/images/jerseys/helloween_2.png"),
    name: "Halloween Special",
    creator: "Liam",
    tags: ["Festive", "Bold"],
  },
  {
    id: 7,
    source: require("@/assets/images/jerseys/velocity.png"),
    name: "Velocity",
    creator: "Emma",
    tags: ["Modern", "Futuristic"],
  },
  {
    id: 8,
    source: require("@/assets/images/jerseys/noel_helloween.png"),
    name: "Spooky Night",
    creator: "Noel",
    tags: ["Festive", "Modern"],
  },
];

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleTeamPress = (teamId: string) => {
    router.push(`/create?team=${teamId}`);
  };

  const handleJerseyPress = (jerseyId: number) => {
    router.push(`/jersey/${jerseyId}`);
  };

  const handleCreatePress = () => {
    router.push("/create");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <HomeSkeleton />;
  }

  // Show loading while checking auth
  if (!user) {
    return null;
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Create from Scratch CTA */}

        {/* Popular Teams Section */}
        <PopularTeams
          onCustomTeamPress={handleCreatePress}
          onTeamPress={handleTeamPress}
          teams={popularTeams}
        />

        {/* Community Creations / Explore Section */}
        <CommunityCreations
          jerseys={communityCreations}
          onJerseyPress={handleJerseyPress}
        />
      </ScrollView>
      {!isKeyboardVisible && (
        <TouchableOpacity
          className="absolute right-6 bottom-6 h-14 w-28 items-center justify-center rounded-full bg-primary shadow-lg"
          onPress={handleCreatePress}
        >
          <View className="flex flex-row items-center justify-center gap-1">
            <Plus color="#fff" size={24} />
            <Text className="font-medium text-primary-foreground">Create</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
