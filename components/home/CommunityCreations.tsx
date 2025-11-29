import { Dimensions, Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

type Jersey = {
  id: number;
  source: number | { uri: string };
  name: string;
  creator: string;
};

type CommunityCreationsProps = {
  jerseys: Jersey[];
  onJerseyPress: (jerseyId: number) => void;
};

const { width } = Dimensions.get("window");
const imageWidth = (width - 48) / 2; // 2 columns with padding

export const CommunityCreations = ({
  jerseys,
  onJerseyPress,
}: CommunityCreationsProps) => (
  <View className="p-4 pb-24">
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="font-bold text-lg">Get Inspired</Text>
      <Pressable>
        <Text className="text-primary text-sm">See all</Text>
      </Pressable>
    </View>
    <View className="flex-row flex-wrap justify-between">
      {jerseys.map((jersey) => (
        <Pressable
          className="mb-4"
          key={jersey.id}
          onPress={() => onJerseyPress(jersey.id)}
          style={{ width: imageWidth }}
        >
          <Image
            resizeMode="cover"
            source={jersey.source}
            style={{
              width: imageWidth,
              height: imageWidth * 1.2,
              borderRadius: 12,
            }}
          />
          <Text className="mt-2 font-medium text-sm">{jersey.name}</Text>
          <Text className="text-muted-foreground text-xs">
            by {jersey.creator}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
);
