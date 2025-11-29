import { Ionicons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";

type JerseyHistoryItem = {
  id: string;
  title: string;
  prompt: string;
  date: string;
  image: ImageSourcePropType;
};

// Sample jersey generation history
const jerseyHistory: JerseyHistoryItem[] = [
  {
    id: "1",
    title: "Midnight Edition",
    prompt: "A sleek black jersey with gold accents",
    date: "Today",
    image: require("@/assets/images/jerseys/black_jersey.png"),
  },
  {
    id: "2",
    title: "Portugal Home Kit",
    prompt: "Portugal national team inspired design",
    date: "Yesterday",
    image: require("@/assets/images/jerseys/Classic_red_and_whit.png"),
  },
  {
    id: "3",
    title: "Ocean Wave",
    prompt: "Modern gradient blue jersey with wave pattern",
    date: "Nov 27",
    image: require("@/assets/images/jerseys/Modern_blue_gradient.png"),
  },
  {
    id: "4",
    title: "Retro 90s Vibes",
    prompt: "Throwback design with geometric patterns",
    date: "Nov 25",
    image: require("@/assets/images/jerseys/Retro_90s_style_jers.png"),
  },
  {
    id: "5",
    title: "Barcelona Away",
    prompt: "Barcelona inspired with modern twist",
    date: "Nov 20",
    image: require("@/assets/images/jerseys/Modern_blue_gradient.png"),
  },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const mutedTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-gray-800" : "border-gray-200";
  const inputBgColor = isDark ? "bg-gray-900" : "bg-gray-100";
  const iconColor = isDark ? "#fff" : "#000";
  const mutedIconColor = isDark ? "#9ca3af" : "#6b7280";

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  const filteredHistory = jerseyHistory.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className={`flex-1 ${bgColor}`} style={{ paddingTop: insets.top }}>
      {/* Search Bar Header */}
      <View className="flex-row items-center gap-3 px-4 py-3">
        <View
          className={`flex-1 flex-row items-center ${inputBgColor} rounded-full px-4`}
        >
          <Ionicons color={mutedIconColor} name="search" size={20} />
          <TextInput
            className={`ml-3 flex-1 text-base ${textColor}`}
            onChangeText={setSearchQuery}
            placeholder="Search designs..."
            placeholderTextColor={mutedIconColor}
            value={searchQuery}
          />
        </View>
        <Pressable className="p-2" onPress={closeDrawer}>
          <Ionicons color={iconColor} name="chevron-forward" size={24} />
        </Pressable>
      </View>

      {/* History Section */}
      <View className="px-4 py-2">
        <Text
          className={`font-semibold text-xs uppercase tracking-wide ${mutedTextColor}`}
        >
          Recent Designs
        </Text>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredHistory.map((item) => (
          <Pressable
            className="flex-row items-center px-4 py-3"
            key={item.id}
            onPress={() => {
              closeDrawer();
              router.push(`/jersey/${item.id}`);
            }}
          >
            {/* Jersey Thumbnail */}
            <Image
              className="mr-3 rounded-lg"
              source={item.image}
              style={{ width: 56, height: 64 }}
              // resizeMode="cover"
            />
            <View className="flex-1">
              <Text
                className={`font-medium text-base ${textColor}`}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text className={`text-sm ${mutedTextColor}`} numberOfLines={1}>
                {item.prompt}
              </Text>
              <Text className={`mt-0.5 text-xs ${mutedTextColor}`}>
                {item.date}
              </Text>
            </View>
            <Pressable className="p-2">
              <Ionicons
                color={mutedIconColor}
                name="ellipsis-vertical"
                size={18}
              />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>

      {/* User Profile Footer */}
      <View
        className={`flex-row items-center justify-between px-4 py-4 ${borderColor}`}
      >
        <View className="flex-1 flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-600">
            <Text className="font-semibold text-sm text-white">
              {getInitials(user?.name)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className={`font-medium text-base ${textColor}`}>
              {user?.name || "User"}
            </Text>
            {typeof user?.email === "string" && user.email.length > 0 && (
              <Text className={`text-xs ${mutedTextColor}`}>{user.email}</Text>
            )}
          </View>
        </View>
        <Pressable
          onPress={() => {
            closeDrawer();
            router.push("/settings");
          }}
        >
          <Ionicons color={mutedIconColor} name="settings-outline" size={22} />
        </Pressable>
      </View>
    </View>
  );
}
