import { Dimensions, ScrollView, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";

const { width } = Dimensions.get("window");
const teamCardWidth = 140;
const imageWidth = (width - 48) / 2;

const TEAM_SKELETON_COUNT = 4;
const JERSEY_SKELETON_COUNT = 4;

export const HomeSkeleton = () => {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Popular Teams Section Skeleton */}
        <View className="px-4 pt-2">
          <Skeleton className="mb-4 h-6 w-32" />
          <View className="flex-row gap-3 pb-2">
            {Array.from({ length: TEAM_SKELETON_COUNT }).map((_, i) => (
              <View key={`skeleton-team-${i}`} style={{ width: teamCardWidth }}>
                <Skeleton className="mb-2 h-20 w-full rounded-xl" />
                <Skeleton className="h-4 w-full" />
              </View>
            ))}
          </View>
        </View>

        {/* Get Inspired Section Skeleton */}
        <View className="p-4 pb-24">
          <View className="mb-4 flex-row items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-12" />
          </View>

          {/* Image Grid Skeleton */}
          <View className="flex-row flex-wrap justify-between">
            {Array.from({ length: JERSEY_SKELETON_COUNT }).map((_, i) => (
              <View
                key={`skeleton-jersey-${i}`}
                className="mb-4"
                style={{ width: imageWidth }}
              >
                <Skeleton
                  className="mb-2 rounded-xl"
                  style={{
                    width: imageWidth,
                    height: imageWidth * 1.2,
                  }}
                />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
