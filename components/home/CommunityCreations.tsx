import { useMemo } from "react";
import { Dimensions, View } from "react-native";
import { JerseyCard } from "@/components/home/JerseyCard";
import { Text } from "@/components/ui/text";

type Jersey = {
  id: number;
  source: number | { uri: string };
  name: string;
  creator: string;
  creatorImage?: number | { uri: string };
};

type CommunityCreationsProps = {
  jerseys: Jersey[];
  onJerseyPress: (jerseyId: number) => void;
};

const { width } = Dimensions.get("window");
const cardSize = (width - 32) / 2 - 8; // 2-column layout with gap

const getCreatorAvatarSource = (creatorName: string) => {
  const endpoint =
    process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
  return {
    uri: `${endpoint}/avatars/initials?name=${encodeURIComponent(creatorName)}&width=80&height=80`,
  };
};

export const CommunityCreations = ({
  jerseys,
  onJerseyPress,
}: CommunityCreationsProps) => {
  // Memoize avatar URLs to prevent unnecessary re-renders
  const avatarSources = useMemo(
    () =>
      Object.fromEntries(
        jerseys.map((jersey) => [
          jersey.id,
          getCreatorAvatarSource(jersey.creator),
        ])
      ),
    [jerseys]
  );

  return (
    <View className="p-4 pb-24">
      <View className="py-2">
        <Text
          className={
            "font-semibold text-muted-foreground text-xs uppercase tracking-wide"
          }
        >
          Get Inspired
        </Text>
      </View>
      <View className="gap-4">
        {Array.from({ length: Math.ceil(jerseys.length / 2) }).map(
          (_, rowIndex) => {
            const rowJerseys = jerseys.slice(rowIndex * 2, rowIndex * 2 + 2);
            const rowKey = rowJerseys.map((j) => j.id).join("-");
            return (
              <View className="flex-row gap-4" key={rowKey}>
                {jerseys.slice(rowIndex * 2, rowIndex * 2 + 2).map((jersey) => (
                  <JerseyCard
                    avatarSource={avatarSources[jersey.id]}
                    cardSize={cardSize}
                    jersey={jersey}
                    key={jersey.id}
                    onPress={onJerseyPress}
                  />
                ))}
              </View>
            );
          }
        )}
      </View>
    </View>
  );
};
