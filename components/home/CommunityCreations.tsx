import { LinearGradient } from "expo-linear-gradient";
import { Bookmark } from "lucide-react-native";
import { useMemo } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { getInitials } from "@/lib/utils";

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
                  <Pressable
                    className="relative flex-1 overflow-hidden rounded-3xl"
                    key={jersey.id}
                    onPress={() => onJerseyPress(jersey.id)}
                    style={{ height: cardSize }}
                  >
                    {/* Background Image */}
                    <Image
                      resizeMode="cover"
                      source={jersey.source}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    {/* Gradient Overlay - from black at bottom to transparent at top */}
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.6)",
                        "rgba(0, 0, 0, 0.15)",
                        "rgba(0, 0, 0, 0)",
                      ]}
                      end={[0, 0]}
                      start={[0, 1]}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    {/* Top Left - Creator Info */}
                    <View className="absolute top-4 left-4 z-10">
                      <View className="flex-row items-center gap-2">
                        <Avatar
                          alt={`${jersey.creator}'s avatar`}
                          className="size-6 border-2 border-accent"
                        >
                          <AvatarImage source={avatarSources[jersey.id]} />
                          <AvatarFallback className="text-center">
                            <Text className="font-normal text-muted-foreground text-xs">
                              {getInitials(jersey.creator)}
                            </Text>
                          </AvatarFallback>
                        </Avatar>
                        <Text className="font-medium text-secondary">
                          {jersey.creator}
                        </Text>
                      </View>
                    </View>

                    {/* Top Right - Bookmark Button */}
                    <View className="absolute top-4 right-4 z-10">
                      <Pressable className="rounded-full bg-background/20 p-2">
                        <Bookmark color="white" size={16} strokeWidth={1.5} />
                      </Pressable>
                    </View>

                    {/* Bottom - Jersey Info */}
                    <View className="absolute right-4 bottom-4 left-4 z-10">
                      <View className="">
                        <Text className="font-normal text-accent text-sm leading-relaxed">
                          {jersey.name}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            );
          }
        )}
      </View>
    </View>
  );
};
