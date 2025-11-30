import { LinearGradient } from "expo-linear-gradient";
import { Bookmark } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { getInitials } from "@/lib/utils";

type Jersey = {
  id: number;
  source: number | { uri: string };
  name: string;
  creator: string;
  creatorImage?: number | { uri: string };
  tags?: string[];
};

type JerseyCardProps = {
  jersey: Jersey;
  cardSize: number;
  avatarSource: { uri: string };
  onPress: (jerseyId: number) => void;
};

export const JerseyCard = ({
  jersey,
  cardSize,
  avatarSource,
  onPress,
}: JerseyCardProps) => {
  const hasTags = jersey.tags && jersey.tags.length > 0;

  return (
    <Pressable
      className="relative flex-1 overflow-hidden rounded-3xl"
      key={jersey.id}
      onPress={() => onPress(jersey.id)}
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

      {/* Top Header */}
      <View className="absolute top-4 right-4 left-4 z-10 flex-row items-center justify-between">
        {/* Left */}
        <View className="flex-row items-center gap-2">
          <Avatar
            alt={`${jersey.creator}'s avatar`}
            className="size-6 border-2 border-accent"
          >
            <AvatarImage source={avatarSource} />
            <AvatarFallback className="text-center">
              <Text
                className="font-normal text-muted-foreground"
                style={{ fontSize: 10, lineHeight: 16 }}
              >
                {getInitials(jersey.creator)}
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text className="font-medium text-secondary text-xs">
            {jersey.creator}
          </Text>
        </View>
        {/* Right */}
        <Pressable className="rounded-full bg-background/40 p-2">
          <Bookmark color="white" size={16} strokeWidth={2} />
        </Pressable>
      </View>

      {/* Bottom - Jersey Info */}
      <View className="absolute right-4 bottom-4 left-4 z-10">
        <View className="flex flex-col gap-0">
          <Text className="font-normal text-accent text-sm leading-relaxed">
            {jersey.name}
          </Text>
          {hasTags ? (
            <Text
              className="font-normal text-muted/80"
              style={{ fontSize: 10 }}
            >
              {jersey.tags?.join(" • ")}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};
