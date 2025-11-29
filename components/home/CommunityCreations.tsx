import { LinearGradient } from "expo-linear-gradient";
import { Bookmark } from "lucide-react-native";
import { Dimensions, Image, Pressable, View } from "react-native";
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
                      {jersey.creatorImage !== undefined &&
                        jersey.creatorImage !== null && (
                          <Image
                            source={jersey.creatorImage}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                              borderWidth: 2,
                              borderColor: "white",
                            }}
                          />
                        )}
                      <Text className="font-medium text-white text-xs">
                        {jersey.creator}
                      </Text>
                    </View>
                  </View>

                  {/* Top Right - Bookmark Button */}
                  <View className="absolute top-4 right-4 z-10">
                    <Pressable className="rounded-full bg-white/20 p-2">
                      <Bookmark color="white" size={16} strokeWidth={1.5} />
                    </Pressable>
                  </View>

                  {/* Bottom - Jersey Info */}
                  <View className="absolute right-4 bottom-4 left-4 z-10">
                    <View className="border-stone-600/50 border-t pt-4">
                      <Text className="font-normal text-slate-50 text-sm leading-relaxed">
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
